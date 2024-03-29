import React,  { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MuiMenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import { useFormik } from 'formik';
import {object, string} from 'yup';
import notification from 'src/services/shared/notificationService';
import { FormProps } from 'src/types/shared/formType';
import { useAppDispatch } from 'src/state/hooks/hooks';
import { add, getAllMenuItems, getById, update } from 'src/state/slices/contentManagement/menuItemSlice';
import CommonMessage from 'src/constants/commonMessage';
import { useTranslation } from 'react-i18next';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import ApplicationParams from 'src/constants/applicationParams';
import { PermissionTypeEnum } from 'src/models/shared/enums/permissionTypeEnum';
import { useHotkeys } from 'react-hotkeys-hook';
import Hotkey from 'src/constants/hotkey';
import { AddMenuItemDTO } from 'src/models/contentManagement/menuItem/addMenuItemDTO';
import { UpdateMenuItemDTO } from 'src/models/contentManagement/menuItem/updateMenuItemDTO';
import { MenuItemDTO } from 'src/models/contentManagement/menuItem/menuItemDTO';
import { GridActionsCellItem, GridColDef, GridPaginationModel, GridRowId, GridSortModel } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SecurityIcon from '@mui/icons-material/Security';
import { GridParameter } from 'src/models/shared/grid/gridPrameter';
import { getAllByParams, remove, toggleActive } from 'src/state/slices/contentManagement/menuItemSlice';
import { useSelector } from 'react-redux';
import notificationService from 'src/services/shared/notificationService';
import useConfirm from 'src/state/hooks/useConfirm';
import FileUploadWithImagePreview from 'src/components/FileUpload/FileUploadWithImagePreview';
import Avatar from '@mui/material/Avatar';
import CustomDataGrid from 'src/components/CustomDataGrid/CustomDataGrid';
import localizationService from 'src/services/shared/localizationService';
import { ListMenuItemByParamsDTO } from 'src/models/contentManagement/menuItem/listMenuItemByParamsDTO';
import { MenuItemTypeEnum, MenuItemTypeEnumLabelMapping } from 'src/models/contentManagement/enums/menuItemTypeEnum';
import utilityService from 'src/services/shared/utilityService';
import { TextValueDTO } from 'src/models/shared/list/textValueDTO';

const MenuItem = ({id , permissions, locale}: FormProps) => {
const [isUpdate, setIsUpdate] = useState<boolean>(false);
const [hasViewPermission, setHasViewPermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.View));
const [hasInsertPermission, setHasInsertPermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.Add));
const [hasUpdatePermission, setHasUpdatePermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.Update));
const [hasDeletePermission, setHasDeletePermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.Delete));
const [hasToggleActivePermission, setHasToggleActivePermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.ToggleActive));
const [rowId, setRowId] = useState<number | string | null>(null);
const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
const [menuItem, setMenuItem] = useState<MenuItemDTO | null>(null);
const [menuItemTypes, setMenuItemTypes] = useState<TextValueDTO[]>([]);
const [parentMenuItems, setParentMenuItems] = useState<TextValueDTO[]>([]);
const { menuItems, totalCount, isLoading } = useSelector((state: any) => state?.menuItem?.menuItems ? state?.menuItem : { menuItems: [], totalCount: 0, isLoading: false });
const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
  page: 0,
  pageSize: ApplicationParams.GridDefaultPageSize
});
const [sortModel, setSortModel] = React.useState<GridSortModel>([
  {
    field: ApplicationParams.GridDefaultSortColumn,
    sort: ApplicationParams.GridDefaultSortDirection
  },
]);
const [image, setFile] = useState<string | null>(null);
const [fileExtension, setFileExtension] = useState<string | null>(null);
const dispatch = useAppDispatch();
const { t } = useTranslation(['common']);
const { confirm } = useConfirm();
const firstFieldRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  getMenuItemTypes();
  getAllParentMenuItemList();
  focusOnFirstField();
}, []);

