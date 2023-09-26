import * as dotenv from 'dotenv';
dotenv.config();

import {container} from 'tsyringe'; 
import { Request, Response, NextFunction } from 'express';
import { CRUDResultModel } from '../../models/shared/crud/crudResultModel';
import { MethodResult } from '../../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../../models/shared/enums/crudResultEnum';
import { StatusCodes } from 'http-status-codes';
import localizeHelper from '../../helpers/localizeHelper';
import { PermissionTypeEnum } from '../../enums/security/permissionTypeEnum';
import { PageTypeEnum } from '../../enums/security/pageTypeEnum';
import RolePagePermissionService from '../../services/security/rolePagePermissionService';

const rolePagePermissionService = container.resolve(RolePagePermissionService);
const permissionMiddleware = async(req:Request, res: Response, next: NextFunction, pageId: PageTypeEnum, permission: PermissionTypeEnum) => {
    try { 
        const userId = req.user?.id;
        if (! userId || !pageId || !permission) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(localizeHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'youHaveNotAccessToThePageOrAction')), req));
        }
        const hasRolePagePermission: boolean | null | undefined = (await rolePagePermissionService.hasPermissionByPageIdAndPermissionIdAndRoleList(pageId,permission,userId))?.methodResult.result
        if (hasRolePagePermission) {
            next();
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(localizeHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'youHaveNotAccessToThePageOrAction')), req));
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(localizeHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'youHaveNotAccessToThePageOrAction')), req));
    }
}

export default permissionMiddleware;

