import { RolePagePermissionDTO } from '../../dtos/security/rolePagePermission/rolePagePermissionDTO';
import { CRUDResultModel } from '../../models/shared/crud/crudResultModel';
import { MethodResult } from '../../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../../models/shared/enums/crudResultEnum';
import { StatusCodes } from 'http-status-codes';
import { GridData } from '../../models/shared/grid/gridData';
import { AddRolePagePermissionDTO } from '../../dtos/security/rolePagePermission/addRolePagePermissionDTO';
import { RequestResult } from '../../models/shared/crud/requestResult';
import { autoInjectable } from 'tsyringe';
import RolePagePermissionRepository from '../../repositories/security/rolePagePermissionRepository';
import { GridParameter } from '../../dtos/shared/grid/gridPrameter';
import { UpdateRolePagePermissionDTO } from '../../dtos/security/rolePagePermission/updateRolePagePermissionDTO';
import { RolePagePermission } from '../../models/security/rolePagePermission';
import { Types } from 'mongoose';
import { PageTypeEnum } from '../../enums/security/pageTypeEnum';
import { PermissionTypeEnum } from '../../enums/security/permissionTypeEnum';
import { PagePermissionDTO } from '../../dtos/security/pagePermission/pagePermissionDTO';
import { PermissionDTO } from '../../dtos/security/permission/permissionDTO';

@autoInjectable()
export default class RolePagePermissionService {
    private _rolePagePermissionRepository: RolePagePermissionRepository;
    constructor(rolePagePermissionRepository: RolePagePermissionRepository) {
        this._rolePagePermissionRepository = rolePagePermissionRepository;

    }
    /**
     * add rolePagePermission
     * 
     * @param {object} addRolePagePermissionDTO
     * @param {string} userId 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    addRolePagePermission = async (addRolePagePermissionDTO: AddRolePagePermissionDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const { roleId, pagePermissionId } = addRolePagePermissionDTO;
            const isDuplicate = await this._rolePagePermissionRepository.isDuplicate(null, roleId, pagePermissionId);
            if (isDuplicate) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'rolePagePermissionNameAlreadyExists')));
            }

            const newRolePagePermission: RolePagePermission = {
                _id: null,
                roleId: new Types.ObjectId(roleId),
                pagePermissionId: new Types.ObjectId(pagePermissionId),
                createdBy: new Types.ObjectId(userId),
                createdAt: new Date()
            }
            await this._rolePagePermissionRepository.add(newRolePagePermission);
            return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), true));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

    /**
     * get all rolePagePermission list by params
     * 
     * @param {object} gridParameter 
     * @returns {Promise<RequestResult<GridData<RolePagePermissionDTO[]>> | null>}
     */
    getAllByParams = async (gridParameter: GridParameter): Promise<RequestResult<GridData<RolePagePermissionDTO[]> | null>> => {
        try {
            const totalCount = await this._rolePagePermissionRepository.count();
            const rolePagePermissions: RolePagePermissionDTO[] = (await this._rolePagePermissionRepository.getAllByParams(gridParameter))?.map((rolePagePermission: any) => <RolePagePermissionDTO>{
                id: rolePagePermission._id?.toString(),
                roleId: rolePagePermission.roleId,
                roleName: rolePagePermission.roleId.name,
                pagePermissionId: rolePagePermission.pagePermissionId,
                pagePermissionName: `${rolePagePermission.pagePermissionId.pageId.name} - ${rolePagePermission.pagePermissionId.permissionId.name}`,
                createdBy: rolePagePermission.createdBy,
                createdAt: rolePagePermission.createdAt,
                updatedBy: rolePagePermission.updatedBy,
                updatedAt: rolePagePermission.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<GridData<RolePagePermissionDTO[]>>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), {
                rows: rolePagePermissions,
                totalCount: totalCount
            }));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

    /**
     * get all permission list by pageId and userId
     * 
     * @param {string} userId 
     * @param {string} pageId 
     * @returns {Promise<RequestResult<PermissionDTO[]> | null>}
     */
    getAllByPageIdAndUserId = async (pageId: PageTypeEnum, userId: string): Promise<RequestResult<PermissionDTO[] | null>> => {
        try {
            const pagePermissions: PermissionDTO[] | undefined = (await this._rolePagePermissionRepository.getAllByUserIdAndPageId(pageId, userId))?.map((rolePagePermission: any) => <PermissionDTO>{
                id: rolePagePermission.pagePermissionId.permissionId._id?.toString(),
                name: rolePagePermission.pagePermissionId.permissionId.name,
                type: rolePagePermission.pagePermissionId.permissionId.type,
                createdBy: rolePagePermission.pagePermissionId.permissionId.createdBy,
                createdAt: rolePagePermission.pagePermissionId.permissionId.createdAt,
                updatedBy: rolePagePermission.pagePermissionId.permissionId.updatedBy,
                updatedAt: rolePagePermission.pagePermissionId.permissionId.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<PermissionDTO[]>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), pagePermissions));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * get rolePagePermission by Id
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<RolePagePermissionDTO | null>>}
     */
    getById = async (id: string): Promise<RequestResult<RolePagePermissionDTO | null>> => {
        try {
            const rolePagePermission = await this._rolePagePermissionRepository.getById(id);
            if (!rolePagePermission) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'rolePagePermissionDoesNotExist')));
            }
            const rolePagePermissionDTO: RolePagePermissionDTO = <RolePagePermissionDTO>{
                id: rolePagePermission._id?.toString(),
                roleId: rolePagePermission.roleId.toString(),
                pagePermissionId: rolePagePermission.pagePermissionId.toString()
            };
            return new RequestResult(StatusCodes.OK, new MethodResult<RolePagePermissionDTO>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), rolePagePermissionDTO));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * get rolePagePermission by Id
     * 
     * @param {string} pageId 
     * @param {string} permissionId 
     * @param {string} userId 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    hasPermissionByPageIdAndPermissionIdAndRoleList = async (pageId: PageTypeEnum, permissionId: PermissionTypeEnum, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const hasPermission = await this._rolePagePermissionRepository.hasPermissionByPageIdAndPermissionIdAndRoleList(pageId, permissionId, userId);
            return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), hasPermission));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * update rolePagePermission
     * 
     * @param {object} updateRolePagePermissionDTO
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>} 
     */
    update = async (updateRolePagePermissionDTO: UpdateRolePagePermissionDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const { id, roleId: roleId, pagePermissionId: pagePermissionId } = updateRolePagePermissionDTO;
            let rolePagePermission = await this._rolePagePermissionRepository.getById(id);
            if (rolePagePermission === null) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'rolePagePermissionDoesNotExist')));
            }

            const isDuplicate = await this._rolePagePermissionRepository.isDuplicate(id, roleId, pagePermissionId);
            if (isDuplicate) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'rolePagePermissionNameAlreadyExists')));
            }

            rolePagePermission.roleId = new Types.ObjectId(roleId);
            rolePagePermission.pagePermissionId = new Types.ObjectId(pagePermissionId);
            rolePagePermission.updatedBy = new Types.ObjectId(userId);
            rolePagePermission.updatedAt = new Date();

            const { matchedCount } = await this._rolePagePermissionRepository.update(rolePagePermission);
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
     * delete rolePagePermission
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    delete = async (id: string) => {
        try {
            const { deletedCount } = await this._rolePagePermissionRepository.delete(id);
            if (deletedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), true));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
}

