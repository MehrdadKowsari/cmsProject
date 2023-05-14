import { GridParameter } from "src/dtos/shared/grid/gridPrameter";
import PagePermissionModel, { PagePermission } from "../../security/pagePermission";
import GridUtilityHelper from "../../../helpers/gridUtilityHelper";
import AppConstant from "src/constants/appConstants";


    export default class PagePermissionRepository{
        /**
         * add pagePermission
         * 
         * @param {object} pagePermission 
         * @returns {Promis<object>}
         */
        add = async (pagePermission: PagePermission) => await PagePermissionModel.create(pagePermission); 
        
        /**
         * count pagePermissions
         * 
         * @returns {Promise<number>}
         */
        count = async (): Promise<number> => await PagePermissionModel.count(); 
               
        /**
         * get all pagePermissions
         * 
         * @returns {Promise<PagePermission[]>}
         */
        getAll = async () => await PagePermissionModel.find(); 
        
        /**
         * get all pagePermissions by parameters
         * 
         * @param {object} gridParameter 
         * @returns {Promise<PagePermission[]>}
         */
        getAllByParams = async (gridParameter: GridParameter) : Promise<PagePermission[]> =>{
            const { currentPage, pageSize, sortModel } = gridParameter;
            const limitCount: number = (pageSize || AppConstant.pageSize);
            const skipCount = (currentPage || 0) * limitCount;           
            const sort = GridUtilityHelper.getSortObject(sortModel);
            const list = await PagePermissionModel.find().sort(sort).skip(skipCount).limit(limitCount);
            return list;
        }  
        
        /**
         * get pagePermission by id
         * 
         * @param {string} id 
         * @returns {Promise<PagePermission | null>}
         */
        getById = async (id: string): Promise<PagePermission | null> => await PagePermissionModel.findOne({ _id : id }); 
        
        /**
         * update pagePermission
         * 
         * @param {object} pagePermission 
         * @returns {Promise<object>}
         */
        update = async (pagePermission: PagePermission) => {
            return await PagePermissionModel.updateOne({ _id : pagePermission._id },
                { $set: { 
                    pageId: pagePermission.pageId,
                    permissionId: pagePermission.permissionId,
                    updatedBy: pagePermission.updatedBy,
                    updatedAt: pagePermission.updatedAt
                }});
        }

        /**
         * delete pagePermission by id
         * 
         * @param {string} id 
         * @returns {Promise<object>}
         */
        delete = async (id: string) => await PagePermissionModel.deleteOne({ _id : id }); 
    }


