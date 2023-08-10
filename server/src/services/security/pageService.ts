import { PageDTO } from '../../dtos/security/page/pageDTO';
import { CRUDResultModel } from '../../models/shared/crud/crudResultModel';
import { MethodResult } from '../../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../../models/shared/enums/crudResultEnum';
import { StatusCodes } from 'http-status-codes';
import { GridData } from '../../models/shared/grid/gridData';
import { AddPageDTO } from '../../dtos/security/page/addPageDTO';
import { RequestResult } from '../../models/shared/crud/requestResult';
import { autoInjectable } from 'tsyringe';
import PageRepository from '../../repositories/security/pageRepository';
import { GridParameter } from 'src/dtos/shared/grid/gridPrameter';
import { UpdatePageDTO } from 'src/dtos/security/page/updatePageDTO';
import { Page } from 'src/models/security/page';
import { Types } from 'mongoose';

@autoInjectable()
export default class PageService {
    private _pageRepository: PageRepository;
    constructor(pageRepository: PageRepository) {
        this._pageRepository = pageRepository;

    }
    /**
     * add page
     * 
     * @param {object} addPageDTO
     * @param {string} userId 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    addPage = async (addPageDTO: AddPageDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try { 
            const { parentId, type, name, priority, iconClass, path } = addPageDTO;
            const newPage: Page = {
                _id: null,
                parentId: new Types.ObjectId(parentId),
                name,
                type,
                priority,
                iconClass,
                path,
                isActive: true,
                isHidden: true,
                createdBy: new Types.ObjectId(userId),
                createdAt: new Date()
            }
            await this._pageRepository.add(newPage);
            return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), true));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

       
    /**
     * get all page list by params
     * 
     * @returns {Promise<RequestResult<PageDTO[]> | null>}
     */
    getAll = async (): Promise<RequestResult<PageDTO[] | null>> => {
        try {
            const pages: PageDTO[] = (await this._pageRepository.getAll())?.map((page: any) => <PageDTO>{
                id: page._id?.toString(),
                parentId: page.parentId,
                parentName: page.parentId?.name,
                name: page.name,
                type: page.type,
                priority: page.priority,
                iconClass: page.iconClass,
                path: page.path,
                isActive: page.isActive,
                isHidden: page.isHidden,
                createdBy: page.createdBy,
                createdAt: page.createdAt,
                updatedBy: page.updatedBy,
                updatedAt: page.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<PageDTO[]>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), pages));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

       
    /**
     * get all page list by params
     * 
     * @param {object} gridParameter 
     * @returns {Promise<RequestResult<GridData<PageDTO[]>> | null>}
     */
    getAllByParams = async (gridParameter: GridParameter): Promise<RequestResult<GridData<PageDTO[]> | null>> => {
        try {
            const totalCount = await this._pageRepository.count();
            const pages: PageDTO[] = (await this._pageRepository.getAllByParams(gridParameter))?.map((page: any) => <PageDTO>{
                id: page._id?.toString(),
                parentId: page.parentId,
                parentName: page.parentId?.name,
                name: page.name,
                type: page.type,
                priority: page.priority,
                iconClass: page.iconClass,
                path: page.path,
                isActive: page.isActive,
                isHidden: page.isHidden,
                createdBy: page.createdBy,
                createdAt: page.createdAt,
                updatedBy: page.updatedBy,
                updatedAt: page.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<GridData<PageDTO[]>>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), {
                rows: pages,
                totalCount: totalCount
            }));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * get all page list by userId
     * 
     * @param {string} userId 
     * @returns {Promise<RequestResult<PageDTO[]> | null>}
     */
    getAllByUserId = async (userId: string): Promise<RequestResult<PageDTO[] | null>> => {
        try {
            const pages: PageDTO[] = (await this._pageRepository.getAllByUserId(userId))?.map((page: any) => <PageDTO>{
                id: page._id?.toString(),
                parentId: page.parentId,
                parentName: page.parentId?.name,
                name: page.name,
                type: page.type,
                priority: page.priority,
                iconClass: page.iconClass,
                path: page.path,
                isActive: page.isActive,
                isHidden: page.isHidden,
                createdBy: page.createdBy,
                createdAt: page.createdAt,
                updatedBy: page.updatedBy,
                updatedAt: page.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<PageDTO[]>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), pages));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * get page by Id
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<PageDTO | null>>}
    */
    getById = async (id: string): Promise<RequestResult<PageDTO | null>> => {
        try {
            const page = await this._pageRepository.getById(id);
            if (!page) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'pageDoesNotExist')));
            }
            const pageDTO: PageDTO = <PageDTO>{
                id: page._id?.toString(),
                parentId: page.parentId?.toString(),
                name: page.name,
                type: page.type,
                priority: page.priority,
                iconClass: page.iconClass,
                path: page.path,
                isActive: page.isActive,
                isHidden: page.isHidden,
            };
            return new RequestResult(StatusCodes.OK, new MethodResult<PageDTO>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), pageDTO));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * update page
     * 
     * @param {object} updatePageDTO
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>} 
     */
    update = async (updatePageDTO: UpdatePageDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const { id, parentId, name, type, priority, iconClass, path } = updatePageDTO;
            let page = await this._pageRepository.getById(id);
            if (page === null) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'pageDoesNotExist')));
            }

            page.parentId = new Types.ObjectId(parentId);
            page.name = name;
            page.type = type;
            page.priority = priority;
            page.iconClass = iconClass;
            page.path = path;
            page.updatedBy = new Types.ObjectId(userId);
            page.updatedAt = new Date();

            const { matchedCount } = await this._pageRepository.update(page);
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
     * get page by Id
     * 
     * @param {string} id 
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    toggleActive = async (id: string, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const page = await this._pageRepository.getById(id);
            if (!page) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'pageDoesNotExist')));
            }
            const toggleIsActive = !page.isActive;
            const { modifiedCount } = await this._pageRepository.toggleIsActive(id, toggleIsActive, userId);
            if (modifiedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), toggleIsActive));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * get page by Id
     * 
     * @param {string} id 
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    toggleHidden = async (id: string, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const page = await this._pageRepository.getById(id);
            if (!page) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'pageDoesNotExist')));
            }
            const toggleIsHidden = !page.isHidden;
            const { modifiedCount } = await this._pageRepository.toggleIsHidden(id, toggleIsHidden, userId);
            if (modifiedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), toggleIsHidden));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * delete page
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    delete = async (id: string) => {
        try {
            const { deletedCount } = await this._pageRepository.delete(id);
            if (deletedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), true));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
}

