import { Request, Response } from 'express';
import { CRUDResultModel } from '../../models/shared/crud/crudResultModel';
import { MethodResult } from '../../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../../models/shared/enums/crudResultEnum';
import { StatusCodes } from 'http-status-codes';
import GalleryService from '../../services/contentManagement/galleryService';
import { autoInjectable } from 'tsyringe';
import { GridParameter } from '../../dtos/shared/grid/gridPrameter';
import { UpdateGalleryDTO } from '../../dtos/contentManagement/gallery/updateGalleryDTO';
import LocalizerHelper from '../../helpers/localizeHelper';

@autoInjectable()
export class GalleryController{
    private _galleryService: GalleryService;
    constructor(galleryService: GalleryService){
        this._galleryService = galleryService;
    }
    /**
     * add a gallery
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {object}
     */
    add = async (req: Request, res: Response) => {
        try {
            const requestResult = await this._galleryService.addGallery(req.body, req.user?.id!);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

    /**
     * get all gallerys
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
    getAll = async (req: Request, res: Response) => {
        try {
            const gridParameter: GridParameter = req.body;
            const requestResult = await this._galleryService.getAll();
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

    /**
     * get all gallerys by params
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
    getAllByParams = async (req: Request, res: Response) => {
        try {
            const gridParameter: GridParameter = req.body;
            const requestResult = await this._galleryService.getAllByParams(gridParameter);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

    /**
     * get gallery by id
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
    getById = async (req: Request, res: Response) => {
        try {
            const id = req.body;
            const requestResult = await this._galleryService.getById(id);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }
      
    /**
     * update gallery
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
    update = async (req: Request, res: Response) => {
        try {
            const updateGalleryDTO: UpdateGalleryDTO = req.body;
            const requestResult = await this._galleryService.update(updateGalleryDTO, req.user?.id!);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
            
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

     /**
     * toggle gallery active status by id
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
    toggleActive = async (req: Request, res: Response) => {
        try {
            const id = req.body;
            const requestResult = await this._galleryService.toggleActive(id, req.user?.id!);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }
     
    /**
     * delete gallery by id
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
    delete = async (req: Request, res: Response) => {
        try {
            const id = req.body;
            const requestResult = await this._galleryService.delete(id);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

}
