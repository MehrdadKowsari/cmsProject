import { GridParameter } from "src/dtos/shared/grid/gridPrameter";
import RolePagePermissionModel, { RolePagePermission } from "../../security/rolePagePermission";
import GridUtilityHelper from "../../../helpers/gridUtilityHelper";
import AppConstant from "src/constants/appConstants";


    export default class RolePagePermissionRepository{
        /**
         * add rolePagePermissionRepository
         * 
         * @param {object} rolePagePermissionRepository 
         * @returns {Promis<object>}
         */
        add = async (rolePagePermissionRepository: RolePagePermission) => await RolePagePermissionModel.create(rolePagePermissionRepository); 
        
        /**
         * count rolePagePermissionRepositories
         * 
         * @returns {Promise<number>}
         */
        count = async (): Promise<number> => await RolePagePermissionModel.count(); 
               
        /**
         * get all rolePagePermissionRepositories
         * 
         * @returns {Promise<RolePagePermission[]>}
         */
        getAll = async () => await RolePagePermissionModel.find(); 
        
        /**
         * get all rolePagePermissionRepositories by parameters
         * 
         * @param {object} gridParameter 
         * @returns {Promise<RolePagePermission[]>}
         */
        getAllByParams = async (gridParameter: GridParameter) : Promise<RolePagePermission[]> =>{
            const { currentPage, pageSize, sortModel } = gridParameter;
            const limitCount: number = (pageSize || AppConstant.pageSize);
            const skipCount = (currentPage || 0) * limitCount;           
            const sort = GridUtilityHelper.getSortObject(sortModel);
            const list = await RolePagePermissionModel.find().sort(sort).skip(skipCount).limit(limitCount);
            return list;
        }  
        
        /**
         * get rolePagePermissionRepository by id
         * 
         * @param {string} id 
         * @returns {Promise<RolePagePermission | null>}
         */
        getById = async (id: string): Promise<RolePagePermission | null> => await RolePagePermissionModel.findOne({ _id : id }); 

         /**
         * is permission exists permission by pageId
         * 
         * @param {string | null} id 
         * @param {string} roleId 
         * @param {string} pagePermissionId 
         * @returns {Promise<boolean>}
         */
         isDuplicate = async (id: string | null, roleId: string, pagePermissionId: string) : Promise<boolean> => 
         {
             return id ? await RolePagePermissionModel.count({ pageId: roleId, permissionId: pagePermissionId, _id: {$ne: id}}) > 0 : await RolePagePermissionModel.count({ name}) > 0;  
         }
        
        /**
         * update rolePagePermissionRepository
         * 
         * @param {object} rolePagePermissionRepository 
         * @returns {Promise<object>}
         */
        update = async (rolePagePermissionRepository: RolePagePermission) => {
            return await RolePagePermissionModel.updateOne({ _id : rolePagePermissionRepository._id },
                { $set: { 
                    roleId: rolePagePermissionRepository.roleId,
                    pagePermissionId: rolePagePermissionRepository.pagePermissionId,
                    updatedBy: rolePagePermissionRepository.updatedBy,
                    updatedAt: rolePagePermissionRepository.updatedAt
                }});
        }

        /**
         * delete rolePagePermissionRepository by id
         * 
         * @param {string} id 
         * @returns {Promise<object>}
         */
        delete = async (id: string) => await RolePagePermissionModel.deleteOne({ _id : id }); 
    }


