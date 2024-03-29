import { PostDTO } from '../../dtos/contentManagement/post/postDTO';
import { CRUDResultModel } from '../../models/shared/crud/crudResultModel';
import { MethodResult } from '../../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../../models/shared/enums/crudResultEnum';
import { StatusCodes } from 'http-status-codes';
import { GridData } from '../../models/shared/grid/gridData';
import { AddPostDTO } from '../../dtos/contentManagement/post/addPostDTO';
import { RequestResult } from '../../models/shared/crud/requestResult';
import { autoInjectable } from 'tsyringe';
import PostRepository from '../../repositories/contentManagement/postRepository';
import { GridParameter } from '../../dtos/shared/grid/gridPrameter';
import { UpdatePostDTO } from '../../dtos/contentManagement/post/updatePostDTO';
import { Post } from '../../models/contentManagement/post';
import { Types } from 'mongoose';
import { ListPublishedPostByParamsDTO } from '../../dtos/contentManagement/post/listPublishedPostByParamsDTO';
import { PostTagDTO } from '../../dtos/contentManagement/postTag/postTagDTO';
import PostTagRepository from '../../repositories/contentManagement/postTagRepository';
import { PostTag } from '../../models/contentManagement/postTag';
import { RelatedPostDTO } from '../../dtos/contentManagement/relatedPost/relatedPostDTO';
import RelatedPostRepository from '../../repositories/contentManagement/relatedPostRepository';
import { ListMostCommentedPostByParamsDTO } from '../../dtos/contentManagement/post/listMostCommentedPostByParamsDTO';
import { ListMostPopularPostByParamsDTO } from '../../dtos/contentManagement/post/listMostPopularPostByParamsDTO';
import { ListLastPostByParamsDTO } from '../../dtos/contentManagement/post/listLastPostByParamsDTO';
import utilityHelper from '../../helpers/utilityHelper';
import { PostStatusTypeEnum } from '../../enums/contentManagement/postStatusTypeEnum';
import { TagDTO } from '../../dtos/contentManagement/tag/tagDTO';

