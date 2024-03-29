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
import { AddPostDTO } from 'src/models/contentManagement/post/addPostDTO';
import { UpdatePostDTO } from 'src/models/contentManagement/post/updatePostDTO';
import { FormProps } from 'src/types/shared/formType';
import { useAppDispatch } from 'src/state/hooks/hooks';
import { add, getById, update } from 'src/state/slices/contentManagement/postSlice';
import { PostDTO } from 'src/models/contentManagement/post/postDTO';
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
import { PostTypeEnum, PostTypeEnumLabelMapping } from 'src/models/contentManagement/enums/postTypeEnum';
import LanguageDropdown from 'src/components/LanguageDropdown/LanguageDropdown';
import { PostCategoryDTO } from 'src/models/contentManagement/postCategory/postCategoryDTO';
import { getAllPostCategories } from 'src/state/slices/contentManagement/postCategorySlice';
import dynamic from "next/dynamic";
import CustomDateTimePicker from 'src/components/FormikDateTimePicker/CustomDateTimePicker';
import localizationService from 'src/services/shared/localizationService';
import useLocale from 'src/hooks/useLocale';
import utilityService from 'src/services/shared/utilityService';
import { PostStatusTypeEnum, PostStatusTypeEnumLabelMapping } from 'src/models/contentManagement/enums/postStatusTypeEnum';
import FileUploadWithImagePreview from 'src/components/FileUpload/FileUploadWithImagePreview';

const RichTextEditor = dynamic(() => import("./../../../../../components/RichTextEditor/RichTextEditor"), { ssr: false });
const PageForm = ({id, permissions, onClose}: FormProps) => {
const [isUpdate, setIsUpdate] = useState<boolean>(id ? true : false);
const [hasInsertPermission, setHasInsertPermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.Add));
const [hasUpdatePermission, setHasUpdatePermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.Update));
const [postCategories, setPostCategories] = useState<TextValueDTO[]>([]);
const [postTypes, setPostTypes] = useState<TextValueDTO[]>([]);
const [postStatusTypes, setPostStatusTypes] = useState<TextValueDTO[]>([]);
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
  getAllPostCategoryList();
  getAllPostTypeList();
  getAllPostStatusTypeList();
  focusOnFirstField();
}, []);

const getItemById = async (id: string | number) => {
  const postDTO: PostDTO = await dispatch(getById(id)).unwrap();
  await loadFormData(postDTO);
}

const getAllPostCategoryList = async () => {
  const postCategories: PostCategoryDTO[] = await dispatch(getAllPostCategories()).unwrap();
  const mappedPostCategories = postCategories?.map(p => ({
    text: p.name,
    value: p.id
  } as TextValueDTO));
  setPostCategories(mappedPostCategories);
}

const loadFormData = async (postDTO: PostDTO) => {
  if (postDTO) {
    await formik.setValues({
        postCategoryId: postDTO.postCategoryId,
        title: postDTO.title,
        type: postDTO.type.toString(),
        slugUrl: postDTO.slugUrl,
        content: postDTO.content,
        image: postDTO.image,
        shortDescription: postDTO.shortDescription,
        priority: postDTO.priority,
        dateFrom: localizationService.parseDateTime(postDTO.dateFrom, locale),
        dateTo: localizationService.parseDateTime(postDTO.dateTo, locale),
        status: postDTO.status.toString(),
        locale: postDTO.locale
      } as initialValuesType);
      setContent(postDTO.content);
      setImage(postDTO.image);
  }
}

const getAllPostTypeList = () => {
  const postTypes: TextValueDTO[] = utilityService.getTextValueListByEnum(PostTypeEnum, PostTypeEnumLabelMapping);;
  setPostTypes(postTypes);
}

const getAllPostStatusTypeList = () => {
  const postStatusTypes: TextValueDTO[] = utilityService.getTextValueListByEnum(PostStatusTypeEnum, PostStatusTypeEnumLabelMapping);
  setPostStatusTypes(postStatusTypes);
}

//#region hotkey
useHotkeys(Hotkey.Save,() => formik.submitForm())
useHotkeys(Hotkey.Reset,() => formik.resetForm())
//#endregion

const validationSchema = object({
  postCategoryId: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  title: string().max(ApplicationParams.PostTitleMaxLenght, t('minLenghtForThisFieldIsN', CommonMessage.MaxLenghtForThisFieldIsN(ApplicationParams.PostTitleMaxLenght), { n: `${ApplicationParams.PostTitleMaxLenght}`})!).required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  type: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  priority: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  locale: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!)
});

type initialValuesType = {
  postCategoryId:  string;
  title: string,
  type: string,
  slugUrl: string | null,
  content: string | null,
  shortDescription: string | null,
  image: string | null,
  priority: number,
  dateFrom: Date | null,
  dateTo: Date | null,
  status: string,
  locale: string | null
};
const initialValues: initialValuesType = {
  postCategoryId: '',
  title: '',
  type: '',
  slugUrl: '',
  content: '',
  image: '',
  shortDescription: '',
  dateFrom: null,
  dateTo: null,
  priority: 1,
  status: '',
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
          const updatePostDTO: UpdatePostDTO = {
            id: id!,
            postCategoryId: values.postCategoryId,
            title: values.title,
            slugUrl: values.slugUrl,
            shortDescription: values.shortDescription,
            type: Number(values.type) as PostTypeEnum,
            content: content,
            image: image,
            priority: values.priority,
            dateFrom: values.dateFrom,
            dateTo: values.dateTo,
            status: Number(values.status) as PostStatusTypeEnum,
            locale: values.locale
          };
          const result = await dispatch(update(updatePostDTO)).unwrap();
          if (result) {
            onClose();
          }
        } else {
          const addPostDTO: AddPostDTO = {
            postCategoryId: values.postCategoryId,
            title: values.title,
            slugUrl: values.slugUrl,
            shortDescription: values.shortDescription,
            type: Number(values.type) as PostTypeEnum,
            content: content,
            image: image,
            priority: values.priority,
            dateFrom: values.dateFrom,
            dateTo: values.dateTo,
            status: Number(values.status) as PostStatusTypeEnum,
            locale: values.locale
          }
          const result = await dispatch(add(addPostDTO)).unwrap();
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
                <Grid item lg={6}>
                  <TextField
                  inputRef={firstFieldRef}
                  select 
                  fullWidth
                  id="postCategoryId"
                  name="postCategoryId"
                  label={t('postCategory', CommonMessage.PostCategory)}
                  value={formik.values.postCategoryId} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.postCategoryId && Boolean(formik.errors.postCategoryId)}
                  helperText={formik.errors.postCategoryId}>
                    {postCategories.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.text}
                      </MenuItem>
                    ))}
                  </TextField>
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
                    {postTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {t(option.text)}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
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
                  <TextField 
                  fullWidth 
                  id="shortDescription"
                  label={t('shortDescription', CommonMessage.ShortDescription)}
                  value={formik.values.shortDescription}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.shortDescription && Boolean(formik.errors.shortDescription)}
                  helperText={formik.errors.shortDescription} 
                  rows={2}/>
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
                  select 
                  fullWidth
                  id="status"
                  name="status"
                  label={t('status', CommonMessage.Status)}
                  value={formik.values.status} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.status && Boolean(formik.errors.status)}
                  helperText={formik.errors.status}>
                    {postStatusTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {t(option.text)}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item lg={12}>
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