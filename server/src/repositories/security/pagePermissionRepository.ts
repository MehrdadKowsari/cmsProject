import { GridParameter } from "../../dtos/shared/grid/gridPrameter";
import PagePermissionModel, { PagePermission } from "../../models/security/pagePermission";
import GridUtilityHelper from "../../helpers/gridUtilityHelper";
import AppConstant from "../../constants/appConstants";
import { PageTypeEnum } from "../../enums/security/pageTypeEnum";
import RolePagePermissionModel from "../../models/security/rolePagePermission";
import { Types } from "mongoose";
import PageModel, { Page } from "../../models/security/page";
import UserRoleModel, { UserRole } from "../../models/security/userRole";


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
        getAll = async () => await PagePermissionModel.find()
        .populate('pageId')
        .populate('permissionId')
        .exec(); 
        
        /**
         * get all pagePermissions by parameters
         * 
         * @param {object} gridParameter 
         * @returns {Promise<PagePermission[]>}
         */
        getAllByParams = async (gridParameter: GridParameter) : Promise<PagePermission[]> =>{
            const { currentPage, pageSize, sortModel } = gridParameter;
            const limitCount: number = (pageSize || AppConstant.PageSize);
            const skipCount = (currentPage || 0) * limitCount;           
            const sort = GridUtilityHelper.getSortObject(sortModel);
            const list = await PagePermissionModel.find().sort(sort).skip(skipCount).limit(limitCount)
            .populate('pageId')
            .populate('permissionId')
            .exec();
            return list;
        }  

        /**
         * get all by pageId and userId
         * 
         * @param {string} pageId 
         * @param {string} userId 
         * @returns {Promise<PagePermission[] | null>}
         */ 
        getAllByUserIdAndPageId = async (pageId: PageTypeEnum, userId: string) : Promise<PagePermission[] | null> => 
        {
           const userRoles: UserRole[] | null = (await UserRoleModel.find({userId: userId}));
           if (!userRoles || userRoles.length === 0) {
               return Promise.resolve(null);
           }
           
           const page: Page | null = (await PageModel.findOne({type: pageId}));
           if (!page || !page.isActive) {
               return Promise.resolve(null);
           }
           
           const pagePermissions: PagePermission[] | null = await PagePermissionModel.find({pageId: page._id})
           .populate('pageId')
            .populate('permissionId');

           if (!pagePermissions) {
               return Promise.resolve(null);
           }
           const pagePermissionIds: Types.ObjectId[] = pagePermissions.map(p => new Types.ObjectId(p._id!.toString()));
           const roleIds: Types.ObjectId[] = userRoles.map(p => new Types.ObjectId(p.roleId!.toString()));
           
           const rolePagePermissions = await RolePagePermissionModel.find({ pagePermissionId: { $in: pagePermissionIds}, roleId: {$in: roleIds}});
           if (!rolePagePermissions) {
               return Promise.resolve(null);
            }
            
            const rolePagePermissionsIds: Types.ObjectId[] = rolePagePermissions.map(p => new Types.ObjectId(p.pagePermissionId!.toString()));
            const resultList = await PagePermissionModel.find({_id: {$in: rolePagePermissionsIds}});
            
            return resultList;
       }
        
        /**
         * get pagePermission by id
         * 
         * @param {string} id 
         * @returns {Promise<PagePermission | null>}
         */
        getById = async (id: string): Promise<PagePermission | null> => await PagePermissionModel.findOne({ _id : id }); 

         /**
         * is permission exists permission by pageId
         * 
         * @param {string | null} id 
         * @param {string} pageId 
         * @param {string} permissionId 
         * @returns {Promise<boolean>}
         */
         isDuplicate = async (id: string | null, pageId: string, permissionId: string) : Promise<boolean> => 
         {
             return id ? await PagePermissionModel.count({ pageId, permissionId, _id: {$ne: id}}) > 0 : await PagePermissionModel.count({ pageId, permissionId}) > 0;  
         }
        
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


