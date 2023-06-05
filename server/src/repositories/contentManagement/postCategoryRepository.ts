import { GridParameter } from "src/dtos/shared/grid/gridPrameter";
import PostCategoryModel, { PostCategory } from "src/models/contentManagement/postCategory";
import GridUtilityHelper from "src/helpers/gridUtilityHelper";
import AppConstant from "src/constants/appConstants";


    export default class PostCategoryRepository{
        /**
         * add postCategory
         * 
         * @param {object} postCategory 
         * @returns {Promis<object>}
         */
        add = async (postCategory: PostCategory) => await PostCategoryModel.create(postCategory); 
        
        /**
         * count postCategorys
         * 
         * @returns {Promise<number>}
         */
        count = async (): Promise<number> => await PostCategoryModel.count(); 
               
        /**
         * get all postCategorys
         * 
         * @returns {Promise<PostCategory[]>}
         */
        getAll = async () => await PostCategoryModel.find()
        .populate('parentId')
        .exec(); 
        
        /**
         * get all postCategorys by parameters
         * 
         * @param {object} gridParameter 
         * @returns {Promise<PostCategory[]>}
         */
        getAllByParams = async (gridParameter: GridParameter) : Promise<PostCategory[]> =>{
            const { currentPage, pageSize, sortModel } = gridParameter;
            const limitCount: number = (pageSize || AppConstant.PageSize);
            const skipCount = (currentPage || 0) * limitCount;           
            const sort = GridUtilityHelper.getSortObject(sortModel);
            const list = await PostCategoryModel.find().sort(sort).skip(skipCount).limit(limitCount)
            .populate('parentId')
            .exec();
            return list;
        }  
        
        /**
         * get postCategory by id
         * 
         * @param {string} id 
         * @returns {Promise<PostCategory | null>}
         */
        getById = async (id: string): Promise<PostCategory | null> => await PostCategoryModel.findOne({ _id : id }); 
        
        /**
         * update postCategory
         * 
         * @param {object} postCategory 
         * @returns {Promise<object>}
         */
        update = async (postCategory: PostCategory) => {
            return await PostCategoryModel.updateOne({ _id : postCategory._id },
                { $set: { 
                    parentId: postCategory.parentId,
                    name: postCategory.name,
                    description: postCategory.description,
                    priority : postCategory.priority,
                    iconCssClass : postCategory.iconCssClass,
                    updatedBy: postCategory.updatedBy,
                    updatedAt: postCategory.updatedAt
                }});
        }

        /**
         * toggle postCategory hidden status
         * 
         * @param {string} id 
         * @param {boolean} toggleIsHidden
         * @param {string} userId 
         * @returns {Promise<object>}
         */
        toggleIsHidden = async (id: string, toggleIsHidden: boolean, userId: string) => {
            return await PostCategoryModel.updateOne({_id: id}, 
                { $set: { 
                    isHidden: toggleIsHidden,
                    updatedBy: userId,
                    updatedAt: new Date()
                }}); 
        }
        
        /**
         * toggle postCategory active status
         * 
         * @param {string} id 
         * @param {boolean} toggleIsActive
         * @param {string} userId 
         * @returns {Promise<object>}
         */
        toggleIsActive = async (id: string, toggleIsActive: boolean, userId: string) => {
            return await PostCategoryModel.updateOne({_id: id}, 
                { $set: { 
                    isActive: toggleIsActive,
                    updatedBy: userId,
                    updatedAt: new Date()
                }}); 
        }

        /**
         * delete postCategory by id
         * 
         * @param {string} id 
         * @returns {Promise<object>}
         */
        delete = async (id: string) => await PostCategoryModel.deleteOne({ _id : id }); 
    }


