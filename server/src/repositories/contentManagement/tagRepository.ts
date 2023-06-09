import { GridParameter } from "src/dtos/shared/grid/gridPrameter";
import TagModel, { Tag } from "src/models/contentManagement/tag";
import GridUtilityHelper from "src/helpers/gridUtilityHelper";
import AppConstant from "src/constants/appConstants";


    export default class TagRepository{
        /**
         * add tag
         * 
         * @param {object} tag 
         * @returns {Promis<object>}
         */
        add = async (tag: Tag) => await TagModel.create(tag); 
        
        /**
         * count tags
         * 
         * @returns {Promise<number>}
         */
        count = async (): Promise<number> => await TagModel.count(); 

        /**
         * is role exists role by rolename
         * 
         * @param {string | null} id 
         * @param {string} name 
         * @returns {Promise<boolean>}
         */
        isExistsName = async (id: string | null, name: string) : Promise<boolean> => 
        {
            return id ? await TagModel.count({ name, _id: {$ne: id}}) > 0 : await TagModel.count({ name}) > 0;  
        }
               
        /**
         * get all tags
         * 
         * @returns {Promise<Tag[]>}
         */
        getAll = async () => await TagModel.find(); 
        
        /**
         * get all tags by parameters
         * 
         * @param {object} gridParameter 
         * @returns {Promise<Tag[]>}
         */
        getAllByParams = async (gridParameter: GridParameter) : Promise<Tag[]> =>{
            const { currentPage, pageSize, sortModel } = gridParameter;
            const limitCount: number = (pageSize || AppConstant.PageSize);
            const skipCount = (currentPage || 0) * limitCount;           
            const sort = GridUtilityHelper.getSortObject(sortModel);
            const list = await TagModel.find().sort(sort).skip(skipCount).limit(limitCount);
            return list;
        }  
        
        /**
         * get tag by id
         * 
         * @param {string} id 
         * @returns {Promise<Tag | null>}
         */
        getById = async (id: string): Promise<Tag | null> => await TagModel.findOne({ _id : id }); 
        
        /**
         * update tag
         * 
         * @param {object} tag 
         * @returns {Promise<object>}
         */
        update = async (tag: Tag) => {
            return await TagModel.updateOne({ _id : tag._id },
                { $set: { 
                    name: tag.name,
                    updatedBy: tag.updatedBy,
                    updatedAt: tag.updatedAt
                }});
        }

        /**
         * toggle tag active status
         * 
         * @param {string} id 
         * @param {boolean} toggleIsActive
         * @param {string} userId 
         * @returns {Promise<object>}
         */
        toggleIsActive = async (id: string, toggleIsActive: boolean, userId: string) => {
            return await TagModel.updateOne({_id: id}, 
                { $set: { 
                    isActive: toggleIsActive,
                    updatedBy: userId,
                    updatedAt: new Date()
                }}); 
        }

        /**
         * delete tag by id
         * 
         * @param {string} id 
         * @returns {Promise<object>}
         */
        delete = async (id: string) => await TagModel.deleteOne({ _id : id }); 
    }


