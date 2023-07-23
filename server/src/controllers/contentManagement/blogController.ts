import { Request, Response } from 'express';
import { CRUDResultModel } from '../../models/shared/crud/crudResultModel';
import { MethodResult } from '../../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../../models/shared/enums/crudResultEnum';
import { StatusCodes } from 'http-status-codes';
import PostService from '../../services/contentManagement/postService';
import { autoInjectable } from 'tsyringe';
import LocalizerHelper from 'src/helpers/localizeHelper';
import { ListPublishedPostByParamsDTO } from 'src/dtos/contentManagement/post/listPublishedPostByParamsDTO';

@autoInjectable()
export class BlogController{
    private _postService: PostService;
    constructor(postService: PostService){
        this._postService = postService;
    }
     
    getAllPublishedPostsByParams = async (req: Request, res: Response) => {
        try {
            const listPublishedPostByParamsDTO : ListPublishedPostByParamsDTO = req.body;
            const requestResult = await this._postService.getAllPublishedByParams(listPublishedPostByParamsDTO);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

    /**
     * get post by slugUrl
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
    getBySlugUrl = async (req: Request, res: Response) => {
        try {
            const slugUrl = req.body;
            const requestResult = await this._postService.getBySlugUrl(slugUrl);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

}
