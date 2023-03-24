import * as dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

import User from '../models/security/user'
import { Request, Response } from 'express';
import Message from '../constants/messages';
import { CRUDResultEnum } from '../models/shared/enums/crudResultEnum';
import { CRUDResultModel } from '../models/shared/crud/crudResultModel';
import { MethodResult } from '../models/shared/crud/methodResult';
import { ValidateRefreshToken } from '../dtos/auth/validateRefreshToken';
import { google } from 'googleapis/build/src/index';

const TOKEN_SECRET = process.env.TOKEN_SECRET || '';

export const signIn = async (req: Request, res: Response) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });
        if (!user) {
          return res.status(404).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UsernameOrPasswordIsIncorect)));  
        }
        if (user.isCreatedByExternalAccount || !user.password) {
            return res.status(404).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.ThisLoginTypeIsNotPossible)));  
        }
        if (!user.isActive) {
            return res.status(404).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UserIsNotActive)));
        }
        const isPasswordCorect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorect) {
          return res.status(400).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UsernameOrPasswordIsIncorect)));  
        }
        const accessToken = jwt.sign({userName: user.userName, email: user.email, id: user._id}, TOKEN_SECRET, {expiresIn: '5s'});
        const refreshToken = jwt.sign({userName: user.userName, email: user.email, id: user._id}, TOKEN_SECRET, {expiresIn: '10m'});
        return res.status(200).json(new MethodResult<ValidateRefreshToken>(new CRUDResultModel(CRUDResultEnum.Success, Message.SuccessOperation), <ValidateRefreshToken>{token: accessToken, refreshToken: refreshToken}));
    } catch (error) {
        return res.status(500).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
    }
}

export const signInByGoogle = async (req: Request, res: Response) => {
    try {
        
        const token = req.body;
        const OAuth2 = google.auth.OAuth2;
        const oauth2Client = new OAuth2();

        oauth2Client.setCredentials({access_token: token});
        var oauth2 = google.oauth2({
        auth: oauth2Client,
        version: 'v2'
        });
        const userInfo = await oauth2.userinfo.get();
        let {given_name : firstName , family_name: lastName , email: userName, email} = userInfo?.data
        let user = await User.findOne( {$or : [{ userName : userName }, {email : email}] });
        if (!user) {
            user = await User.create({firstName, lastName, userName, email, isCreatedByExternalAccount: true });
            if (!user || !user._id) {
                return res.status(500).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));        
            }
        }
        const accessToken = jwt.sign({userName: user.userName, email: user.email, id: user._id}, TOKEN_SECRET, {expiresIn: '5s'});
        const refreshToken = jwt.sign({userName: user.userName, email: user.email, id: user._id}, TOKEN_SECRET, {expiresIn: '10m'});
        return res.status(200).json(new MethodResult<ValidateRefreshToken>(new CRUDResultModel(CRUDResultEnum.Success, Message.SuccessOperation), <ValidateRefreshToken>{token: accessToken, refreshToken: refreshToken}));
    } catch (error) {
        return res.status(500).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
    }
}

export const signUp = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, userName, email, password, confirmPassword } = req.body;
        let user = await User.findOne({ userName });
        if (user) {
            return res.status(200).json({ message: 'UserName already exists.', result:'error'});
        }

        user = await User.findOne({ email });
        if (user) {
            return res.status(200).json({ message: 'Email already exists.', result:'error'});
        }

        if (password !== confirmPassword) {
            return res.status(200).json({ message: 'Password don\'t match.', result:'error'});
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({firstName, lastName, userName, password: hashedPassword, email });
        const accessToken = jwt.sign({userName: newUser.userName, email: newUser.email, id: newUser._id}, TOKEN_SECRET, {expiresIn: '1m'});
        const refreshToken = jwt.sign({userName: newUser.userName, email: newUser.email, id: newUser._id}, TOKEN_SECRET, {expiresIn: '10m'});
        return res.status(200).json(new MethodResult<ValidateRefreshToken>(new CRUDResultModel(CRUDResultEnum.Success, Message.SuccessOperation), <ValidateRefreshToken>{token: accessToken, refreshToken: refreshToken}));
    } catch (error) {
        return res.status(500).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
    }
}

export const getRefreshToken = async (req: Request, res: Response) => {
    try {
        const validateRefreshToken: ValidateRefreshToken = req.body;
        const refreshToken: string = validateRefreshToken?.refreshToken;
        if (refreshToken) {
            let decodedData: JwtPayload;
            const isCustomAuth = refreshToken?.length < 500;
            let userId: string | undefined; 
            if (isCustomAuth) {
                jwt.verify(refreshToken, TOKEN_SECRET, (error: any, decoded: any) =>{
                    if (error) {
                        return res.status(401).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
                    }
                    else{
                        decodedData = <JwtPayload>decoded
                        userId = decodedData?.id;

                        const accessToken = jwt.sign({userName: decodedData.userName, email: decodedData.email, id: decodedData.id}, TOKEN_SECRET, {expiresIn: '5s'});
                        const refreshToken = jwt.sign({userName: decodedData.userName, email: decodedData.email, id: decodedData.id}, TOKEN_SECRET, {expiresIn: '10m'});
                        return res.status(200).json(new MethodResult<ValidateRefreshToken>(new CRUDResultModel(CRUDResultEnum.Success, Message.SuccessOperation), <ValidateRefreshToken>{token: accessToken, refreshToken: refreshToken}));
                    }
                });
            }
            else { 
                decodedData = <JwtPayload>jwt.decode(refreshToken);
                userId = decodedData?.sub;
            }
        } else {
            return res.status(500).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
        }
    } catch (error) {
        return res.status(500).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
    }
}