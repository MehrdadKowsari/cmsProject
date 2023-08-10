import { GridParameter } from "src/dtos/shared/grid/gridPrameter";
import PageModel, { Page } from "src/models/security/page";
import GridUtilityHelper from "src/helpers/gridUtilityHelper";
import AppConstant from "src/constants/appConstants";
import UserRoleModel from "src/models/security/userRole";
import RolePagePermissionModel from "src/models/security/rolePagePermission";
import PagePermissionModel from "src/models/security/pagePermission";


    export default class PageRepository{
        /**
         * add page
         * 
         * @param {object} page 
         * @returns {Promis<object>}
         */
        add = async (page: Page) => await PageModel.create(page); 
        
        /**
         * count pages
         * 
         * @returns {Promise<number>}
         */
        count = async (): Promise<number> => await PageModel.count(); 
               
        /**
         * get all pages
         * 
         * @returns {Promise<Page[]>}
         */
        getAll = async () => await PageModel.find()
        .populate('parentId')
        .exec(); 
        
        /**
         * get all pages by parameters
         * 
         * @param {object} gridParameter 
         * @returns {Promise<Page[]>}
         */
        getAllByParams = async (gridParameter: GridParameter) : Promise<Page[]> =>{
            const { currentPage, pageSize, sortModel } = gridParameter;
            const limitCount: number = (pageSize || AppConstant.PageSize);
            const skipCount = (currentPage || 0) * limitCount;           
            const sort = GridUtilityHelper.getSortObject(sortModel);
            const list = await PageModel.find().sort(sort).skip(skipCount).limit(limitCount)
            .populate('parentId')
            .exec();
            return list;
        }
        
        /**
         * get all pages by userId
         * 
         * @param {string} userId 
         * @returns {Promise<Page[]>}
         */
        getAllByUserId = async (userId: string) : Promise<Page[]> =>{
            const userRoleIds = (await UserRoleModel.find({ userId }))?.map(p => p.roleId);
            const pagePermissionIds = (await RolePagePermissionModel.find({ roleId :  { $in : userRoleIds} }))?.map(p => p.pagePermissionId);
            const pageIds = (await PagePermissionModel.find({ _id :  { $in : pagePermissionIds} }))?.map(p => p.pageId);
            const list = await PageModel.find({ _id : { $in: pageIds}}).sort({ priority: 'asc'})
            return list;
        }  
        
        /**
         * get page by id
         * 
         * @param {string} id 
         * @returns {Promise<Page | null>}
         */
        getById = async (id: string): Promise<Page | null> => await PageModel.findOne({ _id : id }); 
        
        /**
         * update page
         * 
         * @param {object} page 
         * @returns {Promise<object>}
         */
        update = async (page: Page) => {
            return await PageModel.updateOne({ _id : page._id },
                { $set: { 
                    parentId: page.parentId,
                    name: page.name,
                    type: page.type,
                    priority : page.priority,
                    iconClass : page.iconClass,
                    path : page.path,
                    updatedBy: page.updatedBy,
                    updatedAt: page.updatedAt
                }});
        }

        /**
         * toggle page active status
         * 
         * @param {string} id 
         * @param {boolean} toggleIsHidden
         * @param {string} userId 
         * @returns {Promise<object>}
         */
        toggleIsHidden = async (id: string, toggleIsHidden: boolean, userId: string) => {
            return await PageModel.updateOne({_id: id}, 
                { $set: { 
                    isHidden: toggleIsHidden,
                    updatedBy: userId,
                    updatedAt: new Date()
                }}); 
        }
        
        /**
         * toggle page active status
         * 
         * @param {string} id 
         * @param {boolean} toggleIsActive
         * @param {string} userId 
         * @returns {Promise<object>}
         */
        toggleIsActive = async (id: string, toggleIsActive: boolean, userId: string) => {
            return await PageModel.updateOne({_id: id}, 
                { $set: { 
                    isActive: toggleIsActive,
                    updatedBy: userId,
                    updatedAt: new Date()
                }}); 
        }

        /**
         * delete page by id
         * 
         * @param {string} id 
         * @returns {Promise<object>}
         */
        delete = async (id: string) => await PageModel.deleteOne({ _id : id }); 
    }


