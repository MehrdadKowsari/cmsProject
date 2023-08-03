import { GridParameter } from "src/dtos/shared/grid/gridPrameter";
import GalleryCategoryModel, { GalleryCategory } from "src/models/contentManagement/galleryCategory";
import GridUtilityHelper from "src/helpers/gridUtilityHelper";
import AppConstant from "src/constants/appConstants";
import { ListActiveGalleryCategoryByParamsDTO } from "src/dtos/contentManagement/galleryCategory/listActiveGalleryCategoryByParamsDTO";


    export default class GalleryCategoryRepository{
        /**
         * add galleryCategory
         * 
         * @param {object} galleryCategory 
         * @returns {Promis<object>}
         */
        add = async (galleryCategory: GalleryCategory) => await GalleryCategoryModel.create(galleryCategory); 
        
        /**
         * count galleryCategorys
         * 
         * @returns {Promise<number>}
         */
        count = async (): Promise<number> => await GalleryCategoryModel.count(); 
               
        /**
         * get all galleryCategorys
         * 
         * @returns {Promise<GalleryCategory[]>}
         */
        getAll = async () => await GalleryCategoryModel.find()
        .populate('parentId')
        .exec(); 
        
        /**
         * get all galleryCategorys by parameters
         * 
         * @param {object} gridParameter 
         * @returns {Promise<GalleryCategory[]>}
         */
        getAllByParams = async (gridParameter: GridParameter) : Promise<GalleryCategory[]> =>{
            const { currentPage, pageSize, sortModel } = gridParameter;
            const limitCount: number = (pageSize || AppConstant.PageSize);
            const skipCount = (currentPage || 0) * limitCount;           
            const sort = GridUtilityHelper.getSortObject(sortModel);
            const list = await GalleryCategoryModel.find().sort(sort).skip(skipCount).limit(limitCount)
            .populate('parentId')
            .exec();
            return list;
        }  
        
        /**
         * get all galleryCategorys by parameters
         * 
         * @param {object} listActiveGalleryCategoryByParamsDTO 
         * @returns {Promise<GalleryCategory[]>}
         */
        getAllActiveByParams = async (listActiveGalleryCategoryByParamsDTO: ListActiveGalleryCategoryByParamsDTO) : Promise<GalleryCategory[]> =>{
            const list = await GalleryCategoryModel.find({ parentId: listActiveGalleryCategoryByParamsDTO.parentId, locale: listActiveGalleryCategoryByParamsDTO.locale, isActive: true})
            .exec();
            return list;
        }  
        
        /**
         * get galleryCategory by id
         * 
         * @param {string} id 
         * @returns {Promise<GalleryCategory | null>}
         */
        getById = async (id: string): Promise<GalleryCategory | null> => await GalleryCategoryModel.findOne({ _id : id }); 
        
        /**
         * update galleryCategory
         * 
         * @param {object} galleryCategory 
         * @returns {Promise<object>}
         */
        update = async (galleryCategory: GalleryCategory) => {
            return await GalleryCategoryModel.updateOne({ _id : galleryCategory._id },
                { $set: { 
                    parentId: galleryCategory.parentId,
                    name: galleryCategory.name,
                    description: galleryCategory.description,
                    priority : galleryCategory.priority,
                    locale : galleryCategory.locale,
                    updatedBy: galleryCategory.updatedBy,
                    updatedAt: galleryCategory.updatedAt
                }});
        }

        /**
         * toggle galleryCategory active status
         * 
         * @param {string} id 
         * @param {boolean} toggleIsActive
         * @param {string} userId 
         * @returns {Promise<object>}
         */
        toggleIsActive = async (id: string, toggleIsActive: boolean, userId: string) => {
            return await GalleryCategoryModel.updateOne({_id: id}, 
                { $set: { 
                    isActive: toggleIsActive,
                    updatedBy: userId,
                    updatedAt: new Date()
                }}); 
        }

        /**
         * delete galleryCategory by id
         * 
         * @param {string} id 
         * @returns {Promise<object>}
         */
        delete = async (id: string) => await GalleryCategoryModel.deleteOne({ _id : id }); 
    }


