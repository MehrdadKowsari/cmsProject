import React,  { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save'
import ClearIcon from '@mui/icons-material/Clear'
import { useFormik } from 'formik';
import {object, string} from 'yup';
import notification from '../../../../services/notificationService';
import { AddPermissionDTO } from 'src/models/security/permission/addPermissionDTO';
import { UpdatePermissionDTO } from 'src/models/security/permission/updatePermissionDTO';
import { FormProps } from 'src/types/shared/formType';
import { useAppDispatch } from 'src/state/hooks/hooks';
import { add, getById, update } from 'src/state/slices/permissionSlice';
import { PermissionDTO } from 'src/models/security/permission/permissionDTO';
import CommonMessage from 'src/constants/commonMessage';
import { useTranslation } from 'react-i18next';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import ApplicationParams from 'src/constants/applicationParams';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { PermissionTypeEnum, PermissionTypeEnumLabelMapping } from 'src/models/shared/enums/permissionTypeEnum';
import { TextValueDTO } from 'src/models/shared/list/textValueDTO';

const PermissionForm = ({id, permissions, onClose}: FormProps) => {
const [isUpdate, setIsUpdate] = useState<boolean>(id ? true : false);
const [hasInsertPermission, setHasInsertPermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.Add));
const [hasUpdatePermission, setHasUpdatePermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.Update));
const [types, setTypes] = useState<TextValueDTO[]>([]);

const dispatch = useAppDispatch();
const { t } = useTranslation(['common', 'security']);

useEffect(() => {
  if (id) {
    getItemById(id);
  }
  getTypeList();
}, []);

const getItemById = async (id: string | number) => {
  const permissionDTO: PermissionDTO = await dispatch(getById(id)).unwrap();
  if (permissionDTO) {
    await formik.setValues({
        name: permissionDTO.name,
        type: permissionDTO.type.toString(),
        description: permissionDTO.description
      } as initialValuesType);
  }
}

const getTypeList = () => {
  const typeList: TextValueDTO[] = Object.values(PermissionTypeEnum).filter(p => typeof p === 'number').map(j => ({
    text: t(PermissionTypeEnumLabelMapping[j as PermissionTypeEnum]),
    value: j.toString()
  } as TextValueDTO));
  setTypes(typeList);
}

const validationSchema = object({
  name: string().max(ApplicationParams.NameMaxLenght, t('minLenghtForThisFieldIsN', CommonMessage.MaxLenghtForThisFieldIsN(ApplicationParams.NameMaxLenght), { n: `${ApplicationParams.NameMaxLenght}`})!).required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  type: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  description: string().max(ApplicationParams.DescriptionMaxLenght, t('minLenghtForThisFieldIsN', CommonMessage.MaxLenghtForThisFieldIsN(ApplicationParams.DescriptionMaxLenght), { n: `${ApplicationParams.DescriptionMaxLenght}`})!)
  
});

type initialValuesType = {
  name: string,
  type: string,
  description?: string
};
const initialValues: initialValuesType = {
  name: '',
  type: ''
};
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if(formik.isValid){
        if (isUpdate) {
          const updatePermissionData: UpdatePermissionDTO = {
            id: id!,
            name: values.name,
            type: Number(values.type) as PermissionTypeEnum,
            description: values.description
          };
          const result = await dispatch(update(updatePermissionData)).unwrap();
          if (result) {
            onClose();
          }
        } else {
          const addPermissionData: AddPermissionDTO = {
            name: values.name,
            type: Number(values.type) as PermissionTypeEnum,
            description: values.description
          }
          const result = await dispatch(add(addPermissionData)).unwrap();
          if (result) {
            onClose();
          }         
        }
      }
      else{
        notification.showErrorMessage(t('formDataIsInvalid', CommonMessage.FormDataIsInvalid)!)
      }
    }
  })
  
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
            justifyContent="center">
                <Grid item lg={12}>
                  <TextField 
                  fullWidth 
                  id="name"
                  label={t('name', CommonMessage.Name)}
                  value={formik.values.name}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.errors.name}/> 
                </Grid>
                <Grid item lg={12}>
                  <TextField
                  select 
                  fullWidth
                  id="type"
                  name="type"
                  label={t('type', CommonMessage.Type)}
                  value={formik.values.type} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.type && Boolean(formik.errors.type)}
                  helperText={formik.errors.type}>
                    {types.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.text}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item lg={12}>
                  <TextField 
                  fullWidth 
                  id="description"
                  label={t('description', CommonMessage.Description)}
                  value={formik.values.description}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.errors.description}/> 
                </Grid>
                <Grid item lg={12}>
                  <Button
                  type="submit"
                  variant="contained" 
                  size="small"
                  color="success"
                  disabled={(isUpdate && !hasUpdatePermission) || (!isUpdate && !hasInsertPermission)}
                  startIcon={<SaveIcon/>}>
                    <span>{t('save', CommonMessage.Save)}</span>
                  </Button>  
                  <Button
                  type="reset"
                  variant="outlined" 
                  size="small"
                  color="secondary"
                  sx={{mx: 3}}
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
    </Card> 
  )
}

export default PermissionForm
type Props = {
  // Add custom props here
}
export const getStaticProps: GetStaticProps<Props> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common','security'])),
  },
})