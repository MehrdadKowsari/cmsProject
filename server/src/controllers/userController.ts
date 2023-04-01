import { Request, Response } from 'express';
import Message from '../constants/messages';
import { UserDTO } from '../dtos/userDTO';
import User from '../models/security/user'
import { CRUDResultModel } from '../models/shared/crud/crudResultModel';
import { MethodResult } from '../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../models/shared/enums/crudResultEnum';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

export const add = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, userName, email, password, confirmPassword } = req.body;
        let user = await User.findOne({ userName });
        if (user) {
            return res.status(500).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UserNameAlreadyExists)));
        }

        user = await User.findOne({ email });
        if (user) {
            return res.status(500).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.EmailAlreadyExists)));
        }

        if (password !== confirmPassword) {
            return res.status(500).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.ConfirmPasswordDoesNotMatch)));
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        await User.create({firstName, lastName, userName, password: hashedPassword, email });
        return res.status(200).json(new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.Success, Message.SuccessOperation), true));
    } catch (error) {
        return res.status(500).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
    }
}

export const fetchAll = async (req: Request, res: Response) => {
    try {
        const users: UserDTO[] = (await User.find()).map((user: any) => <UserDTO>{
            id: user._id.toString(),         
            fullName: `${user.firstName} ${user.lastName}`,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isCreatedByExternalAccount: user.isCreatedByExternalAccount,
            userName: user.userName,
            isActive: user.isActive,
        });
        return res.status(200).json(new MethodResult<UserDTO[]>(new CRUDResultModel(CRUDResultEnum.Success, Message.SuccessOperation), users));
    } catch (error) {
        return res.status(500).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
    }
}

export const getById = async (req: Request, res: Response) => {
    try {
        const id = req.body;
        const user = await User.findOne({ _id : id });
        if (!user) {
          return res.status(404).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UserDoesNotExist)));  
        }
        const userDTO: UserDTO = <UserDTO>{
            id: user._id.toString(),         
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            userName: user.userName,
            isActive: user.isActive
        };
        return res.status(200).json(new MethodResult<UserDTO>(new CRUDResultModel(CRUDResultEnum.Success, Message.SuccessOperation), userDTO));
    } catch (error) {
        return res.status(500).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
    }
}

export const getByUsername = async (req: Request, res: Response) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({ userName : username });
        if (!user) {
          return res.status(404).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UserDoesNotExist)));  
        }
        const userDTO: UserDTO = <UserDTO>{
            id: user._id.toString(),         
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            userName: user.userName,
            isActive: user.isActive
        };
        return res.status(200).json(new MethodResult<UserDTO>(new CRUDResultModel(CRUDResultEnum.Success, Message.SuccessOperation), userDTO));
    } catch (error) {
        return res.status(500).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
    }
}

export const isExistUserByUsername = async (req: Request, res: Response) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({ userName : username });
        return res.status(200).json(new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.Success, Message.SuccessOperation), user ? true : false));
    } catch (error) {
        return res.status(500).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
    }
}

export const remove = async (req: Request, res: Response) => {
    try {
        const id = req.body;
        const { deletedCount } = await User.deleteOne({ _id : id });
        if (deletedCount > 0) {
            return res.status(200).json(new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, Message.SuccessOperation), true));
        }
        return res.status(500).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
    } catch (error) {
        return res.status(500).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const { id , firstName, lastName, userName, email } = req.body;
        let user = await User.findOne({ _id : id });
        if (user === null) {
          return res.status(404).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UserDoesNotExist)));  
        }
        
        let duplicateUserCount = await User.count({ userName, _id: {$ne: id}});
        if (duplicateUserCount > 0) {
            return res.status(500).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UserNameAlreadyExists)));
        }
        
        duplicateUserCount = await User.count({ email, _id: {$ne: id} });
        if (duplicateUserCount > 0) {
            return res.status(500).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.EmailAlreadyExists)));
        }

        user.userName = userName;
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        
        const  { matchedCount } = await User.updateOne({ _id : id },
        { $set: { 
            userName: userName,
            firstName : firstName,
            lastName : lastName,
            email : email
        }});
        if (matchedCount > 0) {
            return res.status(200).json(new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, Message.SuccessOperation), true));
        }
        else {
            return res.status(500).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.ErrorOperation)));
        }
    } catch (error) {
        return res.status(500).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
    }
}

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const { id , firstName, lastName, userName, email, image } = req.body;
        let user = await User.findOne({ _id : id });
        if (user === null) {
          return res.status(404).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UserDoesNotExist)));  
        }
        
        let duplicateUserCount = await User.count({ userName, _id: {$ne: id}});
        if (duplicateUserCount > 0) {
            return res.status(500).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UserNameAlreadyExists)));
        }
        
        duplicateUserCount = await User.count({ email, _id: {$ne: id} });
        if (duplicateUserCount > 0) {
            return res.status(500).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.EmailAlreadyExists)));
        }
        user.image = image;
        user.userName = userName;
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        
        const  { matchedCount } = await User.updateOne({ _id : id },
        { $set: { 
            image: image,
            userName: userName,
            firstName : firstName,
            lastName : lastName,
            email : email,
        }});
        if (matchedCount > 0) {
            const userDTO: UserDTO = <UserDTO>{
                id: user._id.toString(),         
                fullName: `${user.firstName} ${user.lastName}`,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                isCreatedByExternalAccount: user.isCreatedByExternalAccount,
                userName: user.userName,
                isActive: user.isActive,
                image: user.image
            };
            return res.status(200).json(new MethodResult<UserDTO>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, Message.SuccessOperation), userDTO));
        }
        else {
            return res.status(500).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.ErrorOperation)));
        }
    } catch (error) {
        return res.status(500).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
    }
}

