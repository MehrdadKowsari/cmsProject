import { UserDTO } from '../../dtos/security/user/userDTO';
import { CRUDResultModel } from '../../models/shared/crud/crudResultModel';
import { MethodResult } from '../../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../../models/shared/enums/crudResultEnum';
//import bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import { GridData } from '../../models/shared/grid/gridData';
import { AddUserDTO } from '../../dtos/security/user/addUserDTO';
import { RequestResult } from '../../models/shared/crud/requestResult';
import { autoInjectable } from 'tsyringe';
import UserRepository from '../../repositories/security/userRepository';
import { GridParameter } from '../../dtos/shared/grid/gridPrameter';
import { ChangeUserPasswordDTO } from '../../dtos/security/user/changeUserPasswordDTO';
import { ResetUserPasswordDTO } from '../../dtos/security/user/resetUserPasswordDTO';
import { UpdateUserDTO } from '../../dtos/security/user/updateUserDTO';
import { UpdateUserProfileDTO } from '../../dtos/security/user/updateUserProfileDTO';
import { User } from '../../models/security/user';

@autoInjectable()
export default class UserService {
    private _userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
        this._userRepository = userRepository;

    }
    /**
     * add user
     * 
     * @param {object} addUserDTO
     * @param {string} userId 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    addUser = async (addUserDTO: AddUserDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const { firstName, lastName, userName, email, password, confirmPassword } = addUserDTO;
            const isExistsUsername = await this._userRepository.isExistsUsername(null, userName);
            if (isExistsUsername) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'userNameAlreadyExists')));
            }

            const isExistsEmail = await this._userRepository.isExistsEmail(null, email);
            if (isExistsEmail) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'emailAlreadyExists')));
            }

            if (password !== confirmPassword) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'confirmPasswordDoesNotMatch')));
            }
            //const hashedPassword = await bcrypt.hash(password, 12);
            const newUser: User = {
                _id: null,
                firstName,
                lastName,
                email,
                userName,
                //password: hashedPassword,
                createdBy: userId,
                createdAt: new Date()
            }
            await this._userRepository.add(newUser);
            return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), true));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * get all user list
     * 
     * @returns {Promise<RequestResult<UserDTO[]> | null>}
     */
    getAll = async (): Promise<RequestResult<UserDTO[] | null>> => {
        try {
            const users: UserDTO[] = (await this._userRepository.getAll())?.map((user: any) => <UserDTO>{
                id: user._id?.toString(),
                fullName: `${user.firstName} ${user.lastName}`,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                isCreatedByExternalAccount: user.isCreatedByExternalAccount,
                userName: user.userName,
                isActive: user.isActive,
                createdBy: user.createdBy,
                createdAt: user.createdAt,
                updatedBy: user.updatedBy,
                updatedAt: user.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<UserDTO[]>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), users));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

    /**
     * get all user list by params
     * 
     * @param {object} gridParameter 
     * @returns {Promise<RequestResult<GridData<UserDTO[]>> | null>}
     */
    getAllByParams = async (gridParameter: GridParameter): Promise<RequestResult<GridData<UserDTO[]> | null>> => {
        try {
            const totalCount = await this._userRepository.count();
            const users: UserDTO[] = (await this._userRepository.getAllByParams(gridParameter))?.map((user: any) => <UserDTO>{
                id: user._id?.toString(),
                fullName: `${user.firstName} ${user.lastName}`,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                isCreatedByExternalAccount: user.isCreatedByExternalAccount,
                userName: user.userName,
                isActive: user.isActive,
                createdBy: user.createdBy,
                createdAt: user.createdAt,
                updatedBy: user.updatedBy,
                updatedAt: user.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<GridData<UserDTO[]>>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), {
                rows: users,
                totalCount: totalCount
            }));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * get user by Id
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<UserDTO | null>>}
     */
    getById = async (id: string): Promise<RequestResult<UserDTO | null>> => {
        try {
            const user = await this._userRepository.getById(id);
            if (!user) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'userDoesNotExist')));
            }
            const userDTO: UserDTO = <UserDTO>{
                id: user._id?.toString(),
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userName: user.userName,
                isActive: user.isActive
            };
            return new RequestResult(StatusCodes.OK, new MethodResult<UserDTO>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), userDTO));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * get user by username
     * 
     * @param {string} username 
     * @returns {Promise<RequestResult<UserDTO | null>>}
     */
    getByUsername = async (username: string): Promise<RequestResult<UserDTO | null>> => {
        try {
            const user = await this._userRepository.getByUsername(username);
            if (!user) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'userDoesNotExist')));
            }
            const userDTO: UserDTO = <UserDTO>{
                id: user._id?.toString(),
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userName: user.userName,
                isActive: user.isActive
            };
            return new RequestResult(StatusCodes.OK, new MethodResult<UserDTO>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), userDTO));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * checks whether or not this username exists
     * 
     * @param {string} username 
     * @returns { Promise<RequestResult<boolean | null>> }
     */
    isExistUserByUsername = async (username: string): Promise<RequestResult<boolean | null>> => {
        try {
            const user = await this._userRepository.getByUsername(username);
            return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), user ? true : false));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * get current user by Id
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<UserDTO | null>>}
     */
    getCurrent = async (id: string): Promise<RequestResult<UserDTO | null>> => {
        try {
            const user = await this._userRepository.getById(id);
            if (!user) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'userDoesNotExist')));
            }
            const userDTO: UserDTO = <UserDTO>{
                id: user._id?.toString(),
                image: user.image,
                firstName: user.firstName,
                lastName: user.lastName,
                fullName: `${user.firstName} ${user.lastName}`,
                email: user.email,
                userName: user.userName,
                isActive: user.isActive,
                isCreatedByExternalAccount: user.isCreatedByExternalAccount
            };
            return new RequestResult(StatusCodes.OK, new MethodResult<UserDTO>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), userDTO));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * update user
     * 
     * @param {object} updateUserDTO
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>} 
     */
    update = async (updateUserDTO: UpdateUserDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const { id, firstName, lastName, userName, email } = updateUserDTO;
            let user = await this._userRepository.getById(id);
            if (user === null) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'userDoesNotExist')));
            }

            const isExistsUsername = await this._userRepository.isExistsUsername(id, userName);
            if (isExistsUsername) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'userNameAlreadyExists')));
            }

            const isExistsEmail = await this._userRepository.isExistsEmail(id, email);
            if (isExistsEmail) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'emailAlreadyExists')));
            }

            user.userName = userName;
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.updatedBy = userId;
            user.updatedAt = new Date();

            const { matchedCount } = await this._userRepository.update(user);
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
     * update user profile
     * 
     * @param {object} updateUserProfile
     * @param {string} userId 
     * @returns {Promise<RequestResult<UserDTO | null>>}
     */
    updateProfile = async (updateUserProfile: UpdateUserProfileDTO, userId: string): Promise<RequestResult<UserDTO | null>> => {
        try {
            const { id, firstName, lastName, userName, email, image } = updateUserProfile;
            let user = await this._userRepository.getById(id);
            if (user === null) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'userDoesNotExist')));
            }

            const isExistsUsername = await this._userRepository.isExistsUsername(id, userName);
            if (isExistsUsername) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'userNameAlreadyExists')));
            }

            const isExistsEmail = await this._userRepository.isExistsEmail(id, email);
            if (isExistsEmail) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'emailAlreadyExists')));
            }

            user.image = image;
            user.userName = userName;
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.updatedBy = userId;
            user.updatedAt = new Date();

            const { matchedCount } = await this._userRepository.update(user);
            if (matchedCount > 0) {
                const userDTO: UserDTO = <UserDTO>{
                    id: user._id?.toString(),
                    fullName: `${user.firstName} ${user.lastName}`,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    isCreatedByExternalAccount: user.isCreatedByExternalAccount,
                    userName: user.userName,
                    isActive: user.isActive,
                    image: user.image
                };
                return new RequestResult(StatusCodes.OK, new MethodResult<UserDTO>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), userDTO));
            }
            else {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
            }
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * change user password
     * 
     * @param {object} changePassword
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    changePassword = async (changePassword: ChangeUserPasswordDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const { id, currentPassword, newPassword, confirmNewPassword } = changePassword;
            let user = await this._userRepository.getById(id);
            if (user === null) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'userDoesNotExist')));
            }
            // const isPasswordMatch = await bcrypt.compare(currentPassword, user.password as string);
            // if (!isPasswordMatch) {
            //     return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'passwordDoesNotMatch')));
            // }

            // if (newPassword !== confirmNewPassword) {
            //     return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'confirmPasswordDoesNotMatch')));
            // }
            // const hashedPassword = await bcrypt.hash(newPassword, 12);

            //const { modifiedCount } = await this._userRepository.changePassword(id, hashedPassword, userId);
            // if (modifiedCount > 0) {
            //     return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), true));
            // }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * reset user password
     * 
     * @param {object} resetPassword
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    resetPassword = async (resetPassword: ResetUserPasswordDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const { id, password, confirmPassword } = resetPassword;
            let user = await this._userRepository.getById(id);
            if (user === null) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'userDoesNotExist')));
            }

            if (password !== confirmPassword) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'confirmPasswordDoesNotMatch')));
            }
            // const hashedPassword = await bcrypt.hash(password, 12);

            // const { modifiedCount } = await this._userRepository.changePassword(id, hashedPassword, userId);
            // if (modifiedCount > 0) {
            //     return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), true));
            // }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * get user by Id
     * 
     * @param {string} id 
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    toggleActive = async (id: string, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const user = await this._userRepository.getById(id);
            if (!user) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'userDoesNotExist')));
            }
            const toggleIsActive = !user.isActive;
            const { modifiedCount } = await this._userRepository.toggleIsActive(id, toggleIsActive, userId);
            if (modifiedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), toggleIsActive));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * delete user
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    delete = async (id: string) => {
        try {
            const { deletedCount } = await this._userRepository.delete(id);
            if (deletedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), true));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
}

