import { GalleryFileDTO } from '../../dtos/contentManagement/galleryFile/galleryFileDTO';
import { CRUDResultModel } from '../../models/shared/crud/crudResultModel';
import { MethodResult } from '../../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../../models/shared/enums/crudResultEnum';
import { StatusCodes } from 'http-status-codes';
import { GridData } from '../../models/shared/grid/gridData';
import { AddGalleryFileDTO } from '../../dtos/contentManagement/galleryFile/addGalleryFileDTO';
import { RequestResult } from '../../models/shared/crud/requestResult';
import { autoInjectable } from 'tsyringe';
import GalleryFileRepository from '../../repositories/contentManagement/galleryFileRepository';
import { UpdateGalleryFileDTO } from 'src/dtos/contentManagement/galleryFile/updateGalleryFileDTO';
import { GalleryFile } from 'src/models/contentManagement/galleryFile';
import { Types } from 'mongoose';
import { ListGalleryFileByParams } from 'src/dtos/contentManagement/galleryFile/listGalleryFileByParams';

@autoInjectable()
export default class GalleryFileService {
    private _galleryFileRepository: GalleryFileRepository;
    constructor(galleryFileRepository: GalleryFileRepository) {
        this._galleryFileRepository = galleryFileRepository;

    }
    /**
     * add galleryFile
     * 
     * @param {object} addGalleryFileDTO
     * @param {string} userId 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    addGalleryFile = async (addGalleryFileDTO: AddGalleryFileDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try { 
            const { galleryId, name, description, file, fileSavePath, fileExtension, fileSize, priority } = addGalleryFileDTO;
            const newGalleryFile: GalleryFile = {
                _id: null,
                galleryId:  new Types.ObjectId(galleryId!),
                name,
                description,
                priority,
                file,
                fileSavePath,
                fileExtension,
                fileSize,
                downloadCount: 0,
                createdBy: new Types.ObjectId(userId),
                createdAt: new Date()
            }
            await this._galleryFileRepository.add(newGalleryFile);
            return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), true));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

       
    /**
     * get all galleryFile list by params
     * 
     * @returns {Promise<RequestResult<GalleryFileDTO[]> | null>}
     */
    getAll = async (): Promise<RequestResult<GalleryFileDTO[] | null>> => {
        try {
            const galleryFiles: GalleryFileDTO[] = (await this._galleryFileRepository.getAll())?.map((galleryFile: any) => <GalleryFileDTO>{
                id: galleryFile._id?.toString(),
                galleryId: galleryFile.galleryId,
                galleryName: galleryFile.galleryId?.name,
                name: galleryFile.name,
                description: galleryFile.description,
                file: galleryFile.file,
                fileSavePath: galleryFile.fileSavePath,
                fileExtension: galleryFile.fileExtension,
                downloadCount: galleryFile.downloadCount,
                fileSize: galleryFile.fileSize,
                priority: galleryFile.priority,
                createdBy: galleryFile.createdBy,
                createdAt: galleryFile.createdAt,
                updatedBy: galleryFile.updatedBy,
                updatedAt: galleryFile.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<GalleryFileDTO[]>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), galleryFiles));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

       
    /**
     * get all galleryFile list by params
     * 
     * @param {object} listGalleryFileByParams 
     * @returns {Promise<RequestResult<GridData<GalleryFileDTO[]>> | null>}
     */
    getAllByParams = async (listGalleryFileByParams: ListGalleryFileByParams): Promise<RequestResult<GridData<GalleryFileDTO[]> | null>> => {
        try {
            const totalCount = await this._galleryFileRepository.count();
            const galleryFiles: GalleryFileDTO[] = (await this._galleryFileRepository.getAllByParams(listGalleryFileByParams))?.map((galleryFile: any) => <GalleryFileDTO>{
                id: galleryFile._id?.toString(),
                galleryId: galleryFile.galleryId,
                galleryName: galleryFile.galleryId?.name,
                name: galleryFile.name,
                description: galleryFile.description,
                file: galleryFile.file,
                fileSavePath: galleryFile.fileSavePath,
                fileExtension: galleryFile.fileExtension,
                downloadCount: galleryFile.downloadCount,
                fileSize: galleryFile.fileSize,
                priority: galleryFile.priority,
                createdBy: galleryFile.createdBy,
                createdAt: galleryFile.createdAt,
                updatedBy: galleryFile.updatedBy,
                updatedAt: galleryFile.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<GridData<GalleryFileDTO[]>>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), {
                rows: galleryFiles,
                totalCount: totalCount
            }));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * get galleryFile by Id
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<GalleryFileDTO | null>>}
    */
    getById = async (id: string): Promise<RequestResult<GalleryFileDTO | null>> => {
        try {
            const galleryFile = await this._galleryFileRepository.getById(id);
            if (!galleryFile) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'galleryFileDoesNotExist')));
            }
            const galleryFileDTO: GalleryFileDTO = <GalleryFileDTO>{
                id: galleryFile._id?.toString(),
                galleryId: galleryFile.galleryId.toString(),
                galleryName: (<any>galleryFile.galleryId)?.name,
                name: galleryFile.name,
                description: galleryFile.description,
                file: galleryFile.file,
                fileSavePath: galleryFile.fileSavePath,
                fileExtension: galleryFile.fileExtension,
                downloadCount: galleryFile.downloadCount,
                fileSize: galleryFile.fileSize,
                priority: galleryFile.priority,
                createdBy: galleryFile.createdBy,
                createdAt: galleryFile.createdAt,
                updatedBy: galleryFile.updatedBy,
                updatedAt: galleryFile.updatedAt
            };
            return new RequestResult(StatusCodes.OK, new MethodResult<GalleryFileDTO>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), galleryFileDTO));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * update galleryFile
     * 
     * @param {object} updateGalleryFileDTO
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>} 
     */
    update = async (updateGalleryFileDTO: UpdateGalleryFileDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const { id, galleryId, name, description, file, fileSavePath, fileExtension, fileSize, priority } = updateGalleryFileDTO;
            let galleryFile = await this._galleryFileRepository.getById(id);
            if (galleryFile === null) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'galleryFileDoesNotExist')));
            }

            galleryFile.galleryId =  new Types.ObjectId(galleryId!),
            galleryFile.name = name;
            galleryFile.description = description;
            galleryFile.file = file,
            galleryFile.fileSavePath = fileSavePath,
            galleryFile.fileSize = fileSize,
            galleryFile.fileExtension = fileExtension,
            galleryFile.priority = priority;
            galleryFile.updatedBy = new Types.ObjectId(userId);
            galleryFile.updatedAt = new Date();

            const { matchedCount } = await this._galleryFileRepository.update(galleryFile);
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
     * delete galleryFile
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    delete = async (id: string) => {
        try {
            const { deletedCount } = await this._galleryFileRepository.delete(id);
            if (deletedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), true));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
}

