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

const addValidation = (req: Request, res: Response, next: NextFunction) => {
     const addValidationSchema = joi.object({
          postId: joi.string().required().label('Post Id')
          .messages({ 
               "string.base": req.t('postIdIsRequired', `{{#label}} is required`),
               "string.required": req.t('postIdIsRequired', `{{#label}} is required`)}),
          title: joi.string().max(AppConstant.TitleMaxLenght).trim(true).label('Title')
          .messages({ 
               "string.max": req.t('maxLenghtForTitleIsN', `{{#label}} max lenght is {{#limit}}`, {n: `{{#limit}}`})}),
          comment: joi.string().max(5000).label('Comment')
          .messages({ 
               "string.base": req.t('commentIsRequired', `{{#label}} is required`),
               "string.empty": req.t('commentIsRequired', `{{#label}} is required`),
               "string.required": req.t('commentIsRequired', `{{#label}} is required`),
               "string.max": req.t('maxLenghtForCommentIsN', `{{#label}} max lenght is {{#limit}}`, {n: `{{#limit}}`})}),          
          email: joi.string().max(AppConstant.EmailMaxLength).label('Email')
          .messages({ 
               "string.max": req.t('maxLenghtForEmailIsN', `{{#label}} max lenght is {{#limit}}`, {n: `{{#limit}}`})}),          
          fullName: joi.string().max(AppConstant.UrlMaxLength).label('Full Name')
          .messages({ 
               "string.max": req.t('maxLenghtForFullNameIsN', `{{#label}} max lenght is {{#limit}}`, {n: `{{#limit}}`})}),
          website: joi.string().max(AppConstant.WebsiteMaxLength).label('Website')
          .messages({ 
               "string.max": req.t('maxLenghtForWebsitelIsN', `{{#label}} max lenght is {{#limit}}`, {n: `{{#limit}}`})}),
          ip: joi.string().max(AppConstant.IPMaxLength).label('IP')
          .messages({ 
               "string.max": req.t('maxLenghtForIPIsN', `{{#label}} max lenght is {{#limit}}`, {n: `{{#limit}}`})}),
          priority: joi.number().label('Priority')
          .messages({ 
               "number.base": req.t('priorityIsRequired', `{{#label}} is required`),
               "number.required": req.t('priorityIsRequired', `{{#label}} is required`)})                    
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
          postId: joi.string().required().label('Post Id')
          .messages({ 
               "string.base": req.t('postIdIsRequired', `{{#label}} is required`),
               "string.required": req.t('postIdIsRequired', `{{#label}} is required`)}),
          title: joi.string().max(AppConstant.TitleMaxLenght).trim(true).label('Title')
          .messages({ 
               "string.max": req.t('maxLenghtForTitleIsN', `{{#label}} max lenght is {{#limit}}`, {n: `{{#limit}}`})}),
          comment: joi.string().max(5000).label('Comment')
          .messages({ 
               "string.base": req.t('commentIsRequired', `{{#label}} is required`),
               "string.empty": req.t('commentIsRequired', `{{#label}} is required`),
               "string.required": req.t('commentIsRequired', `{{#label}} is required`),
               "string.max": req.t('maxLenghtForCommentIsN', `{{#label}} max lenght is {{#limit}}`, {n: `{{#limit}}`})}),          
          email: joi.string().max(AppConstant.EmailMaxLength).label('Email')
          .messages({ 
               "string.max": req.t('maxLenghtForEmailIsN', `{{#label}} max lenght is {{#limit}}`, {n: `{{#limit}}`})}),          
          fullName: joi.string().max(AppConstant.UrlMaxLength).label('Full Name')
          .messages({ 
               "string.max": req.t('maxLenghtForFullNameIsN', `{{#label}} max lenght is {{#limit}}`, {n: `{{#limit}}`})}),
          website: joi.string().max(AppConstant.WebsiteMaxLength).label('Website')
          .messages({ 
               "string.max": req.t('maxLenghtForWebsitelIsN', `{{#label}} max lenght is {{#limit}}`, {n: `{{#limit}}`})}),
          ip: joi.string().max(AppConstant.IPMaxLength).label('IP')
          .messages({ 
               "string.max": req.t('maxLenghtForIPIsN', `{{#label}} max lenght is {{#limit}}`, {n: `{{#limit}}`})}),
          priority: joi.number().label('Priority')
          .messages({ 
               "number.base": req.t('priorityIsRequired', `{{#label}} is required`),
               "number.required": req.t('priorityIsRequired', `{{#label}} is required`)})
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
     toggleActiveValidation,
     deleteValidation
     };