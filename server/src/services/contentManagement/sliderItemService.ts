import { SliderItemDTO } from '../../dtos/contentManagement/sliderItem/sliderItemDTO';
import { CRUDResultModel } from '../../models/shared/crud/crudResultModel';
import { MethodResult } from '../../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../../models/shared/enums/crudResultEnum';
import { StatusCodes } from 'http-status-codes';
import { GridData } from '../../models/shared/grid/gridData';
import { AddSliderItemDTO } from '../../dtos/contentManagement/sliderItem/addSliderItemDTO';
import { RequestResult } from '../../models/shared/crud/requestResult';
import { autoInjectable } from 'tsyringe';
import SliderItemRepository from '../../repositories/contentManagement/sliderItemRepository';
import { UpdateSliderItemDTO } from 'src/dtos/contentManagement/sliderItem/updateSliderItemDTO';
import { SliderItem } from 'src/models/contentManagement/sliderItem';
import { Types } from 'mongoose';
import { ListSliderItemByParamsDTO } from 'src/dtos/contentManagement/sliderItem/listSliderItemByParamsDTO';
import { ListActiveSliderItemByParamsDTO } from 'src/dtos/contentManagement/sliderItem/listActiveSliderItemByParamsDTO';

@autoInjectable()
export default class SliderItemService {
    private _sliderItemRepository: SliderItemRepository;
    constructor(sliderItemRepository: SliderItemRepository) {
        this._sliderItemRepository = sliderItemRepository;

    }
    /**
     * add sliderItem
     * 
     * @param {object} addSliderItemDTO
     * @param {string} userId 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    addSliderItem = async (addSliderItemDTO: AddSliderItemDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try { 
            const { sliderId, name, description, file, fileSavePath, fileExtension, linkUrl, linkTarget, priority } = addSliderItemDTO;
            const newSliderItem: SliderItem = {
                _id: null,
                sliderId:  new Types.ObjectId(sliderId!),
                name,
                description,
                priority,
                file,
                fileSavePath,
                fileExtension,
                linkUrl,
                linkTarget,
                isActive: true,
                createdBy: new Types.ObjectId(userId),
                createdAt: new Date()
            }
            await this._sliderItemRepository.add(newSliderItem);
            return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), true));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

       
    /**
     * get all sliderItem list by params
     * @param {object} listActiveSliderItemByParamsDTO
     * @returns {Promise<RequestResult<SliderItemDTO[]> | null>}
     */
    getAllActiveSlidersByParams = async (listActiveSliderItemByParamsDTO : ListActiveSliderItemByParamsDTO): Promise<RequestResult<SliderItemDTO[] | null>> => {
        try {
            const sliderItems: SliderItemDTO[] = (await this._sliderItemRepository.getAllActiveSlidersByParams(listActiveSliderItemByParamsDTO))?.map((sliderItem: any) => <SliderItemDTO>{
                id: sliderItem._id?.toString(),
                sliderId: sliderItem.sliderId,
                sliderSectionName: sliderItem.sliderId?.sectionName,
                name: sliderItem.name,
                description: sliderItem.description,
                file: sliderItem.file,
                fileSavePath: sliderItem.fileSavePath,
                fileExtension: sliderItem.fileExtension,
                linkUrl: sliderItem.linkUrl,
                linkTarget: sliderItem.linkTarget,               
                priority: sliderItem.priority,
                createdBy: sliderItem.createdBy,
                createdAt: sliderItem.createdAt,
                updatedBy: sliderItem.updatedBy,
                updatedAt: sliderItem.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<SliderItemDTO[]>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), sliderItems));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

       
    /**
     * get all sliderItem list by params
     * 
     * @param {object} listSliderItemByParams 
     * @returns {Promise<RequestResult<GridData<SliderItemDTO[]>> | null>}
     */
    getAllByParams = async (listSliderItemByParams: ListSliderItemByParamsDTO): Promise<RequestResult<GridData<SliderItemDTO[]> | null>> => {
        try {
            const totalCount = await this._sliderItemRepository.count();
            const sliderItems: SliderItemDTO[] = (await this._sliderItemRepository.getAllByParams(listSliderItemByParams))?.map((sliderItem: any) => <SliderItemDTO>{
                id: sliderItem._id?.toString(),
                sliderId: sliderItem.sliderId,
                sliderSectionName: sliderItem.sliderId?.sectionName,
                name: sliderItem.name,
                description: sliderItem.description,
                file: sliderItem.file,
                fileSavePath: sliderItem.fileSavePath,
                fileExtension: sliderItem.fileExtension,
                linkUrl: sliderItem.linkUrl,
                linkTarget: sliderItem.linkTarget,               
                priority: sliderItem.priority,
                isActive: sliderItem.isActive,
                createdBy: sliderItem.createdBy,
                createdAt: sliderItem.createdAt,
                updatedBy: sliderItem.updatedBy,
                updatedAt: sliderItem.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<GridData<SliderItemDTO[]>>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), {
                rows: sliderItems,
                totalCount: totalCount
            }));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * get sliderItem by Id
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<SliderItemDTO | null>>}
    */
    getById = async (id: string): Promise<RequestResult<SliderItemDTO | null>> => {
        try {
            const sliderItem = await this._sliderItemRepository.getById(id);
            if (!sliderItem) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'sliderItemDoesNotExist')));
            }
            const sliderItemDTO: SliderItemDTO = <SliderItemDTO>{
                id: sliderItem._id?.toString(),
                sliderId: sliderItem.sliderId.toString(),
                sliderSectionName: (<any>sliderItem.sliderId)?.name,
                name: sliderItem.name,
                description: sliderItem.description,
                file: sliderItem.file,
                fileSavePath: sliderItem.fileSavePath,
                fileExtension: sliderItem.fileExtension,
                linkUrl: sliderItem.linkUrl,
                linkTarget: sliderItem.linkTarget,               
                priority: sliderItem.priority,
                isActive: sliderItem.isActive,
                createdBy: sliderItem.createdBy,
                createdAt: sliderItem.createdAt,
                updatedBy: sliderItem.updatedBy,
                updatedAt: sliderItem.updatedAt
            };
            return new RequestResult(StatusCodes.OK, new MethodResult<SliderItemDTO>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), sliderItemDTO));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * update sliderItem
     * 
     * @param {object} updateSliderItemDTO
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>} 
     */
    update = async (updateSliderItemDTO: UpdateSliderItemDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const { id, sliderId, name, description, file, fileSavePath, fileExtension, linkUrl, linkTarget, priority } = updateSliderItemDTO;
            let sliderItem = await this._sliderItemRepository.getById(id);
            if (sliderItem === null) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'sliderItemDoesNotExist')));
            }

            sliderItem.sliderId =  new Types.ObjectId(sliderId!),
            sliderItem.name = name;
            sliderItem.description = description;
            sliderItem.file = file,
            sliderItem.fileSavePath = fileSavePath,
            sliderItem.linkUrl = linkUrl,
            sliderItem.linkTarget = linkTarget,
            sliderItem.fileExtension = fileExtension,
            sliderItem.priority = priority;
            sliderItem.updatedBy = new Types.ObjectId(userId);
            sliderItem.updatedAt = new Date();

            const { matchedCount } = await this._sliderItemRepository.update(sliderItem);
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
     * get sliderItem by Id
     * 
     * @param {string} id 
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    toggleActive = async (id: string, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const sliderItem = await this._sliderItemRepository.getById(id);
            if (!sliderItem) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'sliderItemDoesNotExist')));
            }
            const toggleIsActive = !sliderItem.isActive;
            const { modifiedCount } = await this._sliderItemRepository.toggleIsActive(id, toggleIsActive, userId);
            if (modifiedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), toggleIsActive));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
       
    /**
     * delete sliderItem
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    delete = async (id: string) => {
        try {
            const { deletedCount } = await this._sliderItemRepository.delete(id);
            if (deletedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), true));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
}

