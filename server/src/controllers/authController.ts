import * as dotenv from 'dotenv';
dotenv.config();

import { Request, Response } from 'express';
import Message from '../constants/messages';
import { CRUDResultEnum } from '../models/shared/enums/crudResultEnum';
import { CRUDResultModel } from '../models/shared/crud/crudResultModel';
import { MethodResult } from '../models/shared/crud/methodResult';
import { ValidateRefreshToken } from '../dtos/auth/validateRefreshToken';
import { StatusCodes } from 'http-status-codes';
import AuthService from 'src/services/authService';
import { SignIn } from 'src/dtos/auth/SignIn';
import { autoInjectable } from 'tsyringe';
import { SignUp } from 'src/dtos/auth/SignUp';

@autoInjectable()
export default class AuthController{
    private _authService: AuthService;
    constructor(private authService: AuthService){
        this._authService = authService;
    }
    signIn = async (req: Request, res: Response) => {
        try {
            const signIn: SignIn = req.body;
            const requestResult = await this._authService.signIn(signIn);
            return res.status(requestResult.statusCode).json(requestResult.methodResult);
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
        }
    }
    
    signInByGoogle = async (req: Request, res: Response) => {
        try {           
            const token:string = req.body;
            const requestResult = await this._authService.signInByGoogle(token);
            return res.status(requestResult.statusCode).json(requestResult.methodResult);
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
        }
    }
    
    signUp = async (req: Request, res: Response) => {
        try {
            const signUp: SignUp = req.body;
            const requestResult = await this._authService.signUp(signUp);
            return res.status(requestResult.statusCode).json(requestResult.methodResult);
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
        }
    }
    
    getRefreshToken = async (req: Request, res: Response) => {
        try {
            const validateRefreshToken: ValidateRefreshToken = req.body;
            const requestResult = await this._authService.getRefreshToken(validateRefreshToken);
            return res.status(requestResult!.statusCode).json(requestResult!.methodResult);
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
        }
    }
}
