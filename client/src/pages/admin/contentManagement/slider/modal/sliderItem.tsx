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
import { TextValueDTO } from 'src/models/shared/list/textValueDTO';
import { PermissionTypeEnum } from 'src/models/shared/enums/permissionTypeEnum';
import { useHotkeys } from 'react-hotkeys-hook';
import Hotkey from 'src/constants/hotkey';
import { SliderTypeEnum, SliderTypeEnumLabelMapping } from 'src/models/contentManagement/enums/sliderTypeEnum';
import { AddSliderItemDTO } from 'src/models/contentManagement/sliderItem/addSliderItemDTO';
import { UpdateSliderItemDTO } from 'src/models/contentManagement/sliderItem/updateSliderItemDTO';
import { SliderItemDTO } from 'src/models/contentManagement/sliderItem/sliderItemDTO';

const SliderItem = ({id , permissions, onClose}: FormProps) => {
const [isUpdate, setIsUpdate] = useState<boolean>(false);
const [hasInsertPermission, setHasInsertPermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.Add));
const [hasUpdatePermission, setHasUpdatePermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.Update));
const [sliderTypes, setSliderTypes] = useState<TextValueDTO[]>([]);

const dispatch = useAppDispatch();
const { t } = useTranslation(['common']);

useEffect(() => {
  if (id) {
    getItemById(id);
  }
  getAllSliderTypeList();
}, []);

const getItemById = async (id: string | number) => {
  const sliderItemDTO: SliderItemDTO = await dispatch(getById(id)).unwrap();
  if (sliderItemDTO) {
    await formik.setValues({
        name: sliderItemDTO.name,
        linkUrl: sliderItemDTO.linkUrl,
        linkTarget: sliderItemDTO.linkTarget,
        file: sliderItemDTO.file,
        description: sliderItemDTO.description,
        priority: sliderItemDTO.priority
      } as initialValuesType);
  }
}

const getAllSliderTypeList = () => {
  const sliderTypes: TextValueDTO[] = Object.values(SliderTypeEnum).filter(p => typeof p === 'number').map(p => ({
    text: t(SliderTypeEnumLabelMapping[p as SliderTypeEnum]),
    value: p.toString()
  } as TextValueDTO));
  setSliderTypes(sliderTypes);
}

//#region hotkey
useHotkeys(Hotkey.Save,() => formik.submitForm())
useHotkeys(Hotkey.Reset,() => formik.resetForm())
//#endregion

const validationSchema = object({
  name: string().max(ApplicationParams.NameMaxLenght, t('minLenghtForThisFieldIsN', CommonMessage.MaxLenghtForThisFieldIsN(ApplicationParams.NameMaxLenght), { n: `${ApplicationParams.NameMaxLenght}`})!).required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  priority: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!)
});

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
  linkUrl: null,
  linkTarget: null,
  file: null,
  description: null,
  priority: 1
};
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if(formik.isValid){
        if (isUpdate) {
          const updateSliderItemDTO: UpdateSliderItemDTO = {
            id: id!,
            sliderId: id!,
            name: values.name,
            linkUrl: values.linkUrl,
            description: values.description,
            file: values.file,
            fileSavePath: null,
            fileExtension: null,
            linkTarget: values.linkTarget,
            priority: values.priority
          };
          const result = await dispatch(update(updateSliderItemDTO)).unwrap();
          if (result) {
            onClose();
          }
        } else {
          const addSliderItemDTO: AddSliderItemDTO = {
            sliderId: id!,
            name: values.name,
            linkUrl: values.linkUrl,
            description: values.description,
            file: values.file,
            fileSavePath: null,
            fileExtension: null,
            linkTarget: values.linkTarget,
            priority: values.priority
          }
          const result = await dispatch(add(addSliderItemDTO)).unwrap();
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
                <Grid item lg={6}>
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
                <Grid item lg={6}>
                  <TextField
                  select 
                  fullWidth
                  id="linkTarget"
                  name="linkTarget"
                  label={t('linkTarget', CommonMessage.Type)}
                  value={formik.values.linkTarget} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.linkTarget && Boolean(formik.errors.linkTarget)}
                  helperText={formik.errors.linkTarget}>
                    {sliderTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.text}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item lg={6}>
                  <TextField
                  fullWidth
                  id="linkUrl"
                  name="linkUrl"
                  label={t('linkUrl', CommonMessage.SectionName)}
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
                  id="linkTarget"
                  name="linkTarget"
                  label={t('linkTarget', CommonMessage.AllowedFileExtension)}
                  value={formik.values.linkTarget} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.linkTarget && Boolean(formik.errors.linkTarget)}
                  helperText={formik.errors.linkTarget}>
                  </TextField>
                </Grid>
                <Grid item lg={6}>
                  <TextField
                  fullWidth
                  id="file"
                  name="file"
                  label={t('file', CommonMessage.Params)}
                  value={formik.values.file} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.file && Boolean(formik.errors.file)}
                  helperText={formik.errors.file}>
                  </TextField>
                </Grid>
                <Grid item lg={6}>
                  <TextField 
                  fullWidth 
                  id="priority"
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
                  title={Hotkey.Save.toLocaleUpperCase()}
                  disabled={(isUpdate && !hasUpdatePermission) || (!isUpdate && !hasInsertPermission)}
                  startIcon={<SaveIcon/>}>
                    <span>{t('save', CommonMessage.Save)}</span>
                  </Button>  
                  <Button
                  type="reset"
                  variant="outlined" 
                  size="small"
                  color="secondary"
                  title={Hotkey.Reset.toLocaleUpperCase()}
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

export default SliderItem
type Props = {
  // Add custom props here
}
export const getStaticProps: GetStaticProps<Props> = async ({locale}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common','security'])),
  },
})