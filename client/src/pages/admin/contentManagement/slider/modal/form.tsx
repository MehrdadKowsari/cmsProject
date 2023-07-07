import React,  { useState, useEffect, useRef } from 'react';
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
import { AddSliderDTO } from 'src/models/contentManagement/slider/addSliderDTO';
import { UpdateSliderDTO } from 'src/models/contentManagement/slider/updateSliderDTO';
import { FormProps } from 'src/types/shared/formType';
import { useAppDispatch } from 'src/state/hooks/hooks';
import { add, getById, update } from 'src/state/slices/contentManagement/sliderSlice';
import { SliderDTO } from 'src/models/contentManagement/slider/sliderDTO';
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
import LanguageDropdown from 'src/components/LanguageDropdown/LanguageDropdown';

const PageForm = ({id, permissions, onClose}: FormProps) => {
const [isUpdate, setIsUpdate] = useState<boolean>(id ? true : false);
const [hasInsertPermission, setHasInsertPermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.Add));
const [hasUpdatePermission, setHasUpdatePermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.Update));
const [sliderTypes, setSliderTypes] = useState<TextValueDTO[]>([]);
const firstFieldRef = useRef<HTMLInputElement>(null);

const dispatch = useAppDispatch();
const { t } = useTranslation(['common']);

useEffect(() => {
  if (id) {
    (async () => {
      await getItemById(id);
    })();
  }
  getAllSliderTypeList();
  focusOnFirstField();
}, []);

const getItemById = async (id: string | number) => {
  const sliderDTO: SliderDTO = await dispatch(getById(id)).unwrap();
  await loadFormData(sliderDTO);
}

const loadFormData = async (sliderDTO: SliderDTO) => {
  if (sliderDTO) {
    await formik.setValues({
        name: sliderDTO.name,
        sectionName: sliderDTO.sectionName,
        type: sliderDTO.type.toString(),
        allowedFileExtension: sliderDTO.allowedFileExtension,
        params: sliderDTO.params,
        description: sliderDTO.description,
        priority: sliderDTO.priority,
        locale: sliderDTO.locale
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
  type: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  sectionName: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  priority: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!)
});

type initialValuesType = {
  articleCategoryId?:  string | null;
  galleryId?:  string | null;
  name: string,
  type: string,
  sectionName: string | null,
  allowedFileExtension: string | null,
  description: string | null,
  params: string | null,
  priority: number,
  locale: string | null
};
const initialValues: initialValuesType = {
  name: '',
  type: '',
  sectionName: '',
  allowedFileExtension: '',
  params: '',
  description: '',
  priority: 1,
  locale: ''
};
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      if(formik.isValid){
        if (isUpdate) {
          const updateSliderDTO: UpdateSliderDTO = {
            id: id!,
            name: values.name,
            sectionName: values.sectionName,
            description: values.description,
            type: Number(values.type) as SliderTypeEnum,
            allowedFileExtension: values.allowedFileExtension,
            params: values.params,
            priority: values.priority,
            locale: values.locale
          };
          const result = await dispatch(update(updateSliderDTO)).unwrap();
          if (result) {
            onClose();
          }
        } else {
          const addGalleryaCategoryDTO: AddSliderDTO = {
            name: values.name,
            sectionName: values.sectionName,
            description: values.description,
            type: Number(values.type) as SliderTypeEnum,
            allowedFileExtension: values.allowedFileExtension,
            params: values.params,
            priority: values.priority,
            locale: values.locale
          }
          const result = await dispatch(add(addGalleryaCategoryDTO)).unwrap();
          if (result) {
            onClose();
          }         
        }
      }
      else{
        notification.showErrorMessage(t('formDataIsInvalid', CommonMessage.FormDataIsInvalid)!)
      }
    },
    onReset: () => {
      focusOnFirstField();
    }
  });

  const focusOnFirstField = () => {
    if (firstFieldRef && firstFieldRef.current) {
      firstFieldRef.current.focus();
     }
  }
  
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
                  inputRef={firstFieldRef}
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
                  id="type"
                  name="type"
                  label={t('type', CommonMessage.Type)}
                  value={formik.values.type} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.type && Boolean(formik.errors.type)}
                  helperText={formik.errors.type}>
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
                  id="sectionName"
                  name="sectionName"
                  label={t('sectionName', CommonMessage.SectionName)}
                  value={formik.values.sectionName} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.sectionName && Boolean(formik.errors.sectionName)}
                  helperText={formik.errors.sectionName}>
                  </TextField>
                </Grid>
                <Grid item lg={6}>
                  <TextField
                  fullWidth
                  id="allowedFileExtension"
                  name="allowedFileExtension"
                  label={t('allowedFileExtension', CommonMessage.AllowedFileExtension)}
                  value={formik.values.allowedFileExtension} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.allowedFileExtension && Boolean(formik.errors.allowedFileExtension)}
                  helperText={formik.errors.allowedFileExtension}>
                  </TextField>
                </Grid>
                <Grid item lg={6}>
                  <TextField
                  fullWidth
                  id="params"
                  name="params"
                  label={t('params', CommonMessage.Params)}
                  value={formik.values.params} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.params && Boolean(formik.errors.params)}
                  helperText={formik.errors.params}>
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
                  <LanguageDropdown
                    id="locale "
                    name="locale"
                    label={t('locale', CommonMessage.Locale)}
                    value={formik.values.locale} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.locale && Boolean(formik.errors.locale)}
                    helperText={formik.errors.locale}
                  />
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
                  title={Hotkey.Save.toUpperCase()}
                  disabled={(isUpdate && !hasUpdatePermission) || (!isUpdate && !hasInsertPermission)}
                  startIcon={<SaveIcon/>}>
                    <span>{t('save', CommonMessage.Save)}</span>
                  </Button>  
                  <Button
                  type="reset"
                  variant="outlined" 
                  size="small"
                  color="secondary"
                  title={Hotkey.Reset.toUpperCase()}
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

export default PageForm
type Props = {
  // Add custom props here
}
export const getStaticProps: GetStaticProps<Props> = async ({locale}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
})