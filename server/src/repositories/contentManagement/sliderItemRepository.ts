import SliderItemModel, { SliderItem } from "src/models/contentManagement/sliderItem";
import GridUtilityHelper from "src/helpers/gridUtilityHelper";
import AppConstant from "src/constants/appConstants";
import { ListSliderItemByParamsDTO } from "src/dtos/contentManagement/sliderItem/listSliderItemByParamsDTO";
import { ListActiveSliderItemByParamsDTO } from "src/dtos/contentManagement/sliderItem/listActiveSliderItemByParamsDTO";
import SliderModel from "src/models/contentManagement/slider";


    export default class SliderItemRepository{
        /**
         * add sliderItem
         * 
         * @param {object} sliderItem 
         * @returns {Promis<object>}
         */
        add = async (sliderItem: SliderItem) => await SliderItemModel.create(sliderItem); 
        
        /**
         * count sliderItems
         * 
         * @returns {Promise<number>}
         */
        count = async (): Promise<number> => await SliderItemModel.count(); 
               
        /**
         * get all sliderItems
         * @param {object} listActiveSliderItemByParamsDTO
         * @returns {Promise<SliderItem[]>}
         */
        getAllActiveSlidersByParams = async (listActiveSliderItemByParamsDTO : ListActiveSliderItemByParamsDTO) =>{
            const slider = await SliderModel.findOne({ sectionName: listActiveSliderItemByParamsDTO.sectionName, locale: listActiveSliderItemByParamsDTO.locale});
            return await SliderItemModel.find({ sliderId : slider?._id })
            .populate('sliderId');   
        } 
        
        /**
         * get all galleries by parameters
         * 
         * @param {object} listSliderItemByParams 
         * @returns {Promise<SliderItem[]>}
         */
        getAllByParams = async (listSliderItemByParams: ListSliderItemByParamsDTO) : Promise<SliderItem[]> =>{
            const { currentPage, pageSize, sortModel } = listSliderItemByParams.gridParameter;
            const limitCount: number = (pageSize || AppConstant.PageSize);
            const skipCount = (currentPage || 0) * limitCount;           
            const sort = GridUtilityHelper.getSortObject(sortModel);
            const list = await SliderItemModel.find({ sliderId: listSliderItemByParams.sliderId }).sort(sort).skip(skipCount).limit(limitCount);
            return list;
        }  
        
        /**
         * get sliderItem by id
         * 
         * @param {string} id 
         * @returns {Promise<SliderItem | null>}
         */
        getById = async (id: string): Promise<SliderItem | null> => await SliderItemModel.findOne({ _id : id }); 
        
        /**
         * update sliderItem
         * 
         * @param {object} sliderItem 
         * @returns {Promise<object>}
         */
        update = async (sliderItem: SliderItem) => {
            return await SliderItemModel.updateOne({ _id : sliderItem._id },
                { $set: { 
                    sliderId: sliderItem.sliderId,
                    name: sliderItem.name,
                    description: sliderItem.description,
                    file : sliderItem.file,
                    fileSavePath : sliderItem.fileSavePath,
                    linkUrl : sliderItem.linkUrl,
                    linkTarget : sliderItem.linkTarget,
                    priority : sliderItem.priority,
                    updatedBy: sliderItem.updatedBy,
                    updatedAt: sliderItem.updatedAt
                }});
        }
        
        /**
         * toggle slider item active status
         * 
         * @param {string} id 
         * @param {boolean} toggleIsActive
         * @param {string} userId 
         * @returns {Promise<object>}
         */
        toggleIsActive = async (id: string, toggleIsActive: boolean, userId: string) => {
            return await SliderItemModel.updateOne({_id: id}, 
                { $set: { 
                    isActive: toggleIsActive,
                    updatedBy: userId,
                    updatedAt: new Date()
                }}); 
        }

        /**
         * delete sliderItem by id
         * 
         * @param {string} id 
         * @returns {Promise<object>}
         */
        delete = async (id: string) => await SliderItemModel.deleteOne({ _id : id }); 
    }


