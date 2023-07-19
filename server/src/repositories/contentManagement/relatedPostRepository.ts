import RelatedPostModel, { RelatedPost } from "src/models/contentManagement/relatedPost";
import GridUtilityHelper from "src/helpers/gridUtilityHelper";
import AppConstant from "src/constants/appConstants";
import { ListRelatedPostByParams } from "src/dtos/contentManagement/relatedPost/listRelatedPostByParamsDTO";


    export default class RelatedPostRepository{
        /**
         * add relatedPostRepository
         * 
         * @param {object} relatedPostRepository 
         * @returns {Promis<object>}
         */
        add = async (relatedPostRepository: RelatedPost) => await RelatedPostModel.create(relatedPostRepository); 
        
        /**
         * count relatedPostRepositories
         * 
         * @returns {Promise<number>}
         */
        count = async (): Promise<number> => await RelatedPostModel.count(); 
               
        /**
         * get all relatedPostRepositories
         * 
         * @returns {Promise<RelatedPost[]>}
         */
        getAll = async () => await RelatedPostModel.find(); 
        
        /**
         * get all relatedPostRepositories by parameters
         * 
         * @param {object} listRelatedPostByParams 
         * @returns {Promise<RelatedPost[]>}
         */
        getAllByParams = async (listRelatedPostByParams: ListRelatedPostByParams) : Promise<RelatedPost[]> =>{
            const { currentPage, pageSize, sortModel } = listRelatedPostByParams.gridParameter;
            const limitCount: number = (pageSize || AppConstant.PageSize);
            const skipCount = (currentPage || 0) * limitCount;           
            const sort = GridUtilityHelper.getSortObject(sortModel);
            const list = await RelatedPostModel.find({ postId: listRelatedPostByParams.postId }).sort(sort).skip(skipCount).limit(limitCount)
            .populate('postId')
            .populate('relatedPostId')
            .exec();
            return list;
        } 
        
        /**
         * get all relatedPosts by postId
         * 
         * @param {string} postId 
         * @returns {Promise<RelatedPost[]>}
         */
        getAllByUserId = async (postId: string) : Promise<RelatedPost[]> =>{
            const list = await RelatedPostModel.find({postId: postId}).populate('relatedPostId');
            return list;
        }  
        
        /**
         * get relatedPost by id
         * 
         * @param {string} id 
         * @returns {Promise<RelatedPost | null>}
         */
        getById = async (id: string): Promise<RelatedPost | null> => await RelatedPostModel.findOne({ _id : id }); 

         /**
         * is permission exists permission by pageId
         * 
         * @param {string | null} id 
         * @param {string} postId 
         * @param {string} relatedPostId 
         * @returns {Promise<boolean>}
         */
         isDuplicate = async (id: string | null, postId: string, relatedPostId: string) : Promise<boolean> => 
         {
             return id ? await RelatedPostModel.count({ postId, relatedPostId, _id: {$ne: id}}) > 0 : await RelatedPostModel.count({ postId, relatedPostId}) > 0;  
         }
        
        /**
         * update relatedPostRepository
         * 
         * @param {object} relatedPostRepository 
         * @returns {Promise<object>}
         */
        update = async (relatedPostRepository: RelatedPost) => {
            return await RelatedPostModel.updateOne({ _id : relatedPostRepository._id },
                { $set: { 
                    postId: relatedPostRepository.postId,
                    relatedPostId: relatedPostRepository.relatedPostId,
                    updatedBy: relatedPostRepository.updatedBy,
                    updatedAt: relatedPostRepository.updatedAt
                }});
        }

        /**
         * delete relatedPostRepository by id
         * 
         * @param {string} id 
         * @returns {Promise<object>}
         */
        delete = async (id: string) => await RelatedPostModel.deleteOne({ _id : id }); 
    }


