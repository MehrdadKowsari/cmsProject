import { Request, Response } from 'express';
import { CRUDResultModel } from '../../models/shared/crud/crudResultModel';
import { MethodResult } from '../../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../../models/shared/enums/crudResultEnum';
import { StatusCodes } from 'http-status-codes';
import PostTagService from '../../services/contentManagement/postTagService';
import { autoInjectable } from 'tsyringe';
import { UpdatePostTagDTO } from 'src/dtos/contentManagement/postTag/updatePostTagDTO';
import LocalizerHelper from 'src/helpers/localizeHelper';
import { ListPostTagByParams } from 'src/dtos/contentManagement/postTag/listPostTagByParamsDTO';

@autoInjectable()
export class PostTagController{
    private _postTagService: PostTagService;
    constructor(postTagService: PostTagService){
        this._postTagService = postTagService;
    }
    /**
     * add a postTag
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {object}
     */
    add = async (req: Request, res: Response) => {
        try {
            const requestResult = await this._postTagService.addPostTag(req.body, req.user?.id!);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

    /**
     * get all postTags by params
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
    getAllByParams = async (req: Request, res: Response) => {
        try {
            const listPostTagByParams: ListPostTagByParams = req.body;
            const requestResult = await this._postTagService.getAllByParams(listPostTagByParams);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

    /**
     * get postTag by id
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
    getById = async (req: Request, res: Response) => {
        try {
            const id = req.body;
            const requestResult = await this._postTagService.getById(id);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }
      
    /**
     * update postTag
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
    update = async (req: Request, res: Response) => {
        try {
            const updatePostTagDTO: UpdatePostTagDTO = req.body;
            const requestResult = await this._postTagService.update(updatePostTagDTO, req.user?.id!);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
            
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

    /**
     * delete postTag by id
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
    delete = async (req: Request, res: Response) => {
        try {
            const id = req.body;
            const requestResult = await this._postTagService.delete(id);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

}
