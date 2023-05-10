import { Request, Response } from 'express';
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
import LocalizerHelper from 'src/helpers/localizeHelper';

@autoInjectable()
export class UserController{
    private _userService: UserService;
    constructor(userService: UserService){
        this._userService = userService;
    }

    add = async (req: Request, res: Response) => {
        try {
            const requestResult = await this._userService.addUser(req.body);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            
        }
    }

    fetchAll = async (req: Request, res: Response) => {
        try {
            const gridParameter: GridParameter = req.body;
            const requestResult = await this._userService.getAllByParams(gridParameter);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const id = req.body;
            const requestResult = await this._userService.getById(id);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

    getByUsername = async (req: Request, res: Response) => {
        try {
            const { username } = req.body;
            const requestResult = await this._userService.getByUsername(username);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

    isExistUserByUsername = async (req: Request, res: Response) => {
        try {
            const { username } = req.body;
            const requestResult = await this._userService.isExistUserByUsername(username);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

    getCurrent = async (req: Request, res: Response) => {
        try {
            const id: string | undefined = req.user?.id;
            const requestResult = await this._userService.getCurrent(id!);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const updateUserDTO: UpdateUserDTO = req.body;
            const requestResult = await this._userService.update(updateUserDTO);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
            
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

    updateProfile = async (req: Request, res: Response) => {
        try {
            const updateUserProfileDTO: UpdateUserProfileDTO = req.body;
            const requestResult = await this._userService.updateProfile(updateUserProfileDTO);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

    changePassword = async (req: Request, res: Response) => {
        try {
            const changeUserPasswordDTO: ChangeUserPasswordDTO = req.body;
            const requestResult = await this._userService.changePassword(changeUserPasswordDTO);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

    resetPassword = async (req: Request, res: Response) => {
        try {
            const resetUserPasswordDTO: ResetUserPasswordDTO = req.body;
            const requestResult = await this._userService.resetPassword(resetUserPasswordDTO);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

    toggleActive = async (req: Request, res: Response) => {
        try {
            const id = req.body;
            const requestResult = await this._userService.toggleActive(id);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.body;
            const requestResult = await this._userService.delete(id);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

}
