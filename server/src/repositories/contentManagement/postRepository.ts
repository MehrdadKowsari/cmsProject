import { GridParameter } from "src/dtos/shared/grid/gridPrameter";
import PostModel, { Post } from "src/models/contentManagement/post";
import GridUtilityHelper from "src/helpers/gridUtilityHelper";
import AppConstant from "src/constants/appConstants";
import { ListPublishedPostByParamsDTO } from "src/dtos/contentManagement/post/listPublishedPostByParamsDTO";
import { PostStatusTypeEnum } from "src/enums/contentManagement/postStatusTypeEnum";
import { ListMostCommentedPostByParamsDTO } from "src/dtos/contentManagement/post/listMostCommentedPostByParamsDTO";
import { ListMostPopularPostByParamsDTO } from "src/dtos/contentManagement/post/listMostPopularPostByParamsDTO";
import { ListLastPostByParamsDTO } from "src/dtos/contentManagement/post/listLastPostByParamsDTO";


    export default class PostRepository{
        /**
         * add post
         * 
         * @param {object} post 
         * @returns {Promis<object>}
         */
        add = async (post: Post) => await PostModel.create(post); 
        
        /**
         * count posts
         * 
         * @returns {Promise<number>}
         */
        count = async (params?: any): Promise<number> => await PostModel.count(params); 
               
        /**
         * get all posts
         * 
         * @returns {Promise<Post[]>}
         */
        getAll = async () => await PostModel.find(); 
        
        /**
         * get all posts by parameters
         * 
         * @param {object} gridParameter 
         * @returns {Promise<Post[]>}
         */
        getAllByParams = async (gridParameter: GridParameter) : Promise<Post[]> =>{
            const { currentPage, pageSize, sortModel } = gridParameter;
            const limitCount: number = (pageSize || AppConstant.PageSize);
            const skipCount = (currentPage || 0) * limitCount;           
            const sort = GridUtilityHelper.getSortObject(sortModel);
            const list = await PostModel.find().sort(sort).skip(skipCount).limit(limitCount);
            return list;
        }  
        
        /**
         * get all published posts by parameters
         * 
         * @param {object} gridParameter 
         * @returns {Promise<Post[]>}
         */
        getAllPublishedByParams = async (listPublishedPostByParamsDTO : ListPublishedPostByParamsDTO) : Promise<Post[]> =>{
            const { currentPage, pageSize, sortModel } = listPublishedPostByParamsDTO;
            const limitCount: number = (pageSize || AppConstant.PageSize);
            const skipCount = (currentPage || 0) * limitCount;           
            const sort = GridUtilityHelper.getSortObject(sortModel);
            const list = await PostModel.find({status: PostStatusTypeEnum.Published, locale: listPublishedPostByParamsDTO.locale}).sort(sort).skip(skipCount).limit(limitCount);
            return list;
        }  
        
        /**
         * get all most Commented published posts by parameters
         * 
         * @param {object} gridParameter 
         * @returns {Promise<Post[]>}
         */
        getAllMostCommentedByParams = async (listMostCommentedPostByParamsDTO : ListMostCommentedPostByParamsDTO) : Promise<Post[]> =>{
            const list = await PostModel.find({status: PostStatusTypeEnum.Published, locale: listMostCommentedPostByParamsDTO.locale}).sort({_id : 'desc'}).limit(listMostCommentedPostByParamsDTO.count);
            return list;
        }  
        
        /**
         * get all most Popular published posts by parameters
         * 
         * @param {object} gridParameter 
         * @returns {Promise<Post[]>}
         */
        getAllMostPopularByParams = async (listMostPopularPostByParamsDTO : ListMostPopularPostByParamsDTO) : Promise<Post[]> =>{
            const list = await PostModel.find({status: PostStatusTypeEnum.Published, locale: listMostPopularPostByParamsDTO.locale}).sort({likeCount : 'desc'}).limit(listMostPopularPostByParamsDTO.count);
            return list;
        }  
        
        /**
         * get all last published posts by parameters
         * 
         * @param {object} gridParameter 
         * @returns {Promise<Post[]>}
         */
        getAllLastByParams = async (listLastPostByParamsDTO : ListLastPostByParamsDTO) : Promise<Post[]> =>{
            const list = await PostModel.find({status: PostStatusTypeEnum.Published, locale: listLastPostByParamsDTO.locale}).sort({createdAt : 'desc'}).limit(listLastPostByParamsDTO.count);
            return list;
        }  
        
        /**
         * get post by id
         * 
         * @param {string} id 
         * @returns {Promise<Post | null>}
         */
        getById = async (id: string): Promise<Post | null> => await PostModel.findOne({ _id : id }); 
        
        /**
         * get post by slugUrl
         * 
         * @param {string} slugUrl 
         * @returns {Promise<Post | null>}
         */
        getBySlugUrl = async (slugUrl: string): Promise<Post | null> => await PostModel.findOne({ slugUrl : slugUrl }); 
        
        /**
         * update post
         * 
         * @param {object} post 
         * @returns {Promise<object>}
         */
        update = async (post: Post) => {
            return await PostModel.updateOne({ _id : post._id },
                { $set: { 
                    postCategoryId: post.postCategoryId,
                    title: post.title,
                    shortDescription: post.shortDescription,
                    content: post.content,
                    type : post.type,
                    image : post.image,
                    thumbnailImage : post.thumbnailImage,
                    videoUrl : post.videoUrl,
                    videoPoster : post.videoPoster,
                    thumbnailVideoPoster : post.thumbnailVideoPoster,
                    isCommentOpen : post.isCommentOpen,
                    slugUrl : post.slugUrl,
                    galleryId : post.galleryId,
                    priority : post.priority,
                    isFeatured : post.isFeatured,
                    dateFrom : post.dateFrom,
                    dateTo : post.dateTo,
                    status : post.status,
                    locale : post.locale,
                    updatedBy: post.updatedBy,
                    updatedAt: post.updatedAt
                }});
        }

        /**
         * delete post by id
         * 
         * @param {string} id 
         * @returns {Promise<object>}
         */
        delete = async (id: string) => await PostModel.deleteOne({ _id : id }); 
    }


