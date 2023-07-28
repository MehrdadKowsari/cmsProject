import { Request, Response } from 'express';
import { CRUDResultModel } from '../../models/shared/crud/crudResultModel';
import { MethodResult } from '../../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../../models/shared/enums/crudResultEnum';
import { StatusCodes } from 'http-status-codes';
import { autoInjectable } from 'tsyringe';
import LocalizerHelper from 'src/helpers/localizeHelper';
import GalleryService from 'src/services/contentManagement/galleryService';
import { ListActiveGalleryByParamsDTO } from 'src/dtos/contentManagement/gallery/listActiveGalleryByParamsDTO';
import { ListGalleryFileByParams } from 'src/dtos/contentManagement/galleryFile/listGalleryFileByParamsDTO';
import GalleryFileService from 'src/services/contentManagement/galleryFileService';

@autoInjectable()
export class MediaController{
    private _galleryService: GalleryService;
    private _galleryFileService: GalleryFileService;
    constructor(galleryService: GalleryService, 
        galleryFileService: GalleryFileService){
        this._galleryService = galleryService;
        this._galleryFileService = galleryFileService;
    }
     /**
     * get all gallerys
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
    getAllActiveGalleriesByParams = async (req: Request, res: Response) => {
        try {
            const listActiveGalleryByParamsDTO: ListActiveGalleryByParamsDTO = req.body;
            const requestResult = await this._galleryService.getAllActiveByParams(listActiveGalleryByParamsDTO);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

    /**
     * get all galleryFiles by params
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
    getAllGalleryFilesByParams = async (req: Request, res: Response) => {
        try {
            const listGalleryFileByParams: ListGalleryFileByParams = req.body;
            const requestResult = await this._galleryFileService.getAllByParams(listGalleryFileByParams);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

}
