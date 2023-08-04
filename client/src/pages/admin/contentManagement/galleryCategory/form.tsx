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
import notification from '../../../../services/shared/notificationService';
import { AddGalleryCategoryDTO } from 'src/models/contentManagement/galleryCategory/addGalleryCategoryDTO';
import { UpdateGalleryCategoryDTO } from 'src/models/contentManagement/galleryCategory/updateGalleryCategoryDTO';
import { FormProps } from 'src/types/shared/formType';
import { useAppDispatch } from 'src/state/hooks/hooks';
import { add, getAllGalleryCategories, getById, update } from 'src/state/slices/contentManagement/galleryCategorySlice';
import { GalleryCategoryDTO } from 'src/models/contentManagement/galleryCategory/galleryCategoryDTO';
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
import LanguageDropdown from 'src/components/LanguageDropdown/LanguageDropdown';
import FileUploadWithImagePreview from 'src/components/FileUpload/FileUploadWithImagePreview';

const PageForm = ({id, permissions, onClose}: FormProps) => {
const [isUpdate, setIsUpdate] = useState<boolean>(id ? true : false);
const [hasInsertPermission, setHasInsertPermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.Add));
const [hasUpdatePermission, setHasUpdatePermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.Update));
const [galleryCategories, setGalleryCategories] = useState<TextValueDTO[]>([]);
const [image, setIamge] = useState<string | null>(null);

const dispatch = useAppDispatch();
const { t } = useTranslation(['common']);

useEffect(() => {
  if (id) {
    getItemById(id);
  }
  getAllGalleryCategoryList();
}, []);

const getItemById = async (id: string | number) => {
  const galleryCategory: GalleryCategoryDTO = await dispatch(getById(id)).unwrap();
  if (galleryCategory) {
    await formik.setValues({
        name: galleryCategory.name,
        parentId: galleryCategory.parentId,
        priority: galleryCategory.priority,
        locale: galleryCategory.locale,
        description: galleryCategory.description
      } as initialValuesType);
      setIamge(galleryCategory.image);
  }
}

const getAllGalleryCategoryList = async () => {
  const galleryCategories: GalleryCategoryDTO[] = await dispatch(getAllGalleryCategories()).unwrap();
  const mappedGalleryCategories = galleryCategories?.map(p => ({
    text: p.name,
    value: p.id
  } as TextValueDTO));
  setGalleryCategories(mappedGalleryCategories);
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
  name: string,
  type: string,
  parentId: string | null,
  description: string | null,
  priority: number,
  locale: string | null
};
const initialValues: initialValuesType = {
  name: '',
  type: '',
  parentId: '',
  description: '',
  priority: 1,
  locale: ''
};
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if(formik.isValid){
        if (isUpdate) {
          const updateGalleryCategoryDTO: UpdateGalleryCategoryDTO = {
            id: id!,
            name: values.name,
            parentId: values.parentId ? values.parentId : null,
            description: values.description,
            image,
            priority: values.priority,
            locale: values.locale
          };
          const result = await dispatch(update(updateGalleryCategoryDTO)).unwrap();
          if (result) {
            onClose();
          }
        } else {
          const addGalleryaCategoryDTO: AddGalleryCategoryDTO = {
            name: values.name,
            parentId: values.parentId ? values.parentId : null,
            description: values.description,
            image,
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
    onReset: async () => {
      setIamge(null);
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
            spacing={3}>
                <Grid item lg={12}>
                  <TextField
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
                    {galleryCategories.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.text}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
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
                  <FileUploadWithImagePreview
                  id='upload-file'
                  name='upload-file'
                  imageWidth={50}
                  imageHeight={50}
                  file={image}
                  setFile={setIamge}
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

export default PageForm
type Props = {
  // Add custom props here
}
export const getStaticProps: GetStaticProps<Props> = async ({locale}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common','security'])),
  },
})