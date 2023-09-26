import { GridParameter } from "../../dtos/shared/grid/gridPrameter";
import MenuModel, { Menu } from "../../models/contentManagement/menu";
import GridUtilityHelper from "../../helpers/gridUtilityHelper";
import AppConstant from "../../constants/appConstants";


    export default class MenuRepository{
        /**
         * add menu
         * 
         * @param {object} menu 
         * @returns {Promis<object>}
         */
        add = async (menu: Menu) => await MenuModel.create(menu); 
        
        /**
         * count menus
         * 
         * @returns {Promise<number>}
         */
        count = async (): Promise<number> => await MenuModel.count(); 
               
        /**
         * get all menus
         * 
         * @returns {Promise<Menu[]>}
         */
        getAll = async () => await MenuModel.find(); 
        
        /**
         * get all galleries by parameters
         * 
         * @param {object} gridParameter 
         * @returns {Promise<Menu[]>}
         */
        getAllByParams = async (gridParameter: GridParameter) : Promise<Menu[]> =>{
            const { currentPage, pageSize, sortModel } = gridParameter;
            const limitCount: number = (pageSize || AppConstant.PageSize);
            const skipCount = (currentPage || 0) * limitCount;           
            const sort = GridUtilityHelper.getSortObject(sortModel);
            const list = await MenuModel.find().sort(sort).skip(skipCount).limit(limitCount);
            return list;
        }  
        
        /**
         * get menu by id
         * 
         * @param {string} id 
         * @returns {Promise<Menu | null>}
         */
        getById = async (id: string): Promise<Menu | null> => await MenuModel.findOne({ _id : id }); 
        
        /**
         * update menu
         * 
         * @param {object} menu 
         * @returns {Promise<object>}
         */
        update = async (menu: Menu) => {
            return await MenuModel.updateOne({ _id : menu._id },
                { $set: { 
                    name: menu.name,
                    description: menu.description,
                    sectionName : menu.sectionName,
                    priority : menu.priority,
                    locale : menu.locale,
                    updatedBy: menu.updatedBy,
                    updatedAt: menu.updatedAt
                }});
        }

        /**
         * toggle menu active status
         * 
         * @param {string} id 
         * @param {boolean} toggleIsActive
         * @param {string} userId 
         * @returns {Promise<object>}
         */
        toggleIsActive = async (id: string, toggleIsActive: boolean, userId: string) => {
            return await MenuModel.updateOne({_id: id}, 
                { $set: { 
                    isActive: toggleIsActive,
                    updatedBy: userId,
                    updatedAt: new Date()
                }}); 
        }

        /**
         * delete menu by id
         * 
         * @param {string} id 
         * @returns {Promise<object>}
         */
        delete = async (id: string) => await MenuModel.deleteOne({ _id : id }); 
    }