export const changePassword = async (req: Request, res: Response) => {
    try {
        const { id , currentPassword, newPassword, confirmNewPassword } = req.body;
        let user = await User.findOne({ _id : id });
        if (user === null) {
          return res.status(404).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UserDoesNotExist)));  
        }
        const isPasswordMatch = await bcrypt.compare(currentPassword, user.password as string);
        if (!isPasswordMatch) {
            return res.status(500).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.PasswordDoesNotMatch)));
        }
        
        if (newPassword !== confirmNewPassword) {
            return res.status(500).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.ConfirmPasswordDoesNotMatch)));
        }
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        
        const  { modifiedCount } = await User.updateOne({ _id : id },
        { $set: { 
            password: hashedPassword
        }});
        if (modifiedCount > 0) {
            return res.status(StatusCodes.OK).json(new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, Message.SuccessOperation), true));
        }
    } catch (error) {
        return res.status(500).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { id , newPassword, confirmNewPassword } = req.body;
        let user = await User.findOne({ _id : id });
        if (user === null) {
          return res.status(404).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UserDoesNotExist)));  
        }
        
        if (newPassword !== confirmNewPassword) {
            return res.status(500).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.ConfirmPasswordDoesNotMatch)));
        }
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        
        const  { modifiedCount } = await User.updateOne({ _id : id },
        { $set: { 
            password: hashedPassword
        }});
        if (modifiedCount > 0) {
            return res.status(StatusCodes.OK).json(new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, Message.SuccessOperation), true));
        }
    } catch (error) {
        return res.status(500).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
    }
}

export const toggleActive = async (req: Request, res: Response) => {
    try {
        const id = req.body;
        const user = await User.findOne({ _id : id });
        if (!user) {
          return res.status(404).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UserDoesNotExist)));  
        }
        const toggleIsActive = !user.isActive;
        const  { modifiedCount } = await User.updateOne({_id: id}, { $set: { isActive: toggleIsActive}});
        if (modifiedCount > 0) {
            return res.status(200).json(new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, Message.SuccessOperation), toggleIsActive));
        }
        return res.status(500).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
    } catch (error) {
        return res.status(500).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
    }
}

export const getCurrent = async (req: Request, res: Response) => {
    try {
        const id: string | undefined = req.user?.id;
        const user = await User.findOne({ _id : id });
        if (!user) {
          return res.status(404).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UserDoesNotExist)));  
        }
        const userDTO: UserDTO = <UserDTO>{
            id: user._id.toString(),   
            image: user.image,      
            firstName: user.firstName,
            lastName: user.lastName,
            fullName: `${user.firstName} ${user.lastName}`,
            email: user.email,
            userName: user.userName,
            isActive: user.isActive,
            isCreatedByExternalAccount: user.isCreatedByExternalAccount
        };
        return res.status(200).json(new MethodResult<UserDTO>(new CRUDResultModel(CRUDResultEnum.Success, Message.SuccessOperation), userDTO));
    } catch (error) {
        return res.status(500).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
    }
}

