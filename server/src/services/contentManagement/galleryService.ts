import { GalleryDTO } from '../../dtos/contentManagement/gallery/galleryDTO';
import { CRUDResultModel } from '../../models/shared/crud/crudResultModel';
import { MethodResult } from '../../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../../models/shared/enums/crudResultEnum';
import { StatusCodes } from 'http-status-codes';
import { GridData } from '../../models/shared/grid/gridData';
import { AddGalleryDTO } from '../../dtos/contentManagement/gallery/addGalleryDTO';
import { RequestResult } from '../../models/shared/crud/requestResult';
import { autoInjectable } from 'tsyringe';
import GalleryRepository from '../../repositories/contentManagement/galleryRepository';
import { GridParameter } from '../../dtos/shared/grid/gridPrameter';
import { UpdateGalleryDTO } from '../../dtos/contentManagement/gallery/updateGalleryDTO';
import { Gallery } from '../../models/contentManagement/gallery';
import { Types } from 'mongoose';
import { ListActiveGalleryByParamsDTO } from '../../dtos/contentManagement/gallery/listActiveGalleryByParamsDTO';

@autoInjectable()
export default class GalleryService {
    private _galleryRepository: GalleryRepository;
    constructor(galleryRepository: GalleryRepository) {
        this._galleryRepository = galleryRepository;

    }
    /**
     * add gallery
     * 
     * @param {object} addGalleryDTO
     * @param {string} userId 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    addGallery = async (addGalleryDTO: AddGalleryDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try { 
            const { galleryCategoryId, name, description, type, allowedFileExtension, params, image, thumbnailImage, slugUrl, priority, locale } = addGalleryDTO;
            const newGallery: Gallery = {
                _id: null,
                galleryCategoryId:  new Types.ObjectId(galleryCategoryId!),
                name,
                description,
                type,
                allowedFileExtension,
                params,
                priority,
                image,
                thumbnailImage,
                slugUrl,
                visitNumber: 0,
                likeCount: 0,
                dislikeCount: 0,
                locale,
                isActive: true,
                createdBy: new Types.ObjectId(userId),
                createdAt: new Date()
            }
            await this._galleryRepository.add(newGallery);
            return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), true));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

       
    /**
     * get all gallery list by params
     * 
     * @returns {Promise<RequestResult<GalleryDTO[]> | null>}
     */
    getAll = async (): Promise<RequestResult<GalleryDTO[] | null>> => {
        try {
            const galleries: GalleryDTO[] = (await this._galleryRepository.getAll())?.map((gallery: any) => <GalleryDTO>{
                id: gallery._id?.toString(),
                galleryCategoryId: gallery.galleryCategoryId,
                galleryCategoryName: gallery.galleryCategoryId?.name,
                name: gallery.name,
                description: gallery.description,
                type: gallery.type,
                image: gallery.image,
                thumbnailImage: gallery.thumbnailImage,
                visitNumber: gallery.visitNumber,
                likeCount: gallery.likeCount,
                dislikeCount: gallery.dislikeCount,
                slugUrl: gallery.slugUrl,
                allowedFileExtension: gallery.allowedFileExtension,
                params: gallery.params,
                locale: gallery.locale,
                priority: gallery.priority,
                isActive: gallery.isActive,
                createdBy: gallery.createdBy,
                createdAt: gallery.createdAt,
                updatedBy: gallery.updatedBy,
                updatedAt: gallery.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<GalleryDTO[]>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), galleries));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

       
    /**
     * get all gallery list by params
     * 
     * @param {object} gridParameter 
     * @returns {Promise<RequestResult<GridData<GalleryDTO[]>> | null>}
     */
    getAllByParams = async (gridParameter: GridParameter): Promise<RequestResult<GridData<GalleryDTO[]> | null>> => {
        try {
            const totalCount = await this._galleryRepository.count();
            const galleries: GalleryDTO[] = (await this._galleryRepository.getAllByParams(gridParameter))?.map((gallery: any) => <GalleryDTO>{
                id: gallery._id?.toString(),
                galleryCategoryId: gallery.galleryCategoryId,
                galleryCategoryName: gallery.galleryCategoryId?.name,
                name: gallery.name,
                type: gallery.type,
                description: gallery.description,
                allowedFileExtension: gallery.allowedFileExtension,
                params: gallery.params,
                image: gallery.image,
                thumbnailImage: gallery.thumbnailImage,
                visitNumber: gallery.visitNumber,
                likeCount: gallery.likeCount,
                dislikeCount: gallery.dislikeCount,
                slugUrl: gallery.slugUrl,
                locale: gallery.locale,
                priority: gallery.priority,
                isActive: gallery.isActive,
                createdBy: gallery.createdBy,
                createdAt: gallery.createdAt,
                updatedBy: gallery.updatedBy,
                updatedAt: gallery.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<GridData<GalleryDTO[]>>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), {
                rows: galleries,
                totalCount: totalCount
            }));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * get all gallery list by params
     * 
     * @param {object} listActiveGalleryByParamsDTO 
     * @returns {Promise<RequestResult<GridData<GalleryDTO[]>> | null>}
     */
    getAllActiveByParams = async (listActiveGalleryByParamsDTO: ListActiveGalleryByParamsDTO): Promise<RequestResult<GalleryDTO[] | null>> => {
        try {
            const galleries: GalleryDTO[] = (await this._galleryRepository.getAllActiveByParams(listActiveGalleryByParamsDTO))?.map((gallery: any) => <GalleryDTO>{
                id: gallery._id?.toString(),
                galleryCategoryId: gallery.galleryCategoryId,
                galleryCategoryName: gallery.galleryCategoryId?.name,
                name: gallery.name,
                type: gallery.type,
                description: gallery.description,
                allowedFileExtension: gallery.allowedFileExtension,
                params: gallery.params,
                image: gallery.image,
                thumbnailImage: gallery.thumbnailImage,
                visitNumber: gallery.visitNumber,
                likeCount: gallery.likeCount,
                dislikeCount: gallery.dislikeCount,
                slugUrl: gallery.slugUrl,
                locale: gallery.locale,
                priority: gallery.priority,
                isActive: gallery.isActive,
                createdBy: gallery.createdBy,
                createdAt: gallery.createdAt,
                updatedBy: gallery.updatedBy,
                updatedAt: gallery.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<GalleryDTO[]>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), galleries));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * get gallery by Id
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<GalleryDTO | null>>}
    */
    getById = async (id: string): Promise<RequestResult<GalleryDTO | null>> => {
        try {
            const gallery = await this._galleryRepository.getById(id);
            if (!gallery) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'galleryDoesNotExist')));
            }
            const galleryDTO: GalleryDTO = <GalleryDTO>{
                id: gallery._id?.toString(),
                galleryCategoryId: gallery.galleryCategoryId?.toString(),
                name: gallery.name,
                type: gallery.type,
                description: gallery.description,
                allowedFileExtension: gallery.allowedFileExtension,
                params: gallery.params,
                image: gallery.image,
                thumbnailImage: gallery.thumbnailImage,
                slugUrl: gallery.slugUrl,
                locale: gallery.locale,
                priority: gallery.priority,
                isActive: gallery.isActive
            };
            return new RequestResult(StatusCodes.OK, new MethodResult<GalleryDTO>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), galleryDTO));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * update gallery
     * 
     * @param {object} updateGalleryDTO
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>} 
     */
    update = async (updateGalleryDTO: UpdateGalleryDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const { id, galleryCategoryId, name, description, type, allowedFileExtension, image, thumbnailImage, slugUrl, params, priority, locale } = updateGalleryDTO;
            let gallery = await this._galleryRepository.getById(id);
            if (gallery === null) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'galleryDoesNotExist')));
            }

            gallery.galleryCategoryId =  new Types.ObjectId(galleryCategoryId!),
            gallery.name = name;
            gallery.description = description;
            gallery.allowedFileExtension = allowedFileExtension,
            gallery.params = params,
            gallery.type = type,
            gallery.image = image,
            gallery.slugUrl = slugUrl,
            gallery.thumbnailImage = thumbnailImage,
            gallery.locale = locale,
            gallery.priority = priority;
            gallery.updatedBy = new Types.ObjectId(userId);
            gallery.updatedAt = new Date();

            const { matchedCount } = await this._galleryRepository.update(gallery);
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
     * get gallery by Id
     * 
     * @param {string} id 
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    toggleActive = async (id: string, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const gallery = await this._galleryRepository.getById(id);
            if (!gallery) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'galleryDoesNotExist')));
            }
            const toggleIsActive = !gallery.isActive;
            const { modifiedCount } = await this._galleryRepository.toggleIsActive(id, toggleIsActive, userId);
            if (modifiedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), toggleIsActive));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * delete gallery
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    delete = async (id: string) => {
        try {
            const { deletedCount } = await this._galleryRepository.delete(id);
            if (deletedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), true));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
}

