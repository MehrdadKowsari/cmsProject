import { GridParameter } from "src/dtos/shared/grid/gridPrameter";
import RoleModel, { Role } from "../../security/role";
import GridUtilityHelper from "../../../helpers/gridUtilityHelper";
import AppConstant from "src/constants/appConstants";


    export default class RoleRepository{
        /**
         * add role
         * 
         * @param {object} role 
         * @returns {Promis<object>}
         */
        add = async (role: Role) => await RoleModel.create(role); 
        
        /**
         * count roles
         * 
         * @returns {Promise<number>}
         */
        count = async (): Promise<number> => await RoleModel.count(); 
        
        /**
         * is role exists role by rolename
         * 
         * @param {string | null} id 
         * @param {string} name 
         * @returns {Promise<boolean>}
         */
        isExistsName = async (id: string | null, name: string) : Promise<boolean> => 
        {
            return id ? await RoleModel.count({ name, _id: {$ne: id}}) > 0 : await RoleModel.count({ name}) > 0;  
        }
        
        /**
         * get all roles
         * 
         * @returns {Promise<Role[]>}
         */
        getAll = async () => await RoleModel.find(); 
        
        /**
         * get all roles by parameters
         * 
         * @param {object} gridParameter 
         * @returns {Promise<Role[]>}
         */
        getAllByParams = async (gridParameter: GridParameter) : Promise<Role[]> =>{
            const { currentPage, pageSize, sortModel } = gridParameter;
            const limitCount: number = (pageSize || AppConstant.pageSize);
            const skipCount = (currentPage || 0) * limitCount;           
            const sort = GridUtilityHelper.getSortObject(sortModel);
            const list = await RoleModel.find().sort(sort).skip(skipCount).limit(limitCount);
            return list;
        }  
        
        /**
         * get role by id
         * 
         * @param {string} id 
         * @returns {Promise<Role | null>}
         */
        getById = async (id: string): Promise<Role | null> => await RoleModel.findOne({ _id : id }); 
        
        /**
         * update role
         * 
         * @param {object} role 
         * @returns {Promise<object>}
         */
        update = async (role: Role) => {
            return await RoleModel.updateOne({ _id : role._id },
                { $set: { 
                    name: role.name,
                    description : role.description,
                    updatedBy: role.updatedBy,
                    updatedAt: role.updatedAt
                }});
        }

        /**
         * toggle role active status
         * 
         * @param {string} id 
         * @param {boolean} toggleIsActive
         * @param {string} roleId 
         * @returns {Promise<object>}
         */
        toggleIsActive = async (id: string, toggleIsActive: boolean, roleId: string) => {
            return await RoleModel.updateOne({_id: id}, 
                { $set: { 
                    isActive: toggleIsActive,
                    updatedAt: new Date()
                }}); 
        }

        /**
         * delete role by id
         * 
         * @param {string} id 
         * @returns {Promise<object>}
         */
        delete = async (id: string) => await RoleModel.deleteOne({ _id : id }); 
    }


