import { Request, Response } from 'express';
import { CRUDResultModel } from '../../models/shared/crud/crudResultModel';
import { MethodResult } from '../../models/shared/crud/methodResult';
import { CRUDResultEnum } from '../../models/shared/enums/crudResultEnum';
import { StatusCodes } from 'http-status-codes';
import SliderItemService from '../../services/contentManagement/sliderItemService';
import { autoInjectable } from 'tsyringe';
import LocalizerHelper from 'src/helpers/localizeHelper';
import { ListActiveSliderItemByParamsDTO } from 'src/dtos/contentManagement/sliderItem/listActiveSliderItemByParamsDTO';
import MenuItemService from 'src/services/contentManagement/menuItemService';
import { ListAllMenuItemByParamsDTO } from 'src/dtos/contentManagement/menuItem/listAllMenuItemByParamsDTO';

@autoInjectable()
export class HomeController{
    private _sliderItemService: SliderItemService;
    private _menuItemService: MenuItemService;
    constructor(sliderItemService: SliderItemService, 
        menuItemService: MenuItemService){
        this._sliderItemService = sliderItemService;
        this._menuItemService = menuItemService;
    }
     /**
     * get all menuItems
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
    getAllMenuItemsByParams = async (req: Request, res: Response) => {
        try {
            const listAllMenuItemByParamsDTO : ListAllMenuItemByParamsDTO = req.body;
            const requestResult = await this._menuItemService.getAllMenuItemsByParams(listAllMenuItemByParamsDTO);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

     /**
     * get all sliderItems
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {Promise<object>} return
     */
    getAllActiveSlidersByParams = async (req: Request, res: Response) => {
        try {
            const listActiveSliderItemByParamsDTO : ListActiveSliderItemByParamsDTO = req.body;
            const requestResult = await this._sliderItemService.getAllActiveSlidersByParams(listActiveSliderItemByParamsDTO);
            return res.status(requestResult.statusCode).json(LocalizerHelper.localize(requestResult.methodResult, req));
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(LocalizerHelper.localize(new MethodResult(new CRUDResultModel(CRUDResultEnum.Error, 'unknownErrorHappened')), req));
        }
    }

}
