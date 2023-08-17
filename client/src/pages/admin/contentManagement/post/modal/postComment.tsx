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
import { getById, update } from 'src/state/slices/contentManagement/postCommentSlice';
import CommonMessage from 'src/constants/commonMessage';
import { useTranslation } from 'react-i18next';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import ApplicationParams from 'src/constants/applicationParams';
import { PermissionTypeEnum } from 'src/models/shared/enums/permissionTypeEnum';
import { useHotkeys } from 'react-hotkeys-hook';
import Hotkey from 'src/constants/hotkey';
import { UpdatePostCommentDTO } from 'src/models/contentManagement/postComment/updatePostCommentDTO';
import { PostCommentDTO } from 'src/models/contentManagement/postComment/postCommentDTO';
import { GridActionsCellItem, GridColDef, GridPaginationModel, GridRowId, GridSortModel } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { GridParameter } from 'src/models/shared/grid/gridPrameter';
import { getAllByParams, remove } from 'src/state/slices/contentManagement/postCommentSlice';
import { useSelector } from 'react-redux';
import notificationService from 'src/services/shared/notificationService';
import useConfirm from 'src/state/hooks/useConfirm';
import CustomDataGrid from 'src/components/CustomDataGrid/CustomDataGrid';
import localizationService from 'src/services/shared/localizationService';
import { ListPostCommentByParamsDTO } from 'src/models/contentManagement/postComment/listPostCommentByParamsDTO';
import useLocale from 'src/hooks/useLocale';
import { TextValueDTO } from 'src/models/shared/list/textValueDTO';
import MenuItem from '@mui/material/MenuItem';
import { ConfirmStatusTypeEnum, ConfirmStatusTypeEnumLabelMapping } from 'src/models/contentManagement/enums/confirmStatusTypeEnum';
import utilityService from 'src/services/shared/utilityService';

const PostComment = ({id , permissions}: FormProps) => {
const [isUpdate, setIsUpdate] = useState<boolean>(false);
const [hasViewPermission, setHasViewPermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.View));
const [hasInsertPermission, setHasInsertPermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.Add));
const [hasUpdatePermission, setHasUpdatePermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.Update));
const [hasDeletePermission, setHasDeletePermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.Delete));
const [rowId, setRowId] = useState<number | string | null>(null);
const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
const [postComment, setPostComment] = useState<PostCommentDTO | null>(null);
const { postComments, totalCount, isLoading } = useSelector((state: any) => state?.postComment?.postComments ? state?.postComment : { postComments: [], totalCount: 0, isLoading: false });
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
const [postCommentStatuses, setPostCommentStatuses] = useState<TextValueDTO[]>([]);
const dispatch = useAppDispatch();
const { t } = useTranslation(['common']);
const { confirm } = useConfirm();
const firstFieldRef = useRef<HTMLInputElement>(null);
const { getLocale } = useLocale();
const locale = getLocale();

useEffect(() => {
  getAllConfirmStatusTypeList();
  focusOnFirstField();
}, []);


const getItemById = async (id: string | number) => {
  const postCommentDTO: PostCommentDTO = await dispatch(getById(id)).unwrap();
  await setFormData(postCommentDTO);
  setPostComment(postCommentDTO);
}

const getAllConfirmStatusTypeList = () => {
  const posts: TextValueDTO[] = utilityService.getTextValueListByEnum(ConfirmStatusTypeEnum, ConfirmStatusTypeEnumLabelMapping);
  setPostCommentStatuses(posts);
}

const setFormData = async (postCommentDTO: PostCommentDTO | null) =>{
  if (postCommentDTO) {
    await formik.setValues({
        status: postCommentDTO.status.toString()
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
  status: string().required(t('fildIsRequired', CommonMessage.RequiredFiled)!)
});

type initialValuesType = {
  status: string
};
const initialValues: initialValuesType = {
  status: ''
};
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnBlur: false,
    onSubmit: async (values) => {
      if(formik.isValid){
        if (isUpdate) {
          if (postComment) {
            const updatePostCommentDTO: UpdatePostCommentDTO = {
              id: rowId!,
              postId: id!,
              title: postComment?.title,
              comment: postComment?.comment ?? '',
              fullName: postComment?.fullName,
              email: postComment?.email,
              website: postComment?.website,
              ip: postComment?.ip,
              priority: postComment?.priority,
              status: Number(values.status) as ConfirmStatusTypeEnum
            };
            const result = await dispatch(update(updatePostCommentDTO)).unwrap();
            if (result) {
              getGridData();
            }
          }
        }
      }
      else{
        notification.showErrorMessage(t('formDataIsInvalid', CommonMessage.FormDataIsInvalid)!)
      }
    },
    onReset: async () => {
      if (isUpdate) {
        await setFormData(postComment);
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
    const listPostCommentByParams: ListPostCommentByParamsDTO = {
      postId: id!,
      gridParameter: gridparameter
    };
    dispatch(getAllByParams(listPostCommentByParams))
  }

  const columns: GridColDef[] = [
    { field: 'fullName', headerName: t('fullName', CommonMessage.FullName)!, width: 200 },
    { field: 'email', headerName: t('email', CommonMessage.Email)!, width: 250 },
    { field: 'status', headerName: t('status', CommonMessage.Status)!, 
    valueFormatter(params: any) {
      return t(ConfirmStatusTypeEnumLabelMapping[params.value as ConfirmStatusTypeEnum])
    },
    width: 130 },
    { field: 'comment', headerName: t('comment', CommonMessage.Comment)!, width: 500 },
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
      title={t('update', CommonMessage.Update)}
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
                  id='status'
                  name='status'
                  label={t('status', CommonMessage.Status)}
                  value={formik.values.status}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.status && Boolean(formik.errors.status)}
                  helperText={formik.errors.status}>
                  {postCommentStatuses?.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.text}
                      </MenuItem>
                    ))}
                  </TextField> 
                </Grid>
                <Grid item lg={12}>
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
                rows={postComments}
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

export default PostComment