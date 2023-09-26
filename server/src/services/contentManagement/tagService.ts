import { TagDTO } from '../../dtos/contentManagement/tag/tagDTO';
import { CRUDResultModel } from '../../models/shared/crud/crudResultModel';
import { MethodResult } from '../../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../../models/shared/enums/crudResultEnum';
import { StatusCodes } from 'http-status-codes';
import { GridData } from '../../models/shared/grid/gridData';
import { AddTagDTO } from '../../dtos/contentManagement/tag/addTagDTO';
import { RequestResult } from '../../models/shared/crud/requestResult';
import { autoInjectable } from 'tsyringe';
import TagRepository from '../../repositories/contentManagement/tagRepository';
import { GridParameter } from '../../dtos/shared/grid/gridPrameter';
import { UpdateTagDTO } from '../../dtos/contentManagement/tag/updateTagDTO';
import { Tag } from '../../models/contentManagement/tag';
import { Types } from 'mongoose';

@autoInjectable()
export default class TagService {
    private _tagRepository: TagRepository;
    constructor(tagRepository: TagRepository) {
        this._tagRepository = tagRepository;

    }
    /**
     * add tag
     * 
     * @param {object} addTagDTO
     * @param {string} userId 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    addTag = async (addTagDTO: AddTagDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const { name, locale } = addTagDTO;
            const isExistsName = await this._tagRepository.isExistsName(null, name);
            if (isExistsName) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'tagNameAlreadyExists')));
            }

            const newTag: Tag = {
                _id: null,
                name,
                isActive: true,
                locale,
                createdBy: new Types.ObjectId(userId),
                createdAt: new Date()
            }
            await this._tagRepository.add(newTag);
            return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), true));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

       
    /**
     * checks whether or not this tagname exists
     * 
     * @param {string} name 
     * @returns { Promise<RequestResult<boolean | null>> }
     */
    isExisName = async ( id: string, name: string): Promise<RequestResult<boolean | null>> => {
        try {
            const tag = await this._tagRepository.isExistsName(id, name);
            return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), tag ? true : false));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    
    /**
     * get all tag list
     * 
     * @returns {Promise<RequestResult<GridData<TagDTO[]>> | null>}
     */
    getAll = async (): Promise<RequestResult<TagDTO[] | null>> => {
        try {
            const tags: TagDTO[] = (await this._tagRepository.getAll())?.map((tag: any) => <TagDTO>{
                id: tag._id?.toString(),
                name: tag.name,
                isActive: tag.isActive,
                locale: tag.locale,
                createdBy: tag.createdBy,
                createdAt: tag.createdAt,
                updatedBy: tag.updatedBy,
                updatedAt: tag.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<TagDTO[]>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), tags));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

    /**
     * get all tag list by params
     * 
     * @param {object} gridParameter 
     * @returns {Promise<RequestResult<GridData<TagDTO[]>> | null>}
     */
    getAllByParams = async (gridParameter: GridParameter): Promise<RequestResult<GridData<TagDTO[]> | null>> => {
        try {
            const totalCount = await this._tagRepository.count();
            const tags: TagDTO[] = (await this._tagRepository.getAllByParams(gridParameter))?.map((tag: any) => <TagDTO>{
                id: tag._id?.toString(),
                name: tag.name,
                isActive: tag.isActive,
                locale: tag.locale,
                createdBy: tag.createdBy,
                createdAt: tag.createdAt,
                updatedBy: tag.updatedBy,
                updatedAt: tag.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<GridData<TagDTO[]>>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), {
                rows: tags,
                totalCount: totalCount
            }));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * get tag by Id
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<TagDTO | null>>}
     */
    getById = async (id: string): Promise<RequestResult<TagDTO | null>> => {
        try {
            const tag = await this._tagRepository.getById(id);
            if (!tag) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'tagDoesNotExist')));
            }
            const tagDTO: TagDTO = <TagDTO>{
                id: tag._id?.toString(),
                name: tag.name,
                isActive: tag.isActive,
                locale: tag.locale
            };
            return new RequestResult(StatusCodes.OK, new MethodResult<TagDTO>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), tagDTO));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * update tag
     * 
     * @param {object} updateTagDTO
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>} 
     */
    update = async (updateTagDTO: UpdateTagDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const { id, name, locale } = updateTagDTO;
            let tag = await this._tagRepository.getById(id);
            if (tag === null) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'tagDoesNotExist')));
            }

            const isExistsName = await this._tagRepository.isExistsName(id, name);
            if (isExistsName) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'tagNameAlreadyExists')));
            }

            tag.name = name;
            tag.locale = locale;
            tag.updatedBy = new Types.ObjectId(userId);
            tag.updatedAt = new Date();

            const { matchedCount } = await this._tagRepository.update(tag);
            if (matchedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), true));
            }
            else {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
            }
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * get tag by Id
     * 
     * @param {string} id 
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    toggleActive = async (id: string, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const tag = await this._tagRepository.getById(id);
            if (!tag) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'tagDoesNotExist')));
            }
            const toggleIsActive = !tag.isActive;
            const { modifiedCount } = await this._tagRepository.toggleIsActive(id, toggleIsActive, userId);
            if (modifiedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), toggleIsActive));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * delete tag
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    delete = async (id: string) => {
        try {
            const { deletedCount } = await this._tagRepository.delete(id);
            if (deletedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), true));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
}

