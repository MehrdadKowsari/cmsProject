import { UserRoleDTO } from '../../dtos/security/userRole/userRoleDTO';
import { CRUDResultModel } from '../../models/shared/crud/crudResultModel';
import { MethodResult } from '../../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../../models/shared/enums/crudResultEnum';
import { StatusCodes } from 'http-status-codes';
import { GridData } from '../../models/shared/grid/gridData';
import { AddUserRoleDTO } from '../../dtos/security/userRole/addUserRoleDTO';
import { RequestResult } from '../../models/shared/crud/requestResult';
import { autoInjectable } from 'tsyringe';
import UserRoleRepository from '../../repositories/security/userRoleRepository';
import { GridParameter } from 'src/dtos/shared/grid/gridPrameter';
import { UpdateUserRoleDTO } from 'src/dtos/security/userRole/updateUserRoleDTO';
import { UserRole } from 'src/models/security/userRole';
import { Types } from 'mongoose';

@autoInjectable()
export default class UserRoleService {
    private _userRoleRepository: UserRoleRepository;
    constructor(userRoleRepository: UserRoleRepository) {
        this._userRoleRepository = userRoleRepository;

    }
    /**
     * add userRole
     * 
     * @param {object} addUserRoleDTO
     * @param {string} userId 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    addUserRole = async (addUserRoleDTO: AddUserRoleDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const { userId, roleId } = addUserRoleDTO;
            const isDuplicate = await this._userRoleRepository.isDuplicate(null, userId, roleId);
            if (isDuplicate) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'userRoleNameAlreadyExists')));
            }

            const newUserRole: UserRole = {
                _id: null,
                userId: new Types.ObjectId(userId),
                roleId: new Types.ObjectId(roleId),
                createdBy: new Types.ObjectId(userId),
                createdAt: new Date()
            }
            await this._userRoleRepository.add(newUserRole);
            return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), true));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

    /**
     * get all userRole list by params
     * 
     * @param {object} gridParameter 
     * @returns {Promise<RequestResult<GridData<UserRoleDTO[]>> | null>}
     */
    getAllByParams = async (gridParameter: GridParameter): Promise<RequestResult<GridData<UserRoleDTO[]> | null>> => {
        try {
            const totalCount = await this._userRoleRepository.count();
            const userRoles: UserRoleDTO[] = (await this._userRoleRepository.getAllByParams(gridParameter))?.map((userRole: any) => <UserRoleDTO>{
                id: userRole._id?.toString(),
                userId: userRole.userId,
                roleId: userRole.roleId,
                createdBy: userRole.createdBy,
                createdAt: userRole.createdAt,
                updatedBy: userRole.updatedBy,
                updatedAt: userRole.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<GridData<UserRoleDTO[]>>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), {
                rows: userRoles,
                totalCount: totalCount
            }));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * get userRole by Id
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<UserRoleDTO | null>>}
     */
    getById = async (id: string): Promise<RequestResult<UserRoleDTO | null>> => {
        try {
            const userRole = await this._userRoleRepository.getById(id);
            if (!userRole) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'userRoleDoesNotExist')));
            }
            const userRoleDTO: UserRoleDTO = <UserRoleDTO>{
                id: userRole._id?.toString(),
                userId: userRole.userId.toString(),
                roleId: userRole.roleId.toString()
            };
            return new RequestResult(StatusCodes.OK, new MethodResult<UserRoleDTO>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), userRoleDTO));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * update userRole
     * 
     * @param {object} updateUserRoleDTO
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>} 
     */
    update = async (updateUserRoleDTO: UpdateUserRoleDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const { id, roleId: roleId, userId: userId } = updateUserRoleDTO;
            let userRole = await this._userRoleRepository.getById(id);
            if (userRole === null) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'userRoleDoesNotExist')));
            }

            const isDuplicate = await this._userRoleRepository.isDuplicate(id, userId, roleId);
            if (isDuplicate) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'userRoleNameAlreadyExists')));
            }

            userRole.userId = new Types.ObjectId(userId);
            userRole.roleId = new Types.ObjectId(roleId);
            userRole.updatedBy = new Types.ObjectId(userId);
            userRole.updatedAt = new Date();

            const { matchedCount } = await this._userRoleRepository.update(userRole);
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
     * delete userRole
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    delete = async (id: string) => {
        try {
            const { deletedCount } = await this._userRoleRepository.delete(id);
            if (deletedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), true));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
}

