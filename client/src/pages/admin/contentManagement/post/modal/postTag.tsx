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
import { add, getById, update } from 'src/state/slices/contentManagement/postTagSlice';
import CommonMessage from 'src/constants/commonMessage';
import { useTranslation } from 'react-i18next';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import ApplicationParams from 'src/constants/applicationParams';
import { PermissionTypeEnum } from 'src/models/shared/enums/permissionTypeEnum';
import { useHotkeys } from 'react-hotkeys-hook';
import Hotkey from 'src/constants/hotkey';
import { AddPostTagDTO } from 'src/models/contentManagement/postTag/addPostTagDTO';
import { UpdatePostTagDTO } from 'src/models/contentManagement/postTag/updatePostTagDTO';
import { PostTagDTO } from 'src/models/contentManagement/postTag/postTagDTO';
import { GridActionsCellItem, GridColDef, GridPaginationModel, GridRowId, GridSortModel } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { GridParameter } from 'src/models/shared/grid/gridPrameter';
import { getAllByParams, remove } from 'src/state/slices/contentManagement/postTagSlice';
import { useSelector } from 'react-redux';
import notificationService from 'src/services/shared/notificationService';
import useConfirm from 'src/state/hooks/useConfirm';
import CustomDataGrid from 'src/components/CustomDataGrid/CustomDataGrid';
import localizationService from 'src/services/shared/localizationService';
import { ListPostTagByParamsDTO } from 'src/models/contentManagement/postTag/listPostTagByParamsDTO';
import useLocale from 'src/hooks/useLocale';
import { TagDTO } from 'src/models/contentManagement/tag/tagDTO';
import { TextValueDTO } from 'src/models/shared/list/textValueDTO';
import { getAllTags } from 'src/state/slices/contentManagement/tagSlice';
import MenuItem from '@mui/material/MenuItem';

const PostTag = ({id , permissions}: FormProps) => {
const [isUpdate, setIsUpdate] = useState<boolean>(false);
const [hasViewPermission, setHasViewPermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.View));
const [hasInsertPermission, setHasInsertPermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.Add));
const [hasUpdatePermission, setHasUpdatePermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.Update));
const [hasDeletePermission, setHasDeletePermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.Delete));
const [rowId, setRowId] = useState<number | string | null>(null);
const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
const [postTag, setPostTag] = useState<PostTagDTO | null>(null);
const { postTags, totalCount, isLoading } = useSelector((state: any) => state?.postTag?.postTags ? state?.postTag : { postTags: [], totalCount: 0, isLoading: false });
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
const [tags, setTags] = useState<TextValueDTO[]>([]);
const dispatch = useAppDispatch();
const { t } = useTranslation(['common']);
const { confirm } = useConfirm();
const firstFieldRef = useRef<HTMLInputElement>(null);
const { getLocale } = useLocale();
const locale = getLocale();

useEffect(() => {
  getAllTagList();
  focusOnFirstField();
}, []);


const getItemById = async (id: string | number) => {
  const postTagDTO: PostTagDTO = await dispatch(getById(id)).unwrap();
  await setFormData(postTagDTO);
  setPostTag(postTagDTO);
}

const getAllTagList = async () => {
  const tags: TagDTO[] = await dispatch(getAllTags()).unwrap();
  const mappedTags = tags?.map(p => ({
    text: p.name,
    value: p.id
  } as TextValueDTO));
  setTags(mappedTags);
}

const setFormData = async (postTagDTO: PostTagDTO | null) =>{
  if (postTagDTO) {
    await formik.setValues({
        tagId: postTagDTO.tagId
      } as initialValuesType);
  }
  else{
   clearFormData(); 
  }
};

const clearFormData = async () => {
  await formik.setValues(initialValues);
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
  tagId: string().max(ApplicationParams.NameMaxLenght, t('minLenghtForThisFieldIsN', CommonMessage.MaxLenghtForThisFieldIsN(ApplicationParams.NameMaxLenght), { n: `${ApplicationParams.NameMaxLenght}`})!).required(t('fildIsRequired', CommonMessage.RequiredFiled)!)
});

type initialValuesType = {
  tagId: string
};
const initialValues: initialValuesType = {
  tagId: ''
};
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnBlur: false,
    onSubmit: async (values) => {
      if(formik.isValid){
        if (isUpdate) {
          const updatePostTagDTO: UpdatePostTagDTO = {
            id: rowId!,
            postId: id!,
            tagId: values.tagId
          };
          const result = await dispatch(update(updatePostTagDTO)).unwrap();
          if (result) {
            getGridData();
          }
        } else {
          const addPostTagDTO: AddPostTagDTO = {
            postId: id!,
            tagId: values.tagId
          }
          const result = await dispatch(add(addPostTagDTO)).unwrap();
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
        await setFormData(postTag);
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
    const listPostTagByParams: ListPostTagByParamsDTO = {
      postId: id!,
      gridParameter: gridparameter
    };
    dispatch(getAllByParams(listPostTagByParams))
  }

  const columns: GridColDef[] = [
    { field: 'tagName', headerName: t('tag', CommonMessage.Tag)!, width: 150 },
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
                <Grid item lg={12}>
                  <TextField
                  inputRef={firstFieldRef}
                  select
                  fullWidth 
                  id='tagId'
                  name='tagId'
                  label={t('tag', CommonMessage.Tag)}
                  value={formik.values.tagId}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.tagId && Boolean(formik.errors.tagId)}
                  helperText={formik.errors.tagId}>
                  {tags?.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.text}
                      </MenuItem>
                    ))}
                  </TextField> 
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
                rows={postTags}
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

export default PostTag
