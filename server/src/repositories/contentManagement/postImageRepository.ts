import PostImageModel, { PostImage } from "../../models/contentManagement/postImage";
import GridUtilityHelper from "../../helpers/gridUtilityHelper";
import AppConstant from "../../constants/appConstants";
import { ListPostImageByParams } from "../../dtos/contentManagement/postImage/listPostImageByParamsDTO";


    export default class PostImageRepository{
        /**
         * add postImage
         * 
         * @param {object} postImage 
         * @returns {Promis<object>}
         */
        add = async (postImage: PostImage) => await PostImageModel.create(postImage); 
        
        /**
         * count postImages
         * 
         * @returns {Promise<number>}
         */
        count = async (): Promise<number> => await PostImageModel.count(); 
               
        /**
         * get all postImages
         * 
         * @returns {Promise<PostImage[]>}
         */
        getAll = async () => await PostImageModel.find(); 
        
        /**
         * get all galleries by parameters
         * 
         * @param {object} listPostImageByParams 
         * @returns {Promise<PostImage[]>}
         */
        getAllByParams = async (listPostImageByParams: ListPostImageByParams) : Promise<PostImage[]> =>{
            const { currentPage, pageSize, sortModel } = listPostImageByParams.gridParameter;
            const limitCount: number = (pageSize || AppConstant.PageSize);
            const skipCount = (currentPage || 0) * limitCount;           
            const sort = GridUtilityHelper.getSortObject(sortModel);
            const list = await PostImageModel.find({ postId: listPostImageByParams.postId }).sort(sort).skip(skipCount).limit(limitCount);
            return list;
        }  
        
        /**
         * get postImage by id
         * 
         * @param {string} id 
         * @returns {Promise<PostImage | null>}
         */
        getById = async (id: string): Promise<PostImage | null> => await PostImageModel.findOne({ _id : id }); 
        
        /**
         * update postImage
         * 
         * @param {object} postImage 
         * @returns {Promise<object>}
         */
        update = async (postImage: PostImage) => {
            return await PostImageModel.updateOne({ _id : postImage._id },
                { $set: { 
                    postId: postImage.postId,
                    name: postImage.name,
                    description: postImage.description,
                    image : postImage.image,
                    imageSavePath : postImage.imageSavePath,
                    priority : postImage.priority,
                    updatedBy: postImage.updatedBy,
                    updatedAt: postImage.updatedAt
                }});
        }

        /**
         * delete postImage by id
         * 
         * @param {string} id 
         * @returns {Promise<object>}
         */
        delete = async (id: string) => await PostImageModel.deleteOne({ _id : id }); 
    }


