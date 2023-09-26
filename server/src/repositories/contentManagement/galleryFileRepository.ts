import GalleryFileModel, { GalleryFile } from "../../models/contentManagement/galleryFile";
import GridUtilityHelper from "../../helpers/gridUtilityHelper";
import AppConstant from "../../constants/appConstants";
import { ListGalleryFileByParams } from "../../dtos/contentManagement/galleryFile/listGalleryFileByParamsDTO";


    export default class GalleryFileRepository{
        /**
         * add galleryFile
         * 
         * @param {object} galleryFile 
         * @returns {Promis<object>}
         */
        add = async (galleryFile: GalleryFile) => await GalleryFileModel.create(galleryFile); 
        
        /**
         * count galleryFiles
         * 
         * @returns {Promise<number>}
         */
        count = async (): Promise<number> => await GalleryFileModel.count(); 
               
        /**
         * get all galleryFiles
         * 
         * @returns {Promise<GalleryFile[]>}
         */
        getAll = async () => await GalleryFileModel.find(); 
        
        /**
         * get all galleryFiles by parameters
         * 
         * @param {object} listGalleryFileByParams 
         * @returns {Promise<GalleryFile[]>}
         */
        getAllByParams = async (listGalleryFileByParams: ListGalleryFileByParams) : Promise<GalleryFile[]> =>{
            const { currentPage, pageSize, sortModel } = listGalleryFileByParams.gridParameter;
            const limitCount: number = (pageSize || AppConstant.PageSize);
            const skipCount = (currentPage || 0) * limitCount;           
            const sort = GridUtilityHelper.getSortObject(sortModel);
            const list = await GalleryFileModel.find({ galleryId: listGalleryFileByParams.galleryId }).sort(sort).skip(skipCount).limit(limitCount);
            return list;
        }

        /**
         * get all galleryFiles by galleryId
         * 
         * @param {string} galleryId 
         * @returns {Promise<GalleryFile[]>}
         */
        getAllByGalleryId = async (galleryId: string) : Promise<GalleryFile[]> =>{
            const list = await GalleryFileModel.find({ galleryId }).sort({ 'priority' : 'asc'});
            return list;
        }  
        
        /**
         * get galleryFile by id
         * 
         * @param {string} id 
         * @returns {Promise<GalleryFile | null>}
         */
        getById = async (id: string): Promise<GalleryFile | null> => await GalleryFileModel.findOne({ _id : id }); 
        
        /**
         * update galleryFile
         * 
         * @param {object} galleryFile 
         * @returns {Promise<object>}
         */
        update = async (galleryFile: GalleryFile) => {
            return await GalleryFileModel.updateOne({ _id : galleryFile._id },
                { $set: { 
                    galleryId: galleryFile.galleryId,
                    name: galleryFile.name,
                    description: galleryFile.description,
                    file : galleryFile.file,
                    fileSavePath : galleryFile.fileSavePath,
                    fileExtension : galleryFile.fileExtension,
                    fileSize : galleryFile.fileSize,
                    priority : galleryFile.priority,
                    updatedBy: galleryFile.updatedBy,
                    updatedAt: galleryFile.updatedAt
                }});
        }

        /**
         * delete galleryFile by id
         * 
         * @param {string} id 
         * @returns {Promise<object>}
         */
        delete = async (id: string) => await GalleryFileModel.deleteOne({ _id : id }); 
    }


