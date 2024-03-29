import { PermissionDTO } from '../../dtos/security/permission/permissionDTO';
import { CRUDResultModel } from '../../models/shared/crud/crudResultModel';
import { MethodResult } from '../../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../../models/shared/enums/crudResultEnum';
import { StatusCodes } from 'http-status-codes';
import { GridData } from '../../models/shared/grid/gridData';
import { AddPermissionDTO } from '../../dtos/security/permission/addPermissionDTO';
import { RequestResult } from '../../models/shared/crud/requestResult';
import { autoInjectable } from 'tsyringe';
import PermissionRepository from '../../repositories/security/permissionRepository';
import { GridParameter } from '../../dtos/shared/grid/gridPrameter';
import { UpdatePermissionDTO } from '../../dtos/security/permission/updatePermissionDTO';
import { Permission } from '../../models/security/permission';
import { Types } from 'mongoose';

@autoInjectable()
export default class PermissionService {
    private _permissionRepository: PermissionRepository;
    constructor(permissionRepository: PermissionRepository) {
        this._permissionRepository = permissionRepository;

    }
    /**
     * add permission
     * 
     * @param {object} addPermissionDTO
     * @param {string} userId 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    addPermission = async (addPermissionDTO: AddPermissionDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const { name, type, description } = addPermissionDTO;
            const isExistsName = await this._permissionRepository.isExistsName(null, name);
            if (isExistsName) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'permissionNameAlreadyExists')));
            }

            const newPermission: Permission = {
                _id: null,
                name,
                type,
                description,
                isActive: true,
                createdBy: new Types.ObjectId(userId),
                createdAt: new Date()
            }
            await this._permissionRepository.add(newPermission);
            return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), true));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

       
    /**
     * checks whether or not this permissionname exists
     * 
     * @param {string} name 
     * @returns { Promise<RequestResult<boolean | null>> }
     */
    isExisName = async ( id: string, name: string): Promise<RequestResult<boolean | null>> => {
        try {
            const permission = await this._permissionRepository.isExistsName(id, name);
            return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), permission ? true : false));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    
    /**
     * get all permission list by params
     * 
     * @returns {Promise<RequestResult<PermissionDTO[]> | null>}
     */
    getAll = async (): Promise<RequestResult<PermissionDTO[] | null>> => {
        try {
            const permissions: PermissionDTO[] = (await this._permissionRepository.getAll())?.map((permission: any) => <PermissionDTO>{
                id: permission._id?.toString(),
                name: permission.name,
                type: permission.type,
                description: permission.description,
                isActive: permission.isActive,
                createdBy: permission.createdBy,
                createdAt: permission.createdAt,
                updatedBy: permission.updatedBy,
                updatedAt: permission.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<PermissionDTO[]>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), permissions));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * get all permission list by params
     * 
     * @param {object} gridParameter 
     * @returns {Promise<RequestResult<GridData<PermissionDTO[]>> | null>}
     */
    getAllByParams = async (gridParameter: GridParameter): Promise<RequestResult<GridData<PermissionDTO[]> | null>> => {
        try {
            const totalCount = await this._permissionRepository.count();
            const permissions: PermissionDTO[] = (await this._permissionRepository.getAllByParams(gridParameter))?.map((permission: any) => <PermissionDTO>{
                id: permission._id?.toString(),
                name: permission.name,
                type: permission.type,
                description: permission.description,
                isActive: permission.isActive,
                createdBy: permission.createdBy,
                createdAt: permission.createdAt,
                updatedBy: permission.updatedBy,
                updatedAt: permission.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<GridData<PermissionDTO[]>>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), {
                rows: permissions,
                totalCount: totalCount
            }));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * get permission by Id
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<PermissionDTO | null>>}
     */
    getById = async (id: string): Promise<RequestResult<PermissionDTO | null>> => {
        try {
            const permission = await this._permissionRepository.getById(id);
            if (!permission) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'permissionDoesNotExist')));
            }
            const permissionDTO: PermissionDTO = <PermissionDTO>{
                id: permission._id?.toString(),
                name: permission.name,
                type: permission.type,
                description: permission.description,
                isActive: permission.isActive
            };
            return new RequestResult(StatusCodes.OK, new MethodResult<PermissionDTO>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), permissionDTO));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * update permission
     * 
     * @param {object} updatePermissionDTO
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>} 
     */
    update = async (updatePermissionDTO: UpdatePermissionDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const { id, name, type, description } = updatePermissionDTO;
            let permission = await this._permissionRepository.getById(id);
            if (permission === null) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'permissionDoesNotExist')));
            }

            const isExistsName = await this._permissionRepository.isExistsName(id, name);
            if (isExistsName) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'permissionNameAlreadyExists')));
            }

            permission.name = name;
            permission.type = type;
            permission.description = description;
            permission.updatedBy = new Types.ObjectId(userId);
            permission.updatedAt = new Date();

            const { matchedCount } = await this._permissionRepository.update(permission);
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
     * get permission by Id
     * 
     * @param {string} id 
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    toggleActive = async (id: string, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const permission = await this._permissionRepository.getById(id);
            if (!permission) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'permissionDoesNotExist')));
            }
            const toggleIsActive = !permission.isActive;
            const { modifiedCount } = await this._permissionRepository.toggleIsActive(id, toggleIsActive, userId);
            if (modifiedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), toggleIsActive));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * delete permission
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    delete = async (id: string) => {
        try {
            const { deletedCount } = await this._permissionRepository.delete(id);
            if (deletedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), true));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
}

