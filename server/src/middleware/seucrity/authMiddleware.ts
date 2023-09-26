import * as dotenv from 'dotenv';
dotenv.config();

import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { CRUDResultModel } from '../../models/shared/crud/crudResultModel';
import { MethodResult } from '../../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../../models/shared/enums/crudResultEnum';
import { UserType } from '../../types/security/user';
// import bcrypt from 'bcryptjs';
import UserModel from '../../models/security/user';
import { StatusCodes } from 'http-status-codes';
import localizeHelper from '../../helpers/localizeHelper';

const TOKEN_SECRET = process.env.TOKEN_SECRET || '';

const authMiddleware = async(req:Request, res: Response, next: NextFunction) => {
    try { 
        const token = (<String>req.headers.authorization)?.split(' ')[1];
        if (token) {
            let decodedData: JwtPayload;
            const isCustomAuth = token?.length < 500;
            if (isCustomAuth) {
                decodedData = <JwtPayload>jwt.verify(token, TOKEN_SECRET);
                req.user = <UserType>{ 
                    id: decodedData?.id,
                    username: decodedData?.username,
                    email: decodedData?.email
                }
            }
            else { 
                decodedData = <JwtPayload>jwt.decode(token);
                const user = await UserModel.findOne( {$or : [{ userName : decodedData?.email }, {email : decodedData?.email}] });
                if (user) {
                    req.user = <UserType>{ 
                        id: user._id?.toString(),
                        username: user.userName,
                        email: user.email
                    }
                }
                else {
                    const firstName = decodedData.given_name;
                    const lastName = decodedData.family_name; 
                    const userName = decodedData?.email;
                    const email = decodedData?.email;
                    // const hashedPassword = await bcrypt.hash(decodedData?.jit, 12);
                    // const newUser = await UserModel.create({firstName, lastName, userName, password: hashedPassword, email });
                    // req.user = <UserType>{ 
                    //     id: newUser._id?.toString(),
                    //     email: newUser.email,
                    //     username: newUser.userName,
                    // };
                }
            }
            next();
        } else {
            return res.status(StatusCodes.UNAUTHORIZED).json(localizeHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'tokenExpired')), req));
        }
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json(localizeHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'tokenExpired')), req));
    }
}

export default authMiddleware;

