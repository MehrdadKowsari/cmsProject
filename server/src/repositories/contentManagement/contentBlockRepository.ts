import { GridParameter } from "../../dtos/shared/grid/gridPrameter";
import ContentBlockModel, { ContentBlock } from "../../models/contentManagement/contentBlock";
import GridUtilityHelper from "../../helpers/gridUtilityHelper";
import AppConstant from "../../constants/appConstants";


    export default class ContentBlockRepository{
        /**
         * add contentBlock
         * 
         * @param {object} contentBlock 
         * @returns {Promis<object>}
         */
        add = async (contentBlock: ContentBlock) => await ContentBlockModel.create(contentBlock); 
        
        /**
         * count contentBlocks
         * 
         * @returns {Promise<number>}
         */
        count = async (): Promise<number> => await ContentBlockModel.count(); 
               
        /**
         * get all contentBlocks
         * 
         * @returns {Promise<ContentBlock[]>}
         */
        getAll = async () => await ContentBlockModel.find(); 
        
        /**
         * get all contentBlocks by parameters
         * 
         * @param {object} gridParameter 
         * @returns {Promise<ContentBlock[]>}
         */
        getAllByParams = async (gridParameter: GridParameter) : Promise<ContentBlock[]> =>{
            const { currentPage, pageSize, sortModel } = gridParameter;
            const limitCount: number = (pageSize || AppConstant.PageSize);
            const skipCount = (currentPage || 0) * limitCount;           
            const sort = GridUtilityHelper.getSortObject(sortModel);
            const list = await ContentBlockModel.find().sort(sort).skip(skipCount).limit(limitCount);
            return list;
        }  
        
        /**
         * get contentBlock by id
         * 
         * @param {string} id 
         * @returns {Promise<ContentBlock | null>}
         */
        getById = async (id: string): Promise<ContentBlock | null> => await ContentBlockModel.findOne({ _id : id }); 
        
        /**
         * get contentBlock by slugUrl
         * 
         * @param {string} sectionName 
         * @param {string} locale 
         * @returns {Promise<ContentBlock | null>}
         */
        getBySectionNameAndLocale = async (sectionName: string, locale: string): Promise<ContentBlock | null> => await ContentBlockModel.findOne({ sectionName, locale }); 
        
        /**
         * update contentBlock
         * 
         * @param {object} contentBlock 
         * @returns {Promise<object>}
         */
        update = async (contentBlock: ContentBlock) => {
            return await ContentBlockModel.updateOne({ _id : contentBlock._id },
                { $set: { 
                    title: contentBlock.title,
                    content: contentBlock.content,
                    sectionName: contentBlock.sectionName,
                    image : contentBlock.image,
                    thumbnailImage : contentBlock.thumbnailImage,
                    iconCssClass : contentBlock.iconCssClass,
                    priority : contentBlock.priority,
                    isActive : contentBlock.isActive,
                    dateFrom : contentBlock.dateFrom,
                    dateTo : contentBlock.dateTo,
                    locale : contentBlock.locale,
                    updatedBy: contentBlock.updatedBy,
                    updatedAt: contentBlock.updatedAt
                }});
        }

        /**
         * delete contentBlock by id
         * 
         * @param {string} id 
         * @returns {Promise<object>}
         */
        delete = async (id: string) => await ContentBlockModel.deleteOne({ _id : id }); 
    }


