import { Request, Response } from 'express';
import Message from '../constants/messages';
import { CRUDResultModel } from '../models/shared/crud/crudResultModel';
import { MethodResult } from '../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../models/shared/enums/crudResultEnum';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/userService';
import { autoInjectable } from 'tsyringe';
import { GridParameter } from 'src/dtos/shared/grid/gridPrameter';
import { UpdateUserDTO } from 'src/dtos/user/updateUserDTO';
import { UpdateUserProfileDTO } from 'src/dtos/user/updateUserProfileDTO';
import { ChangeUserPasswordDTO } from 'src/dtos/user/changeUserPasswordDTO';
import { ResetUserPasswordDTO } from 'src/dtos/user/resetUserPasswordDTO';

@autoInjectable()
export class UserController{
    private _userService: UserService;
    constructor(userService: UserService){
        this._userService = userService;
    }

    add = async (req: Request, res: Response) => {
        try {
            const requestResult = await this._userService.addUser(req.body);
            return res.status(requestResult.statusCode).json(requestResult.methodResult);
        } catch (error) {
            
        }
    }

    fetchAll = async (req: Request, res: Response) => {
        try {
            const gridParameter: GridParameter = req.body;
            const requestResult = await this._userService.getAllByParams(gridParameter);
            return res.status(requestResult.statusCode).json(requestResult.methodResult);
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const id = req.body;
            const requestResult = await this._userService.getById(id);
            return res.status(requestResult.statusCode).json(requestResult.methodResult);
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
        }
    }

    getByUsername = async (req: Request, res: Response) => {
        try {
            const { username } = req.body;
            const requestResult = await this._userService.getByUsername(username);
            return res.status(requestResult.statusCode).json(requestResult.methodResult);
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
        }
    }

    isExistUserByUsername = async (req: Request, res: Response) => {
        try {
            const { username } = req.body;
            const requestResult = await this._userService.isExistUserByUsername(username);
            return res.status(requestResult.statusCode).json(requestResult.methodResult);
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
        }
    }

    getCurrent = async (req: Request, res: Response) => {
        try {
            const id: string | undefined = req.user?.id;
            const requestResult = await this._userService.getCurrent(id!);
            return res.status(requestResult.statusCode).json(requestResult.methodResult);
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const updateUserDTO: UpdateUserDTO = req.body;
            const requestResult = await this._userService.update(updateUserDTO);
            return res.status(requestResult.statusCode).json(requestResult.methodResult);
            
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
        }
    }

    updateProfile = async (req: Request, res: Response) => {
        try {
            const updateUserProfileDTO: UpdateUserProfileDTO = req.body;
            const requestResult = await this._userService.updateProfile(updateUserProfileDTO);
            return res.status(requestResult.statusCode).json(requestResult.methodResult);
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
        }
    }

    changePassword = async (req: Request, res: Response) => {
        try {
            const changeUserPasswordDTO: ChangeUserPasswordDTO = req.body;
            const requestResult = await this._userService.changePassword(changeUserPasswordDTO);
            return res.status(requestResult.statusCode).json(requestResult.methodResult);
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
        }
    }

    resetPassword = async (req: Request, res: Response) => {
        try {
            const resetUserPasswordDTO: ResetUserPasswordDTO = req.body;
            const requestResult = await this._userService.resetPassword(resetUserPasswordDTO);
            return res.status(requestResult.statusCode).json(requestResult.methodResult);
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
        }
    }

    toggleActive = async (req: Request, res: Response) => {
        try {
            const id = req.body;
            const requestResult = await this._userService.toggleActive(id);
            return res.status(requestResult.statusCode).json(requestResult.methodResult);
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.body;
            const requestResult = await this._userService.delete(id);
            return res.status(requestResult.statusCode).json(requestResult.methodResult);
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
        }
    }

}
