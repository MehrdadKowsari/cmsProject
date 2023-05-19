import { Request, Response } from 'express';
import { CRUDResultModel } from '../../models/shared/crud/crudResultModel';
import { MethodResult } from '../../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../../models/shared/enums/crudResultEnum';
import { StatusCodes } from 'http-status-codes';
import RoleService from '../../services/security/roleService';
import { autoInjectable } from 'tsyringe';
import { GridParameter } from 'src/dtos/shared/grid/gridPrameter';
import { UpdateRoleDTO } from 'src/dtos/security/role/updateRoleDTO';
import LocalizerHelper from 'src/helpers/localizeHelper';

@autoInjectable()
export class RoleController{
    private _roleService: RoleService;
    constructor(roleService: RoleService){
        this._roleService = roleService;
    }
    /**
     * add a role
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {object}
     */
    add = async (req: Request, res: Response) => {
        try {
            const requestResult = await this._roleService.addRole(req.body, req.user?.id!);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

    /**
     * get all roles
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
    getAll = async (req: Request, res: Response) => {
        try {
            const requestResult = await this._roleService.getAll();
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }
    
    /**
     * get all roles by params
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
    getAllByParams = async (req: Request, res: Response) => {
        try {
            const gridParameter: GridParameter = req.body;
            const requestResult = await this._roleService.getAllByParams(gridParameter);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

    /**
     * get role by id
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
    getById = async (req: Request, res: Response) => {
        try {
            const id = req.body;
            const requestResult = await this._roleService.getById(id);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }
      
    /**
     * update role
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
    update = async (req: Request, res: Response) => {
        try {
            const updateRoleDTO: UpdateRoleDTO = req.body;
            const requestResult = await this._roleService.update(updateRoleDTO, req.user?.id!);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
            
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

     /**
     * toggle role active status by id
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
    toggleActive = async (req: Request, res: Response) => {
        try {
            const id = req.body;
            const requestResult = await this._roleService.toggleActive(id, req.user?.id!);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

    /**
     * delete role by id
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
    delete = async (req: Request, res: Response) => {
        try {
            const id = req.body;
            const requestResult = await this._roleService.delete(id);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

}
