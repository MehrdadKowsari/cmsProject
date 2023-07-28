import { GridParameter } from "src/dtos/shared/grid/gridPrameter";
import GalleryModel, { Gallery } from "src/models/contentManagement/gallery";
import GridUtilityHelper from "src/helpers/gridUtilityHelper";
import AppConstant from "src/constants/appConstants";
import { ListActiveGalleryByParamsDTO } from "src/dtos/contentManagement/gallery/listActiveGalleryByParamsDTO";


    export default class GalleryRepository{
        /**
         * add gallery
         * 
         * @param {object} gallery 
         * @returns {Promis<object>}
         */
        add = async (gallery: Gallery) => await GalleryModel.create(gallery); 
        
        /**
         * count gallerys
         * 
         * @returns {Promise<number>}
         */
        count = async (): Promise<number> => await GalleryModel.count(); 
               
        /**
         * get all gallerys
         * 
         * @returns {Promise<Gallery[]>}
         */
        getAll = async () => await GalleryModel.find(); 
        
        /**
         * get all galleries by parameters
         * 
         * @param {object} gridParameter 
         * @returns {Promise<Gallery[]>}
         */
        getAllByParams = async (gridParameter: GridParameter) : Promise<Gallery[]> =>{
            const { currentPage, pageSize, sortModel } = gridParameter;
            const limitCount: number = (pageSize || AppConstant.PageSize);
            const skipCount = (currentPage || 0) * limitCount;           
            const sort = GridUtilityHelper.getSortObject(sortModel);
            const list = await GalleryModel.find().sort(sort).skip(skipCount).limit(limitCount);
            return list;
        }

        /**
         * get all active galleries by parameters
         * 
         * @param {object} listActiveGalleryByParamsDTO 
         * @returns {Promise<Gallery[]>}
         */
        getAllActiveByParams = async (listActiveGalleryByParamsDTO: ListActiveGalleryByParamsDTO) : Promise<Gallery[]> =>{
            const { locale } = listActiveGalleryByParamsDTO;
            const list = await GalleryModel.find({ active: true, locale}).sort({priority : 'asc'});
            return list;
        }  
        
        /**
         * get gallery by id
         * 
         * @param {string} id 
         * @returns {Promise<Gallery | null>}
         */
        getById = async (id: string): Promise<Gallery | null> => await GalleryModel.findOne({ _id : id }); 
        
        /**
         * update gallery
         * 
         * @param {object} gallery 
         * @returns {Promise<object>}
         */
        update = async (gallery: Gallery) => {
            return await GalleryModel.updateOne({ _id : gallery._id },
                { $set: { 
                    galleryCategoryId: gallery.galleryCategoryId,
                    name: gallery.name,
                    description: gallery.description,
                    type : gallery.type,
                    params : gallery.params,
                    image : gallery.image,
                    slugUrl : gallery.slugUrl,
                    allowedFileExtension : gallery.allowedFileExtension,
                    priority : gallery.priority,
                    locale : gallery.locale,
                    updatedBy: gallery.updatedBy,
                    updatedAt: gallery.updatedAt
                }});
        }

        /**
         * toggle gallery active status
         * 
         * @param {string} id 
         * @param {boolean} toggleIsActive
         * @param {string} userId 
         * @returns {Promise<object>}
         */
        toggleIsActive = async (id: string, toggleIsActive: boolean, userId: string) => {
            return await GalleryModel.updateOne({_id: id}, 
                { $set: { 
                    isActive: toggleIsActive,
                    updatedBy: userId,
                    updatedAt: new Date()
                }}); 
        }

        /**
         * delete gallery by id
         * 
         * @param {string} id 
         * @returns {Promise<object>}
         */
        delete = async (id: string) => await GalleryModel.deleteOne({ _id : id }); 
    }


