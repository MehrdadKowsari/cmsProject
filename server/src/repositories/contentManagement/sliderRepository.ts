import { GridParameter } from "../../dtos/shared/grid/gridPrameter";
import SliderModel, { Slider } from "../../models/contentManagement/slider";
import GridUtilityHelper from "../../helpers/gridUtilityHelper";
import AppConstant from "../../constants/appConstants";


    export default class SliderRepository{
        /**
         * add slider
         * 
         * @param {object} slider 
         * @returns {Promis<object>}
         */
        add = async (slider: Slider) => await SliderModel.create(slider); 
        
        /**
         * count sliders
         * 
         * @returns {Promise<number>}
         */
        count = async (): Promise<number> => await SliderModel.count(); 
               
        /**
         * get all sliders
         * 
         * @returns {Promise<Slider[]>}
         */
        getAll = async () => await SliderModel.find(); 
        
        /**
         * get all sliders by parameters
         * 
         * @param {object} gridParameter 
         * @returns {Promise<Slider[]>}
         */
        getAllByParams = async (gridParameter: GridParameter) : Promise<Slider[]> =>{
            const { currentPage, pageSize, sortModel } = gridParameter;
            const limitCount: number = (pageSize || AppConstant.PageSize);
            const skipCount = (currentPage || 0) * limitCount;           
            const sort = GridUtilityHelper.getSortObject(sortModel);
            const list = await SliderModel.find().sort(sort).skip(skipCount).limit(limitCount);
            return list;
        }  
        
        /**
         * get slider by id
         * 
         * @param {string} id 
         * @returns {Promise<Slider | null>}
         */
        getById = async (id: string): Promise<Slider | null> => await SliderModel.findOne({ _id : id }); 
        
        /**
         * update slider
         * 
         * @param {object} slider 
         * @returns {Promise<object>}
         */
        update = async (slider: Slider) => {
            return await SliderModel.updateOne({ _id : slider._id },
                { $set: { 
                    poetCategoryId: slider.poetCategoryId,
                    galleryId: slider.galleryId,
                    name: slider.name,
                    description: slider.description,
                    type : slider.type,
                    priority : slider.priority,
                    params : slider.params,
                    sectionName : slider.sectionName,
                    allowedFileExtension : slider.allowedFileExtension,
                    locale : slider.locale,
                    updatedBy: slider.updatedBy,
                    updatedAt: slider.updatedAt
                }});
        }

        /**
         * toggle slider active status
         * 
         * @param {string} id 
         * @param {boolean} toggleIsActive
         * @param {string} userId 
         * @returns {Promise<object>}
         */
        toggleIsActive = async (id: string, toggleIsActive: boolean, userId: string) => {
            return await SliderModel.updateOne({_id: id}, 
                { $set: { 
                    isActive: toggleIsActive,
                    updatedBy: userId,
                    updatedAt: new Date()
                }}); 
        }

        /**
         * delete slider by id
         * 
         * @param {string} id 
         * @returns {Promise<object>}
         */
        delete = async (id: string) => await SliderModel.deleteOne({ _id : id }); 
    }


