import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import Message from "src/constants/messages";
import { CRUDResultModel } from "src/models/shared/crud/crudResultModel";
import { MethodError } from "src/models/shared/crud/methodError";
import { MethodResult } from "src/models/shared/crud/methodResult";
import { CRUDResultEnum } from "src/models/shared/enums/crudResultEnum";

const joi = require("joi");

const addUserValidation = (req: any, res: Response, next: NextFunction) => {
     const addUserValidationSchema = joi.object({
          userName: joi.string().alphanum().min(3).max(50).trim(true).required(),
          firstName: joi.string().alphanum().min(1).max(50).trim(true).required(),
          lastName: joi.string().alphanum().min(1).max(50).trim(true).required(),
          email: joi.string().email().trim(true).required(),
          password: joi.string().min(8).trim(true).required(),
          confirmPassword: joi.string().min(8).trim(true).required(),
     });
     const options = {
          abortEarly: false,
          allowUnknown: true,
          stripUnknown: true 
      };
  
      const { error, value } = addUserValidationSchema.validate(req.body, options);
      
      if (error) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, Message.UnknownErrorHappened, error.details.map((x:any) => <MethodError>{
               Title: x.message,
               Description: x.message
          }))));
      } else {
         next();
      }
}

export default addUserValidation;