const getAllParentMenuItemList = async () => {
  const parentMenuItems: MenuItemDTO[] = await dispatch(getAllMenuItems()).unwrap();
  const mappedPages = parentMenuItems?.map(p => ({
    text: p.name,
    value: p.id
  } as TextValueDTO));
  setParentMenuItems(mappedPages);
}

const getItemById = async (id: string | number) => {
  const menuItemDTO: MenuItemDTO = await dispatch(getById(id)).unwrap();
  await setFormData(menuItemDTO);
  setMenuItem(menuItemDTO);
}

const getMenuItemTypes = () => {
  const types = utilityService.getTextValueListByEnum(MenuItemTypeEnum, MenuItemTypeEnumLabelMapping);
  setMenuItemTypes(types);
}

const setFormData = async (menuItemDTO: MenuItemDTO | null) =>{
  if (menuItemDTO) {
    await formik.setValues({
        parentId: menuItemDTO.parentId,
        name: menuItemDTO.name,
        type: menuItemDTO.type.toString(),
        url: menuItemDTO.url,
        target: menuItemDTO.target,
        image: menuItemDTO.image,
        iconCssClass: menuItemDTO.iconCssClass,
        description: menuItemDTO.description,
        priority: menuItemDTO.priority
      } as initialValuesType);
      setFile(menuItemDTO.image);
      setFileExtension(menuItemDTO.iconCssClass);
  }
  else{
   clearFormData(); 
  }
};

const clearFormData = async () => {
  await formik.setValues(initialValues);
    setFile(null);
    setFileExtension(null);
    await focusOnFirstField();
    await formik.setErrors({});
}

const handleAddNew = async () => {
  setRowId(null);
  await clearFormData();
}

//#region hotkey
useHotkeys(Hotkey.New, () => handleAddNew());
useHotkeys(Hotkey.Save,() => formik.submitForm());
useHotkeys(Hotkey.Reset,() => formik.resetForm());
useHotkeys(Hotkey.Update, async () => {
  if (selectedRows?.length === 1 && hasUpdatePermission) {
    const rowId: GridRowId = selectedRows[0];
    await handleUpdate(rowId);
  }
  else {
    notificationService.showErrorMessage(t('youHaveNotAccessToThePageOrAction', CommonMessage.DoNotHaveAccessToThisActionOrSection));
  }
})
useHotkeys(Hotkey.Delete, async () => {
  if (selectedRows?.length === 1 && hasDeletePermission) {
    const rowId: GridRowId = selectedRows[0];
    await handleDelete(rowId);
  }
  else {
    notificationService.showErrorMessage(t('youHaveNotAccessToThePageOrAction', CommonMessage.DoNotHaveAccessToThisActionOrSection));
  }
})
useHotkeys(Hotkey.ToggleActive, async () => {
  if (selectedRows?.length === 1 && hasToggleActivePermission) {
    const rowId: GridRowId = selectedRows[0];
    await handleToggleIsActive(rowId);
  }
  else {
    notificationService.showErrorMessage(t('youHaveNotAccessToThePageOrAction', CommonMessage.DoNotHaveAccessToThisActionOrSection));
  }
})
//#endregion

const validationSchema = object({
  name: string().max(ApplicationParams.NameMaxLenght, t('minLenghtForThisFieldIsN', CommonMessage.MaxLenghtForThisFieldIsN(ApplicationParams.NameMaxLenght), { n: `${ApplicationParams.NameMaxLenght}`})!).required(t('fildIsRequired', CommonMessage.RequiredFiled)!),
  type: string().required(t('fildIsRequired', CommonMessage.RequiredFiled)!),
  priority: string().required(t('fildIsRequired', CommonMessage.RequiredFiled)!)
});

