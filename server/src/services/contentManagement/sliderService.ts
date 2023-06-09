import { SliderDTO } from '../../dtos/contentManagement/slider/sliderDTO';
import { CRUDResultModel } from '../../models/shared/crud/crudResultModel';
import { MethodResult } from '../../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../../models/shared/enums/crudResultEnum';
import { StatusCodes } from 'http-status-codes';
import { GridData } from '../../models/shared/grid/gridData';
import { AddSliderDTO } from '../../dtos/contentManagement/slider/addSliderDTO';
import { RequestResult } from '../../models/shared/crud/requestResult';
import { autoInjectable } from 'tsyringe';
import SliderRepository from '../../repositories/contentManagement/sliderRepository';
import { GridParameter } from 'src/dtos/shared/grid/gridPrameter';
import { UpdateSliderDTO } from 'src/dtos/contentManagement/slider/updateSliderDTO';
import { Slider } from 'src/models/contentManagement/slider';
import { Types } from 'mongoose';

@autoInjectable()
export default class SliderService {
    private _sliderRepository: SliderRepository;
    constructor(sliderRepository: SliderRepository) {
        this._sliderRepository = sliderRepository;

    }
    /**
     * add slider
     * 
     * @param {object} addSliderDTO
     * @param {string} userId 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    addSlider = async (addSliderDTO: AddSliderDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try { 
            const { articleCategoryId, galleryId, name, description, sectionName, type, allowedFileExtension, params, priority, locale } = addSliderDTO;
            const newSlider: Slider = {
                _id: null,
                articleCategoryId:  articleCategoryId ? new Types.ObjectId(articleCategoryId!) : null,
                galleryId: galleryId ? new Types.ObjectId(galleryId) : null,
                name,
                description,
                sectionName,
                type,
                allowedFileExtension,
                params,
                priority,
                locale,
                isActive: true,
                createdBy: new Types.ObjectId(userId),
                createdAt: new Date()
            }
            await this._sliderRepository.add(newSlider);
            return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), true));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

       
    /**
     * get all slider list by params
     * 
     * @returns {Promise<RequestResult<SliderDTO[]> | null>}
     */
    getAll = async (): Promise<RequestResult<SliderDTO[] | null>> => {
        try {
            const sliders: SliderDTO[] = (await this._sliderRepository.getAll())?.map((slider: any) => <SliderDTO>{
                id: slider._id?.toString(),
                articleCategoryId: slider.articleCategoryId,
                articleCategoryName: slider.articleCategoryId?.name,
                galleryId: slider.galleryId,
                galleryName: slider.galleryId?.name,
                name: slider.name,
                description: slider.description,
                sectionName: slider.sectionName,
                type: slider.type,
                allowedFileExtension: slider.allowedFileExtension,
                params: slider.params,
                locale: slider.locale,
                priority: slider.priority,
                isActive: slider.isActive,
                createdBy: slider.createdBy,
                createdAt: slider.createdAt,
                updatedBy: slider.updatedBy,
                updatedAt: slider.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<SliderDTO[]>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), sliders));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }

       
    /**
     * get all slider list by params
     * 
     * @param {object} gridParameter 
     * @returns {Promise<RequestResult<GridData<SliderDTO[]>> | null>}
     */
    getAllByParams = async (gridParameter: GridParameter): Promise<RequestResult<GridData<SliderDTO[]> | null>> => {
        try {
            const totalCount = await this._sliderRepository.count();
            const sliders: SliderDTO[] = (await this._sliderRepository.getAllByParams(gridParameter))?.map((slider: any) => <SliderDTO>{
                id: slider._id?.toString(),
                articleCategoryId: slider.articleCategoryId,
                articleCategoryName: slider.articleCategoryId?.name,
                name: slider.name,
                sectionName: slider.sectionName,
                type: slider.type,
                allowedFileExtension: slider.allowedFileExtension,
                params: slider.params,
                locale: slider.locale,
                priority: slider.priority,
                description: slider.description,
                isActive: slider.isActive,
                createdBy: slider.createdBy,
                createdAt: slider.createdAt,
                updatedBy: slider.updatedBy,
                updatedAt: slider.updatedAt
            });
            return new RequestResult(StatusCodes.OK, new MethodResult<GridData<SliderDTO[]>>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), {
                rows: sliders,
                totalCount: totalCount
            }));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * get slider by Id
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<SliderDTO | null>>}
    */
    getById = async (id: string): Promise<RequestResult<SliderDTO | null>> => {
        try {
            const slider = await this._sliderRepository.getById(id);
            if (!slider) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'sliderDoesNotExist')));
            }
            const sliderDTO: SliderDTO = <SliderDTO>{
                id: slider._id?.toString(),
                articleCategoryId: slider.articleCategoryId?.toString(),
                galleryId: slider.galleryId?.toString(),
                name: slider.name,
                sectionName: slider.sectionName,
                type: slider.type,
                allowedFileExtension: slider.allowedFileExtension,
                params: slider.params,
                locale: slider.locale,
                priority: slider.priority,
                description: slider.description,
                isActive: slider.isActive
            };
            return new RequestResult(StatusCodes.OK, new MethodResult<SliderDTO>(new CRUDResultModel(CRUDResultEnum.Success, 'successOperation'), sliderDTO));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * update slider
     * 
     * @param {object} updateSliderDTO
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>} 
     */
    update = async (updateSliderDTO: UpdateSliderDTO, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const { id, articleCategoryId, galleryId, name, description, sectionName, type, allowedFileExtension, params, priority, locale } = updateSliderDTO;
            let slider = await this._sliderRepository.getById(id);
            if (slider === null) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'sliderDoesNotExist')));
            }

            slider.articleCategoryId =  articleCategoryId ? new Types.ObjectId(articleCategoryId!) : null,
            slider.galleryId = galleryId ? new Types.ObjectId(galleryId) : null,
            slider.name = name;
            slider.sectionName = sectionName,
            slider.type = type,
            slider.allowedFileExtension = allowedFileExtension,
            slider.params = params,
            slider.priority = priority,
            slider.locale = locale,
            slider.priority = priority;
            slider.description = description;
            slider.updatedBy = new Types.ObjectId(userId);
            slider.updatedAt = new Date();

            const { matchedCount } = await this._sliderRepository.update(slider);
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
     * get slider by Id
     * 
     * @param {string} id 
     * @param {string} userId
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    toggleActive = async (id: string, userId: string): Promise<RequestResult<boolean | null>> => {
        try {
            const slider = await this._sliderRepository.getById(id);
            if (!slider) {
                return new RequestResult(StatusCodes.NOT_FOUND, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'sliderDoesNotExist')));
            }
            const toggleIsActive = !slider.isActive;
            const { modifiedCount } = await this._sliderRepository.toggleIsActive(id, toggleIsActive, userId);
            if (modifiedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), toggleIsActive));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
    
    /**
     * delete slider
     * 
     * @param {string} id 
     * @returns {Promise<RequestResult<boolean | null>>}
     */
    delete = async (id: string) => {
        try {
            const { deletedCount } = await this._sliderRepository.delete(id);
            if (deletedCount > 0) {
                return new RequestResult(StatusCodes.OK, new MethodResult<boolean>(new CRUDResultModel(CRUDResultEnum.SuccessWithNotification, 'successOperation'), true));
            }
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        } catch (error) {
            return new RequestResult(StatusCodes.INTERNAL_SERVER_ERROR, new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')));
        }
    }
}

