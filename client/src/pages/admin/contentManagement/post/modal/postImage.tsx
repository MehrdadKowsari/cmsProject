import React,  { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
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
import { add, getById, update } from 'src/state/slices/contentManagement/postImageSlice';
import CommonMessage from 'src/constants/commonMessage';
import { useTranslation } from 'react-i18next';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import ApplicationParams from 'src/constants/applicationParams';
import { PermissionTypeEnum } from 'src/models/shared/enums/permissionTypeEnum';
import { useHotkeys } from 'react-hotkeys-hook';
import Hotkey from 'src/constants/hotkey';
import { AddPostImageDTO } from 'src/models/contentManagement/postImage/addPostImageDTO';
import { UpdatePostImageDTO } from 'src/models/contentManagement/postImage/updatePostImageDTO';
import { PostImageDTO } from 'src/models/contentManagement/postImage/postImageDTO';
import { GridActionsCellItem, GridColDef, GridPaginationModel, GridRowId, GridSortModel } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { GridParameter } from 'src/models/shared/grid/gridPrameter';
import { getAllByParams, remove } from 'src/state/slices/contentManagement/postImageSlice';
import { useSelector } from 'react-redux';
import notificationService from 'src/services/shared/notificationService';
import useConfirm from 'src/state/hooks/useConfirm';
import FileUploadWithImagePreview from 'src/components/FileUpload/FileUploadWithImagePreview';
import Avatar from '@mui/material/Avatar';
import CustomDataGrid from 'src/components/CustomDataGrid/CustomDataGrid';
import localizationService from 'src/services/shared/localizationService';
import { ListPostImageByParamsDTO } from 'src/models/contentManagement/postImage/listPostImageByParamsDTO';
import useLocale from 'src/hooks/useLocale';

const PostImage = ({id , permissions}: FormProps) => {
const [isUpdate, setIsUpdate] = useState<boolean>(false);
const [hasViewPermission, setHasViewPermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.View));
const [hasInsertPermission, setHasInsertPermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.Add));
const [hasUpdatePermission, setHasUpdatePermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.Update));
const [hasDeletePermission, setHasDeletePermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.Delete));
const [rowId, setRowId] = useState<number | string | null>(null);
const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
const [postImage, setPostImage] = useState<PostImageDTO | null>(null);
const { postImages, totalCount, isLoading } = useSelector((state: any) => state?.postImage?.postImages ? state?.postImage : { postImages: [], totalCount: 0, isLoading: false });
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
const [image, setImage] = useState<string | null>(null);
const [imageExtension, setImageExtension] = useState<string | null>(null);
const dispatch = useAppDispatch();
const { t } = useTranslation(['common']);
const { confirm } = useConfirm();
const firstFieldRef = useRef<HTMLInputElement>(null);
const { getLocale } = useLocale();
const locale = getLocale();

useEffect(() => {
  focusOnFirstField();
}, []);


const getItemById = async (id: string | number) => {
  const postImageDTO: PostImageDTO = await dispatch(getById(id)).unwrap();
  await setFormData(postImageDTO);
  setPostImage(postImageDTO);
}

const setFormData = async (postImageDTO: PostImageDTO | null) =>{
  if (postImageDTO) {
    await formik.setValues({
        name: postImageDTO.name,
        image: postImageDTO.image,
        description: postImageDTO.description,
        priority: postImageDTO.priority
      } as initialValuesType);
      setImage(postImageDTO.image);
      setImageExtension(postImageDTO.imageExtension);
  }
  else{
   clearFormData(); 
  }
};

const clearFormData = async () => {
  await formik.setValues(initialValues);
    setImage(null);
    setImageExtension(null);
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
//#endregion

const validationSchema = object({
  name: string().max(ApplicationParams.NameMaxLenght, t('minLenghtForThisFieldIsN', CommonMessage.MaxLenghtForThisFieldIsN(ApplicationParams.NameMaxLenght), { n: `${ApplicationParams.NameMaxLenght}`})!).required(t('fildIsRequired', CommonMessage.RequiredFiled)!),
  priority: string().required(t('fildIsRequired', CommonMessage.RequiredFiled)!)
});

type initialValuesType = {
  name: string,
  type: string,
  description: string | null,
  image: string | null,
  priority: number
};
const initialValues: initialValuesType = {
  name: '',
  type: '',
  image: null,
  description: '',
  priority: 1
};
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnBlur: false,
    onSubmit: async (values) => {
      if(formik.isValid){
        if (isUpdate) {
          const updatePostImageDTO: UpdatePostImageDTO = {
            id: rowId!,
            postId: id!,
            name: values.name,
            description: values.description,
            image: image,
            imageSavePath: null,
            imageExtension: imageExtension,
            priority: values.priority
          };
          const result = await dispatch(update(updatePostImageDTO)).unwrap();
          if (result) {
            getGridData();
          }
        } else {
          const addPostImageDTO: AddPostImageDTO = {
            postId: id!,
            name: values.name,
            description: values.description,
            image: image,
            imageSavePath: null,
            imageExtension: imageExtension,
            priority: values.priority
          }
          const result = await dispatch(add(addPostImageDTO)).unwrap();
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
        await setFormData(postImage);
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
 
  const getGridData = () => {
    const gridparameter: GridParameter = {
      currentPage: queryOptions.paginationModel.page,
      pageSize: queryOptions.paginationModel.pageSize,
      sortModel: sortModel
    }
    const listPostImageByParams: ListPostImageByParamsDTO = {
      postId: id!,
      gridParameter: gridparameter
    };
    dispatch(getAllByParams(listPostImageByParams))
  }

  const columns: GridColDef[] = [
    { field: 'image', headerName: t('image', CommonMessage.Image)!, sortable: false, renderCell(params) {
      return <Avatar alt='' src={params?.value} />
    },width: 130 },
    { field: 'name', headerName: t('name', CommonMessage.Name)!, width: 130 },
    { field: 'imageExtension', headerName: t('imageExtension', CommonMessage.FileExtension)!, width: 130 },
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
                  id='upload-image'
                  name='upload-image'
                  imageWidth={50}
                  imageHeight={50}
                  file={image}
                  setFile={setImage}
                  setFileExtension={setImageExtension}
                  />
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
                rows={postImages}
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

export default PostImage
