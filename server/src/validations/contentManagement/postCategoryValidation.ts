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
          name: joi.string().max(AppConstant.NameMaxLenght).trim(true).required().label('Name')
          .messages({ 
               "string.base": req.t('nameIsRequired', `{{#label}} is required`),
               "string.empty": req.t('nameIsRequired', `{{#label}} is required`),
               "string.required": req.t('nameIsRequired', `{{#label}} is required`),
               "string.max": req.t('maxLenghtForNameIsN', `{{#label}} max lenght is {{#limit}}`, {n: `{{#limit}}`})}),
          description: joi.string().max(AppConstant.DescriptionMaxLenght).label('Description')
          .messages({ 
                    "string.max": req.t('maxLenghtForDescriptionIsN', `{{#label}} max lenght is {{#limit}}`, {n: `{{#limit}}`})}),
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
          name: joi.string().max(AppConstant.NameMaxLenght).trim(true).required().label('Name')
          .messages({ 
               "string.base": req.t('nameIsRequired', `{{#label}} is required`),
               "string.empty": req.t('nameIsRequired', `{{#label}} is required`),
               "string.required": req.t('nameIsRequired', `{{#label}} is required`),
               "string.max": req.t('maxLenghtForNameIsN', `{{#label}} max lenght is {{#limit}}`, {n: `{{#limit}}`})}),
          description: joi.string().max(AppConstant.DescriptionMaxLenght).label('Description')
          .messages({ 
                    "string.max": req.t('maxLenghtForDescriptionIsN', `{{#label}} max lenght is {{#limit}}`, {n: `{{#limit}}`})}),
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