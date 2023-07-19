import { RelatedPostDTO } from '../../dtos/contentManagement/relatedPost/relatedPostDTO';
import { CRUDResultModel } from '../../models/shared/crud/crudResultModel';
import { MethodResult } from '../../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../../models/shared/enums/crudResultEnum';
import { StatusCodes } from 'http-status-codes';
import { GridData } from '../../models/shared/grid/gridData';
import { AddRelatedPostDTO } from '../../dtos/contentManagement/relatedPost/addRelatedPostDTO';
import { RequestResult } from '../../models/shared/crud/requestResult';
import { autoInjectable } from 'tsyringe';
import RelatedPostRepository from '../../repositories/contentManagement/relatedPostRepository';
import { UpdateRelatedPostDTO } from 'src/dtos/contentManagement/relatedPost/updateRelatedPostDTO';
import { RelatedPost } from 'src/models/contentManagement/relatedPost';
import { Types } from 'mongoose';
import { ListRelatedPostByParams } from 'src/dtos/contentManagement/relatedPost/listRelatedPostByParamsDTO';

@autoInjectable()
export default class RelatedPostService {
    private _relatedPostRepository: RelatedPostRepository;
    constructor(relatedPostRepository: RelatedPostRepository) {
        this._relatedPostRepository = relatedPostRepository;

    }
    /**
     * add relatedPost
     * 
     * @param {object} addRelatedPostDTO
     * @param {string} currentUserId 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    addRelatedPost = async (addRelatedPostDTO: AddRelatedPostDTO, currentUserId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const { postId, relatedPostId } = addRelatedPostDTO;
            const isDuplicate = await this._relatedPostRepository.isDuplicate(null, postId, relatedPostId);
            if (isDuplicate) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'relatedPostNameAlreadyExists')));
            }

            const newRelatedPost: RelatedPost = {
                _id: null,
                postId: new Types.ObjectId(postId),
                relatedPostId: new Types.ObjectId(relatedPostId),
                createdBy: new Types.ObjectId(currentUserId),
                createdAt: new Date()
            }
            await this._relatedPostRepository.add(newRelatedPost);
            return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), true));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

    /**
     * get all relatedPost list by params
     * 
     * @param {object} listRelatedPostByParams 
     * @returns {Promise<RequestResult<GridData<RelatedPostDTO[]>> | null>}
     */
    getAllByParams = async (listRelatedPostByParams: ListRelatedPostByParams): Promise<RequestResult<GridData<RelatedPostDTO[]> | null>> => {
        try {
            const totalCount = await this._relatedPostRepository.count();
            const relatedPosts: RelatedPostDTO[] = (await this._relatedPostRepository.getAllByParams(listRelatedPostByParams))?.map((relatedPost: any) => <RelatedPostDTO>{
                id: relatedPost._id?.toString(),
                postId: relatedPost.postId,
                postTitle: relatedPost.postId.title,
                relatedPostId: relatedPost.relatedPostId,
                relatedPostTitle: relatedPost.relatedPostId.title,
                createdBy: relatedPost.createdBy,
                createdAt: relatedPost.createdAt,
                updatedBy: relatedPost.updatedBy,
                updatedAt: relatedPost.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<GridData<RelatedPostDTO[]>>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), {
                rows: relatedPosts,
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
     * @returns {Promise<RequestResult<RelatedPostDTO[]> | null>}
     */
        getAllByUserId = async (postId: string): Promise<RequestResult<RelatedPostDTO[] | null>> => {
            try {
                const relatedPosts: RelatedPostDTO[] = (await this._relatedPostRepository.getAllByUserId(postId))?.map((relatedPost: any) => <RelatedPostDTO>{
                    id: relatedPost._id?.toString(),
                    postId: relatedPost.postId,
                    postTitle: relatedPost.postId.title,
                    relatedPostId: relatedPost.relatedPostId,
                    relatedPostTitle: relatedPost.relatedPostId.title,
                    createdBy: relatedPost.createdBy,
                    createdAt: relatedPost.createdAt,
                    updatedBy: relatedPost.updatedBy,
                    updatedAt: relatedPost.updatedAt
                });
                return new RequestResult(StatusCodes.OK, new MethodResult<RelatedPostDTO[]>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), relatedPosts));
            } catch (error) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
            }
        }
    
    /**
     * get relatedPost by Id
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<RelatedPostDTO | null>>}
     */
    getById = async (id: string): Promise<RequestResult<RelatedPostDTO | null>> => {
        try {
            const relatedPost = await this._relatedPostRepository.getById(id);
            if (!relatedPost) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'relatedPostDoesNotExist')));
            }
            const relatedPostDTO: RelatedPostDTO = <RelatedPostDTO>{
                id: relatedPost._id?.toString(),
                postId: relatedPost.postId.toString(),
                relatedPostId: relatedPost.relatedPostId.toString()
            };
            return new RequestResult(StatusCodes.OK, new MethodResult<RelatedPostDTO>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), relatedPostDTO));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * update relatedPost
     * 
     * @param {object} updateRelatedPostDTO
     * @param {string} currentUserId
     * @returns {Promise<RequestResult<boolean | null>>} 
     */
    update = async (updateRelatedPostDTO: UpdateRelatedPostDTO, currentUserId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const { id, relatedPostId: relatedPostId, postId: postId } = updateRelatedPostDTO;
            let relatedPost = await this._relatedPostRepository.getById(id);
            if (relatedPost === null) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'relatedPostDoesNotExist')));
            }

            const isDuplicate = await this._relatedPostRepository.isDuplicate(id, postId, relatedPostId);
            if (isDuplicate) {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'relatedPostNameAlreadyExists')));
            }

            relatedPost.postId = new Types.ObjectId(postId);
            relatedPost.relatedPostId = new Types.ObjectId(relatedPostId);
            relatedPost.updatedBy = new Types.ObjectId(currentUserId);
            relatedPost.updatedAt = new Date();

            const { matchedCount } = await this._relatedPostRepository.update(relatedPost);
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
     * delete relatedPost
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    delete = async (id: string) => {
        try {
            const { deletedCount } = await this._relatedPostRepository.delete(id);
            if (deletedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), true));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
}

