import { GalleryCategoryDTO } from '../../dtos/contentManagement/galleryCategory/galleryCategoryDTO';
import { CRUDResultModel } from '../../models/shared/crud/crudResultModel';
import { MethodResult } from '../../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../../models/shared/enums/crudResultEnum';
import { StatusCodes } from 'http-status-codes';
import { GridData } from '../../models/shared/grid/gridData';
import { AddGalleryCategoryDTO } from '../../dtos/contentManagement/galleryCategory/addGalleryCategoryDTO';
import { RequestResult } from '../../models/shared/crud/requestResult';
import { autoInjectable } from 'tsyringe';
import GalleryCategoryRepository from '../../repositories/contentManagement/galleryCategoryRepository';
import { GridParameter } from 'src/dtos/shared/grid/gridPrameter';
import { UpdateGalleryCategoryDTO } from 'src/dtos/contentManagement/galleryCategory/updateGalleryCategoryDTO';
import { GalleryCategory } from 'src/models/contentManagement/galleryCategory';
import { Types } from 'mongoose';

@autoInjectable()
export default class GalleryCategoryService {
    private _galleryCategoryRepository: GalleryCategoryRepository;
    constructor(galleryCategoryRepository: GalleryCategoryRepository) {
        this._galleryCategoryRepository = galleryCategoryRepository;

    }
    /**
     * add galleryCategory
     * 
     * @param {object} addGalleryCategoryDTO
     * @param {string} userId 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    addGalleryCategory = async (addGalleryCategoryDTO: AddGalleryCategoryDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try { 
            const { parentId, name, priority, description } = addGalleryCategoryDTO;
            const newGalleryCategory: GalleryCategory = {
                _id: null,
                parentId: new Types.ObjectId(parentId),
                name,
                priority,
                description,
                isActive: true,
                createdBy: new Types.ObjectId(userId),
                createdAt: new Date()
            }
            await this._galleryCategoryRepository.add(newGalleryCategory);
            return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), true));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

       
    /**
     * get all galleryCategory list by params
     * 
     * @returns {Promise<RequestResult<GalleryCategoryDTO[]> | null>}
     */
    getAll = async (): Promise<RequestResult<GalleryCategoryDTO[] | null>> => {
        try {
            const galleryCategorys: GalleryCategoryDTO[] = (await this._galleryCategoryRepository.getAll())?.map((galleryCategory: any) => <GalleryCategoryDTO>{
                id: galleryCategory._id?.toString(),
                parentId: galleryCategory.parentId,
                parentName: galleryCategory.parentId?.name,
                name: galleryCategory.name,
                priority: galleryCategory.priority,
                description: galleryCategory.description,
                isActive: galleryCategory.isActive,
                createdBy: galleryCategory.createdBy,
                createdAt: galleryCategory.createdAt,
                updatedBy: galleryCategory.updatedBy,
                updatedAt: galleryCategory.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<GalleryCategoryDTO[]>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), galleryCategorys));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

       
    /**
     * get all galleryCategory list by params
     * 
     * @param {object} gridParameter 
     * @returns {Promise<RequestResult<GridData<GalleryCategoryDTO[]>> | null>}
     */
    getAllByParams = async (gridParameter: GridParameter): Promise<RequestResult<GridData<GalleryCategoryDTO[]> | null>> => {
        try {
            const totalCount = await this._galleryCategoryRepository.count();
            const galleryCategorys: GalleryCategoryDTO[] = (await this._galleryCategoryRepository.getAllByParams(gridParameter))?.map((galleryCategory: any) => <GalleryCategoryDTO>{
                id: galleryCategory._id?.toString(),
                parentId: galleryCategory.parentId,
                parentName: galleryCategory.parentId?.name,
                name: galleryCategory.name,
                priority: galleryCategory.priority,
                description: galleryCategory.description,
                isActive: galleryCategory.isActive,
                createdBy: galleryCategory.createdBy,
                createdAt: galleryCategory.createdAt,
                updatedBy: galleryCategory.updatedBy,
                updatedAt: galleryCategory.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<GridData<GalleryCategoryDTO[]>>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), {
                rows: galleryCategorys,
                totalCount: totalCount
            }));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * get galleryCategory by Id
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<GalleryCategoryDTO | null>>}
    */
    getById = async (id: string): Promise<RequestResult<GalleryCategoryDTO | null>> => {
        try {
            const galleryCategory = await this._galleryCategoryRepository.getById(id);
            if (!galleryCategory) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'galleryCategoryDoesNotExist')));
            }
            const galleryCategoryDTO: GalleryCategoryDTO = <GalleryCategoryDTO>{
                id: galleryCategory._id?.toString(),
                parentId: galleryCategory.parentId?.toString(),
                name: galleryCategory.name,
                priority: galleryCategory.priority,
                description: galleryCategory.description,
                isActive: galleryCategory.isActive
            };
            return new RequestResult(StatusCodes.OK, new MethodResult<GalleryCategoryDTO>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), galleryCategoryDTO));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * update galleryCategory
     * 
     * @param {object} updateGalleryCategoryDTO
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>} 
     */
    update = async (updateGalleryCategoryDTO: UpdateGalleryCategoryDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const { id, parentId, name, priority, description } = updateGalleryCategoryDTO;
            let galleryCategory = await this._galleryCategoryRepository.getById(id);
            if (galleryCategory === null) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'galleryCategoryDoesNotExist')));
            }

            galleryCategory.parentId = new Types.ObjectId(parentId);
            galleryCategory.name = name;
            galleryCategory.priority = priority;
            galleryCategory.description = description;
            galleryCategory.updatedBy = new Types.ObjectId(userId);
            galleryCategory.updatedAt = new Date();

            const { matchedCount } = await this._galleryCategoryRepository.update(galleryCategory);
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
     * get galleryCategory by Id
     * 
     * @param {string} id 
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    toggleActive = async (id: string, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const galleryCategory = await this._galleryCategoryRepository.getById(id);
            if (!galleryCategory) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'galleryCategoryDoesNotExist')));
            }
            const toggleIsActive = !galleryCategory.isActive;
            const { modifiedCount } = await this._galleryCategoryRepository.toggleIsActive(id, toggleIsActive, userId);
            if (modifiedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), toggleIsActive));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * delete galleryCategory
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    delete = async (id: string) => {
        try {
            const { deletedCount } = await this._galleryCategoryRepository.delete(id);
            if (deletedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), true));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
}

