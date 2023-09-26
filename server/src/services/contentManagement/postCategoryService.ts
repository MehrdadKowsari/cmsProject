import { PostCategoryDTO } from '../../dtos/contentManagement/postCategory/postCategoryDTO';
import { CRUDResultModel } from '../../models/shared/crud/crudResultModel';
import { MethodResult } from '../../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../../models/shared/enums/crudResultEnum';
import { StatusCodes } from 'http-status-codes';
import { GridData } from '../../models/shared/grid/gridData';
import { AddPostCategoryDTO } from '../../dtos/contentManagement/postCategory/addPostCategoryDTO';
import { RequestResult } from '../../models/shared/crud/requestResult';
import { autoInjectable } from 'tsyringe';
import PostCategoryRepository from '../../repositories/contentManagement/postCategoryRepository';
import { GridParameter } from '../../dtos/shared/grid/gridPrameter';
import { UpdatePostCategoryDTO } from '../../dtos/contentManagement/postCategory/updatePostCategoryDTO';
import { PostCategory } from '../../models/contentManagement/postCategory';
import { Types } from 'mongoose';

@autoInjectable()
export default class PostCategoryService {
    private _postCategoryRepository: PostCategoryRepository;
    constructor(postCategoryRepository: PostCategoryRepository) {
        this._postCategoryRepository = postCategoryRepository;

    }
    /**
     * add postCategory
     * 
     * @param {object} addPostCategoryDTO
     * @param {string} userId 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    addPostCategory = async (addPostCategoryDTO: AddPostCategoryDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try { 
            const { parentId, name, priority, description } = addPostCategoryDTO;
            const newPostCategory: PostCategory = {
                _id: null,
                parentId: new Types.ObjectId(parentId),
                name,
                priority,
                description,
                isActive: true,
                createdBy: new Types.ObjectId(userId),
                createdAt: new Date()
            }
            await this._postCategoryRepository.add(newPostCategory);
            return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), true));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

       
    /**
     * get all postCategory list by params
     * 
     * @returns {Promise<RequestResult<PostCategoryDTO[]> | null>}
     */
    getAll = async (): Promise<RequestResult<PostCategoryDTO[] | null>> => {
        try {
            const postCategorys: PostCategoryDTO[] = (await this._postCategoryRepository.getAll())?.map((postCategory: any) => <PostCategoryDTO>{
                id: postCategory._id?.toString(),
                parentId: postCategory.parentId,
                parentName: postCategory.parentId?.name,
                name: postCategory.name,
                priority: postCategory.priority,
                description: postCategory.description,
                isActive: postCategory.isActive,
                createdBy: postCategory.createdBy,
                createdAt: postCategory.createdAt,
                updatedBy: postCategory.updatedBy,
                updatedAt: postCategory.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<PostCategoryDTO[]>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), postCategorys));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

       
    /**
     * get all postCategory list by params
     * 
     * @param {object} gridParameter 
     * @returns {Promise<RequestResult<GridData<PostCategoryDTO[]>> | null>}
     */
    getAllByParams = async (gridParameter: GridParameter): Promise<RequestResult<GridData<PostCategoryDTO[]> | null>> => {
        try {
            const totalCount = await this._postCategoryRepository.count();
            const postCategorys: PostCategoryDTO[] = (await this._postCategoryRepository.getAllByParams(gridParameter))?.map((postCategory: any) => <PostCategoryDTO>{
                id: postCategory._id?.toString(),
                parentId: postCategory.parentId,
                parentName: postCategory.parentId?.name,
                name: postCategory.name,
                priority: postCategory.priority,
                description: postCategory.description,
                isActive: postCategory.isActive,
                createdBy: postCategory.createdBy,
                createdAt: postCategory.createdAt,
                updatedBy: postCategory.updatedBy,
                updatedAt: postCategory.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<GridData<PostCategoryDTO[]>>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), {
                rows: postCategorys,
                totalCount: totalCount
            }));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * get postCategory by Id
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<PostCategoryDTO | null>>}
    */
    getById = async (id: string): Promise<RequestResult<PostCategoryDTO | null>> => {
        try {
            const postCategory = await this._postCategoryRepository.getById(id);
            if (!postCategory) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'postCategoryDoesNotExist')));
            }
            const postCategoryDTO: PostCategoryDTO = <PostCategoryDTO>{
                id: postCategory._id?.toString(),
                parentId: postCategory.parentId?.toString(),
                name: postCategory.name,
                priority: postCategory.priority,
                description: postCategory.description,
                isActive: postCategory.isActive
            };
            return new RequestResult(StatusCodes.OK, new MethodResult<PostCategoryDTO>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), postCategoryDTO));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * update postCategory
     * 
     * @param {object} updatePostCategoryDTO
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>} 
     */
    update = async (updatePostCategoryDTO: UpdatePostCategoryDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const { id, parentId, name, priority, description } = updatePostCategoryDTO;
            let postCategory = await this._postCategoryRepository.getById(id);
            if (postCategory === null) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'postCategoryDoesNotExist')));
            }

            postCategory.parentId = new Types.ObjectId(parentId);
            postCategory.name = name;
            postCategory.priority = priority;
            postCategory.description = description;
            postCategory.updatedBy = new Types.ObjectId(userId);
            postCategory.updatedAt = new Date();

            const { matchedCount } = await this._postCategoryRepository.update(postCategory);
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
     * get postCategory by Id
     * 
     * @param {string} id 
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    toggleActive = async (id: string, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const postCategory = await this._postCategoryRepository.getById(id);
            if (!postCategory) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'postCategoryDoesNotExist')));
            }
            const toggleIsActive = !postCategory.isActive;
            const { modifiedCount } = await this._postCategoryRepository.toggleIsActive(id, toggleIsActive, userId);
            if (modifiedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), toggleIsActive));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * delete postCategory
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    delete = async (id: string) => {
        try {
            const { deletedCount } = await this._postCategoryRepository.delete(id);
            if (deletedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), true));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
}

