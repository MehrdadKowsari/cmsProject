import { Request, Response } from 'express';
import { CRUDResultModel } from '../../models/shared/crud/crudResultModel';
import { MethodResult } from '../../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../../models/shared/enums/crudResultEnum';
import { StatusCodes } from 'http-status-codes';
import { autoInjectable } from 'tsyringe';
import LocalizerHelper from '../../helpers/localizeHelper';
import GalleryService from '../../services/contentManagement/galleryService';
import { ListActiveGalleryByParamsDTO } from '../../dtos/contentManagement/gallery/listActiveGalleryByParamsDTO';
import { ListGalleryFileByParams } from '../../dtos/contentManagement/galleryFile/listGalleryFileByParamsDTO';
import GalleryFileService from '../../services/contentManagement/galleryFileService';
import { ListActiveGalleryCategoryByParamsDTO } from '../../dtos/contentManagement/galleryCategory/listActiveGalleryCategoryByParamsDTO';
import GalleryCategoryService from '../../services/contentManagement/galleryCategoryService';

@autoInjectable()
export class MediaController{
    private _galleryService: GalleryService;
    private _galleryCategoryService: GalleryCategoryService;
    private _galleryFileService: GalleryFileService;
    constructor(galleryService: GalleryService, 
        galleryFileService: GalleryFileService,
        galleryCategoryService: GalleryCategoryService){
        this._galleryService = galleryService;
        this._galleryCategoryService = galleryCategoryService;
        this._galleryFileService = galleryFileService;
    }
     /**
     * get all gallery categories
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
    getAllActiveGalleryCategoriesByParams = async (req: Request, res: Response) => {
        try {
            const listActiveGalleryCategoryByParamsDTO: ListActiveGalleryCategoryByParamsDTO = req.body;
            const requestResult = await this._galleryCategoryService.getAllActiveByParams(listActiveGalleryCategoryByParamsDTO);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

     /**
     * get all galleries
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
    getAllGalleryFilesByGalleryId = async (req: Request, res: Response) => {
        try {
            const galleryId: string = req.body;
            const requestResult = await this._galleryFileService.getAllByGalleryId(galleryId);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

}
