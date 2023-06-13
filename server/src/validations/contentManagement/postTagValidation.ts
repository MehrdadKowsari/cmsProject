import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
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
          postId: joi.string().trim(true).required().label('PostId')
          .messages({ 
               "string.base": req.t('postIdIsRequired', `{{#label}} is required`),
               "string.empty": req.t('postIdIsRequired', `{{#label}} is required`),
               "string.required": req.t('postIdIsRequired', `{{#label}} is required`)}),          
          tagId: joi.string().trim(true).required().label('TagId')
          .messages({ 
               "string.base": req.t('tagIdIsRequired', `{{#label}} is required`),
               "string.empty": req.t('tagIdIsRequired', `{{#label}} is required`),
               "string.required": req.t('tagIdIsRequired', `{{#label}} is required`)})
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
          postId: joi.string().trim(true).required().label('PostId')
          .messages({ 
               "string.base": req.t('postIdIsRequired', `{{#label}} is required`),
               "string.empty": req.t('postIdIsRequired', `{{#label}} is required`),
               "string.required": req.t('postIdIsRequired', `{{#label}} is required`)}),          
          tagId: joi.string().trim(true).required().label('TagId')
          .messages({ 
               "string.base": req.t('tagIdIsRequired', `{{#label}} is required`),
               "string.empty": req.t('tagIdIsRequired', `{{#label}} is required`),
               "string.required": req.t('tagIdIsRequired', `{{#label}} is required`)})
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
     deleteValidation
     };