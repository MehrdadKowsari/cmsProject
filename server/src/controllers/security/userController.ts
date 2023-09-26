import { Request, Response } from 'express';
import { CRUDResultModel } from '../../models/shared/crud/crudResultModel';
import { MethodResult } from '../../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../../models/shared/enums/crudResultEnum';
import { StatusCodes } from 'http-status-codes';
import UserService from '../../services/security/userService';
import { autoInjectable } from 'tsyringe';
import { GridParameter } from '../../dtos/shared/grid/gridPrameter';
import { UpdateUserDTO } from '../../dtos/security/user/updateUserDTO';
import { UpdateUserProfileDTO } from '../../dtos/security/user/updateUserProfileDTO';
import { ChangeUserPasswordDTO } from '../../dtos/security/user/changeUserPasswordDTO';
import { ResetUserPasswordDTO } from '../../dtos/security/user/resetUserPasswordDTO';
import LocalizerHelper from '../../helpers/localizeHelper';

@autoInjectable()
export class UserController{
    private _userService: UserService;
    constructor(userService: UserService){
        this._userService = userService;
    }
    /**
     * add a user
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {object}
     */
    add = async (req: Request, res: Response) => {
        try {
            const requestResult = await this._userService.addUser(req.body, req.user?.id!);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

    /**
     * get all users
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
    getAll = async (req: Request, res: Response) => {
        try {
            const requestResult = await this._userService.getAll();
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

    /**
     * get all users by params
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
    getAllByParams = async (req: Request, res: Response) => {
        try {
            const gridParameter: GridParameter = req.body;
            const requestResult = await this._userService.getAllByParams(gridParameter);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

    /**
     * get user by id
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
    getById = async (req: Request, res: Response) => {
        try {
            const id = req.body;
            const requestResult = await this._userService.getById(id);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

    /**
     * get user by username
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
    getByUsername = async (req: Request, res: Response) => {
        try {
            const { username } = req.body;
            const requestResult = await this._userService.getByUsername(username);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

    /**
     * is user exist by username
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
    isExistUserByUsername = async (req: Request, res: Response) => {
        try {
            const { username } = req.body;
            const requestResult = await this._userService.isExistUserByUsername(username);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

    /**
     * get current user
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
    getCurrent = async (req: Request, res: Response) => {
        try {
            const id: string | undefined = req.user?.id;
            const requestResult = await this._userService.getCurrent(id!);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }
    
    /**
     * update user
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
    update = async (req: Request, res: Response) => {
        try {
            const updateUserDTO: UpdateUserDTO = req.body;
            const requestResult = await this._userService.update(updateUserDTO, req.user?.id!);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
            
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

    /**
     * update user profile
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
    updateProfile = async (req: Request, res: Response) => {
        try {
            const updateUserProfileDTO: UpdateUserProfileDTO = req.body;
            const requestResult = await this._userService.updateProfile(updateUserProfileDTO, req.user?.id!);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

    /**
     * change user password
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
    changePassword = async (req: Request, res: Response) => {
        try {
            const changeUserPasswordDTO: ChangeUserPasswordDTO = req.body;
            const requestResult = await this._userService.changePassword(changeUserPasswordDTO, req.user?.id!);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

    /**
     * reset user password
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
    resetPassword = async (req: Request, res: Response) => {
        try {
            const resetUserPasswordDTO: ResetUserPasswordDTO = req.body;
            const requestResult = await this._userService.resetPassword(resetUserPasswordDTO, req.user?.id!);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

    /**
     * toggle user active status by id
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
    toggleActive = async (req: Request, res: Response) => {
        try {
            const id = req.body;
            const requestResult = await this._userService.toggleActive(id, req.user?.id!);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

    /**
     * delete user by id
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
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
