import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import AppConstant from "../../constants/appConstants";
import Message from "../../constants/messages";
import { CRUDResultModel } from "../../models/shared/crud/crudResultModel";
import { MethodError } from "../../models/shared/crud/methodError";
import { MethodResult } from "../../models/shared/crud/methodResult";
import { CRUDResultEnum } from "../../models/shared/enums/crudResultEnum";

const joi = require("joi");
const options = {
     abortEarly: false,
     allowUnknown: true,
     stripUnknown: true 
 };

const addValidation = (req: Request, res: Response, next: NextFunction) => {
     const addValidationSchema = joi.object({
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
               "string.base": req.t('usernameIsRequired', `{{#label}} is required`),
               "string.empty": req.t('usernameIsRequired', `{{#label}} is required`),
               "string.required": req.t('usernameIsRequired', `{{#label}} is required`),
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
     
     const { error } = addValidationSchema.validate(req.body, options);
      
      if (error) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened, error.details.map((x:any) => <MethodError>{
               Title: x.message,
               Description: x.message
          }))));
      } else {
         next();
      }
}


const getByIdValidation = (req: any, res: Response, next: NextFunction) => {
     const getByIdSchema = joi.string().trim(true).required().label('Id')
     .messages({ 
          "string.base": req.t('idIsRequired', `{{#label}} is required`),
          "string.empty": req.t('idIsRequired', `{{#label}} is required`),
          "string.required": req.t('idIsRequired', `{{#label}} is required`)
     });
     
     const { error } = getByIdSchema.validate(req.body, options);

     if (error) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened, error.details.map((x:any) => <MethodError>{
               Title: x.message,
               Description: x.message
          }))));
      } else {
         next();
      }
}

const updateValidation = (req: any, res: Response, next: NextFunction) => {
     const updateValidationSchema = joi.object({
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
               "string.base": req.t('usernameIsRequired', `{{#label}} is required`),
               "string.empty": req.t('usernameIsRequired', `{{#label}} is required`),
               "string.required": req.t('usernameIsRequired', `{{#label}} is required`),
               "string.min": req.t('minLenghtForUsernameIsN', `{{#label}} min lenght is {{#limit}}`, {n: `{{#limit}}`}),
               "string.max": req.t('maxLenghtForUsernameIsN', `{{#label}} max lenght is {{#limit}}`, {n: `{{#limit}}`})}),
          email: joi.string().email().trim(true).required()
          .messages({ 
               "string.base": req.t('emailIsRequired', `{{#label}} is required`),
               "string.empty": req.t('emailIsRequired', `{{#label}} is required`),
               "string.required": req.t('emailIsRequired', `{{#label}} is required`),
               "string.email": req.t('emailIsNotEnteredCorrectly', `{{#label}} is required`)})
     });
     
  
      const { error } = updateValidationSchema.validate(req.body, options);
      
      if (error) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened, error.details.map((x:any) => <MethodError>{
               Title: x.message,
               Description: x.message
          }))));
      } else {
         next();
      }
}

const updateProfileValidation = (req: any, res: Response, next: NextFunction) => {
     const updateProfileValidationSchema = joi.object({
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
               "string.base": req.t('usernameIsRequired', `{{#label}} is required`),
               "string.empty": req.t('usernameIsRequired', `{{#label}} is required`),
               "string.required": req.t('usernameIsRequired', `{{#label}} is required`),
               "string.min": req.t('minLenghtForUsernameIsN', `{{#label}} min lenght is {{#limit}}`, {n: `{{#limit}}`}),
               "string.max": req.t('maxLenghtForUsernameIsN', `{{#label}} max lenght is {{#limit}}`, {n: `{{#limit}}`})}),
          email: joi.string().email().trim(true).required()
          .messages({ 
               "string.base": req.t('emailIsRequired', `{{#label}} is required`),
               "string.empty": req.t('emailIsRequired', `{{#label}} is required`),
               "string.required": req.t('emailIsRequired', `{{#label}} is required`),
               "string.email": req.t('emailIsNotEnteredCorrectly', `{{#label}} is required`)})
     });
     
  
      const { error } = updateProfileValidationSchema.validate(req.body, options);
      
      if (error) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened, error.details.map((x:any) => <MethodError>{
               Title: x.message,
               Description: x.message
          }))));
      } else {
         next();
      }
}

