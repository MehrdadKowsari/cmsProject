import { GridParameter } from "src/dtos/shared/grid/gridPrameter";
import PostTagModel, { PostTag } from "src/models/contentManagement/postTag";
import GridUtilityHelper from "src/helpers/gridUtilityHelper";
import AppConstant from "src/constants/appConstants";


    export default class PostTagRepository{
        /**
         * add postTagRepository
         * 
         * @param {object} postTagRepository 
         * @returns {Promis<object>}
         */
        add = async (postTagRepository: PostTag) => await PostTagModel.create(postTagRepository); 
        
        /**
         * count postTagRepositories
         * 
         * @returns {Promise<number>}
         */
        count = async (): Promise<number> => await PostTagModel.count(); 
               
        /**
         * get all postTagRepositories
         * 
         * @returns {Promise<PostTag[]>}
         */
        getAll = async () => await PostTagModel.find(); 
        
        /**
         * get all postTagRepositories by parameters
         * 
         * @param {object} gridParameter 
         * @returns {Promise<PostTag[]>}
         */
        getAllByParams = async (gridParameter: GridParameter) : Promise<PostTag[]> =>{
            const { currentPage, pageSize, sortModel } = gridParameter;
            const limitCount: number = (pageSize || AppConstant.PageSize);
            const skipCount = (currentPage || 0) * limitCount;           
            const sort = GridUtilityHelper.getSortObject(sortModel);
            const list = await PostTagModel.find().sort(sort).skip(skipCount).limit(limitCount)
            .populate('postId')
            .populate('tagId')
            .exec();
            return list;
        } 
        
        /**
         * get all postTags by postId
         * 
         * @param {string} postId 
         * @returns {Promise<PostTag[]>}
         */
        getAllByUserId = async (postId: string) : Promise<PostTag[]> =>{
            const list = await PostTagModel.find({postId: postId}).populate('tagId');
            return list;
        }  
        
        /**
         * get postTag by id
         * 
         * @param {string} id 
         * @returns {Promise<PostTag | null>}
         */
        getById = async (id: string): Promise<PostTag | null> => await PostTagModel.findOne({ _id : id }); 

         /**
         * is permission exists permission by pageId
         * 
         * @param {string | null} id 
         * @param {string} postId 
         * @param {string} tagId 
         * @returns {Promise<boolean>}
         */
         isDuplicate = async (id: string | null, postId: string, tagId: string) : Promise<boolean> => 
         {
             return id ? await PostTagModel.count({ postId, tagId, _id: {$ne: id}}) > 0 : await PostTagModel.count({ postId, tagId}) > 0;  
         }
        
        /**
         * update postTagRepository
         * 
         * @param {object} postTagRepository 
         * @returns {Promise<object>}
         */
        update = async (postTagRepository: PostTag) => {
            return await PostTagModel.updateOne({ _id : postTagRepository._id },
                { $set: { 
                    postId: postTagRepository.postId,
                    tagId: postTagRepository.tagId,
                    updatedBy: postTagRepository.updatedBy,
                    updatedAt: postTagRepository.updatedAt
                }});
        }

        /**
         * delete postTagRepository by id
         * 
         * @param {string} id 
         * @returns {Promise<object>}
         */
        delete = async (id: string) => await PostTagModel.deleteOne({ _id : id }); 
    }


