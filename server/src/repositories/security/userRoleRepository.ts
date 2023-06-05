import { GridParameter } from "src/dtos/shared/grid/gridPrameter";
import UserRoleModel, { UserRole } from "src/models/security/userRole";
import GridUtilityHelper from "src/helpers/gridUtilityHelper";
import AppConstant from "src/constants/appConstants";


    export default class UserRoleRepository{
        /**
         * add userRoleRepository
         * 
         * @param {object} userRoleRepository 
         * @returns {Promis<object>}
         */
        add = async (userRoleRepository: UserRole) => await UserRoleModel.create(userRoleRepository); 
        
        /**
         * count userRoleRepositories
         * 
         * @returns {Promise<number>}
         */
        count = async (): Promise<number> => await UserRoleModel.count(); 
               
        /**
         * get all userRoleRepositories
         * 
         * @returns {Promise<UserRole[]>}
         */
        getAll = async () => await UserRoleModel.find(); 
        
        /**
         * get all userRoleRepositories by parameters
         * 
         * @param {object} gridParameter 
         * @returns {Promise<UserRole[]>}
         */
        getAllByParams = async (gridParameter: GridParameter) : Promise<UserRole[]> =>{
            const { currentPage, pageSize, sortModel } = gridParameter;
            const limitCount: number = (pageSize || AppConstant.PageSize);
            const skipCount = (currentPage || 0) * limitCount;           
            const sort = GridUtilityHelper.getSortObject(sortModel);
            const list = await UserRoleModel.find().sort(sort).skip(skipCount).limit(limitCount)
            .populate('userId')
            .populate('roleId')
            .exec();
            return list;
        } 
        
        /**
         * get all userRoles by userId
         * 
         * @param {string} userId 
         * @returns {Promise<UserRole[]>}
         */
        getAllByUserId = async (userId: string) : Promise<UserRole[]> =>{
            const list = await UserRoleModel.find({userId: userId}).populate('roleId');
            return list;
        }  
        
        /**
         * get userRole by id
         * 
         * @param {string} id 
         * @returns {Promise<UserRole | null>}
         */
        getById = async (id: string): Promise<UserRole | null> => await UserRoleModel.findOne({ _id : id }); 

         /**
         * is permission exists permission by pageId
         * 
         * @param {string | null} id 
         * @param {string} userId 
         * @param {string} roleId 
         * @returns {Promise<boolean>}
         */
         isDuplicate = async (id: string | null, userId: string, roleId: string) : Promise<boolean> => 
         {
             return id ? await UserRoleModel.count({ userId, roleId, _id: {$ne: id}}) > 0 : await UserRoleModel.count({ userId, roleId}) > 0;  
         }
        
        /**
         * update userRoleRepository
         * 
         * @param {object} userRoleRepository 
         * @returns {Promise<object>}
         */
        update = async (userRoleRepository: UserRole) => {
            return await UserRoleModel.updateOne({ _id : userRoleRepository._id },
                { $set: { 
                    userId: userRoleRepository.userId,
                    roleId: userRoleRepository.roleId,
                    updatedBy: userRoleRepository.updatedBy,
                    updatedAt: userRoleRepository.updatedAt
                }});
        }

        /**
         * delete userRoleRepository by id
         * 
         * @param {string} id 
         * @returns {Promise<object>}
         */
        delete = async (id: string) => await UserRoleModel.deleteOne({ _id : id }); 
    }