type initialValuesType = {
  articleCategoryId?:  string | null;
  galleryId?:  string | null;
  parentId:  string | null;
  name: string,
  type: string,
  url: string | null,
  iconCssClass: string | null;
  target: string | null,
  description: string | null,
  image: string | null,
  priority: number
};
const initialValues: initialValuesType = {
  parentId: '',
  name: '',
  type: '',
  url: '',
  iconCssClass: '',
  target: '',
  image: null,
  description: '',
  priority: 1
};
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      if(formik.isValid){
        if (isUpdate) {
          const updateMenuItemDTO: UpdateMenuItemDTO = {
            id: rowId!,
            menuId: id!,
            type: Number(values.type) as MenuItemTypeEnum,
            parentId: values.parentId,
            name: values.name,
            url: values.url,
            description: values.description,
            image: image,
            imageSavePath: null,
            iconCssClass: values.iconCssClass,
            target: values.target,
            priority: values.priority
          };
          const result = await dispatch(update(updateMenuItemDTO)).unwrap();
          if (result) {
            getGridData();
          }
        } else {
          const addMenuItemDTO: AddMenuItemDTO = {
            menuId: id!,
            name: values.name,
            parentId: values.parentId,
            type: Number(values.type) as MenuItemTypeEnum,
            url: values.url,
            description: values.description,
            image: image,
            imageSavePath: null,
            iconCssClass: values.iconCssClass,
            target: values.target,
            priority: values.priority
          }
          const result = await dispatch(add(addMenuItemDTO)).unwrap();
          if (result) {
            getGridData();
            await clearFormData();
          }         
        }
      }
      else{
        notification.showErrorMessage(t('formDataIsInvalid', CommonMessage.FormDataIsInvalid)!)
      }
    },
    onReset: async () => {
      if (isUpdate) {
        await setFormData(menuItem);
      } else {
        await clearFormData();
      }
      focusOnFirstField();
    }
  });
  
  const focusOnFirstField = async () => {
    if (firstFieldRef && firstFieldRef.current) {
      firstFieldRef.current.focus();
      await formik.setTouched({}, false);
     }
  };

  //#region list 
  const queryOptions = useMemo(
    () => ({
      paginationModel,
      sortModel
    }),
    [paginationModel, sortModel, hasViewPermission],
  );

  useEffect(() => {
    if (hasViewPermission) {
      getGridData();
    }
  }, [queryOptions]);
  const showConfirm = async () => {
    const isConfirmed = await confirm();
    return isConfirmed;
  }

  const handleDelete = useCallback(
    async (id: GridRowId) => {
      const isConfirmed = await showConfirm();
      if (isConfirmed) {
        const result: boolean = await dispatch(remove(id)).unwrap();
        if (result) {
          getGridData();
        }
      }
    },
    []
  );

  const handleUpdate = useCallback(
    async (id: GridRowId) => {
      setRowId(id);
      getItemById(id);
      setIsUpdate(true);
    },
    []
  );

  const handleToggleIsActive = useCallback(
    async (id: GridRowId) => {
      const result: boolean = await dispatch(toggleActive(id)).unwrap();
      if (result !== null) {
        getGridData();
      }
    },
    [],
  );
  
  const getGridData = () => {
    const gridparameter: GridParameter = {
      currentPage: queryOptions.paginationModel.page,
      pageSize: queryOptions.paginationModel.pageSize,
      sortModel: sortModel
    }
    const listMenuItemByParams: ListMenuItemByParamsDTO = {
      gridParameter: gridparameter,
      menuId: id!
    }
    dispatch(getAllByParams(listMenuItemByParams))
  }

  const columns: GridColDef[] = [
    { field: 'image', headerName: t('image', CommonMessage.File)!, sortable: false, renderCell(params) {
      return <Avatar alt='' src={params?.value} />
    },width: 130 },
    { field: 'parentName', headerName: t('parent', CommonMessage.Parent)!, width: 130 },
    { field: 'name', headerName: t('name', CommonMessage.Name)!, width: 130 },
    { field: 'type', headerName: t('type', CommonMessage.Type)!, valueFormatter(params) {
      return t(MenuItemTypeEnumLabelMapping[Number(params.value) as MenuItemTypeEnum])
    }, width: 130 },
    { field: 'url', headerName: t('linkUrl', CommonMessage.Url)!, width: 130 },
    { field: 'target', headerName: t('linkTarget', CommonMessage.LinkTarget)!, 
    valueFormatter(params) {
      return t(params?.value)
    },width: 150 },
    { field: 'iconCssClass', headerName: t('iconCssClass', CommonMessage.IconClass)!, width: 130 },
    { field: 'priority', headerName: t('priority', CommonMessage.Priority)!, width: 130 },
    { field: 'description', headerName: t('description', CommonMessage.Description)!, width: 130 },
    { field: 'isActive', headerName: t('isActive', CommonMessage.IsActive)!, width: 130, type: 'boolean' },
    { field: 'updatedAt', headerName: t('updatedAt', CommonMessage.UpdatedAt)!, valueFormatter(params) {
      return localizationService.getLocalDateTime(params?.value, locale);
    },width: 150 },
    {
      field: 'actions',
      type: 'actions',
      width: 150,
      getActions: (params: any) => [
        <GridActionsCellItem
          key={params.id}
          icon={<EditIcon color='success' />}
          label={t('update', CommonMessage.Update)}
          disabled={!hasUpdatePermission}
          title={Hotkey.Update.toUpperCase()}
          onClick={() => handleUpdate(params.id)}
        />,
        <GridActionsCellItem
          key={params.id}
          icon={<DeleteIcon color='error' />}
          label={t('delete', CommonMessage.Delete)}
          disabled={!hasDeletePermission}
          title={Hotkey.Delete.toUpperCase()}
          onClick={() => handleDelete(params.id)}
        />,
        <GridActionsCellItem
          key={params.id}
          icon={<SecurityIcon />}
          label={t('toggleActive', CommonMessage.ToggleActive)}
          disabled={!hasToggleActivePermission}
          title={Hotkey.ToggleActive.toUpperCase()}
          onClick={() => handleToggleIsActive(params.id)}
          showInMenu
        />
      ],
    },
  ];
  //#endregion
  
  return (
    <Card>
      <CardHeader 
      title={isUpdate ? t('update', CommonMessage.Update) : t('new', CommonMessage.New)}
      titleTypographyProps={{variant: 'h6'}}>
      </CardHeader>
      <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12}>
        <Box>
          <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
            <Grid container 
            spacing={3}
            justifyContent='center'>
                <Grid item lg={6}>
                  <TextField
                  inputRef={firstFieldRef}
                  select 
                  fullWidth
                  id="parentId"
                  name="parentId"
                  label={t('parent', CommonMessage.Parent)}
                  value={formik.values.parentId} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.parentId && Boolean(formik.errors.parentId)}
                  helperText={formik.errors.parentId}>
                    {parentMenuItems.map((option) => (
                      <MuiMenuItem key={option.value} value={option.value}>
                        {option.text}
                      </MuiMenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item lg={6}>
                  <TextField
                  fullWidth 
                  id='name'
                  label={t('name', CommonMessage.Name)}
                  value={formik.values.name}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.errors.name}/> 
                </Grid>
                <Grid item lg={6}>
                  <TextField
                  select 
                  fullWidth
                  id='type'
                  name='type'
                  label={t('type', CommonMessage.Type)}
                  value={formik.values.type} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.type && Boolean(formik.errors.type)}
                  helperText={formik.errors.type}>
                    {
                      menuItemTypes?.map((option: TextValueDTO) => (
                        <MuiMenuItem key={option.value} value={option.value}>
                        {t(MenuItemTypeEnumLabelMapping[Number(option.value) as MenuItemTypeEnum])}
                        </MuiMenuItem>
                      ))
                    }
                  </TextField>
                </Grid>
                <Grid item lg={6}>
                  <FileUploadWithImagePreview
                  id='upload-image'
                  name='upload-image'
                  imageWidth={50}
                  imageHeight={50}
                  file={image}
                  setFile={setFile}
                  setFileExtension={setFileExtension}
                  />
                </Grid>
                <Grid item lg={6}>
                  <TextField
                  select 
                  fullWidth
                  id='target'
                  name='target'
                  label={t('linkTarget', CommonMessage.LinkTarget)}
                  value={formik.values.target} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.target && Boolean(formik.errors.target)}
                  helperText={formik.errors.target}>
                    <MuiMenuItem key='_self' value='_self'>
                        {t('openInTheSameWindow', CommonMessage.OpenInTheSameWindow)}
                    </MuiMenuItem>
                    <MuiMenuItem key='_blank' value='_blank'>
                        {t('openInNewWindow', CommonMessage.OpenINNewWindow)}
                    </MuiMenuItem>
                  </TextField>
                </Grid>
                <Grid item lg={6}>
                  <TextField
                  fullWidth
                  id='url'
                  name='url'
                  label={t('linkUrl', CommonMessage.LinkUrl)}
                  value={formik.values.url} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.url && Boolean(formik.errors.url)}
                  helperText={formik.errors.url}>
                  </TextField>
                </Grid>
                <Grid item lg={6}>
                  <TextField
                  fullWidth
                  id='iconCssClass'
                  name='iconCssClass'
                  label={t('iconCssClass', CommonMessage.LinkUrl)}
                  value={formik.values.iconCssClass} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.iconCssClass && Boolean(formik.errors.iconCssClass)}
                  helperText={formik.errors.iconCssClass}>
                  </TextField>
                </Grid>
                <Grid item lg={6}>
                  <TextField 
                  fullWidth 
                  id='priority'
                  label={t('priority', CommonMessage.Priority)}
                  value={formik.values.priority}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.priority && Boolean(formik.errors.priority)}
                  helperText={formik.errors.priority}/> 
                </Grid>
                <Grid item lg={12}>
                  <TextField 
                  fullWidth 
                  id='description'
                  label={t('description', CommonMessage.Description)}
                  value={formik.values.description}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.errors.description}/> 
                </Grid>
                <Grid item lg={12}>
                  <Button
                  type='button'
                  variant='contained'
                  size='small'
                  disabled={!hasInsertPermission}
                  title={Hotkey.New.toUpperCase()}
                  startIcon={<AddIcon />}
                  onClick={handleAddNew}>
                  <span>{t('new', CommonMessage.New)}</span>
                  </Button>
                  <Button
                  type='submit'
                  variant='contained' 
                  size='small'
                  title={Hotkey.Save.toUpperCase()}
                  disabled={(isUpdate && !hasUpdatePermission) || (!isUpdate && !hasInsertPermission)}
                  startIcon={<SaveIcon/>}
                  sx={{mx: 3}}>
                    <span>{t('save', CommonMessage.Save)}</span>
                  </Button>  
                  <Button
                  type='reset'
                  variant='outlined' 
                  size='small'
                  color='secondary'
                  title={Hotkey.Reset.toUpperCase()}
                  startIcon={<ClearIcon/>}>
                    <span>{t('reset', CommonMessage.Reset)}</span>
                  </Button>  
                </Grid>
            </Grid>
          </form>
          </Box>
        </Grid>
    </Grid>
      </CardContent>
      <CardHeader 
      title={t('list', CommonMessage.List)}
      titleTypographyProps={{variant: 'h6'}}>
      </CardHeader>
      <CardContent>
      <Box mt={2}>
            <div style={{ height: 400, width: '100%' }}>
            <CustomDataGrid
                rows={menuItems}
                columns={columns}
                rowCount={totalCount}
                loading={isLoading}              
                getDataMethod={getGridData}
                paginationMode='server'
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                onSortModelChange={setSortModel}
                onRowSelectionModelChange={setSelectedRows}
              />
            </div>
          </Box>
      </CardContent>
    </Card> 
  )
}

export default MenuItem
