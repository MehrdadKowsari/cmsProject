import { PostCommentDTO } from '../../dtos/contentManagement/postComment/postCommentDTO';
import { CRUDResultModel } from '../../models/shared/crud/crudResultModel';
import { MethodResult } from '../../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../../models/shared/enums/crudResultEnum';
import { StatusCodes } from 'http-status-codes';
import { GridData } from '../../models/shared/grid/gridData';
import { AddPostCommentDTO } from '../../dtos/contentManagement/postComment/addPostCommentDTO';
import { RequestResult } from '../../models/shared/crud/requestResult';
import { autoInjectable } from 'tsyringe';
import PostCommentRepository from '../../repositories/contentManagement/postCommentRepository';
import { GridParameter } from 'src/dtos/shared/grid/gridPrameter';
import { UpdatePostCommentDTO } from 'src/dtos/contentManagement/postComment/updatePostCommentDTO';
import { PostComment } from 'src/models/contentManagement/postComment';
import { Types } from 'mongoose';

@autoInjectable()
export default class PostCommentService {
    private _postCommentRepository: PostCommentRepository;
    constructor(postCommentRepository: PostCommentRepository) {
        this._postCommentRepository = postCommentRepository;

    }
    /**
     * add postComment
     * 
     * @param {object} addPostCommentDTO
     * @param {string} userId 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    addPostComment = async (addPostCommentDTO: AddPostCommentDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try { 
            const { postId, parentId, title, fullName, email, website, comment, ip, status, priority } = addPostCommentDTO;
            const newPostComment: PostComment = {
                _id: null,
                postId:  new Types.ObjectId(postId!),
                parentId: parentId ? new Types.ObjectId(parentId) : null,
                title,
                fullName,
                email,
                website,
                comment,
                ip,
                likeCount: 0,
                dislikeCount: 0,
                priority,
                status,
                createdBy: new Types.ObjectId(userId),
                createdAt: new Date()
            }
            await this._postCommentRepository.add(newPostComment);
            return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), true));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

       
    /**
     * get all postComment list by params
     * 
     * @returns {Promise<RequestResult<PostCommentDTO[]> | null>}
     */
    getAll = async (): Promise<RequestResult<PostCommentDTO[] | null>> => {
        try {
            const postComments: PostCommentDTO[] = (await this._postCommentRepository.getAll())?.map((postComment: any) => <PostCommentDTO>{
                id: postComment._id?.toString(),
                postId: postComment.postId,
                postTitle: postComment.postId?.title,
                parentId: postComment.parentId?.toString(),
                parentName: (<any>postComment.postId)?.title,
                title: postComment.title,
                fullName: postComment.fullName,
                email: postComment.email,
                website: postComment.website,
                comment: postComment.comment,
                ip: postComment.ip,
                status: postComment.status,
                likeCount: postComment.likeCount,
                dislikeCount: postComment.dislikeCount,
                priority: postComment.priority,
                createdBy: postComment.createdBy,
                createdAt: postComment.createdAt,
                updatedBy: postComment.updatedBy,
                updatedAt: postComment.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<PostCommentDTO[]>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), postComments));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

       
    /**
     * get all postComment list by params
     * 
     * @param {object} gridParameter 
     * @returns {Promise<RequestResult<GridData<PostCommentDTO[]>> | null>}
     */
    getAllByParams = async (gridParameter: GridParameter): Promise<RequestResult<GridData<PostCommentDTO[]> | null>> => {
        try {
            const totalCount = await this._postCommentRepository.count();
            const postComments: PostCommentDTO[] = (await this._postCommentRepository.getAllByParams(gridParameter))?.map((postComment: any) => <PostCommentDTO>{
                id: postComment._id?.toString(),
                postId: postComment.postId,
                postTitle: postComment.postId?.title,
                parentId: postComment.parentId?.toString(),
                parentName: (<any>postComment.postId)?.title,
                title: postComment.title,
                fullName: postComment.fullName,
                email: postComment.email,
                website: postComment.website,
                comment: postComment.comment,
                ip: postComment.ip,
                status: postComment.status,
                likeCount: postComment.likeCount,
                dislikeCount: postComment.dislikeCount,
                priority: postComment.priority,
                createdBy: postComment.createdBy,
                createdAt: postComment.createdAt,
                updatedBy: postComment.updatedBy,
                updatedAt: postComment.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<GridData<PostCommentDTO[]>>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), {
                rows: postComments,
                totalCount: totalCount
            }));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * get all accepted postComment list by params
     * 
     * @param {string} postId 
     * @returns {Promise<RequestResult<PostCommentDTO[]> | null>}
     */
    getAllAcceptedPostCommentsByPostId = async (postId: GridParameter): Promise<RequestResult<PostCommentDTO[] | null>> => {
        try {
            const postComments: PostCommentDTO[] = (await this._postCommentRepository.getAllAcceptedPostCommentsByPostId(postId))?.map((postComment: any) => <PostCommentDTO>{
                id: postComment._id?.toString(),
                postId: postComment.postId,
                postTitle: postComment.postId?.title,
                parentId: postComment.parentId?.toString(),
                title: postComment.title,
                fullName: postComment.fullName,
                email: postComment.email,
                website: postComment.website,
                comment: postComment.comment,
                ip: postComment.ip,
                status: postComment.status,
                likeCount: postComment.likeCount,
                dislikeCount: postComment.dislikeCount,
                priority: postComment.priority,
                createdBy: postComment.createdBy,
                createdAt: postComment.createdAt,
                updatedBy: postComment.updatedBy,
                updatedAt: postComment.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<PostCommentDTO[]>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), postComments));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * get postComment by Id
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<PostCommentDTO | null>>}
    */
    getById = async (id: string): Promise<RequestResult<PostCommentDTO | null>> => {
        try {
            const postComment = await this._postCommentRepository.getById(id);
            if (!postComment) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'postCommentDoesNotExist')));
            }
            const postCommentDTO: PostCommentDTO = <PostCommentDTO>{
                id: postComment._id?.toString(),
                postId: postComment.postId.toString(),
                postTitle: (<any>postComment.postId)?.title,
                parentId: postComment.parentId?.toString(),
                parentName: (<any>postComment.postId)?.title,
                title: postComment.title,
                email: postComment.email,
                fullName: postComment.fullName,
                website: postComment.website,
                comment: postComment.comment,
                ip: postComment.ip,
                status: postComment.status,
                likeCount: postComment.likeCount,               
                dislikeCount: postComment.dislikeCount,
                priority: postComment.priority,
                createdBy: postComment.createdBy,
                createdAt: postComment.createdAt,
                updatedBy: postComment.updatedBy,
                updatedAt: postComment.updatedAt
            };
            return new RequestResult(StatusCodes.OK, new MethodResult<PostCommentDTO>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), postCommentDTO));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * update postComment
     * 
     * @param {object} updatePostCommentDTO
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>} 
     */
    update = async (updatePostCommentDTO: UpdatePostCommentDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const { id, postId, parentId, title, fullName, email, website, comment, ip, status, priority } = updatePostCommentDTO;
            let postComment = await this._postCommentRepository.getById(id);
            if (postComment === null) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'postCommentDoesNotExist')));
            }

            postComment.postId =  new Types.ObjectId(postId!),
            postComment.parentId = parentId ? new Types.ObjectId(parentId!) : null,
            postComment.title = title;
            postComment.fullName = fullName;
            postComment.email = email;
            postComment.website = website,
            postComment.ip = ip,
            postComment.comment = comment,
            postComment.status = status,
            postComment.priority = priority;
            postComment.updatedBy = new Types.ObjectId(userId);
            postComment.updatedAt = new Date();

            const { matchedCount } = await this._postCommentRepository.update(postComment);
            if (matchedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), true));
            }
            else {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
            }
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
      
    /**
     * delete postComment
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    delete = async (id: string) => {
        try {
            const { deletedCount } = await this._postCommentRepository.delete(id);
            if (deletedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), true));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
}

