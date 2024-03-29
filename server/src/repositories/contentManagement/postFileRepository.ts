import { GridParameter } from "../../dtos/shared/grid/gridPrameter";
import PostFileModel, { PostFile } from "../../models/contentManagement/postFile";
import GridUtilityHelper from "../../helpers/gridUtilityHelper";
import AppConstant from "../../constants/appConstants";
import { ListPostFileByParams } from "../../dtos/contentManagement/postFile/listPostFileByParamsDTO";


    export default class PostFileRepository{
        /**
         * add postFile
         * 
         * @param {object} postFile 
         * @returns {Promis<object>}
         */
        add = async (postFile: PostFile) => await PostFileModel.create(postFile); 
        
        /**
         * count postFiles
         * 
         * @returns {Promise<number>}
         */
        count = async (): Promise<number> => await PostFileModel.count(); 
               
        /**
         * get all postFiles
         * 
         * @returns {Promise<PostFile[]>}
         */
        getAll = async () => await PostFileModel.find(); 
        
        /**
         * get all galleries by parameters
         * 
         * @param {object} listPostFileByParams 
         * @returns {Promise<PostFile[]>}
         */
        getAllByParams = async (listPostFileByParams: ListPostFileByParams) : Promise<PostFile[]> =>{
            const { currentPage, pageSize, sortModel } = listPostFileByParams.gridParameter;
            const limitCount: number = (pageSize || AppConstant.PageSize);
            const skipCount = (currentPage || 0) * limitCount;           
            const sort = GridUtilityHelper.getSortObject(sortModel);
            const list = await PostFileModel.find({postId : listPostFileByParams.postId}).sort(sort).skip(skipCount).limit(limitCount);
            return list;
        }  
        
        /**
         * get postFile by id
         * 
         * @param {string} id 
         * @returns {Promise<PostFile | null>}
         */
        getById = async (id: string): Promise<PostFile | null> => await PostFileModel.findOne({ _id : id }); 
        
        /**
         * update postFile
         * 
         * @param {object} postFile 
         * @returns {Promise<object>}
         */
        update = async (postFile: PostFile) => {
            return await PostFileModel.updateOne({ _id : postFile._id },
                { $set: { 
                    postId: postFile.postId,
                    name: postFile.name,
                    description: postFile.description,
                    file : postFile.file,
                    fileSavePath : postFile.fileSavePath,
                    priority : postFile.priority,
                    updatedBy: postFile.updatedBy,
                    updatedAt: postFile.updatedAt
                }});
        }

        /**
         * delete postFile by id
         * 
         * @param {string} id 
         * @returns {Promise<object>}
         */
        delete = async (id: string) => await PostFileModel.deleteOne({ _id : id }); 
    }


