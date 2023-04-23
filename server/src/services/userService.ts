import Message from '../constants/messages';
import { UserDTO } from '../dtos/user/userDTO';
import { CRUDResultModel } from '../models/shared/crud/crudResultModel';
import { MethodResult } from '../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../models/shared/enums/crudResultEnum';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { GridData } from '../models/shared/grid/gridData';
import { AddUserDTO } from '../dtos/user/addUserDTO';
import { RequestResult } from '../models/shared/crud/requestResult';
import { autoInjectable } from 'tsyringe';
import UserRepository from '../models/Repositories/user/userRepository';
import { GridParameter } from 'src/dtos/shared/grid/gridPrameter';
import { ChangeUserPasswordDTO } from 'src/dtos/user/changeUserPasswordDTO';
import { ResetUserPasswordDTO } from 'src/dtos/user/resetUserPasswordDTO';
import { UpdateUserDTO } from 'src/dtos/user/updateUserDTO';
import { UpdateUserProfileDTO } from 'src/dtos/user/updateUserProfileDTO';
import { User } from 'src/models/security/user';

@autoInjectable()
export default class UserService{
    private _userRepository: UserRepository;
    constructor(userRepository: UserRepository){
        this._userRepository = userRepository;
    }

    addUser = async (addUserDTO: AddUserDTO) => {
        try {
            const { firstName, lastName, userName, email, password, confirmPassword } = addUserDTO;
            const isExistsUsername = await this._userRepository.isExistsUsername(null, userName);
            if (isExistsUsername) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UserNameAlreadyExists)));
            }

            const isExistsEmail = await this._userRepository.isExistsEmail(null, email);
            if (isExistsEmail) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.EmailAlreadyExists)));
            }

            if (password !== confirmPassword) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.ConfirmPasswordDoesNotMatch)));
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser: User ={
                _id: null,
                firstName,
                lastName,
                email,
                userName,
                password: hashedPassword,
            } 
            await this._userRepository.add(newUser);
            return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.Success, Message.SuccessOperation), true));
            } catch (error) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
            }
    }

    getAllByParams = async (gridParameter: GridParameter) => {
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
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<GridData<UserDTO[]>>(new CRUDResultModel(CRUDResultEnum.Success, Message.SuccessOperation), {
                rows: users,
                totalCount: totalCount
            }));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
        }
    }

    getById = async (id: string) => {
        try {
            const user = await this._userRepository.getById(id);
            if (!user) {
            return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UserDoesNotExist)));
            }
            const userDTO: UserDTO = <UserDTO>{
                id: user._id?.toString(),         
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userName: user.userName,
                isActive: user.isActive
            };
            return new RequestResult(StatusCodes.OK, new MethodResult<UserDTO>(new CRUDResultModel(CRUDResultEnum.Success, Message.SuccessOperation), userDTO));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
        }
    }

    getByUsername = async (username: string) => {
        try {
            const user = await this._userRepository.getByUsername(username);
            if (!user) {
            return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UserDoesNotExist)));  
            }
            const userDTO: UserDTO = <UserDTO>{
                id: user._id?.toString(),         
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userName: user.userName,
                isActive: user.isActive
            };
            return new RequestResult(StatusCodes.OK, new MethodResult<UserDTO>(new CRUDResultModel(CRUDResultEnum.Success, Message.SuccessOperation), userDTO));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
        }
    }

    isExistUserByUsername = async (username: string) => {
        try {
            const user = await this._userRepository.getByUsername(username);
            return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.Success, Message.SuccessOperation), user ? true : false));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
        }
    }

    getCurrent = async (id: string) => {
        try {
            const user = await this._userRepository.getById(id);
            if (!user) {
            return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UserDoesNotExist)));  
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
            return new RequestResult(StatusCodes.OK, new MethodResult<UserDTO>(new CRUDResultModel(CRUDResultEnum.Success, Message.SuccessOperation), userDTO));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
        }
    }

    update = async (updateUserDTO: UpdateUserDTO) => {
        try {
            const { id , firstName, lastName, userName, email } = updateUserDTO;
            let user = await this._userRepository.getById(id);
            if (user === null) {
            return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UserDoesNotExist)));  
            }
            
            const isExistsUsername = await this._userRepository.isExistsUsername(id, userName);
            if (isExistsUsername) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UserNameAlreadyExists)));
            }
            
            const isExistsEmail = await this._userRepository.isExistsEmail(id, email);
            if (isExistsEmail) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.EmailAlreadyExists)));
            }
            
            user.userName = userName;
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.lastUpdateDate = new Date();
            
            const  { matchedCount } = await this._userRepository.update(user);
            if (matchedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, Message.SuccessOperation), true));
            }
            else {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.ErrorOperation)));
            }
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
        }
    }

    updateProfile = async (updateUserProfile: UpdateUserProfileDTO) => {
        try {
            const { id , firstName, lastName, userName, email, image } = updateUserProfile;
            let user = await this._userRepository.getById(id);
            if (user === null) {
            return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UserDoesNotExist)));  
            }
            
            const isExistsUsername = await this._userRepository.isExistsUsername(id, userName);
            if (isExistsUsername) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UserNameAlreadyExists)));
            }
            
            const isExistsEmail = await this._userRepository.isExistsEmail(id, email);
            if (isExistsEmail) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.EmailAlreadyExists)));
            }
            
            user.image = image;
            user.userName = userName;
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.lastUpdateDate = new Date();
            
            const  { matchedCount } = await this._userRepository.update(user);
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
                return new RequestResult(StatusCodes.OK, new MethodResult<UserDTO>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, Message.SuccessOperation), userDTO));
            }
            else {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.ErrorOperation)));
            }
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
        }
    }

    changePassword = async (changePassword: ChangeUserPasswordDTO) => {
        try {
            const { id , currentPassword, newPassword, confirmNewPassword } = changePassword;
            let user = await this._userRepository.getById(id);
            if (user === null) {
            return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UserDoesNotExist)));  
            }
            const isPasswordMatch = await bcrypt.compare(currentPassword, user.password as string);
            if (!isPasswordMatch) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.PasswordDoesNotMatch)));
            }
            
            if (newPassword !== confirmNewPassword) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.ConfirmPasswordDoesNotMatch)));
            }
            const hashedPassword = await bcrypt.hash(newPassword, 12);
            
            const  { modifiedCount } = await this._userRepository.changePassword(id, hashedPassword);
            if (modifiedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, Message.SuccessOperation), true));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
        }
    }

    resetPassword = async (resetPassword: ResetUserPasswordDTO) => {
        try {
            const { id , password, confirmPassword } = resetPassword;
            let user = await this._userRepository.getById(id);
            if (user === null) {
            return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UserDoesNotExist)));  
            }
            
            if (password !== confirmPassword) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.ConfirmPasswordDoesNotMatch)));
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            
            const  { modifiedCount } = await this._userRepository.changePassword(id, hashedPassword);
            if (modifiedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, Message.SuccessOperation), true));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
        }
    }

    toggleActive = async (id: string) => {
        try {
            const user = await this._userRepository.getById(id);
            if (!user) {
            return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UserDoesNotExist)));  
            }
            const toggleIsActive = !user.isActive;
            const  { modifiedCount } = await this._userRepository.toggleIsActive(id, toggleIsActive);
            if (modifiedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, Message.SuccessOperation), toggleIsActive));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
        }
    }

    delete = async (id: string) => {
        try {
            const { deletedCount } = await this._userRepository.delete(id);
            if (deletedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, Message.SuccessOperation), true));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
            } catch (error) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
            }
    }
}

