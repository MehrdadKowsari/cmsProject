import { RoleDTO } from '../dtos/role/roleDTO';
import { CRUDResultModel } from '../models/shared/crud/crudResultModel';
import { MethodResult } from '../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../models/shared/enums/crudResultEnum';
import { StatusCodes } from 'http-status-codes';
import { GridData } from '../models/shared/grid/gridData';
import { AddRoleDTO } from '../dtos/role/addRoleDTO';
import { RequestResult } from '../models/shared/crud/requestResult';
import { autoInjectable } from 'tsyringe';
import RoleRepository from '../models/repositories/user/roleRepository';
import { GridParameter } from 'src/dtos/shared/grid/gridPrameter';
import { UpdateRoleDTO } from 'src/dtos/role/updateRoleDTO';
import { Role } from 'src/models/security/role';
import { Types } from 'mongoose';

@autoInjectable()
export default class RoleService {
    private _roleRepository: RoleRepository;
    constructor(roleRepository: RoleRepository) {
        this._roleRepository = roleRepository;

    }
    /**
     * add role
     * 
     * @param {object} addRoleDTO
     * @param {string} userId 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    addRole = async (addRoleDTO: AddRoleDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const { name, description } = addRoleDTO;
            const isExistsName = await this._roleRepository.isExistsName(null, name);
            if (isExistsName) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'roleNameAlreadyExists')));
            }

            const newRole: Role = {
                _id: null,
                name,
                description,
                isActive: true,
                createdBy: new Types.ObjectId(userId),
                createdAt: new Date()
            }
            await this._roleRepository.add(newRole);
            return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), true));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

       
    /**
     * checks whether or not this rolename exists
     * 
     * @param {string} name 
     * @returns { Promise<RequestResult<boolean | null>> }
     */
    isExisName = async ( id: string, name: string): Promise<RequestResult<boolean | null>> => {
        try {
            const role = await this._roleRepository.isExistsName(id, name);
            return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), role ? true : false));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    
    /**
     * get all role list by params
     * 
     * @param {object} gridParameter 
     * @returns {Promise<RequestResult<GridData<RoleDTO[]>> | null>}
     */
    getAllByParams = async (gridParameter: GridParameter): Promise<RequestResult<GridData<RoleDTO[]> | null>> => {
        try {
            const totalCount = await this._roleRepository.count();
            const roles: RoleDTO[] = (await this._roleRepository.getAllByParams(gridParameter))?.map((role: any) => <RoleDTO>{
                id: role._id?.toString(),
                fullName: `${role.name} ${role.description}`,
                name: role.name,
                description: role.description,
                isActive: role.isActive,
                createdBy: role.createdBy,
                createdAt: role.createdAt,
                updatedBy: role.updatedBy,
                updatedAt: role.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<GridData<RoleDTO[]>>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), {
                rows: roles,
                totalCount: totalCount
            }));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * get role by Id
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<RoleDTO | null>>}
     */
    getById = async (id: string): Promise<RequestResult<RoleDTO | null>> => {
        try {
            const role = await this._roleRepository.getById(id);
            if (!role) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'roleDoesNotExist')));
            }
            const roleDTO: RoleDTO = <RoleDTO>{
                id: role._id?.toString(),
                name: role.name,
                description: role.description,
                isActive: role.isActive
            };
            return new RequestResult(StatusCodes.OK, new MethodResult<RoleDTO>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), roleDTO));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * update role
     * 
     * @param {object} updateRoleDTO
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>} 
     */
    update = async (updateRoleDTO: UpdateRoleDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const { id, name, description } = updateRoleDTO;
            let role = await this._roleRepository.getById(id);
            if (role === null) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'roleDoesNotExist')));
            }

            const isExistsName = await this._roleRepository.isExistsName(id, name);
            if (isExistsName) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'roleNameAlreadyExists')));
            }

            

            role.name = name;
            role.description = description;
            role.updatedBy = new Types.ObjectId(userId);
            role.updatedAt = new Date();

            const { matchedCount } = await this._roleRepository.update(role);
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
     * get role by Id
     * 
     * @param {string} id 
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    toggleActive = async (id: string, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const role = await this._roleRepository.getById(id);
            if (!role) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'roleDoesNotExist')));
            }
            const toggleIsActive = !role.isActive;
            const { modifiedCount } = await this._roleRepository.toggleIsActive(id, toggleIsActive, userId);
            if (modifiedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), toggleIsActive));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * delete role
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    delete = async (id: string) => {
        try {
            const { deletedCount } = await this._roleRepository.delete(id);
            if (deletedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), true));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
}

