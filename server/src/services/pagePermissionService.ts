import { PagePermissionDTO } from '../dtos/pagePermission/pagePermissionDTO';
import { CRUDResultModel } from '../models/shared/crud/crudResultModel';
import { MethodResult } from '../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../models/shared/enums/crudResultEnum';
import { StatusCodes } from 'http-status-codes';
import { GridData } from '../models/shared/grid/gridData';
import { AddPagePermissionDTO } from '../dtos/pagePermission/addPagePermissionDTO';
import { RequestResult } from '../models/shared/crud/requestResult';
import { autoInjectable } from 'tsyringe';
import PagePermissionRepository from '../repositories/security/pagePermissionRepository';
import { GridParameter } from 'src/dtos/shared/grid/gridPrameter';
import { UpdatePagePermissionDTO } from 'src/dtos/pagePermission/updatePagePermissionDTO';
import { PagePermission } from 'src/models/security/pagePermission';
import { Types } from 'mongoose';

@autoInjectable()
export default class PagePermissionService {
    private _pagePermissionRepository: PagePermissionRepository;
    constructor(pagePermissionRepository: PagePermissionRepository) {
        this._pagePermissionRepository = pagePermissionRepository;

    }
    /**
     * add pagePermission
     * 
     * @param {object} addPagePermissionDTO
     * @param {string} userId 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    addPagePermission = async (addPagePermissionDTO: AddPagePermissionDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const { pageId, permissionId } = addPagePermissionDTO;
            const isDuplicate = await this._pagePermissionRepository.isDuplicate(null, pageId, permissionId);
            if (isDuplicate) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'pagePermissionNameAlreadyExists')));
            }

            const newPagePermission: PagePermission = {
                _id: null,
                pageId: new Types.ObjectId(pageId),
                permissionId: new Types.ObjectId(permissionId),
                createdBy: new Types.ObjectId(userId),
                createdAt: new Date()
            }
            await this._pagePermissionRepository.add(newPagePermission);
            return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), true));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

    /**
     * get all pagePermission list by params
     * 
     * @param {object} gridParameter 
     * @returns {Promise<RequestResult<GridData<PagePermissionDTO[]>> | null>}
     */
    getAllByParams = async (gridParameter: GridParameter): Promise<RequestResult<GridData<PagePermissionDTO[]> | null>> => {
        try {
            const totalCount = await this._pagePermissionRepository.count();
            const pagePermissions: PagePermissionDTO[] = (await this._pagePermissionRepository.getAllByParams(gridParameter))?.map((pagePermission: any) => <PagePermissionDTO>{
                id: pagePermission._id?.toString(),
                pageId: pagePermission.pageId,
                permissionId: pagePermission.permissionId,
                createdBy: pagePermission.createdBy,
                createdAt: pagePermission.createdAt,
                updatedBy: pagePermission.updatedBy,
                updatedAt: pagePermission.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<GridData<PagePermissionDTO[]>>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), {
                rows: pagePermissions,
                totalCount: totalCount
            }));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * get pagePermission by Id
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<PagePermissionDTO | null>>}
     */
    getById = async (id: string): Promise<RequestResult<PagePermissionDTO | null>> => {
        try {
            const pagePermission = await this._pagePermissionRepository.getById(id);
            if (!pagePermission) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'pagePermissionDoesNotExist')));
            }
            const pagePermissionDTO: PagePermissionDTO = <PagePermissionDTO>{
                id: pagePermission._id?.toString(),
                pageId: pagePermission.pageId.toString(),
                permissionId: pagePermission.permissionId.toString()
            };
            return new RequestResult(StatusCodes.OK, new MethodResult<PagePermissionDTO>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), pagePermissionDTO));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * update pagePermission
     * 
     * @param {object} updatePagePermissionDTO
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>} 
     */
    update = async (updatePagePermissionDTO: UpdatePagePermissionDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const { id, pageId, permissionId } = updatePagePermissionDTO;
            let pagePermission = await this._pagePermissionRepository.getById(id);
            if (pagePermission === null) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'pagePermissionDoesNotExist')));
            }

            const isDuplicate = await this._pagePermissionRepository.isDuplicate(id, pageId, permissionId);
            if (isDuplicate) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'pagePermissionNameAlreadyExists')));
            }

            pagePermission.pageId = new Types.ObjectId(pageId);
            pagePermission.permissionId = new Types.ObjectId(permissionId);
            pagePermission.updatedBy = new Types.ObjectId(userId);
            pagePermission.updatedAt = new Date();

            const { matchedCount } = await this._pagePermissionRepository.update(pagePermission);
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
     * delete pagePermission
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    delete = async (id: string) => {
        try {
            const { deletedCount } = await this._pagePermissionRepository.delete(id);
            if (deletedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), true));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
}

