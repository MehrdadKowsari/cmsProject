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

const RichTextEditor = dynamic(() => import("./../../../../../components/RichTextEditor/RichTextEditor"), { ssr: false });
const PageForm = ({id, permissions, onClose}: FormProps) => {
const [isUpdate, setIsUpdate] = useState<boolean>(id ? true : false);
const [hasInsertPermission, setHasInsertPermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.Add));
const [hasUpdatePermission, setHasUpdatePermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.Update));
const [postCategories, setPostCategories] = useState<TextValueDTO[]>([]);
const [postTypes, setPostTypes] = useState<TextValueDTO[]>([]);
const firstFieldRef = useRef<HTMLInputElement>(null);
const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
const [content, setContent] = useState<string>("");

const dispatch = useAppDispatch();
const { t } = useTranslation(['common']);

useEffect(() => {
  if (id) {
    (async () => {
      await getItemById(id);
    })();
  }
  setEditorLoaded(true);
  getAllPostCategoryList();
  getAllPostTypeList();
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
        locale: postDTO.locale
      } as initialValuesType);
  }
}

const getAllPostTypeList = () => {
  const postTypes: TextValueDTO[] = Object.values(PostTypeEnum).filter(p => typeof p === 'number').map(p => ({
    text: t(PostTypeEnumLabelMapping[p as PostTypeEnum]),
    value: p.toString()
  } as TextValueDTO));
  setPostTypes(postTypes);
}

//#region hotkey
useHotkeys(Hotkey.Save,() => formik.submitForm())
useHotkeys(Hotkey.Reset,() => formik.resetForm())
//#endregion

const validationSchema = object({
  postCategoryId: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  name: string().max(ApplicationParams.NameMaxLenght, t('minLenghtForThisFieldIsN', CommonMessage.MaxLenghtForThisFieldIsN(ApplicationParams.NameMaxLenght), { n: `${ApplicationParams.NameMaxLenght}`})!).required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
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
          const updatePostDTO: any = {
            id: id!,
            postCategoryId: values.postCategoryId,
            title: values.title,
            slugUrl: values.slugUrl,
            shortDescription: values.shortDescription,
            type: Number(values.type) as PostTypeEnum,
            content: values.content,
            image: values.image,
            priority: values.priority,
            locale: values.locale
          };
          const result = await dispatch(update(updatePostDTO)).unwrap();
          if (result) {
            onClose();
          }
        } else {
          const addPostaCategoryDTO: any = {
            postCategoryId: values.postCategoryId,
            title: values.title,
            slugUrl: values.slugUrl,
            shortDescription: values.shortDescription,
            type: Number(values.type) as PostTypeEnum,
            content: values.content,
            image: values.image,
            priority: values.priority,
            locale: values.locale
          }
          const result = await dispatch(add(addPostaCategoryDTO)).unwrap();
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
                        {option.text}
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
                />
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
                  id="image"
                  name="image"
                  label={t('image', CommonMessage.Params)}
                  value={formik.values.image} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.image && Boolean(formik.errors.image)}
                  helperText={formik.errors.image}>
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