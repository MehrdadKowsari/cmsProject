import { ContentBlockDTO } from '../../dtos/contentManagement/contentBlock/contentBlockDTO';
import { CRUDResultModel } from '../../models/shared/crud/crudResultModel';
import { MethodResult } from '../../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../../models/shared/enums/crudResultEnum';
import { StatusCodes } from 'http-status-codes';
import { GridData } from '../../models/shared/grid/gridData';
import { AddContentBlockDTO } from '../../dtos/contentManagement/contentBlock/addContentBlockDTO';
import { RequestResult } from '../../models/shared/crud/requestResult';
import { autoInjectable } from 'tsyringe';
import ContentBlockRepository from '../../repositories/contentManagement/contentBlockRepository';
import { GridParameter } from 'src/dtos/shared/grid/gridPrameter';
import { UpdateContentBlockDTO } from 'src/dtos/contentManagement/contentBlock/updateContentBlockDTO';
import { ContentBlock } from 'src/models/contentManagement/contentBlock';
import { Types } from 'mongoose';


@autoInjectable()
export default class ContentBlockService {
    private _contentBlockRepository: ContentBlockRepository;
    constructor(contentBlockRepository: ContentBlockRepository) {
        this._contentBlockRepository = contentBlockRepository;
    }
    /**
     * add contentBlock
     * 
     * @param {object} addContentBlockDTO
     * @param {string} userId 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    addContentBlock = async (addContentBlockDTO: AddContentBlockDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try { 
            const { title, sectionName, content, image, thumbnailImage, iconCssClass , dateFrom, dateTo, priority, locale } = addContentBlockDTO;
            const newContentBlock: ContentBlock = {
                _id: null,
                title,
                sectionName,
                content,
                priority,
                image,
                thumbnailImage,
                iconCssClass,
                dateFrom,
                dateTo,
                isActive: true,
                locale,
                createdBy: new Types.ObjectId(userId),
                createdAt: new Date()
            }
            await this._contentBlockRepository.add(newContentBlock);
            return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), true));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

       
    /**
     * get all contentBlock list by isCommentOpen
     * 
     * @returns {Promise<RequestResult<ContentBlockDTO[]> | null>}
     */
    getAll = async (): Promise<RequestResult<ContentBlockDTO[] | null>> => {
        try {
            const contentBlocks: ContentBlockDTO[] = (await this._contentBlockRepository.getAll())?.map((contentBlock: any) => <ContentBlockDTO>{
                id: contentBlock._id?.toString(),
                title: contentBlock.title,
                content: contentBlock.content,
                sectionName: contentBlock.sectionName,
                image: contentBlock.image,
                thumbnailImage: contentBlock.thumbnailImage,
                iconCssClass: contentBlock.iconCssClass,
                dateFrom: contentBlock.dateFrom,
                dateTo: contentBlock.dateTo,
                locale: contentBlock.locale,
                priority: contentBlock.priority,
                isActive: contentBlock.isActive,
                createdBy: contentBlock.createdBy,
                createdAt: contentBlock.createdAt,
                updatedBy: contentBlock.updatedBy,
                updatedAt: contentBlock.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<ContentBlockDTO[]>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), contentBlocks));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

       
    /**
     * get all contentBlock list by isCommentOpen
     * 
     * @param {object} gridParameter 
     * @returns {Promise<RequestResult<GridData<ContentBlockDTO[]>> | null>}
     */
    getAllByParams = async (gridParameter: GridParameter): Promise<RequestResult<GridData<ContentBlockDTO[]> | null>> => {
        try {
            const totalCount = await this._contentBlockRepository.count();
            const contentBlocks: ContentBlockDTO[] = (await this._contentBlockRepository.getAllByParams(gridParameter))?.map((contentBlock: any) => <ContentBlockDTO>{
                id: contentBlock._id?.toString(),
                title: contentBlock.title,
                content: contentBlock.content,
                sectionName: contentBlock.sectionName,
                image: contentBlock.image,
                thumbnailImage: contentBlock.thumbnailImage,
                iconCssClass: contentBlock.iconCssClass,
                dateFrom: contentBlock.dateFrom,
                dateTo: contentBlock.dateTo,
                locale: contentBlock.locale,
                priority: contentBlock.priority,
                isActive: contentBlock.isActive,
                createdBy: contentBlock.createdBy,
                createdAt: contentBlock.createdAt,
                updatedBy: contentBlock.updatedBy,
                updatedAt: contentBlock.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<GridData<ContentBlockDTO[]>>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), {
                rows: contentBlocks,
                totalCount: totalCount
            }));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
     
    /**
     * get contentBlock by Id
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<ContentBlockDTO | null>>}
    */
    getById = async (id: string): Promise<RequestResult<ContentBlockDTO | null>> => {
        try {
            const contentBlock = await this._contentBlockRepository.getById(id);
            if (!contentBlock) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'contentBlockDoesNotExist')));
            }
            const contentBlockDTO: ContentBlockDTO = <ContentBlockDTO>{
                id: contentBlock._id?.toString(),
                title: contentBlock.title,
                content: contentBlock.content,
                sectionName: contentBlock.sectionName,
                image: contentBlock.image,
                thumbnailImage: contentBlock.thumbnailImage,
                iconCssClass: contentBlock.iconCssClass,
                dateFrom: contentBlock.dateFrom,
                dateTo: contentBlock.dateTo,
                locale: contentBlock.locale,
                priority: contentBlock.priority,
                isActive: contentBlock.isActive,
                createdBy: contentBlock.createdBy.toString(),
                createdAt: contentBlock.createdAt,
                updatedBy: contentBlock.updatedBy,
                updatedAt: contentBlock.updatedAt
            };
            return new RequestResult(StatusCodes.OK, new MethodResult<ContentBlockDTO>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), contentBlockDTO));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    
    }
    /**
     * get contentBlock by sectionName and locale
     * 
     * @param {string} sectionName 
     * @param {string} locale 
     * @returns {Promise<RequestResult<ContentBlockDTO | null>>}
    */
    getBySectionNameAndLocale = async (sectionName: string, locale: string): Promise<RequestResult<ContentBlockDTO | null>> => {
        try {
            const contentBlock = await this._contentBlockRepository.getBySectionNameAndLocale(sectionName, locale);
            if (!contentBlock) {
                return new RequestResult(StatusCodes.OK, new MethodResult<ContentBlockDTO>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), null));
            }
            

            const contentBlockDTO: ContentBlockDTO = <ContentBlockDTO>{
                id: contentBlock._id?.toString(),
                title: contentBlock.title,
                content: contentBlock.content,
                sectionName: contentBlock.sectionName,
                image: contentBlock.image,
                thumbnailImage: contentBlock.thumbnailImage,
                iconCssClass: contentBlock.iconCssClass,
                dateFrom: contentBlock.dateFrom,
                dateTo: contentBlock.dateTo,
                locale: contentBlock.locale,
                priority: contentBlock.priority,
                isActive: contentBlock.isActive,
                createdBy: contentBlock.createdBy.toString(),
                createdAt: contentBlock.createdAt,
                updatedBy: contentBlock.updatedBy,
                updatedAt: contentBlock.updatedAt
            };
            return new RequestResult(StatusCodes.OK, new MethodResult<ContentBlockDTO>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), contentBlockDTO));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * update contentBlock
     * 
     * @param {object} updateContentBlockDTO
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>} 
     */
    update = async (updateContentBlockDTO: UpdateContentBlockDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const { id, title, sectionName, content, image, thumbnailImage, iconCssClass, dateFrom, dateTo, priority, locale } = updateContentBlockDTO;
            let contentBlock = await this._contentBlockRepository.getById(id);
            if (contentBlock === null) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'contentBlockDoesNotExist')));
            }

            contentBlock.title = title;
            contentBlock.sectionName = sectionName;
            contentBlock.content = content,
            contentBlock.image = image,
            contentBlock.thumbnailImage = thumbnailImage,
            contentBlock.iconCssClass = iconCssClass,
            contentBlock.dateFrom = dateFrom,
            contentBlock.dateTo = dateTo,
            contentBlock.locale = locale,
            contentBlock.priority = priority;
            contentBlock.updatedBy = new Types.ObjectId(userId);
            contentBlock.updatedAt = new Date();

            const { matchedCount } = await this._contentBlockRepository.update(contentBlock);
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
     * delete contentBlock
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    delete = async (id: string) => {
        try {
            const { deletedCount } = await this._contentBlockRepository.delete(id);
            if (deletedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), true));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
}

