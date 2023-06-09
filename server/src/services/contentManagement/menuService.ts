import { MenuDTO } from '../../dtos/contentManagement/menu/menuDTO';
import { CRUDResultModel } from '../../models/shared/crud/crudResultModel';
import { MethodResult } from '../../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../../models/shared/enums/crudResultEnum';
import { StatusCodes } from 'http-status-codes';
import { GridData } from '../../models/shared/grid/gridData';
import { AddMenuDTO } from '../../dtos/contentManagement/menu/addMenuDTO';
import { RequestResult } from '../../models/shared/crud/requestResult';
import { autoInjectable } from 'tsyringe';
import MenuRepository from '../../repositories/contentManagement/menuRepository';
import { GridParameter } from 'src/dtos/shared/grid/gridPrameter';
import { UpdateMenuDTO } from 'src/dtos/contentManagement/menu/updateMenuDTO';
import { Menu } from 'src/models/contentManagement/menu';
import { Types } from 'mongoose';

@autoInjectable()
export default class MenuService {
    private _menuRepository: MenuRepository;
    constructor(menuRepository: MenuRepository) {
        this._menuRepository = menuRepository;

    }
    /**
     * add menu
     * 
     * @param {object} addMenuDTO
     * @param {string} userId 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    addMenu = async (addMenuDTO: AddMenuDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try { 
            const { name, description, sectionName, priority, locale } = addMenuDTO;
            const newMenu: Menu = {
                _id: null,
                name,
                description,
                sectionName,
                priority,
                locale,
                isActive: true,
                createdBy: new Types.ObjectId(userId),
                createdAt: new Date()
            }
            await this._menuRepository.add(newMenu);
            return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), true));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

       
    /**
     * get all menu list by params
     * 
     * @returns {Promise<RequestResult<MenuDTO[]> | null>}
     */
    getAll = async (): Promise<RequestResult<MenuDTO[] | null>> => {
        try {
            const menus: MenuDTO[] = (await this._menuRepository.getAll())?.map((menu: any) => <MenuDTO>{
                id: menu._id?.toString(),
                name: menu.name,
                description: menu.description,
                sectionName: menu.sectionName,
                locale: menu.locale,
                priority: menu.priority,
                isActive: menu.isActive,
                createdBy: menu.createdBy,
                createdAt: menu.createdAt,
                updatedBy: menu.updatedBy,
                updatedAt: menu.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<MenuDTO[]>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), menus));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

       
    /**
     * get all menu list by params
     * 
     * @param {object} gridParameter 
     * @returns {Promise<RequestResult<GridData<MenuDTO[]>> | null>}
     */
    getAllByParams = async (gridParameter: GridParameter): Promise<RequestResult<GridData<MenuDTO[]> | null>> => {
        try {
            const totalCount = await this._menuRepository.count();
            const menus: MenuDTO[] = (await this._menuRepository.getAllByParams(gridParameter))?.map((menu: any) => <MenuDTO>{
                id: menu._id?.toString(),
                name: menu.name,
                description: menu.description,
                sectionName: menu.sectionName,
                isActive: menu.isActive,
                locale: menu.locale,
                priority: menu.priority,
                createdBy: menu.createdBy,
                createdAt: menu.createdAt,
                updatedBy: menu.updatedBy,
                updatedAt: menu.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<GridData<MenuDTO[]>>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), {
                rows: menus,
                totalCount: totalCount
            }));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * get menu by Id
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<MenuDTO | null>>}
    */
    getById = async (id: string): Promise<RequestResult<MenuDTO | null>> => {
        try {
            const menu = await this._menuRepository.getById(id);
            if (!menu) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'menuDoesNotExist')));
            }
            const menuDTO: MenuDTO = <MenuDTO>{
                id: menu._id?.toString(),
                name: menu.name,
                sectionName: menu.sectionName,
                locale: menu.locale,
                priority: menu.priority,
                description: menu.description,
                isActive: menu.isActive
            };
            return new RequestResult(StatusCodes.OK, new MethodResult<MenuDTO>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), menuDTO));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * update menu
     * 
     * @param {object} updateMenuDTO
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>} 
     */
    update = async (updateMenuDTO: UpdateMenuDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const { id, name, description, sectionName, priority, locale } = updateMenuDTO;
            let menu = await this._menuRepository.getById(id);
            if (menu === null) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'menuDoesNotExist')));
            }

            menu.name = name;
            menu.sectionName = sectionName,
            menu.priority = priority,
            menu.locale = locale,
            menu.priority = priority;
            menu.description = description;
            menu.updatedBy = new Types.ObjectId(userId);
            menu.updatedAt = new Date();

            const { matchedCount } = await this._menuRepository.update(menu);
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
     * get menu by Id
     * 
     * @param {string} id 
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    toggleActive = async (id: string, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const menu = await this._menuRepository.getById(id);
            if (!menu) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'menuDoesNotExist')));
            }
            const toggleIsActive = !menu.isActive;
            const { modifiedCount } = await this._menuRepository.toggleIsActive(id, toggleIsActive, userId);
            if (modifiedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), toggleIsActive));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * delete menu
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    delete = async (id: string) => {
        try {
            const { deletedCount } = await this._menuRepository.delete(id);
            if (deletedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), true));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
}

