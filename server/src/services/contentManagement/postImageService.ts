import { PostImageDTO } from '../../dtos/contentManagement/postImage/postImageDTO';
import { CRUDResultModel } from '../../models/shared/crud/crudResultModel';
import { MethodResult } from '../../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../../models/shared/enums/crudResultEnum';
import { StatusCodes } from 'http-status-codes';
import { GridData } from '../../models/shared/grid/gridData';
import { AddPostImageDTO } from '../../dtos/contentManagement/postImage/addPostImageDTO';
import { RequestResult } from '../../models/shared/crud/requestResult';
import { autoInjectable } from 'tsyringe';
import PostImageRepository from '../../repositories/contentManagement/postImageRepository';
import { UpdatePostImageDTO } from '../../dtos/contentManagement/postImage/updatePostImageDTO';
import { PostImage } from '../../models/contentManagement/postImage';
import { Types } from 'mongoose';
import { ListPostImageByParams } from '../../dtos/contentManagement/postImage/listPostImageByParamsDTO';

@autoInjectable()
export default class PostImageService {
    private _postImageRepository: PostImageRepository;
    constructor(postImageRepository: PostImageRepository) {
        this._postImageRepository = postImageRepository;

    }
    /**
     * add postImage
     * 
     * @param {object} addPostImageDTO
     * @param {string} userId 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    addPostImage = async (addPostImageDTO: AddPostImageDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try { 
            const { postId, name, description, image, imageSavePath, imageExtension, imageSize, priority } = addPostImageDTO;
            const newPostImage: PostImage = {
                _id: null,
                postId:  new Types.ObjectId(postId!),
                name,
                description,
                priority,
                image,
                imageSavePath,
                imageExtension,
                imageSize,
                downloadCount: 0,
                createdBy: new Types.ObjectId(userId),
                createdAt: new Date()
            }
            await this._postImageRepository.add(newPostImage);
            return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), true));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

       
    /**
     * get all postImage list by params
     * 
     * @returns {Promise<RequestResult<PostImageDTO[]> | null>}
     */
    getAll = async (): Promise<RequestResult<PostImageDTO[] | null>> => {
        try {
            const postImages: PostImageDTO[] = (await this._postImageRepository.getAll())?.map((postImage: any) => <PostImageDTO>{
                id: postImage._id?.toString(),
                postId: postImage.postId,
                postTitle: postImage.postId?.name,
                name: postImage.name,
                description: postImage.description,
                image: postImage.image,
                imageSavePath: postImage.imageSavePath,
                imageExtension: postImage.imageExtension,
                downloadCount: postImage.downloadCount,
                imageSize: postImage.imageSize,
                priority: postImage.priority,
                createdBy: postImage.createdBy,
                createdAt: postImage.createdAt,
                updatedBy: postImage.updatedBy,
                updatedAt: postImage.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<PostImageDTO[]>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), postImages));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

       
    /**
     * get all postImage list by params
     * 
     * @param {object} listPostImageByParams 
     * @returns {Promise<RequestResult<GridData<PostImageDTO[]>> | null>}
     */
    getAllByParams = async (listPostImageByParams: ListPostImageByParams): Promise<RequestResult<GridData<PostImageDTO[]> | null>> => {
        try {
            const totalCount = await this._postImageRepository.count();
            const postImages: PostImageDTO[] = (await this._postImageRepository.getAllByParams(listPostImageByParams))?.map((postImage: any) => <PostImageDTO>{
                id: postImage._id?.toString(),
                postId: postImage.postId,
                postTitle: postImage.postId?.title,
                name: postImage.name,
                description: postImage.description,
                image: postImage.image,
                imageSavePath: postImage.imageSavePath,
                imageExtension: postImage.imageExtension,
                downloadCount: postImage.downloadCount,
                imageSize: postImage.imageSize,
                priority: postImage.priority,
                createdBy: postImage.createdBy,
                createdAt: postImage.createdAt,
                updatedBy: postImage.updatedBy,
                updatedAt: postImage.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<GridData<PostImageDTO[]>>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), {
                rows: postImages,
                totalCount: totalCount
            }));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * get postImage by Id
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<PostImageDTO | null>>}
    */
    getById = async (id: string): Promise<RequestResult<PostImageDTO | null>> => {
        try {
            const postImage = await this._postImageRepository.getById(id);
            if (!postImage) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'postImageDoesNotExist')));
            }
            const postImageDTO: PostImageDTO = <PostImageDTO>{
                id: postImage._id?.toString(),
                postId: postImage.postId.toString(),
                postTitle: (<any>postImage.postId)?.title,
                name: postImage.name,
                description: postImage.description,
                image: postImage.image,
                imageSavePath: postImage.imageSavePath,
                imageExtension: postImage.imageExtension,
                downloadCount: postImage.downloadCount,
                imageSize: postImage.imageSize,
                priority: postImage.priority,
                createdBy: postImage.createdBy,
                createdAt: postImage.createdAt,
                updatedBy: postImage.updatedBy,
                updatedAt: postImage.updatedAt
            };
            return new RequestResult(StatusCodes.OK, new MethodResult<PostImageDTO>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), postImageDTO));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * update postImage
     * 
     * @param {object} updatePostImageDTO
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>} 
     */
    update = async (updatePostImageDTO: UpdatePostImageDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const { id, postId, name, description, image, imageSavePath, imageExtension, imageSize, priority } = updatePostImageDTO;
            let postImage = await this._postImageRepository.getById(id);
            if (postImage === null) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'postImageDoesNotExist')));
            }

            postImage.postId =  new Types.ObjectId(postId!),
            postImage.name = name;
            postImage.description = description;
            postImage.image = image,
            postImage.imageSavePath = imageSavePath,
            postImage.imageSize = imageSize,
            postImage.imageExtension = imageExtension,
            postImage.priority = priority;
            postImage.updatedBy = new Types.ObjectId(userId);
            postImage.updatedAt = new Date();

            const { matchedCount } = await this._postImageRepository.update(postImage);
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
     * delete postImage
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    delete = async (id: string) => {
        try {
            const { deletedCount } = await this._postImageRepository.delete(id);
            if (deletedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), true));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
}

