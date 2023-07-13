import { MenuItemDTO } from '../../dtos/contentManagement/menuItem/menuItemDTO';
import { CRUDResultModel } from '../../models/shared/crud/crudResultModel';
import { MethodResult } from '../../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../../models/shared/enums/crudResultEnum';
import { StatusCodes } from 'http-status-codes';
import { GridData } from '../../models/shared/grid/gridData';
import { AddMenuItemDTO } from '../../dtos/contentManagement/menuItem/addMenuItemDTO';
import { RequestResult } from '../../models/shared/crud/requestResult';
import { autoInjectable } from 'tsyringe';
import MenuItemRepository from '../../repositories/contentManagement/menuItemRepository';
import { UpdateMenuItemDTO } from 'src/dtos/contentManagement/menuItem/updateMenuItemDTO';
import { MenuItem } from 'src/models/contentManagement/menuItem';
import { Types } from 'mongoose';
import { ListMenuItemByParamsDTO } from 'src/dtos/contentManagement/menuItem/listMenuItemByParamsDTO';

@autoInjectable()
export default class MenuItemService {
    private _menuItemRepository: MenuItemRepository;
    constructor(menuItemRepository: MenuItemRepository) {
        this._menuItemRepository = menuItemRepository;

    }
    /**
     * add menuItem
     * 
     * @param {object} addMenuItemDTO
     * @param {string} userId 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    addMenuItem = async (addMenuItemDTO: AddMenuItemDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try { 
            const { menuId, parentId, name, description, type, image, imageSavePath, level, url, slugUrl, target, rel, iconCssClass, iconSavePath, priority } = addMenuItemDTO;
            const newMenuItem: MenuItem = {
                _id: null,
                menuId:  new Types.ObjectId(menuId!),
                parentId: parentId ? new Types.ObjectId(parentId) : null,
                name,
                description,
                type,
                image,
                imageSavePath,
                level,
                url,
                slugUrl,
                target,
                iconCssClass,
                priority,
                iconSavePath,
                isActive: true,
                createdBy: new Types.ObjectId(userId),
                createdAt: new Date()
            }
            await this._menuItemRepository.add(newMenuItem);
            return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), true));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

       
    /**
     * get all menuItem list by params
     * 
     * @returns {Promise<RequestResult<MenuItemDTO[]> | null>}
     */
    getAll = async (): Promise<RequestResult<MenuItemDTO[] | null>> => {
        try {
            const menuItems: MenuItemDTO[] = (await this._menuItemRepository.getAll())?.map((menuItem: any) => <MenuItemDTO>{
                id: menuItem._id?.toString(),
                menuId: menuItem.menuId,
                menuName: menuItem.menuId?.name,
                parentId: menuItem.parentId?.toString(),
                parentName: (<any>menuItem.menuId)?.name,
                name: menuItem.name,
                description: menuItem.description,
                type: menuItem.type,
                image: menuItem.image,
                imageSavePath: menuItem.imageSavePath,
                level: menuItem.level,
                url: menuItem.url,
                slugUrl: menuItem.slugUrl,
                target: menuItem.target,
                iconCssClass: menuItem.iconCssClass,               
                priority: menuItem.priority,
                createdBy: menuItem.createdBy,
                createdAt: menuItem.createdAt,
                updatedBy: menuItem.updatedBy,
                updatedAt: menuItem.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<MenuItemDTO[]>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), menuItems));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

    /**
     * get all menuItem list by params
     * 
     * @param {object} listMenuItemByParams 
     * @returns {Promise<RequestResult<GridData<MenuItemDTO[]>> | null>}
     */
    getAllByParams = async (listMenuItemByParams: ListMenuItemByParamsDTO): Promise<RequestResult<GridData<MenuItemDTO[]> | null>> => {
        try {
            const totalCount = await this._menuItemRepository.count();
            const menuItems: MenuItemDTO[] = (await this._menuItemRepository.getAllByParams(listMenuItemByParams))?.map((menuItem: any) => <MenuItemDTO>{
                id: menuItem._id?.toString(),
                menuId: menuItem.menuId,
                menuName: menuItem.menuId?.name,
                parentId: menuItem.parentId?.toString(),
                parentName: (<any>menuItem.menuId)?.name,
                name: menuItem.name,
                description: menuItem.description,
                type: menuItem.type,
                image: menuItem.image,
                imageSavePath: menuItem.imageSavePath,
                level: menuItem.level,
                url: menuItem.url,
                slugUrl: menuItem.slugUrl,
                target: menuItem.target,
                iconCssClass: menuItem.iconCssClass,               
                priority: menuItem.priority,
                createdBy: menuItem.createdBy,
                createdAt: menuItem.createdAt,
                updatedBy: menuItem.updatedBy,
                updatedAt: menuItem.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<GridData<MenuItemDTO[]>>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), {
                rows: menuItems,
                totalCount: totalCount
            }));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * get menuItem by Id
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<MenuItemDTO | null>>}
    */
    getById = async (id: string): Promise<RequestResult<MenuItemDTO | null>> => {
        try {
            const menuItem = await this._menuItemRepository.getById(id);
            if (!menuItem) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'menuItemDoesNotExist')));
            }
            const menuItemDTO: MenuItemDTO = <MenuItemDTO>{
                id: menuItem._id?.toString(),
                menuId: menuItem.menuId.toString(),
                menuName: (<any>menuItem.menuId)?.name,
                parentId: menuItem.parentId?.toString(),
                parentName: (<any>menuItem.menuId)?.name,
                name: menuItem.name,
                description: menuItem.description,
                image: menuItem.image,
                imageSavePath: menuItem.imageSavePath,
                level: menuItem.level,
                url: menuItem.url,
                slugUrl: menuItem.slugUrl,               
                priority: menuItem.priority,
                isActive: menuItem.isActive,
                target: menuItem.target,
                iconCssClass: menuItem.iconCssClass,
                createdBy: menuItem.createdBy,
                createdAt: menuItem.createdAt,
                updatedBy: menuItem.updatedBy,
                updatedAt: menuItem.updatedAt
            };
            return new RequestResult(StatusCodes.OK, new MethodResult<MenuItemDTO>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), menuItemDTO));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * update menuItem
     * 
     * @param {object} updateMenuItemDTO
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>} 
     */
    update = async (updateMenuItemDTO: UpdateMenuItemDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const { id, menuId, parentId, name, description, type, image, imageSavePath, level, url, slugUrl, target, rel, iconCssClass, iconSavePath, priority } = updateMenuItemDTO;
            let menuItem = await this._menuItemRepository.getById(id);
            if (menuItem === null) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'menuItemDoesNotExist')));
            }

            menuItem.menuId =  new Types.ObjectId(menuId!),
            menuItem.parentId = parentId ? new Types.ObjectId(parentId!) : null,
            menuItem.name = name;
            menuItem.description = description;
            menuItem.type = type;
            menuItem.image = image,
            menuItem.imageSavePath = imageSavePath,
            menuItem.url = url,
            menuItem.slugUrl = slugUrl,
            menuItem.target = target,
            menuItem.iconCssClass = iconCssClass,
            menuItem.iconSavePath = iconSavePath,
            menuItem.level = level,
            menuItem.priority = priority;
            menuItem.updatedBy = new Types.ObjectId(userId);
            menuItem.updatedAt = new Date();

            const { matchedCount } = await this._menuItemRepository.update(menuItem);
            if (matchedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), true));
            }
            else {
                return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
            }
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

    /**
     * get menuItem by Id
     * 
     * @param {string} id 
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    toggleActive = async (id: string, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const menuItem = await this._menuItemRepository.getById(id);
            if (!menuItem) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'menuItemDoesNotExist')));
            }
            const toggleIsActive = !menuItem.isActive;
            const { modifiedCount } = await this._menuItemRepository.toggleIsActive(id, toggleIsActive, userId);
            if (modifiedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), toggleIsActive));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
       
    /**
     * delete menuItem
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    delete = async (id: string) => {
        try {
            const { deletedCount } = await this._menuItemRepository.delete(id);
            if (deletedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), true));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
}

