import { GridParameter } from "../../dtos/shared/grid/gridPrameter";
import PermissionModel, { Permission } from "../../models/security/permission";
import GridUtilityHelper from "../../helpers/gridUtilityHelper";
import AppConstant from "../../constants/appConstants";


    export default class PermissionRepository{
        /**
         * add permission
         * 
         * @param {object} permission 
         * @returns {Promis<object>}
         */
        add = async (permission: Permission) => await PermissionModel.create(permission); 
        
        /**
         * count permissions
         * 
         * @returns {Promise<number>}
         */
        count = async (): Promise<number> => await PermissionModel.count(); 
        
        /**
         * is permission exists permission by name
         * 
         * @param {string | null} id 
         * @param {string} name 
         * @returns {Promise<boolean>}
         */
        isExistsName = async (id: string | null, name: string) : Promise<boolean> => 
        {
            return id ? await PermissionModel.count({ name, _id: {$ne: id}}) > 0 : await PermissionModel.count({ name}) > 0;  
        }
        
        /**
         * get all permissions
         * 
         * @returns {Promise<Permission[]>}
         */
        getAll = async () => await PermissionModel.find(); 
        
        /**
         * get all permissions by parameters
         * 
         * @param {object} gridParameter 
         * @returns {Promise<Permission[]>}
         */
        getAllByParams = async (gridParameter: GridParameter) : Promise<Permission[]> =>{
            const { currentPage, pageSize, sortModel } = gridParameter;
            const limitCount: number = (pageSize || AppConstant.PageSize);
            const skipCount = (currentPage || 0) * limitCount;           
            const sort = GridUtilityHelper.getSortObject(sortModel);
            const list = await PermissionModel.find().sort(sort).skip(skipCount).limit(limitCount);
            return list;
        }  
        
        /**
         * get permission by id
         * 
         * @param {string} id 
         * @returns {Promise<Permission | null>}
         */
        getById = async (id: string): Promise<Permission | null> => await PermissionModel.findOne({ _id : id }); 
        
        /**
         * update permission
         * 
         * @param {object} permission 
         * @returns {Promise<object>}
         */
        update = async (permission: Permission) => {
            return await PermissionModel.updateOne({ _id : permission._id },
                { $set: { 
                    name: permission.name,
                    type: permission.type,
                    description : permission.description,
                    updatedBy: permission.updatedBy,
                    updatedAt: permission.updatedAt
                }});
        }

        /**
         * toggle permission active status
         * 
         * @param {string} id 
         * @param {boolean} toggleIsActive
         * @param {string} userId 
         * @returns {Promise<object>}
         */
        toggleIsActive = async (id: string, toggleIsActive: boolean, userId: string) => {
            return await PermissionModel.updateOne({_id: id}, 
                { $set: { 
                    isActive: toggleIsActive,
                    updatedBy: userId,
                    updatedAt: new Date()
                }}); 
        }

        /**
         * delete permission by id
         * 
         * @param {string} id 
         * @returns {Promise<object>}
         */
        delete = async (id: string) => await PermissionModel.deleteOne({ _id : id }); 
    }


