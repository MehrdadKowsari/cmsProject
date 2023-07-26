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
import { AddContentBlockDTO } from 'src/models/contentManagement/contentBlock/addContentBlockDTO';
import { UpdateContentBlockDTO } from 'src/models/contentManagement/contentBlock/updateContentBlockDTO';
import { FormProps } from 'src/types/shared/formType';
import { useAppDispatch } from 'src/state/hooks/hooks';
import { add, getById, update } from 'src/state/slices/contentManagement/contentBlockSlice';
import { ContentBlockDTO } from 'src/models/contentManagement/contentBlock/contentBlockDTO';
import CommonMessage from 'src/constants/commonMessage';
import { useTranslation } from 'react-i18next';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import ApplicationParams from 'src/constants/applicationParams';
import { TextValueDTO } from 'src/models/shared/list/textValueDTO';
import { PermissionTypeEnum } from 'src/models/shared/enums/permissionTypeEnum';
import { useHotkeys } from 'react-hotkeys-hook';
import Hotkey from 'src/constants/hotkey';
import LanguageDropdown from 'src/components/LanguageDropdown/LanguageDropdown';
import dynamic from "next/dynamic";
import CustomDateTimePicker from 'src/components/FormikDateTimePicker/CustomDateTimePicker';
import localizationService from 'src/services/shared/localizationService';
import useLocale from 'src/hooks/useLocale';
import utilityService from 'src/services/shared/utilityService';
import FileUploadWithImagePreview from 'src/components/FileUpload/FileUploadWithImagePreview';

const RichTextEditor = dynamic(() => import("./../../../../../components/RichTextEditor/RichTextEditor"), { ssr: false });
const PageForm = ({id, permissions, onClose}: FormProps) => {
const [isUpdate, setIsUpdate] = useState<boolean>(id ? true : false);
const [hasInsertPermission, setHasInsertPermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.Add));
const [hasUpdatePermission, setHasUpdatePermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.Update));
const firstFieldRef = useRef<HTMLInputElement>(null);
const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
const [content, setContent] = useState<string | null>(null);
const [image, setImage] = useState<string | null>(null);

const dispatch = useAppDispatch();
const { t } = useTranslation(['common']);
const { getLocale } = useLocale();
const locale = getLocale();

useEffect(() => {
  if (id) {
    (async () => {
      await getItemById(id);
    })();
  }
  setEditorLoaded(true);
  focusOnFirstField();
}, []);

const getItemById = async (id: string | number) => {
  const contentBlockDTO: ContentBlockDTO = await dispatch(getById(id)).unwrap();
  await loadFormData(contentBlockDTO);
}

const loadFormData = async (contentBlockDTO: ContentBlockDTO) => {
  if (contentBlockDTO) {
    await formik.setValues({
        title: contentBlockDTO.title,
        content: contentBlockDTO.content,
        image: contentBlockDTO.image,
        iconCssClass: contentBlockDTO.iconCssClass,
        priority: contentBlockDTO.priority,
        dateFrom: localizationService.parseDateTime(contentBlockDTO.dateFrom, locale),
        dateTo: localizationService.parseDateTime(contentBlockDTO.dateTo, locale),
        locale: contentBlockDTO.locale
      } as initialValuesType);
      setContent(contentBlockDTO.content);
      setImage(contentBlockDTO.image);
  }
}

//#region hotkey
useHotkeys(Hotkey.Save,() => formik.submitForm())
useHotkeys(Hotkey.Reset,() => formik.resetForm())
//#endregion

const validationSchema = object({
  contentBlockCategoryId: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  content: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  priority: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  locale: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!)
});

type initialValuesType = {
  title: string,
  content: string | null,
  iconCssClass: string | null,
  sectionName: string,
  image: string | null,
  priority: number,
  dateFrom: Date | null,
  dateTo: Date | null,
  locale: string | null
};
const initialValues: initialValuesType = {
  title: '',
  content: '',
  image: '',
  iconCssClass: '',
  sectionName: '',
  dateFrom: null,
  dateTo: null,
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
          const updateContentBlockDTO: UpdateContentBlockDTO = {
            id: id!,
            title: values.title,
            content: content,
            iconCssClass: values.iconCssClass,
            sectionName: values.sectionName,
            image: image,
            priority: values.priority,
            dateFrom: values.dateFrom,
            dateTo: values.dateTo,
            locale: values.locale
          };
          const result = await dispatch(update(updateContentBlockDTO)).unwrap();
          if (result) {
            onClose();
          }
        } else {
          const addContentBlockDTO: AddContentBlockDTO = {
            title: values.title,
            content: content,
            iconCssClass: values.iconCssClass,
            sectionName: values.sectionName,
            image: image,
            priority: values.priority,
            dateFrom: values.dateFrom,
            dateTo: values.dateTo,
            locale: values.locale
          }
          const result = await dispatch(add(addContentBlockDTO)).unwrap();
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
      clearMainForm();
    }
  });

  const focusOnFirstField = () => {
    if (firstFieldRef && firstFieldRef.current) {
      firstFieldRef.current.focus();
     }
  }

  const clearMainForm = () => {
    setContent(null);
    setImage(null);
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
                <Grid item lg={12}>
                  <TextField 
                  fullWidth 
                  id="title"
                  label={t('title', CommonMessage.Title)}
                  value={formik.values.title}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.errors.title}/> 
                </Grid>
                <Grid item lg={12}>
                  <RichTextEditor
                  name="content"
                  value={content}
                  onChange={(content: string) => {
                    setContent(content);
                  }}
                  editorLoaded={editorLoaded}
                  locale={locale!}
                />
                </Grid>
                <Grid item lg={6}>
                  <TextField 
                  fullWidth 
                  id="sectionName"
                  label={t('sectionName', CommonMessage.IconClass)}
                  value={formik.values.sectionName}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.sectionName && Boolean(formik.errors.sectionName)}
                  helperText={formik.errors.sectionName} 
                  rows={2}/>
                </Grid>
                <Grid item lg={6}>
                  <TextField 
                  fullWidth 
                  id="iconCssClass"
                  label={t('iconCssClass', CommonMessage.IconClass)}
                  value={formik.values.iconCssClass}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.iconCssClass && Boolean(formik.errors.iconCssClass)}
                  helperText={formik.errors.iconCssClass} 
                  rows={2}/>
                </Grid>
                <Grid item lg={6}>
                <CustomDateTimePicker
                  name="dateFrom"
                  label={t('dateFrom', CommonMessage.From)}
                  value={formik.values.dateFrom}
                  onChange={(value) => {
                    formik.setFieldValue('dateFrom', value);
                  }}                  
                />
                </Grid>
                <Grid item lg={6}>
                <CustomDateTimePicker
                  name="dateTo"
                  label={t('dateTo', CommonMessage.To)}
                  value={formik.values.dateTo}
                  onChange={(value) => {
                    formik.setFieldValue('dateTo', value);
                  }}                  
                />
                </Grid>
                <Grid item lg={6}>
                  <FileUploadWithImagePreview
                  id='upload-image'
                  name='upload-image'
                  imageWidth={50}
                  imageHeight={50}
                  file={image}
                  setFile={setImage}
                  />
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