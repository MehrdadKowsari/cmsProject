import Message from '../constants/messages';
import { CRUDResultModel } from '../models/shared/crud/crudResultModel';
import { MethodResult } from '../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../models/shared/enums/crudResultEnum';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { autoInjectable } from 'tsyringe';
import UserRepository from '../models/Repositories/user/userRepository';
import { ValidateRefreshToken } from 'src/dtos/auth/validateRefreshToken';
import { SignIn } from 'src/dtos/auth/SignIn';
import { google } from 'googleapis/build/src/index';
import { RequestResult } from 'src/models/shared/crud/requestResult';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { SignUp } from 'src/dtos/auth/SignUp';
import { User } from 'src/models/security/user';

const TOKEN_SECRET = process.env.TOKEN_SECRET || '';
const ACCESS_TOKEN_EXPIRES_IN = '1m';
const REFRESH_TOKEN_EXPIRES_IN = '60m';

@autoInjectable()
export default class AuthService{
    private _userRepository: UserRepository;
    constructor(userRepository: UserRepository){
        this._userRepository = userRepository;
    }

    signIn = async (signIn: SignIn) => {
        try {
            const { userName, password } = signIn;
            const user = await this._userRepository.getByUsername(userName);
            if (!user) {
              return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UsernameOrPasswordIsIncorect)));  
            }
            if (user.isCreatedByExternalAccount || !user.password) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.ThisLoginTypeIsNotPossible)));  
            }
            if (!user.isActive) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UserIsNotActive)));
            }
            const isPasswordCorect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorect) {
              return new RequestResult(400, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UsernameOrPasswordIsIncorect)));  
            }
            const accessToken = jwt.sign({userName: user.userName, email: user.email, id: user._id}, TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_EXPIRES_IN});
            const refreshToken = jwt.sign({userName: user.userName, email: user.email, id: user._id}, TOKEN_SECRET, {expiresIn: '20m'});
            return new RequestResult(StatusCodes.OK, new MethodResult<ValidateRefreshToken>(new CRUDResultModel(CRUDResultEnum.Success, Message.SuccessOperation), <ValidateRefreshToken>{token: accessToken, refreshToken: refreshToken}));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
        }
    }
    
    signInByGoogle = async (token: string) => {
        try {
            
            const OAuth2 = google.auth.OAuth2;
            const oauth2Client = new OAuth2();
    
            oauth2Client.setCredentials({access_token: token});
            var oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2'
            });
            const userInfo = await oauth2.userinfo.get();
            if (userInfo?.data) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));       
            }
            let {given_name : firstName , family_name: lastName , email: userName, email} = userInfo.data
            let user = await this._userRepository.getByUsernameOrEmail(userName!, email!);
            if (!user) {
                const newUser: User ={
                    _id: null,
                    firstName: firstName ?? '',
                    lastName: lastName ?? '',
                    email: email!,
                    userName: userName!,
                    isCreatedByExternalAccount: true
                }
                user = await this._userRepository.add(newUser);
                if (!user || !user._id) {
                    return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));        
                }
            }
            const accessToken = jwt.sign({userName: user.userName, email: user.email, id: user._id}, TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_EXPIRES_IN});
            const refreshToken = jwt.sign({userName: user.userName, email: user.email, id: user._id}, TOKEN_SECRET, {expiresIn: REFRESH_TOKEN_EXPIRES_IN});
            return new RequestResult(StatusCodes.OK, new MethodResult<ValidateRefreshToken>(new CRUDResultModel(CRUDResultEnum.Success, Message.SuccessOperation), <ValidateRefreshToken>{token: accessToken, refreshToken: refreshToken}));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
        }
    }
    
    signUp = async (signUp: SignUp) => {
        try {
            const { firstName, lastName, userName, email, password, confirmPassword } = signUp;
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
            const user = await this._userRepository.add(newUser);
            const accessToken = jwt.sign({userName: user.userName, email: user.email, id: user._id}, TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_EXPIRES_IN});
            const refreshToken = jwt.sign({userName: user.userName, email: user.email, id: user._id}, TOKEN_SECRET, {expiresIn: REFRESH_TOKEN_EXPIRES_IN});
            
            return new RequestResult(StatusCodes.OK, new MethodResult<ValidateRefreshToken>(new CRUDResultModel(CRUDResultEnum.Success, Message.SuccessOperation), <ValidateRefreshToken>{token: accessToken, refreshToken: refreshToken}));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
        }
    }
    
    getRefreshToken = async (validateRefreshToken: ValidateRefreshToken) => {
        try {
            const refreshToken: string = validateRefreshToken?.refreshToken;
            if (refreshToken) {
                let decodedData: JwtPayload = {};
                jwt.verify(refreshToken, TOKEN_SECRET, (error: any, decoded: any) =>{
                    if (!error) {
                        decodedData = <JwtPayload>decoded
                    }
                });
                if (Object.keys(decodedData).length > 0) {
                    const accessToken = jwt.sign({userName: decodedData.userName, email: decodedData.email, id: decodedData.id}, TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_EXPIRES_IN});
                    const refreshToken = jwt.sign({userName: decodedData.userName, email: decodedData.email, id: decodedData.id}, TOKEN_SECRET, {expiresIn: REFRESH_TOKEN_EXPIRES_IN});
                    return new RequestResult(StatusCodes.OK, new MethodResult<ValidateRefreshToken>(new CRUDResultModel(CRUDResultEnum.Success, Message.SuccessOperation), <ValidateRefreshToken>{token: accessToken, refreshToken: refreshToken}));
                }
                else{
                    return new RequestResult(StatusCodes.UNAUTHORIZED, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));    
                }
            } else {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
            }
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened)));
        }
}
}