const changePasswordValidation = (req: any, res: Response, next: NextFunction) => {
     const changePasswordSchema = joi.object({
          currentPassword: joi.string().trim(true).required().label('Currrent Password')
          .messages({ 
               "string.base": req.t('currentPasswordIsRequired', `{{#label}} is required`),
               "string.empty": req.t('currentPasswordIsRequired', `{{#label}} is required`),
               "string.required": req.t('currentPasswordIsRequired', `{{#label}} is required`)}),
          newPassword: joi.string().min(AppConstant.PasswordMinLenght).trim(true).required().label('New Password')
          .messages({ 
               "string.base": req.t('passwordIsRequired', `{{#label}} is required`),
               "string.empty": req.t('passwordIsRequired', `{{#label}} is required`),
               "string.required": req.t('passwordIsRequired', `{{#label}} is required`),
               "string.min": req.t('minLenghtForPasswordIsN', `{{#label}} min lenght is {{#limit}}`, {n: `{{#limit}}`})}),
          confirmNewPassword: joi.string().min(AppConstant.PasswordMinLenght).trim(true).required().label('Confirm New Password')
          .messages({ 
               "string.base": req.t('confirmPasswordIsRequired', `{{#label}} is required`),
               "string.empty": req.t('confirmPasswordIsRequired', `{{#label}} is required`),
               "string.required": req.t('confirmPasswordIsRequired', `{{#label}} is required`),
               "string.min": req.t('minLenghtForConfirmPasswordnIsN', `{{#label}} min lenght is {{#limit}}`, {n: AppConstant.PasswordMinLenght})}),
     });
     
     const { error } = changePasswordSchema.validate(req.body, options);
      
      if (error) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened, error.details.map((x:any) => <MethodError>{
               Title: x.message,
               Description: x.message
          }))));
      } else {
         next();
      }
}

const resetPasswordValidation = (req: any, res: Response, next: NextFunction) => {
     const changePasswordSchema = joi.object({
          id: joi.string().trim(true).required().label('Id')
          .messages({ 
               "string.base": req.t('idIsRequired', `{{#label}} is required`),
               "string.empty": req.t('idIsRequired', `{{#label}} is required`),
               "string.required": req.t('idIsRequired', `{{#label}} is required`)}),
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
               "string.min": req.t('minLenghtForConfirmPasswordnIsN', `{{#label}} min lenght is {{#limit}}`, {n: AppConstant.PasswordMinLenght})}),
     });
     
     const { error } = changePasswordSchema.validate(req.body, options);
      
      if (error) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened, error.details.map((x:any) => <MethodError>{
               Title: x.message,
               Description: x.message
          }))));
      } else {
         next();
      }
}

const toggleActiveValidation = (req: any, res: Response, next: NextFunction) => {
     const toggleActiveSchema = joi.string().trim(true).required().label('Id')
          .messages({ 
               "string.base": req.t('idIsRequired', `{{#label}} is required`),
               "string.empty": req.t('idIsRequired', `{{#label}} is required`),
               "string.required": req.t('idIsRequired', `{{#label}} is required`)});
     
     const { error } = toggleActiveSchema.validate(req.body, options);
      
      if (error) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened, error.details.map((x:any) => <MethodError>{
               Title: x.message,
               Description: x.message
          }))));
      } else {
         next();
      }
}

const deleteValidation = (req: any, res: Response, next: NextFunction) => {
     const deleteSchema = joi.string().trim(true).required().label('Id')
     .messages({ 
          "string.base": req.t('idIsRequired', `{{#label}} is required`),
          "string.empty": req.t('idIsRequired', `{{#label}} is required`),
          "string.required": req.t('idIsRequired', `{{#label}} is required`)});
     
     const { error } = deleteSchema.validate(req.body, options);
      
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
     addValidation,
     getByIdValidation,
     updateValidation,
     updateProfileValidation,
     changePasswordValidation,
     resetPasswordValidation,
     toggleActiveValidation,
     deleteValidation
     };