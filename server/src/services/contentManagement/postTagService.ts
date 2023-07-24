import { PostTagDTO } from '../../dtos/contentManagement/postTag/postTagDTO';
import { CRUDResultModel } from '../../models/shared/crud/crudResultModel';
import { MethodResult } from '../../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../../models/shared/enums/crudResultEnum';
import { StatusCodes } from 'http-status-codes';
import { GridData } from '../../models/shared/grid/gridData';
import { AddPostTagDTO } from '../../dtos/contentManagement/postTag/addPostTagDTO';
import { RequestResult } from '../../models/shared/crud/requestResult';
import { autoInjectable } from 'tsyringe';
import PostTagRepository from '../../repositories/contentManagement/postTagRepository';
import { UpdatePostTagDTO } from 'src/dtos/contentManagement/postTag/updatePostTagDTO';
import { PostTag } from 'src/models/contentManagement/postTag';
import { Types } from 'mongoose';
import { ListPostTagByParams } from 'src/dtos/contentManagement/postTag/listPostTagByParamsDTO';

@autoInjectable()
export default class PostTagService {
    private _postTagRepository: PostTagRepository;
    constructor(postTagRepository: PostTagRepository) {
        this._postTagRepository = postTagRepository;

    }
    /**
     * add postTag
     * 
     * @param {object} addPostTagDTO
     * @param {string} currentUserId 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    addPostTag = async (addPostTagDTO: AddPostTagDTO, currentUserId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const { postId, tagId } = addPostTagDTO;
            const isDuplicate = await this._postTagRepository.isDuplicate(null, postId, tagId);
            if (isDuplicate) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'postTagNameAlreadyExists')));
            }

            const newPostTag: PostTag = {
                _id: null,
                postId: new Types.ObjectId(postId),
                tagId: new Types.ObjectId(tagId),
                createdBy: new Types.ObjectId(currentUserId),
                createdAt: new Date()
            }
            await this._postTagRepository.add(newPostTag);
            return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), true));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

    /**
     * get all postTag list by params
     * 
     * @param {object} listPostTagByParams 
     * @returns {Promise<RequestResult<GridData<PostTagDTO[]>> | null>}
     */
    getAllByParams = async (listPostTagByParams: ListPostTagByParams): Promise<RequestResult<GridData<PostTagDTO[]> | null>> => {
        try {
            const totalCount = await this._postTagRepository.count();
            const postTags: PostTagDTO[] = (await this._postTagRepository.getAllByParams(listPostTagByParams))?.map((postTag: any) => <PostTagDTO>{
                id: postTag._id?.toString(),
                postId: postTag.postId,
                postTitle: postTag.postId.title,
                tagId: postTag.tagId,
                tagName: postTag.tagId.name,
                createdBy: postTag.createdBy,
                createdAt: postTag.createdAt,
                updatedBy: postTag.updatedBy,
                updatedAt: postTag.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<GridData<PostTagDTO[]>>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), {
                rows: postTags,
                totalCount: totalCount
            }));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

        /**
     * get all user list by params
     * 
     * @param {string} postId 
     * @returns {Promise<RequestResult<PostTagDTO[]> | null>}
     */
        getAllByUserId = async (postId: string): Promise<RequestResult<PostTagDTO[] | null>> => {
            try {
                const postTags: PostTagDTO[] = (await this._postTagRepository.getAllByPostId(postId))?.map((postTag: any) => <PostTagDTO>{
                    id: postTag._id?.toString(),
                    postId: postTag.postId,
                    postTitle: postTag.postId.title,
                    tagId: postTag.tagId,
                    tagName: postTag.tagId.name,
                    createdBy: postTag.createdBy,
                    createdAt: postTag.createdAt,
                    updatedBy: postTag.updatedBy,
                    updatedAt: postTag.updatedAt
                });
                return new RequestResult(StatusCodes.OK, new MethodResult<PostTagDTO[]>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), postTags));
            } catch (error) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
            }
        }
    
    /**
     * get postTag by Id
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<PostTagDTO | null>>}
     */
    getById = async (id: string): Promise<RequestResult<PostTagDTO | null>> => {
        try {
            const postTag = await this._postTagRepository.getById(id);
            if (!postTag) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'postTagDoesNotExist')));
            }
            const postTagDTO: PostTagDTO = <PostTagDTO>{
                id: postTag._id?.toString(),
                postId: postTag.postId.toString(),
                tagId: postTag.tagId.toString()
            };
            return new RequestResult(StatusCodes.OK, new MethodResult<PostTagDTO>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), postTagDTO));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * update postTag
     * 
     * @param {object} updatePostTagDTO
     * @param {string} currentUserId
     * @returns {Promise<RequestResult<boolean | null>>} 
     */
    update = async (updatePostTagDTO: UpdatePostTagDTO, currentUserId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const { id, tagId: tagId, postId: postId } = updatePostTagDTO;
            let postTag = await this._postTagRepository.getById(id);
            if (postTag === null) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'postTagDoesNotExist')));
            }

            const isDuplicate = await this._postTagRepository.isDuplicate(id, postId, tagId);
            if (isDuplicate) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'postTagNameAlreadyExists')));
            }

            postTag.postId = new Types.ObjectId(postId);
            postTag.tagId = new Types.ObjectId(tagId);
            postTag.updatedBy = new Types.ObjectId(currentUserId);
            postTag.updatedAt = new Date();

            const { matchedCount } = await this._postTagRepository.update(postTag);
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
     * delete postTag
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    delete = async (id: string) => {
        try {
            const { deletedCount } = await this._postTagRepository.delete(id);
            if (deletedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), true));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
}

