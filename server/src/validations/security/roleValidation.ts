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
          name: joi.string().alphanum().max(AppConstant.NameMaxLenght).trim(true).required().label('Name')
          .messages({ 
               "string.base": req.t('nameIsRequired', `{{#label}} is required`),
               "string.empty": req.t('nameIsRequired', `{{#label}} is required`),
               "string.required": req.t('nameIsRequired', `{{#label}} is required`),
               "string.max": req.t('maxLenghtForFirstNameIsN', `{{#label}} max lenght is {{#limit}}`, {n: `{{#limit}}`})}),
          description: joi.string().max(AppConstant.DescriptionMaxLenght).trim(true).required().label('Description')
          .messages({ 
               "string.base": req.t('descriptionIsRequired', `{{#label}} is required`),
               "string.max": req.t('maxLenghtForLastNameIsN', `{{#label}} max lenght is {{#limit}}`, {n: `{{#limit}}`})})          
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
          name: joi.string().alphanum().max(AppConstant.NameMaxLenght).trim(true).required().label('Name')
          .messages({ 
               "string.base": req.t('nameIsRequired', `{{#label}} is required`),
               "string.empty": req.t('nameIsRequired', `{{#label}} is required`),
               "string.required": req.t('nameIsRequired', `{{#label}} is required`),
               "string.max": req.t('maxLenghtForFirstNameIsN', `{{#label}} max lenght is {{#limit}}`, {n: `{{#limit}}`})}),
          description: joi.string().max(AppConstant.DescriptionMaxLenght).trim(true).required().label('Description')
          .messages({ 
               "string.base": req.t('descriptionIsRequired', `{{#label}} is required`),
               "string.max": req.t('maxLenghtForLastNameIsN', `{{#label}} max lenght is {{#limit}}`, {n: `{{#limit}}`})})
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


const toggleAvtiveValidation = (req: any, res: Response, next: NextFunction) => {
     const toggleAvtiveSchema = joi.string().trim(true).required().label('Id')
          .messages({ 
               "string.base": req.t('idIsRequired', `{{#label}} is required`),
               "string.empty": req.t('idIsRequired', `{{#label}} is required`),
               "string.required": req.t('idIsRequired', `{{#label}} is required`)});
     
     const { error } = toggleAvtiveSchema.validate(req.body, options);
      
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
     toggleAvtiveValidation,
     deleteValidation
     };