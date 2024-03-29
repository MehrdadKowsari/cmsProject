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
          postCategoryId: joi.string().required().label('Post Category Id')
          .messages({ 
               "string.base": req.t('postCategoryIdIsRequired', `{{#label}} is required`),
               "string.empty": req.t('titleIsRequired', `{{#label}} is required`),
               "string.required": req.t('postCategoryIdIsRequired', `{{#label}} is required`)}),
          title: joi.string().max(AppConstant.TitleMaxLenght).trim(true).required().label('Title')
          .messages({ 
               "string.base": req.t('titleIsRequired', `{{#label}} is required`),
               "string.empty": req.t('titleIsRequired', `{{#label}} is required`),
               "string.required": req.t('titleIsRequired', `{{#label}} is required`),
               "string.max": req.t('maxLenghtForTitleIsN', `{{#label}} max lenght is {{#limit}}`, {n: `{{#limit}}`})}),
          shortDescription: joi.string().optional().allow(null,'').max(5000).label('Short Description')
          .messages({ 
               "string.max": req.t('maxLenghtForShortDescriptionIsN', `{{#label}} max lenght is {{#limit}}`, {n: `{{#limit}}`})}),          
          type: joi.number().required().label('Type')
          .messages({ 
               "number.base": req.t('typeIsRequired', `{{#label}} is required`),
               "number.required": req.t('typeIsRequired', `{{#label}} is required`)}),
          priority: joi.number().label('Priority')
          .messages({ 
               "number.base": req.t('priorityIsRequired', `{{#label}} is required`),
               "number.required": req.t('priorityIsRequired', `{{#label}} is required`)}),          
          slugUrl: joi.string().optional().allow(null,'').max(AppConstant.SlugUrlMaxLength).label('Slug Url')
          .messages({ 
               "string.max": req.t('maxLenghtForSlugUrlIsN', `{{#label}} max lenght is {{#limit}}`, {n: `{{#limit}}`})})         
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
          postCategoryId: joi.string().required().label('Post Category Id')
          .messages({ 
               "string.base": req.t('postCategoryIdIsRequired', `{{#label}} is required`),
               "string.empty": req.t('titleIsRequired', `{{#label}} is required`),
               "string.required": req.t('postCategoryIdIsRequired', `{{#label}} is required`)}),
          title: joi.string().max(AppConstant.TitleMaxLenght).trim(true).required().label('Title')
          .messages({ 
               "string.base": req.t('titleIsRequired', `{{#label}} is required`),
               "string.empty": req.t('titleIsRequired', `{{#label}} is required`),
               "string.required": req.t('titleIsRequired', `{{#label}} is required`),
               "string.max": req.t('maxLenghtForTitleIsN', `{{#label}} max lenght is {{#limit}}`, {n: `{{#limit}}`})}),
          shortDescription: joi.string().optional().allow(null,'').max(5000).label('Short Description')
          .messages({ 
               "string.max": req.t('maxLenghtForShortDescriptionIsN', `{{#label}} max lenght is {{#limit}}`, {n: `{{#limit}}`})}),          
          type: joi.number().required().label('Type')
          .messages({ 
               "number.base": req.t('typeIsRequired', `{{#label}} is required`),
               "number.required": req.t('typeIsRequired', `{{#label}} is required`)}),
          priority: joi.number().label('Priority')
          .messages({ 
               "number.base": req.t('priorityIsRequired', `{{#label}} is required`),
               "number.required": req.t('priorityIsRequired', `{{#label}} is required`)}),          
          slugUrl: joi.string().optional().allow(null,'').max(AppConstant.SlugUrlMaxLength).label('Slug Url')
          .messages({ 
               "string.max": req.t('maxLenghtForSlugUrlIsN', `{{#label}} max lenght is {{#limit}}`, {n: `{{#limit}}`})})
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