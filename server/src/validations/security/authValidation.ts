import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import AppConstant from "src/constants/appConstants";
import Message from "src/constants/messages";
import { CRUDResultModel } from "src/models/shared/crud/crudResultModel";
import { MethodError } from "src/models/shared/crud/methodError";
import { MethodResult } from "src/models/shared/crud/methodResult";
import { CRUDResultEnum } from "src/models/shared/enums/crudResultEnum";

const joi = require("joi");
const options = {
     abortEarly: false,
     allowUnknown: true,
     stripUnknown: true 
 };

const signUpValidation = (req: Request, res: Response, next: NextFunction) => {
     const signUpValidationSchema = joi.object({
          firstName: joi.string().alphanum().min(AppConstant.FirstnameMinLenght).max(AppConstant.FirstnameMaxLenght).trim(true).required().label('First Name')
          .messages({ 
               "string.base": req.t('firstNameIsRequired', `{{#label}} is required`),
               "string.empty": req.t('firstNameIsRequired', `{{#label}} is required`),
               "string.required": req.t('firstNameIsRequired', `{{#label}} is required`),
               "string.alphanum": req.t('firstNameIsNotEnteredCorrectly', `{{#label}} is not entered correctly`),
               "string.min": req.t('minLenghtForFirstNameIsN', `{{#label}} min lenght is {{#limit}}`, {n: `{{#limit}}`}),
               "string.max": req.t('maxLenghtForFirstNameIsN', `{{#label}} max lenght is {{#limit}}`, {n: `{{#limit}}`})}),
          lastName: joi.string().alphanum().min(AppConstant.LastnameMinLenght).max(AppConstant.LastnameMaxLenght).trim(true).required().label('Last Name')
          .messages({ 
               "string.base": req.t('lastNameIsRequired', `{{#label}} is required`),
               "string.empty": req.t('lastNameIsRequired', `{{#label}} is required`),
               "string.required": req.t('lastNameIsRequired', `{{#label}} is required`),
               "string.alphanum": req.t('lastNameIsNotEnteredCorrectly', `{{#label}} is not entered correctly`),
               "string.min": req.t('minLenghtForLastNameIsN', `{{#label}} min lenght is {{#limit}}`, {n: `{{#limit}}`}),
               "string.max": req.t('maxLenghtForLastNameIsN', `{{#label}} max lenght is {{#limit}}`, {n: `{{#limit}}`})}),
          userName: joi.string().min(AppConstant.UsernameMinLenght).max(AppConstant.UsernameMaxLenght).trim(true).required().label('Username')
          .messages({ 
               "string.base": req.t('usernameIsRequired', `{{#label}} is required`, {field: 'Username'}),
               "string.empty": req.t('usernameIsRequired', `{{#label}} is required`, {field: 'Username'}),
               "string.required": req.t('usernameIsRequired', `{{#label}} is required`, {field: 'Username'}),
               "string.min": req.t('minLenghtForUsernameIsN', `{{#label}} min lenght is {{#limit}}`, {n: `{{#limit}}`}),
               "string.max": req.t('maxLenghtForUsernameIsN', `{{#label}} max lenght is {{#limit}}`, {n: `{{#limit}}`})}),
          email: joi.string().email().trim(true).required()
          .messages({ 
               "string.base": req.t('emailIsRequired', `{{#label}} is required`),
               "string.empty": req.t('emailIsRequired', `{{#label}} is required`),
               "string.required": req.t('emailIsRequired', `{{#label}} is required`),
               "string.email": req.t('emailIsNotEnteredCorrectly', `{{#label}} is required`)}),
          password: joi.string().min(AppConstant.PasswordMinLenght).trim(true).required()
          .messages({ 
               "string.base": req.t('passwordIsRequired', `{{#label}} is required`),
               "string.empty": req.t('passwordIsRequired', `{{#label}} is required`),
               "string.required": req.t('passwordIsRequired', `{{#label}} is required`),
               "string.min": req.t('minLenghtForPasswordIsN', `{{#label}} min lenght is {{#limit}}`, {n: `{{#limit}}`})}),
          confirmPassword: joi.string().min(AppConstant.PasswordMinLenght).trim(true).required().label('Confirm Password')
          .messages({ 
               "string.base": req.t('confirmPasswordIsRequired', `{{#label}} is required`),
               "string.empty": req.t('confirmPasswordIsRequired', `{{#label}} is required`),
               "string.required": req.t('confirmPasswordIsRequired', `{{#label}} is required`),
               "string.min": req.t('minLenghtForConfirmPasswordnIsN', `{{#label}} min lenght is {{#limit}}`, {n: AppConstant.PasswordMinLenght})})
     });
     
     const { error } = signUpValidationSchema.validate(req.body, options);
      
      if (error) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened, error.details.map((x:any) => <MethodError>{
               Title: x.message,
               Description: x.message
          }))));
      } else {
         next();
      }
}

const signInValidation = (req: any, res: Response, next: NextFunction) => {
     const signInValidationSchema = joi.object({
          userName: joi.string().trim(true).required().label('Username')
          .messages({ 
               "string.base": req.t('usernameIsRequired', `{{#label}} is required`, {field: 'Username'}),
               "string.empty": req.t('usernameIsRequired', `{{#label}} is required`, {field: 'Username'}),
               "string.required": req.t('usernameIsRequired', `{{#label}} is required`, {field: 'Username'})}),
          password: joi.string().trim(true).required()
          .messages({ 
               "string.base": req.t('passwordIsRequired', `{{#label}} is required`),
               "string.empty": req.t('passwordIsRequired', `{{#label}} is required`),
               "string.required": req.t('passwordIsRequired', `{{#label}} is required`)})
     });
     
     const { error } = signInValidationSchema.validate(req.body, options);
      
      if (error) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened, error.details.map((x:any) => <MethodError>{
               Title: x.message,
               Description: x.message
          }))));
      } else {
         next();
      }
}

const signInByGoogleValidation = (req: any, res: Response, next: NextFunction) => {
     const signInByGoogleSchema = joi.string().trim(true).required().label('Token')
          .messages({ 
               "string.base": req.t('tokenIsRequired', `{{#label}} is required`),
               "string.empty": req.t('tokenIsRequired', `{{#label}} is required`),
               "string.required": req.t('tokenIsRequired', `{{#label}} is required`)});
     
     const { error } = signInByGoogleSchema.validate(req.body, options);
      
      if (error) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened, error.details.map((x:any) => <MethodError>{
               Title: x.message,
               Description: x.message
          }))));
      } else {
         next();
      }
}

export { 
     signUpValidation,
     signInValidation,
     signInByGoogleValidation
};