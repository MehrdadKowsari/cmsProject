import { Request, Response } from 'express';
import { CRUDResultModel } from '../../models/shared/crud/crudResultModel';
import { MethodResult } from '../../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../../models/shared/enums/crudResultEnum';
import { StatusCodes } from 'http-status-codes';
import PostService from '../../services/contentManagement/postService';
import { autoInjectable } from 'tsyringe';
import LocalizerHelper from '../../helpers/localizeHelper';
import { ListPublishedPostByParamsDTO } from '../../dtos/contentManagement/post/listPublishedPostByParamsDTO';
import { ListMostCommentedPostByParamsDTO } from '../../dtos/contentManagement/post/listMostCommentedPostByParamsDTO';
import { ListMostPopularPostByParamsDTO } from '../../dtos/contentManagement/post/listMostPopularPostByParamsDTO';
import { ListLastPostByParamsDTO } from '../../dtos/contentManagement/post/listLastPostByParamsDTO';
import PostCommentService from '../../services/contentManagement/postCommentService';

@autoInjectable()
export class BlogController{
    private _postService: PostService;
    private _postCommentService: PostCommentService;
    constructor(postService: PostService,
        postCommentService: PostCommentService){
        this._postService = postService;
        this._postCommentService = postCommentService;
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
    
    getAllMostCommentedPostsByParams = async (req: Request, res: Response) => {
        try {
            const listMostCommentedPostByParamsDTO : ListMostCommentedPostByParamsDTO = req.body;
            const requestResult = await this._postService.getAllMostCommentedByParams(listMostCommentedPostByParamsDTO);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }
    
    getAllMostPopularPostsByParams = async (req: Request, res: Response) => {
        try {
            const listMostPopularPostByParamsDTO : ListMostPopularPostByParamsDTO = req.body;
            const requestResult = await this._postService.getAllMostPopularByParams(listMostPopularPostByParamsDTO);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }
    
    getAllLastPostsByParams = async (req: Request, res: Response) => {
        try {
            const listLastPostByParamsDTO : ListLastPostByParamsDTO = req.body;
            const requestResult = await this._postService.getAllLastByParams(listLastPostByParamsDTO);
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
    
    /**
     * get page by slugUrl
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
    getPageBySlugUrl = async (req: Request, res: Response) => {
        try {
            const slugUrl = req.body;
            const requestResult = await this._postService.getPageBySlugUrl(slugUrl);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

    /**
     * add a postComment
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {object}
     */
    addPostComment = async (req: Request, res: Response) => {
        try {
            const requestResult = await this._postCommentService.addPostComment(req.body, req.user?.id!);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

    /**
     * add a postComment
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {object}
     */
    getAllAcceptedPostCommentsByPostId = async (req: Request, res: Response) => {
        try {
            const postId: string = req.body;
            const requestResult = await this._postCommentService.getAllAcceptedPostCommentsByPostId(postId);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

}
