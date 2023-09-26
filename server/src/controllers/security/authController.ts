import * as dotenv from 'dotenv';
dotenv.config();

import { Request, Response } from 'express';
import { CRUDResultEnum } from '../../models/shared/enums/crudResultEnum';
import { CRUDResultModel } from '../../models/shared/crud/crudResultModel';
import { MethodResult } from '../../models/shared/crud/methodResult';
import { ValidateRefreshToken } from '../../dtos/security/auth/validateRefreshToken';
import { StatusCodes } from 'http-status-codes';
import AuthService from '../../services/security/authService';
import { SignIn } from '../../dtos/security/auth/SignIn';
import { autoInjectable } from 'tsyringe';
import { SignUp } from '../../dtos/security/auth/SignUp';
import LocalizerHelper from '../../helpers/localizeHelper';
@autoInjectable()
export default class AuthController{
    private _authService: AuthService;
    constructor(private authService: AuthService){
        this._authService = authService;
    }
    
    /**
     * signIn
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>}
     */
    signIn = async (req: Request, res: Response) => {
        try {
            const signIn: SignIn = req.body;
            const requestResult = await this._authService.signIn(signIn);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }
    
    /**
     * signIn by Google
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>}
     */
    signInByGoogle = async (req: Request, res: Response) => {
        try {           
            const token:string = req.body;
            const requestResult = await this._authService.signInByGoogle(token);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }
    
    /**
     * signUp
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>}
     */
    signUp = async (req: Request, res: Response) => {
        try {
            const signUp: SignUp = req.body;
            const requestResult = await this._authService.signUp(signUp);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }
    
    /**
     * get refresh token
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>}
     */
    getRefreshToken = async (req: Request, res: Response) => {
        try {
            const validateRefreshToken: ValidateRefreshToken = req.body;
            const requestResult = await this._authService.getRefreshToken(validateRefreshToken);
            return res.status(requestResult!.statusCode).json(requestResult!.methodResult);
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }
}
