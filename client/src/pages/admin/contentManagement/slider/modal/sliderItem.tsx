import React,  { useState, useEffect, useCallback, useMemo, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import FileUploadOutlined from '@mui/icons-material/FileUploadOutlined';
import { useFormik } from 'formik';
import {object, string} from 'yup';
import notification from 'src/services/shared/notificationService';
import { FormProps } from 'src/types/shared/formType';
import { useAppDispatch } from 'src/state/hooks/hooks';
import { add, getById, update } from 'src/state/slices/contentManagement/sliderItemSlice';
import CommonMessage from 'src/constants/commonMessage';
import { useTranslation } from 'react-i18next';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import ApplicationParams from 'src/constants/applicationParams';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { PermissionTypeEnum } from 'src/models/shared/enums/permissionTypeEnum';
import { useHotkeys } from 'react-hotkeys-hook';
import Hotkey from 'src/constants/hotkey';
import { AddSliderItemDTO } from 'src/models/contentManagement/sliderItem/addSliderItemDTO';
import { UpdateSliderItemDTO } from 'src/models/contentManagement/sliderItem/updateSliderItemDTO';
import { SliderItemDTO } from 'src/models/contentManagement/sliderItem/sliderItemDTO';
import { DataGrid, GridActionsCellItem, GridColDef, GridPaginationModel, GridRowId, GridSortModel } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SecurityIcon from '@mui/icons-material/Security';
import { GridParameter } from 'src/models/shared/grid/gridPrameter';
import { getAllByParams, remove, toggleActive } from 'src/state/slices/contentManagement/sliderItemSlice';
import { useSelector } from 'react-redux';
import notificationService from 'src/services/shared/notificationService';
import useConfirm from 'src/state/hooks/useConfirm';
import FileUpload from 'src/components/FileUpload/FileUpload';
import FileUploadWithImagePreview from 'src/components/FileUpload/FileUploadWithImagePreview';

const SliderItem = ({id , permissions, onClose}: FormProps) => {
const [isUpdate, setIsUpdate] = useState<boolean>(false);
const [hasViewPermission, setHasViewPermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.View));
const [hasInsertPermission, setHasInsertPermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.Add));
const [hasUpdatePermission, setHasUpdatePermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.Update));
const [hasDeletePermission, setHasDeletePermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.Delete));
const [hasToggleActivePermission, setHasToggleActivePermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.ToggleActive));
const [rowId, setRowId] = useState<number | string | null>(null);
const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
const [sliderItem, setSliderItem] = useState<SliderItemDTO | null>(null);
const { sliderItems, totalCount, isLoading } = useSelector((state: any) => state?.sliderItem?.sliderItems ? state?.sliderItem : { sliderItems: [], totalCount: 0, isLoading: false });
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
const [file, setFile] = useState<string | null>(null);
const dispatch = useAppDispatch();
const { t } = useTranslation(['common']);
const { confirm } = useConfirm();

const getItemById = async (id: string | number) => {
  const sliderItemDTO: SliderItemDTO = await dispatch(getById(id)).unwrap();
  await setFormData(sliderItemDTO);
  setSliderItem(sliderItemDTO);
}

const setFormData = async (sliderItemDTO: SliderItemDTO | null) =>{
  if (sliderItemDTO) {
    await formik.setValues({
        name: sliderItemDTO.name,
        linkUrl: sliderItemDTO.linkUrl,
        linkTarget: sliderItemDTO.linkTarget,
        file: sliderItemDTO.file,
        description: sliderItemDTO.description,
        priority: sliderItemDTO.priority
      } as initialValuesType);
      setFile(sliderItemDTO.file);
  }
  else{
    await formik.setValues(initialValues);
  }
}

const handleAddNew = async () => {
  setRowId(null);
  await setFormData(null);
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
  name: string().max(ApplicationParams.NameMaxLenght, t('minLenghtForThisFieldIsN', CommonMessage.MaxLenghtForThisFieldIsN(ApplicationParams.NameMaxLenght), { n: `${ApplicationParams.NameMaxLenght}`})!).required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  priority: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!)
});

const onChangeInputFileSelection = (file: ChangeEvent) => {
  const reader = new FileReader()
  const { files } = file.target as HTMLInputElement
  if (files && files.length !== 0) {
    reader.onload = () => { 
      setFile(reader.result as string);
      (file.target as HTMLInputElement).value = '';
    }

    reader.readAsDataURL(files[0])
  }
}

