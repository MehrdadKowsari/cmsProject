import { GridParameter } from "../../dtos/shared/grid/gridPrameter";
import RolePagePermissionModel, { RolePagePermission } from "../../models/security/rolePagePermission";
import GridUtilityHelper from "../../helpers/gridUtilityHelper";
import AppConstant from "../../constants/appConstants";
import PagePermissionModel, { PagePermission } from "../../models/security/pagePermission";
import UserRoleModel, { UserRole } from "../../models/security/userRole";
import { PageTypeEnum } from "../../enums/security/pageTypeEnum";
import { PermissionTypeEnum } from "../../enums/security/permissionTypeEnum";
import PermissionModel, { Permission } from "../../models/security/permission";
import PageModel, { Page } from "../../models/security/page";
import { Types } from "mongoose";


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
            const limitCount: number = (pageSize || AppConstant.PageSize);
            const skipCount = (currentPage || 0) * limitCount;           
            const sort = GridUtilityHelper.getSortObject(sortModel);
            const list = await RolePagePermissionModel.find().sort(sort).skip(skipCount).limit(limitCount)          
            .populate({
                path : 'pagePermissionId',
                populate : {
                  path : 'pageId permissionId'
                },
              })
            .populate('roleId');
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
         *  get all by pageId and userId
         * 
         * @param {string} pageId 
         * @param {string} userId 
         * @returns {Promise<RolePagePermission[] | null>}
         */
         
         getAllByUserIdAndPageId = async (pageId: PageTypeEnum, userId: string) : Promise<RolePagePermission[] | null> => 
         {
            const userRoles: UserRole[] | null = (await UserRoleModel.find({userId: userId}));
            if (!userRoles || userRoles.length === 0) {
                return Promise.resolve(null);
            }
            
            const page: Page | null = (await PageModel.findOne({type: pageId}));
            if (!page || !page.isActive) {
                return Promise.resolve(null);
            }
            
            const pagePermissions: PagePermission[] | null = await PagePermissionModel.find({pageId: page._id});
            if (!pagePermissions) {
                return Promise.resolve(null);
            }
            const pagePermissionIds: Types.ObjectId[] = pagePermissions.map(p => new Types.ObjectId(p._id!.toString()));
            const roleIds: Types.ObjectId[] = userRoles.map(p => new Types.ObjectId(p.roleId!.toString()));

            return await RolePagePermissionModel.find({ pagePermissionId: { $in: pagePermissionIds}, roleId: {$in: roleIds}})
            .populate({
                path : 'pagePermissionId',
                populate : {
                  path : 'pageId permissionId'
                },
              });  
        }
        
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
             return id ? await RolePagePermissionModel.count({ roleId, pagePermissionId, _id: {$ne: id}}) > 0 : await RolePagePermissionModel.count({ roleId, pagePermissionId}) > 0;  
         }
         
         /**
         * is permission exists permission by pageId
         * 
         * @param {string} pageId 
         * @param {string} permissionId 
         * @param {string} userId 
         * @returns {Promise<boolean>}
         */
         
         hasPermissionByPageIdAndPermissionIdAndRoleList = async (pageId: PageTypeEnum, permissionId: PermissionTypeEnum, userId: string) : Promise<boolean> => 
         {
            const userRoles: UserRole[] | null = (await UserRoleModel.find({userId: userId}));
            if (!userRoles || userRoles.length === 0) {
                return Promise.resolve(false);
            }
            const permission: Permission | null = (await PermissionModel.findOne({type: permissionId}));
            if (!permission) {
                return Promise.resolve(false);
            }
            const page: Page | null = (await PageModel.findOne({type: pageId}));
            if (!page || !page.isActive) {
                return Promise.resolve(false);
            }
            
            const roleIds: Types.ObjectId[] = userRoles.map(p => new Types.ObjectId(p.roleId!.toString()));
        
            const pagePermission: PagePermission | null = await PagePermissionModel.findOne({pageId: page._id, permissionId: permission._id});
            if (!pagePermission) {
                return Promise.resolve(false);
            }
             return await RolePagePermissionModel.count({ pagePermissionId: pagePermission._id?.toString(), roleId: {$in: roleIds}}) > 0;  
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


