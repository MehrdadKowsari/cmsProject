import MenuItemModel, { MenuItem } from "src/models/contentManagement/menuItem";
import GridUtilityHelper from "src/helpers/gridUtilityHelper";
import AppConstant from "src/constants/appConstants";
import { ListMenuItemByParamsDTO } from "src/dtos/contentManagement/menuItem/listMenuItemByParamsDTO";


    export default class MenuItemRepository{
        /**
         * add menuItem
         * 
         * @param {object} menuItem 
         * @returns {Promis<object>}
         */
        add = async (menuItem: MenuItem) => await MenuItemModel.create(menuItem); 
        
        /**
         * count menuItems
         * 
         * @returns {Promise<number>}
         */
        count = async (): Promise<number> => await MenuItemModel.count(); 
               
        /**
         * get all menuItems
         * 
         * @returns {Promise<MenuItem[]>}
         */
        getAll = async () => await MenuItemModel.find(); 
        
        /**
         * get all galleries by parameters
         * 
         * @param {object} listMenuItemByParams 
         * @returns {Promise<MenuItem[]>}
         */
        getAllByParams = async (listMenuItemByParams: ListMenuItemByParamsDTO) : Promise<MenuItem[]> =>{
            const { currentPage, pageSize, sortModel } = listMenuItemByParams.gridParameter;
            const limitCount: number = (pageSize || AppConstant.PageSize);
            const skipCount = (currentPage || 0) * limitCount;           
            const sort = GridUtilityHelper.getSortObject(sortModel);
            const list = await MenuItemModel.find({ menuId: listMenuItemByParams.menuId }).sort(sort).skip(skipCount).limit(limitCount);
            return list;
        }  
        
        /**
         * get menuItem by id
         * 
         * @param {string} id 
         * @returns {Promise<MenuItem | null>}
         */
        getById = async (id: string): Promise<MenuItem | null> => await MenuItemModel.findOne({ _id : id }); 
        
        /**
         * update menuItem
         * 
         * @param {object} menuItem 
         * @returns {Promise<object>}
         */
        update = async (menuItem: MenuItem) => {
            return await MenuItemModel.updateOne({ _id : menuItem._id },
                { $set: { 
                    parentId: menuItem.parentId,
                    menuId: menuItem.menuId,
                    name: menuItem.name,
                    description: menuItem.description,
                    image : menuItem.image,
                    imageSavePath : menuItem.imageSavePath,
                    url : menuItem.url,
                    slugUrl : menuItem.slugUrl,
                    target : menuItem.target,
                    iconCssClass : menuItem.iconCssClass,
                    iconSavePath : menuItem.iconSavePath,
                    type : menuItem.type,
                    priority : menuItem.priority,
                    updatedBy: menuItem.updatedBy,
                    updatedAt: menuItem.updatedAt
                }});
        }
        
        /**
         * toggle menu item active status
         * 
         * @param {string} id 
         * @param {boolean} toggleIsActive
         * @param {string} userId 
         * @returns {Promise<object>}
         */
        toggleIsActive = async (id: string, toggleIsActive: boolean, userId: string) => {
            return await MenuItemModel.updateOne({_id: id}, 
                { $set: { 
                    isActive: toggleIsActive,
                    updatedBy: userId,
                    updatedAt: new Date()
                }}); 
        }

        /**
         * delete menuItem by id
         * 
         * @param {string} id 
         * @returns {Promise<object>}
         */
        delete = async (id: string) => await MenuItemModel.deleteOne({ _id : id }); 
    }