type initialValuesType = {
  articleCategoryId?:  string | null;
  galleryId?:  string | null;
  name: string,
  type: string,
  linkUrl: string | null,
  linkTarget: string | null,
  description: string | null,
  file: string | null,
  priority: number
};
const initialValues: initialValuesType = {
  name: '',
  type: '',
  linkUrl: '',
  linkTarget: '',
  file: null,
  description: '',
  priority: 1
};
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if(formik.isValid){
        if (isUpdate) {
          const updateSliderItemDTO: UpdateSliderItemDTO = {
            id: rowId!,
            sliderId: id!,
            name: values.name,
            linkUrl: values.linkUrl,
            description: values.description,
            file: file,
            fileSavePath: 'jpg',
            fileExtension: '---',
            linkTarget: values.linkTarget,
            priority: values.priority
          };
          const result = await dispatch(update(updateSliderItemDTO)).unwrap();
          if (result) {
            getGridData();
          }
        } else {
          const addSliderItemDTO: AddSliderItemDTO = {
            sliderId: id!,
            name: values.name,
            linkUrl: values.linkUrl,
            description: values.description,
            file: file,
            fileSavePath: 'jpg',
            fileExtension: '---',
            linkTarget: values.linkTarget,
            priority: values.priority
          }
          const result = await dispatch(add(addSliderItemDTO)).unwrap();
          if (result) {
            getGridData();
            await setFormData(null);
          }         
        }
      }
      else{
        notification.showErrorMessage(t('formDataIsInvalid', CommonMessage.FormDataIsInvalid)!)
      }
    },
    onReset: async () => {
      if (isUpdate) {
        await setFormData(sliderItem);
      } else {
        await setFormData(null);
      }
    }
  })

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
    dispatch(getAllByParams(gridparameter))
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: t('name', CommonMessage.Name)!, width: 130 },
    { field: 'linkUrl', headerName: t('linkUrl', CommonMessage.Url)!, width: 130 },
    { field: 'linkTarget', headerName: t('linkTarget', CommonMessage.LinkTarget)!, width: 130 },
    { field: 'fileExtension', headerName: t('fileExtension', CommonMessage.FileExtension)!, width: 130 },
    { field: 'priority', headerName: t('priority', CommonMessage.Priority)!, width: 130 },
    { field: 'description', headerName: t('description', CommonMessage.Description)!, width: 130 },
    { field: 'isActive', headerName: t('isActive', CommonMessage.IsActive)!, width: 130, type: 'boolean' },
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
                  <FileUploadWithImagePreview
                  id='upload-file'
                  name='upload-file'
                  imageWidth={50}
                  imageHeight={50}
                  />
                </Grid>
                <Grid item lg={6}>
                  <TextField
                  select 
                  fullWidth
                  id='linkTarget'
                  name='linkTarget'
                  label={t('linkTarget', CommonMessage.LinkTarget)}
                  value={formik.values.linkTarget} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.linkTarget && Boolean(formik.errors.linkTarget)}
                  helperText={formik.errors.linkTarget}>
                    <MenuItem key='_self' value='_self'>
                        {t('openInTheSameWindow', CommonMessage.OpenInTheSameWindow)}
                    </MenuItem>
                    <MenuItem key='_blank' value='_blank'>
                        {t('openINNewWindow', CommonMessage.OpenINNewWindow)}
                    </MenuItem>
                  </TextField>
                </Grid>
                <Grid item lg={6}>
                  <TextField
                  fullWidth
                  id='linkUrl'
                  name='linkUrl'
                  label={t('linkUrl', CommonMessage.LinkUrl)}
                  value={formik.values.linkUrl} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.linkUrl && Boolean(formik.errors.linkUrl)}
                  helperText={formik.errors.linkUrl}>
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
                <Grid item lg={6}>
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
                  title={Hotkey.New.toLocaleUpperCase()}
                  startIcon={<AddIcon />}
                  onClick={handleAddNew}>
                  <span>{t('new', CommonMessage.New)}</span>
                  </Button>
                  <Button
                  type='submit'
                  variant='contained' 
                  size='small'
                  title={Hotkey.Save.toLocaleUpperCase()}
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
                  title={Hotkey.Reset.toLocaleUpperCase()}
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
              <DataGrid
                rows={sliderItems}
                columns={columns}
                rowCount={totalCount}
                loading={isLoading}
                pageSizeOptions={ApplicationParams.GridPageSize}
                paginationModel={paginationModel}
                paginationMode='server'
                onPaginationModelChange={setPaginationModel}
                onSortModelChange={setSortModel}
                onRowSelectionModelChange={setSelectedRows}
                getRowId={(row: any) => row?.id}
              />
            </div>
          </Box>
      </CardContent>
    </Card> 
  )
}

export default SliderItem
type Props = {
  // Add custom props here
}
export const getStaticProps: GetStaticProps<Props> = async ({locale}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
})