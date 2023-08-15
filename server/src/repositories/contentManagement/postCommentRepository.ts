import { GridParameter } from "src/dtos/shared/grid/gridPrameter";
import PostCommentModel, { PostComment } from "src/models/contentManagement/postComment";
import GridUtilityHelper from "src/helpers/gridUtilityHelper";
import AppConstant from "src/constants/appConstants";


    export default class PostCommentRepository{
        /**
         * add postComment
         * 
         * @param {object} postComment 
         * @returns {Promis<object>}
         */
        add = async (postComment: PostComment) => await PostCommentModel.create(postComment); 
        
        /**
         * count postComments
         * 
         * @returns {Promise<number>}
         */
        count = async (): Promise<number> => await PostCommentModel.count(); 
               
        /**
         * get all postComments
         * 
         * @returns {Promise<PostComment[]>}
         */
        getAll = async () => await PostCommentModel.find(); 
        
        /**
         * get all postComments by parameters
         * 
         * @param {object} gridParameter 
         * @returns {Promise<PostComment[]>}
         */
        getAllByParams = async (gridParameter: GridParameter) : Promise<PostComment[]> =>{
            const { currentPage, pageSize, sortModel } = gridParameter;
            const limitCount: number = (pageSize || AppConstant.PageSize);
            const skipCount = (currentPage || 0) * limitCount;           
            const sort = GridUtilityHelper.getSortObject(sortModel);
            const list = await PostCommentModel.find().sort(sort).skip(skipCount).limit(limitCount);
            return list;
        }  
        
        /**
         * get all accepted postComments by parameters
         * 
         * @param {string} postId 
         * @returns {Promise<PostComment[]>}
         */
        getAllAcceptedPostCommentsByPostId = async (postId: GridParameter) : Promise<PostComment[]> =>{
            const list = await PostCommentModel.find({ postId }).sort({ createdAt: 'asc' });
            return list;
        }  
        
        /**
         * get postComment by id
         * 
         * @param {string} id 
         * @returns {Promise<PostComment | null>}
         */
        getById = async (id: string): Promise<PostComment | null> => await PostCommentModel.findOne({ _id : id }); 
        
        /**
         * update postComment
         * 
         * @param {object} postComment 
         * @returns {Promise<object>}
         */
        update = async (postComment: PostComment) => {
            return await PostCommentModel.updateOne({ _id : postComment._id },
                { $set: { 
                    parentId: postComment.parentId,
                    postId: postComment.postId,
                    title : postComment.title,
                    comment: postComment.comment,
                    fullName: postComment.fullName,
                    email : postComment.email,
                    website : postComment.website,
                    ip : postComment.ip,
                    status : postComment.status,
                    priority : postComment.priority,
                    updatedBy: postComment.updatedBy,
                    updatedAt: postComment.updatedAt
                }});
        }
        
        /**
         * delete postComment by id
         * 
         * @param {string} id 
         * @returns {Promise<object>}
         */
        delete = async (id: string) => await PostCommentModel.deleteOne({ _id : id }); 
    }


