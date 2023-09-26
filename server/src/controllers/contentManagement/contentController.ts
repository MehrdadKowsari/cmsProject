import { Request, Response } from 'express';
import { CRUDResultModel } from '../../models/shared/crud/crudResultModel';
import { MethodResult } from '../../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../../models/shared/enums/crudResultEnum';
import { StatusCodes } from 'http-status-codes';
import { autoInjectable } from 'tsyringe';
import LocalizerHelper from '../../helpers/localizeHelper';
import BlockControlService from '../../services/contentManagement/contentBlockService';

@autoInjectable()
export class ContentController{
    private _contentBlockService: BlockControlService;
    constructor(contentBlockService: BlockControlService){
        this._contentBlockService = contentBlockService;
    }
     /**
     * get all contentBlocks
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
     getContentBlockByParams = async (req: Request, res: Response) => {
        try {
            const { sectionName, locale} = req.body;
            const requestResult = await this._contentBlockService.getBySectionNameAndLocale(sectionName, locale);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

}