@autoInjectable()
export default class PostService {
    private _postRepository: PostRepository;
    private _postTagRepository: PostTagRepository;
    private _relatedPostRepository: RelatedPostRepository;
    constructor(postRepository: PostRepository, 
        postTagRepository: PostTagRepository,
        relatedPostRepository: RelatedPostRepository) {
        this._postRepository = postRepository;
        this._relatedPostRepository = relatedPostRepository;
        this._postTagRepository = postTagRepository;
    }
    /**
     * add post
     * 
     * @param {object} addPostDTO
     * @param {string} userId 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    addPost = async (addPostDTO: AddPostDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try { 
            const { postCategoryId, title, shortDescription, type, content, isCommentOpen, isFeatured, image, thumbnailImage, videoUrl, videoPoster, thumbnailVideoPoster, slugUrl, status, galleryId, dateFrom, dateTo, priority, locale } = addPostDTO;
            const newPost: Post = {
                _id: null,
                postCategoryId:  new Types.ObjectId(postCategoryId!),
                title,
                shortDescription,
                type,
                content,
                isCommentOpen,
                priority,
                image,
                thumbnailImage,
                videoUrl,
                videoPoster,
                thumbnailVideoPoster,
                slugUrl: slugUrl ? utilityHelper.slugify(slugUrl) : utilityHelper.slugify(title),
                visitNumber: 0,
                likeCount: 0,
                dislikeCount: 0,
                raterNumber: 0,
                totalRating: 0,
                galleryId,
                dateFrom,
                dateTo,
                locale,
                isFeatured,
                status,
                createdBy: new Types.ObjectId(userId),
                createdAt: new Date()
            }
            await this._postRepository.add(newPost);
            return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), true));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

       
    /**
     * get all post list by isCommentOpen
     * 
     * @returns {Promise<RequestResult<PostDTO[]> | null>}
     */
    getAll = async (): Promise<RequestResult<PostDTO[] | null>> => {
        try {
            const posts: PostDTO[] = (await this._postRepository.getAll())?.map((post: any) => <PostDTO>{
                id: post._id?.toString(),
                postCategoryId: post.postCategoryId,
                postCategoryName: post.postCategoryId?.title,
                title: post.title,
                shortDescription: post.shortDescription,
                type: post.type,
                image: post.image,
                thumbnailImage: post.thumbnailImage,
                visitNumber: post.visitNumber,
                likeCount: post.likeCount,
                dislikeCount: post.dislikeCount,
                raterNumber: post.raterNumber,
                totalRating: post.totalRating,
                galleryId: post.galleryId,
                dateFrom: post.dateFrom,
                dateTo: post.dateTo,
                slugUrl: post.slugUrl,
                content: post.content,
                isCommentOpen: post.isCommentOpen,
                locale: post.locale,
                priority: post.priority,
                isFeatured: post.isFeatured,
                status: post.status,
                createdBy: post.createdBy,
                createdAt: post.createdAt,
                updatedBy: post.updatedBy,
                updatedAt: post.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<PostDTO[]>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), posts));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

       
    /**
     * get all post list by isCommentOpen
     * 
     * @param {object} gridParameter 
     * @returns {Promise<RequestResult<GridData<PostDTO[]>> | null>}
     */
    getAllByParams = async (gridParameter: GridParameter): Promise<RequestResult<GridData<PostDTO[]> | null>> => {
        try {
            const totalCount = await this._postRepository.count();
            const posts: PostDTO[] = (await this._postRepository.getAllByParams(gridParameter))?.map((post: any) => <PostDTO>{
                id: post._id?.toString(),
                postCategoryId: post.postCategoryId,
                postCategoryName: post.postCategoryId?.title,
                title: post.title,
                type: post.type,
                shortDescription: post.shortDescription,
                content: post.content,
                isCommentOpen: post.isCommentOpen,
                image: post.image,
                thumbnailImage: post.thumbnailImage,
                visitNumber: post.visitNumber,
                likeCount: post.likeCount,
                dislikeCount: post.dislikeCount,
                raterNumber: post.raterNumber,
                totalRating: post.totalRating,
                galleryId: post.galleryId,
                dateFrom: post.dateFrom,
                dateTo: post.dateTo,
                slugUrl: post.slugUrl,
                locale: post.locale,
                priority: post.priority,
                isFeatured: post.isFeatured,
                status: post.status,
                createdBy: post.createdBy,
                createdAt: post.createdAt,
                updatedBy: post.updatedBy,
                updatedAt: post.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<GridData<PostDTO[]>>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), {
                rows: posts,
                totalCount: totalCount
            }));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * get all post list by isCommentOpen
     * 
     * @param {object} listPublishedPostByParamsDTO
     * @returns {Promise<RequestResult<GridData<PostDTO[]>> | null>}
     */
    getAllPublishedByParams = async (listPublishedPostByParamsDTO : ListPublishedPostByParamsDTO): Promise<RequestResult<GridData<PostDTO[]> | null>> => {
        try {
            const totalCount = await this._postRepository.count({status: PostStatusTypeEnum.Published, locale: listPublishedPostByParamsDTO.locale});
            const posts: PostDTO[] = (await this._postRepository.getAllPublishedByParams(listPublishedPostByParamsDTO))?.map((post: any) => <PostDTO>{
                id: post._id?.toString(),
                postCategoryId: post.postCategoryId,
                postCategoryName: post.postCategoryId?.title,
                title: post.title,
                type: post.type,
                shortDescription: post.shortDescription,
                content: post.content,
                isCommentOpen: post.isCommentOpen,
                image: post.image,
                thumbnailImage: post.thumbnailImage,
                visitNumber: post.visitNumber,
                likeCount: post.likeCount,
                dislikeCount: post.dislikeCount,
                raterNumber: post.raterNumber,
                totalRating: post.totalRating,
                galleryId: post.galleryId,
                dateFrom: post.dateFrom,
                dateTo: post.dateTo,
                slugUrl: post.slugUrl,
                locale: post.locale,
                priority: post.priority,
                isFeatured: post.isFeatured,
                status: post.status,
                createdBy: post.createdBy,
                createdAt: post.createdAt,
                updatedBy: post.updatedBy,
                updatedAt: post.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<GridData<PostDTO[]>>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), {
                rows: posts,
                totalCount: totalCount
            }));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

    /**
     * get all most commented post list
     * 
     * @param {object} listMostCommentedPostByParamsDTO
     * @returns {Promise<RequestResult<PostDTO[]> | null>}
     */
    getAllMostCommentedByParams = async (listMostCommentedPostByParamsDTO : ListMostCommentedPostByParamsDTO): Promise<RequestResult<PostDTO[] | null>> => {
        try {
            const posts: PostDTO[] = (await this._postRepository.getAllMostCommentedByParams(listMostCommentedPostByParamsDTO))?.map((post: any) => <PostDTO>{
                id: post._id?.toString(),
                postCategoryId: post.postCategoryId,
                postCategoryName: post.postCategoryId?.title,
                title: post.title,
                type: post.type,
                shortDescription: post.shortDescription,
                content: post.content,
                isCommentOpen: post.isCommentOpen,
                image: post.image,
                thumbnailImage: post.thumbnailImage,
                visitNumber: post.visitNumber,
                likeCount: post.likeCount,
                dislikeCount: post.dislikeCount,
                raterNumber: post.raterNumber,
                totalRating: post.totalRating,
                galleryId: post.galleryId,
                dateFrom: post.dateFrom,
                dateTo: post.dateTo,
                slugUrl: post.slugUrl,
                locale: post.locale,
                priority: post.priority,
                isFeatured: post.isFeatured,
                status: post.status,
                createdBy: post.createdBy,
                createdAt: post.createdAt,
                updatedBy: post.updatedBy,
                updatedAt: post.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<PostDTO[]>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), posts));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

    /**
     * get all most popular post list
     * 
     * @param {object} listMostPopularPostByParamsDTO
     * @returns {Promise<RequestResult<PostDTO[]> | null>}
     */
    getAllMostPopularByParams = async (listMostPopularPostByParamsDTO : ListMostPopularPostByParamsDTO): Promise<RequestResult<PostDTO[] | null>> => {
        try {
            const posts: PostDTO[] = (await this._postRepository.getAllMostPopularByParams(listMostPopularPostByParamsDTO))?.map((post: any) => <PostDTO>{
                id: post._id?.toString(),
                postCategoryId: post.postCategoryId,
                postCategoryName: post.postCategoryId?.title,
                title: post.title,
                type: post.type,
                shortDescription: post.shortDescription,
                content: post.content,
                isCommentOpen: post.isCommentOpen,
                //image: post.image,
                //thumbnailImage: post.thumbnailImage,
                visitNumber: post.visitNumber,
                likeCount: post.likeCount,
                dislikeCount: post.dislikeCount,
                raterNumber: post.raterNumber,
                totalRating: post.totalRating,
                galleryId: post.galleryId,
                dateFrom: post.dateFrom,
                dateTo: post.dateTo,
                slugUrl: post.slugUrl,
                locale: post.locale,
                priority: post.priority,
                isFeatured: post.isFeatured,
                status: post.status,
                createdBy: post.createdBy,
                createdAt: post.createdAt,
                updatedBy: post.updatedBy,
                updatedAt: post.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<PostDTO[]>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), posts));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

    /**
     * get all last post list
     * 
     * @param {object} listLastPostByParamsDTO
     * @returns {Promise<RequestResult<PostDTO[]> | null>}
     */
    getAllLastByParams = async (listLastPostByParamsDTO : ListLastPostByParamsDTO): Promise<RequestResult<PostDTO[] | null>> => {
        try {
            const posts: PostDTO[] = (await this._postRepository.getAllLastByParams(listLastPostByParamsDTO))?.map((post: any) => <PostDTO>{
                id: post._id?.toString(),
                postCategoryId: post.postCategoryId,
                postCategoryName: post.postCategoryId?.title,
                title: post.title,
                type: post.type,
                shortDescription: post.shortDescription,
                content: post.content,
                isCommentOpen: post.isCommentOpen,
                image: post.image,
                thumbnailImage: post.thumbnailImage,
                visitNumber: post.visitNumber,
                likeCount: post.likeCount,
                dislikeCount: post.dislikeCount,
                raterNumber: post.raterNumber,
                totalRating: post.totalRating,
                galleryId: post.galleryId,
                dateFrom: post.dateFrom,
                dateTo: post.dateTo,
                slugUrl: post.slugUrl,
                locale: post.locale,
                priority: post.priority,
                isFeatured: post.isFeatured,
                status: post.status,
                createdBy: post.createdBy,
                createdAt: post.createdAt,
                updatedBy: post.updatedBy,
                updatedAt: post.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<PostDTO[]>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), posts));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * get post by Id
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<PostDTO | null>>}
    */
    getById = async (id: string): Promise<RequestResult<PostDTO | null>> => {
        try {
            const post = await this._postRepository.getById(id);
            if (!post) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'postDoesNotExist')));
            }
            const postDTO: PostDTO = <PostDTO>{
                id: post._id?.toString(),
                postCategoryId: post.postCategoryId?.toString(),
                title: post.title,
                type: post.type,
                shortDescription: post.shortDescription,
                content: post.content,
                isCommentOpen: post.isCommentOpen,
                image: post.image,
                thumbnailImage: post.thumbnailImage,
                visitNumber: post.visitNumber,
                likeCount: post.likeCount,
                dislikeCount: post.dislikeCount,
                raterNumber: post.raterNumber,
                totalRating: post.totalRating,
                galleryId: post.galleryId,
                dateFrom: post.dateFrom,
                dateTo: post.dateTo,
                slugUrl: post.slugUrl,
                locale: post.locale,
                priority: post.priority,
                isFeatured: post.isFeatured,
                status: post.status,
                createdBy: post.createdBy,
                createdAt: post.createdAt,
                updatedBy: post.updatedBy,
                updatedAt: post.updatedAt
            };
            return new RequestResult(StatusCodes.OK, new MethodResult<PostDTO>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), postDTO));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    
    }
    /**
     * get post by SlugUrl
     * 
     * @param {string} slugUrl 
     * @returns {Promise<RequestResult<PostDTO | null>>}
    */
    getBySlugUrl = async (slugUrl: string): Promise<RequestResult<PostDTO | null>> => {
        try {
            const post = await this._postRepository.getBySlugUrl(slugUrl);
            if (!post) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'postDoesNotExist')));
            }
            const postTags: TagDTO[] = (await this._postTagRepository.getAllByPostId(post._id!.toString()))?.map((p: any) => (<TagDTO>{
                id: p._id?.toString(),
                name: p.tagId?.name,
                isActive: p.tagId?.isActive,
            }));
            
            const relatedPosts: PostDTO[] = (await this._relatedPostRepository.getAllByPostId(post._id!.toString()))?.map((relatedPost: any) => <PostDTO>{
                id: relatedPost._id?.toString(),
                title: relatedPost.relatedPostId.title,
                shortDescription: relatedPost.relatedPostId.shortDescription,
                image: relatedPost.relatedPostId.image,
                slugUrl: relatedPost.relatedPostId.slugUrl,
                createdBy: relatedPost.relatedPostId.createdBy,
                createdAt: relatedPost.relatedPostId.createdAt,
                updatedBy: relatedPost.relatedPostId.updatedBy,
                updatedAt: relatedPost.relatedPostId.updatedAt
            });

            const postDTO: PostDTO = <PostDTO>{
                id: post._id?.toString(),
                postCategoryId: post.postCategoryId?.toString(),
                title: post.title,
                type: post.type,
                shortDescription: post.shortDescription,
                content: post.content,
                isCommentOpen: post.isCommentOpen,
                image: post.image,
                thumbnailImage: post.thumbnailImage,
                visitNumber: post.visitNumber,
                likeCount: post.likeCount,
                dislikeCount: post.dislikeCount,
                raterNumber: post.raterNumber,
                totalRating: post.totalRating,
                galleryId: post.galleryId,
                dateFrom: post.dateFrom,
                dateTo: post.dateTo,
                slugUrl: post.slugUrl,
                locale: post.locale,
                priority: post.priority,
                isFeatured: post.isFeatured,
                postTags: postTags,
                relatedPosts: relatedPosts,
                status: post.status,
                createdBy: post.createdBy,
                createdAt: post.createdAt,
                updatedBy: post.updatedBy,
                updatedAt: post.updatedAt
            };
            return new RequestResult(StatusCodes.OK, new MethodResult<PostDTO>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), postDTO));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * get post by SlugUrl
     * 
     * @param {string} slugUrl 
     * @returns {Promise<RequestResult<PostDTO | null>>}
    */
    getPageBySlugUrl = async (slugUrl: string): Promise<RequestResult<PostDTO | null>> => {
        try {
            const post = await this._postRepository.getPageBySlugUrl(slugUrl);
            if (!post) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'postDoesNotExist')));
            }

            const postDTO: PostDTO = <PostDTO>{
                id: post._id?.toString(),
                postCategoryId: post.postCategoryId?.toString(),
                title: post.title,
                type: post.type,
                shortDescription: post.shortDescription,
                content: post.content,
                isCommentOpen: post.isCommentOpen,
                image: post.image,
                thumbnailImage: post.thumbnailImage,
                visitNumber: post.visitNumber,
                likeCount: post.likeCount,
                dislikeCount: post.dislikeCount,
                raterNumber: post.raterNumber,
                totalRating: post.totalRating,
                galleryId: post.galleryId,
                dateFrom: post.dateFrom,
                dateTo: post.dateTo,
                slugUrl: post.slugUrl,
                locale: post.locale,
                priority: post.priority,
                isFeatured: post.isFeatured,
                status: post.status,
                createdBy: post.createdBy,
                createdAt: post.createdAt,
                updatedBy: post.updatedBy,
                updatedAt: post.updatedAt
            };
            return new RequestResult(StatusCodes.OK, new MethodResult<PostDTO>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), postDTO));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * update post
     * 
     * @param {object} updatePostDTO
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>} 
     */
    update = async (updatePostDTO: UpdatePostDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const { id, postCategoryId, title, shortDescription, type, content, isCommentOpen, isFeatured, image, thumbnailImage, videoUrl, videoPoster, thumbnailVideoPoster, slugUrl, status, galleryId, dateFrom, dateTo, priority, locale } = updatePostDTO;
            let post = await this._postRepository.getById(id);
            if (post === null) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'postDoesNotExist')));
            }

            post.postCategoryId =  new Types.ObjectId(postCategoryId!),
            post.title = title;
            post.shortDescription = shortDescription;
            post.content = content,
            post.isCommentOpen = isCommentOpen,
            post.type = type,
            post.image = image,
            post.thumbnailImage = thumbnailImage,
            post.videoUrl = videoUrl,
            post.videoPoster = videoPoster,
            post.thumbnailVideoPoster = thumbnailVideoPoster,
            post.slugUrl = slugUrl ? utilityHelper.slugify(slugUrl) : utilityHelper.slugify(title),
            post.status = status,
            post.galleryId = galleryId,
            post.dateFrom = dateFrom,
            post.isFeatured = isFeatured,
            post.dateTo = dateTo,
            post.locale = locale,
            post.priority = priority;
            post.updatedBy = new Types.ObjectId(userId);
            post.updatedAt = new Date();

            const { matchedCount } = await this._postRepository.update(post);
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
     * delete post
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    delete = async (id: string) => {
        try {
            const { deletedCount } = await this._postRepository.delete(id);
            if (deletedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), true));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
}

