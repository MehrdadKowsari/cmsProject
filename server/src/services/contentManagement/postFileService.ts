import { PostFileDTO } from '../../dtos/contentManagement/postFile/postFileDTO';
import { CRUDResultModel } from '../../models/shared/crud/crudResultModel';
import { MethodResult } from '../../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../../models/shared/enums/crudResultEnum';
import { StatusCodes } from 'http-status-codes';
import { GridData } from '../../models/shared/grid/gridData';
import { AddPostFileDTO } from '../../dtos/contentManagement/postFile/addPostFileDTO';
import { RequestResult } from '../../models/shared/crud/requestResult';
import { autoInjectable } from 'tsyringe';
import PostFileRepository from '../../repositories/contentManagement/postFileRepository';
import { GridParameter } from 'src/dtos/shared/grid/gridPrameter';
import { UpdatePostFileDTO } from 'src/dtos/contentManagement/postFile/updatePostFileDTO';
import { PostFile } from 'src/models/contentManagement/postFile';
import { Types } from 'mongoose';
import { ListPostFileByParams } from 'src/dtos/contentManagement/postFile/listPostFileByParamsDTO';

@autoInjectable()
export default class PostFileService {
    private _postFileRepository: PostFileRepository;
    constructor(postFileRepository: PostFileRepository) {
        this._postFileRepository = postFileRepository;

    }
    /**
     * add postFile
     * 
     * @param {object} addPostFileDTO
     * @param {string} userId 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    addPostFile = async (addPostFileDTO: AddPostFileDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try { 
            const { postId, name, description, file, fileSavePath, fileExtension, fileSize, priority } = addPostFileDTO;
            const newPostFile: PostFile = {
                _id: null,
                postId:  new Types.ObjectId(postId!),
                name,
                description,
                priority,
                file,
                fileSavePath,
                fileExtension,
                fileSize,
                downloadCount: 0,
                createdBy: new Types.ObjectId(userId),
                createdAt: new Date()
            }
            await this._postFileRepository.add(newPostFile);
            return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), true));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

       
    /**
     * get all postFile list by params
     * 
     * @returns {Promise<RequestResult<PostFileDTO[]> | null>}
     */
    getAll = async (): Promise<RequestResult<PostFileDTO[] | null>> => {
        try {
            const postFiles: PostFileDTO[] = (await this._postFileRepository.getAll())?.map((postFile: any) => <PostFileDTO>{
                id: postFile._id?.toString(),
                postId: postFile.postId,
                postTitle: postFile.postId?.name,
                name: postFile.name,
                description: postFile.description,
                file: postFile.file,
                fileSavePath: postFile.fileSavePath,
                fileExtension: postFile.fileExtension,
                downloadCount: postFile.downloadCount,
                fileSize: postFile.fileSize,
                priority: postFile.priority,
                createdBy: postFile.createdBy,
                createdAt: postFile.createdAt,
                updatedBy: postFile.updatedBy,
                updatedAt: postFile.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<PostFileDTO[]>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), postFiles));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

       
    /**
     * get all postFile list by params
     * 
     * @param {object} listPostFileByParams 
     * @returns {Promise<RequestResult<GridData<PostFileDTO[]>> | null>}
     */
    getAllByParams = async (listPostFileByParams: ListPostFileByParams): Promise<RequestResult<GridData<PostFileDTO[]> | null>> => {
        try {
            const totalCount = await this._postFileRepository.count();
            const postFiles: PostFileDTO[] = (await this._postFileRepository.getAllByParams(listPostFileByParams))?.map((postFile: any) => <PostFileDTO>{
                id: postFile._id?.toString(),
                postId: postFile.postId,
                name: postFile.name,
                description: postFile.description,
                file: postFile.file,
                fileSavePath: postFile.fileSavePath,
                fileExtension: postFile.fileExtension,
                downloadCount: postFile.downloadCount,
                fileSize: postFile.fileSize,
                priority: postFile.priority,
                createdBy: postFile.createdBy,
                createdAt: postFile.createdAt,
                updatedBy: postFile.updatedBy,
                updatedAt: postFile.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<GridData<PostFileDTO[]>>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), {
                rows: postFiles,
                totalCount: totalCount
            }));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * get postFile by Id
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<PostFileDTO | null>>}
    */
    getById = async (id: string): Promise<RequestResult<PostFileDTO | null>> => {
        try {
            const postFile = await this._postFileRepository.getById(id);
            if (!postFile) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'postFileDoesNotExist')));
            }
            const postFileDTO: PostFileDTO = <PostFileDTO>{
                id: postFile._id?.toString(),
                postId: postFile.postId.toString(),
                postTitle: (<any>postFile.postId)?.title,
                name: postFile.name,
                description: postFile.description,
                file: postFile.file,
                fileSavePath: postFile.fileSavePath,
                fileExtension: postFile.fileExtension,
                downloadCount: postFile.downloadCount,
                fileSize: postFile.fileSize,
                priority: postFile.priority,
                createdBy: postFile.createdBy,
                createdAt: postFile.createdAt,
                updatedBy: postFile.updatedBy,
                updatedAt: postFile.updatedAt
            };
            return new RequestResult(StatusCodes.OK, new MethodResult<PostFileDTO>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), postFileDTO));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * update postFile
     * 
     * @param {object} updatePostFileDTO
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>} 
     */
    update = async (updatePostFileDTO: UpdatePostFileDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const { id, postId, name, description, file, fileSavePath, fileExtension, fileSize, priority } = updatePostFileDTO;
            let postFile = await this._postFileRepository.getById(id);
            if (postFile === null) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'postFileDoesNotExist')));
            }

            postFile.postId =  new Types.ObjectId(postId!),
            postFile.name = name;
            postFile.description = description;
            postFile.file = file,
            postFile.fileSavePath = fileSavePath,
            postFile.fileSize = fileSize,
            postFile.fileExtension = fileExtension,
            postFile.priority = priority;
            postFile.updatedBy = new Types.ObjectId(userId);
            postFile.updatedAt = new Date();

            const { matchedCount } = await this._postFileRepository.update(postFile);
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
     * delete postFile
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    delete = async (id: string) => {
        try {
            const { deletedCount } = await this._postFileRepository.delete(id);
            if (deletedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), true));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
}

