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
import { AddGalleryDTO } from 'src/models/contentManagement/gallery/addGalleryDTO';
import { UpdateGalleryDTO } from 'src/models/contentManagement/gallery/updateGalleryDTO';
import { FormProps } from 'src/types/shared/formType';
import { useAppDispatch } from 'src/state/hooks/hooks';
import { add, getById, update } from 'src/state/slices/contentManagement/gallerySlice';
import { GalleryDTO } from 'src/models/contentManagement/gallery/galleryDTO';
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
import { GalleryTypeEnum, GalleryTypeEnumLabelMapping } from 'src/models/contentManagement/enums/galleryTypeEnum';
import LanguageDropdown from 'src/components/LanguageDropdown/LanguageDropdown';

const PageForm = ({id, permissions, onClose}: FormProps) => {
const [isUpdate, setIsUpdate] = useState<boolean>(id ? true : false);
const [hasInsertPermission, setHasInsertPermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.Add));
const [hasUpdatePermission, setHasUpdatePermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.Update));
const [galleryTypes, setGalleryTypes] = useState<TextValueDTO[]>([]);
const firstFieldRef = useRef<HTMLInputElement>(null);

const dispatch = useAppDispatch();
const { t } = useTranslation(['common']);

useEffect(() => {
  if (id) {
    (async () => {
      await getItemById(id);
    })();
  }
  getAllGalleryTypeList();
  focusOnFirstField();
}, []);

const getItemById = async (id: string | number) => {
  const galleryDTO: GalleryDTO = await dispatch(getById(id)).unwrap();
  await loadFormData(galleryDTO);
}

const loadFormData = async (galleryDTO: GalleryDTO) => {
  if (galleryDTO) {
    await formik.setValues({
        name: galleryDTO.name,
        slugUrl: galleryDTO.slugUrl,
        type: galleryDTO.type.toString(),
        allowedFileExtension: galleryDTO.allowedFileExtension,
        params: galleryDTO.params,
        description: galleryDTO.description,
        priority: galleryDTO.priority,
        locale: galleryDTO.locale
      } as initialValuesType);
  }
}

const getAllGalleryTypeList = () => {
  const galleryTypes: TextValueDTO[] = Object.values(GalleryTypeEnum).filter(p => typeof p === 'number').map(p => ({
    text: t(GalleryTypeEnumLabelMapping[p as GalleryTypeEnum]),
    value: p.toString()
  } as TextValueDTO));
  setGalleryTypes(galleryTypes);
}

//#region hotkey
useHotkeys(Hotkey.Save,() => formik.submitForm())
useHotkeys(Hotkey.Reset,() => formik.resetForm())
//#endregion

const validationSchema = object({
  name: string().max(ApplicationParams.NameMaxLenght, t('minLenghtForThisFieldIsN', CommonMessage.MaxLenghtForThisFieldIsN(ApplicationParams.NameMaxLenght), { n: `${ApplicationParams.NameMaxLenght}`})!).required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  type: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  priority: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!)
});

type initialValuesType = {
  galleryCategoryId:  string;
  name: string,
  type: string,
  slugUrl: string | null,
  allowedFileExtension: string | null,
  description: string | null,
  params: string | null,
  priority: number,
  locale: string | null
};
const initialValues: initialValuesType = {
  galleryCategoryId: '',
  name: '',
  type: '',
  slugUrl: '',
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
          const updateGalleryDTO: UpdateGalleryDTO = {
            id: id!,
            galleryCategoryId: values.galleryCategoryId,
            name: values.name,
            slugUrl: values.slugUrl,
            description: values.description,
            type: Number(values.type) as GalleryTypeEnum,
            allowedFileExtension: values.allowedFileExtension,
            params: values.params,
            priority: values.priority,
            locale: values.locale
          };
          const result = await dispatch(update(updateGalleryDTO)).unwrap();
          if (result) {
            onClose();
          }
        } else {
          const addGalleryaCategoryDTO: AddGalleryDTO = {
            galleryCategoryId: values.galleryCategoryId,
            name: values.name,
            slugUrl: values.slugUrl,
            description: values.description,
            type: Number(values.type) as GalleryTypeEnum,
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
                    {galleryTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.text}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item lg={6}>
                  <TextField
                  fullWidth
                  id="slugUrl"
                  name="slugUrl"
                  label={t('slugUrl', CommonMessage.SlugUrl)}
                  value={formik.values.slugUrl} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.slugUrl && Boolean(formik.errors.slugUrl)}
                  helperText={formik.errors.slugUrl}>
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