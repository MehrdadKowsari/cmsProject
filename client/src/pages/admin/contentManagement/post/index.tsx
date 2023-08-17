import { AppProps } from 'next/app';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import * as React from 'react';
import { GridActionsCellItem, GridColDef, GridPaginationModel, GridRowId, GridSortModel } from '@mui/x-data-grid';
import UserLayout from 'src/layouts/admin/UserLayout';
import useConfirm from 'src/state/hooks/useConfirm';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/Image';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import TagIcon from '@mui/icons-material/Tag';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';
import { Button, CardContent, CardHeader } from '@mui/material';
import Box from '@mui/material/Box';
import { useAppDispatch } from 'src/state/hooks/hooks';
import { getAllByParams, remove } from 'src/state/slices/contentManagement/postSlice';
import CustomDialog from 'src/components/Modal/Modal';
import PageForm from './modal/form';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Card from '@mui/material/Card';
import CommonMessage from 'src/constants/commonMessage';
import { GridParameter } from 'src/models/shared/grid/gridPrameter';
import ApplicationParams from 'src/constants/applicationParams';
import { PageTypeEnum } from 'src/models/security/enums/pageTypeEnum';
import { PermissionDTO } from 'src/models/security/permission/permissionDTO';
import { PermissionTypeEnum } from 'src/models/shared/enums/permissionTypeEnum';
import { getAllByPageId } from 'src/state/slices/rolePagePermissionSlice';
import Hotkey from 'src/constants/hotkey';
import { useHotkeys } from 'react-hotkeys-hook';
import NotificationService from 'src/services/shared/notificationService';
import PermissionService from 'src/services/security/permissionService';
import { PostTypeEnum, PostTypeEnumLabelMapping } from 'src/models/contentManagement/enums/postTypeEnum';
import PostFile from './modal/postFile';
import { LanguageCodeEnumLabbelMapping, LanguageCodeEnum } from 'src/models/shared/enums/languageCodeEnum';
import CustomDataGrid from 'src/components/CustomDataGrid/CustomDataGrid';
import { useRouter } from 'next/router';
import localizationService from 'src/services/shared/localizationService';
import PostImage from './modal/postImage';
import PostTag from './modal/postTag';
import RelatedPost from './modal/relatedPost';
import PostComment from './modal/postComment';

const Page = ({ Component, pageProps }: AppProps) => {
  const dispatch = useAppDispatch();
  const { posts, totalCount, isLoading } = useSelector((state: any) => state?.post?.posts ? state?.post : { posts: [], totalCount: 0, isLoading: false });
  const [isOpenFormModal, setIsOpenFormModal] = useState<boolean>(false);
  const [locale, setLocale] = useState<string>(ApplicationParams.DefaultLanguageCode);
  const [isOpenPostImageItemModal, setIsOpenPostImageItemModal] = useState<boolean>(false);
  const [isOpenPostFileItemModal, setIsOpenPostFileItemModal] = useState<boolean>(false);
  const [isOpenPostTagItemModal, setIsOpenPostTagItemModal] = useState<boolean>(false);
  const [isOpenRelatedPostItemModal, setIsOpenRelatedPostItemModal] = useState<boolean>(false);
  const [isOpenPostCommentItemModal, setIsOpenPostCommentItemModal] = useState<boolean>(false);
  const [userPagePermissions, setUserPagePermissions] = useState<PermissionDTO[]>([]);
  const [hasViewPermission, setHasViewPermission] = useState<boolean>(false);
  const [hasInsertPermission, setHasInsertPermission] = useState<boolean>(false);
  const [hasUpdatePermission, setHasUpdatePermission] = useState<boolean>(false);
  const [hasDeletePermission, setHasDeletePermission] = useState<boolean>(false);
  const [rowId, setRowId] = useState<number | string | null>(null);
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
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

  const { t } = useTranslation(['common']);
  const router = useRouter();

  const queryOptions = useMemo(
    () => ({
      paginationModel,
      sortModel
    }),
    [paginationModel, sortModel, hasViewPermission],
  );

  const { confirm } = useConfirm();
  useEffect(() => {
    if (hasViewPermission) {
      getGridData();
    }
  }, [queryOptions]);

  useEffect(() => {
    getRolePagePermissions();
    setLocale(localizationService.getLanguageCodeByRouter(router));
  }, []);

  useEffect(() => {
    const hasViewPermission: boolean = PermissionService.hasPermission(userPagePermissions, PermissionTypeEnum.View);
    setHasViewPermission(hasViewPermission);
    const hasInsertPermission: boolean = PermissionService.hasPermission(userPagePermissions, PermissionTypeEnum.Add);
    setHasInsertPermission(hasInsertPermission);
    const hasUpdatePermission: boolean = PermissionService.hasPermission(userPagePermissions, PermissionTypeEnum.Update);
    setHasUpdatePermission(hasUpdatePermission);
    const hasDeletePermission: boolean = PermissionService.hasPermission(userPagePermissions, PermissionTypeEnum.Delete);
    setHasDeletePermission(hasDeletePermission);
  }, [userPagePermissions])

  const getRolePagePermissions = async () => {
    const permissions: PermissionDTO[] = await dispatch(getAllByPageId(PageTypeEnum.Post)).unwrap();
    if (permissions?.length > 0) {
      setUserPagePermissions(permissions);
    }
    else {
      NotificationService.showErrorMessage(t('youHaveNotAccessToThePageOrAction', CommonMessage.DoNotHaveAccessToThisActionOrSection));
    }
  }

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
      setIsOpenFormModal(true);
    },
    []
  );

  const getGridData = () => {
    const gridparameter: GridParameter = {
      currentPage: queryOptions.paginationModel.page,
      pageSize: queryOptions.paginationModel.pageSize,
      sortModel: sortModel
    }
    dispatch(getAllByParams(gridparameter))
  }

  //#region hotkey
  useHotkeys(Hotkey.New, () => handleAddNew());
  useHotkeys(Hotkey.Update, async () => {
    if (selectedRows?.length === 1 && hasUpdatePermission) {
      const rowId: GridRowId = selectedRows[0];
      await handleUpdate(rowId);
    }
    else {
      NotificationService.showErrorMessage(t('youHaveNotAccessToThePageOrAction', CommonMessage.DoNotHaveAccessToThisActionOrSection));
    }
  })
  useHotkeys(Hotkey.Delete, async () => {
    if (selectedRows?.length === 1 && hasDeletePermission) {
      const rowId: GridRowId = selectedRows[0];
      await handleDelete(rowId);
    }
    else {
      NotificationService.showErrorMessage(t('youHaveNotAccessToThePageOrAction', CommonMessage.DoNotHaveAccessToThisActionOrSection));
    }
  })
  //#endregion

  const columns: GridColDef[] = [
    { field: 'title', headerName: t('title', CommonMessage.Title)!, width: 250 },
    { field: 'type', headerName: t('type', CommonMessage.Type)!, 
    valueFormatter(params: any) {
      return t(PostTypeEnumLabelMapping[params.value as PostTypeEnum])
    },
    width: 130 },
    { field: 'shortDescription', headerName: t('shortDescription', CommonMessage.ShortDescription)!, width: 250 },
    { field: 'priority', headerName: t('priority', CommonMessage.Priority)!, width: 130 },
    { field: 'locale', headerName: t('locale', CommonMessage.Locale)!, valueFormatter(params) {
      return t(LanguageCodeEnumLabbelMapping[params?.value as LanguageCodeEnum])
    }, 
    width: 130 },
    { field: 'updatedAt', headerName: t('updatedAt', CommonMessage.UpdatedAt)!, valueFormatter(params) {
      return localizationService.getLocalDateTime(params?.value, locale);
    },width: 150 },
    {
      field: 'actions',
      type: 'actions',
      width: 250,
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
        <GridActionsCellItem
          key={params.id}
          icon={<ListIcon />}
          label={t('postImage', CommonMessage.PostImage)}
          onClick={() => handleOpenPostImageItemModal(params.id)}
        />,
        <GridActionsCellItem
          key={params.id}
          icon={<InsertDriveFileIcon />}
          label={t('postFile', CommonMessage.PostFile)}
          onClick={() => handleOpenPostFileItemModal(params.id)}
        />,
        <GridActionsCellItem
          key={params.id}
          icon={<TagIcon />}
          label={t('postTag', CommonMessage.PostTag)}
          onClick={() => handleOpenPostTagItemModal(params.id)}
        />,
        <GridActionsCellItem
        key={params.id}
        icon={<ShareIcon />}
        label={t('relatedPost', CommonMessage.RelatedPost)}
        onClick={() => handleOpenRelatedPostItemModal(params.id)}
        />,
        <GridActionsCellItem
          key={params.id}
          icon={<CommentIcon />}
          label={t('postComment', CommonMessage.PostComment)}
          onClick={() => handleOpenPostCommentItemModal(params.id)}
        />,
      ],
    },
  ];
  const handleAddNew = async () => {
    setRowId(null);
    handleOpenModal();
  }

  const handleOpenModal = () => {
    setIsOpenFormModal(true);
  }
  
  const handleOpenPostImageItemModal = (id: GridRowId) => {
    setRowId(id);
    setIsOpenPostImageItemModal(true);
  }

  const handleOpenPostFileItemModal = (id: GridRowId) => {
    setRowId(id);
    setIsOpenPostFileItemModal(true);
  }

  const handleOpenPostTagItemModal = (id: GridRowId) => {
    setRowId(id);
    setIsOpenPostTagItemModal(true);
  }
  
  const handleOpenRelatedPostItemModal = (id: GridRowId) => {
    setRowId(id);
    setIsOpenRelatedPostItemModal(true);
  }

  const handleOpenPostCommentItemModal = (id: GridRowId) => {
    setRowId(id);
    setIsOpenPostCommentItemModal(true);
  }

  const handleCloseFormModal = () => {
    setIsOpenFormModal(false);
    setRowId(null);
  }

  const handleClosePostFileItemModal = () => {
    setIsOpenPostFileItemModal(false);
    setRowId(null);
  }

  const handleClosePostImageItemModal = () => {
    setIsOpenPostImageItemModal(false);
    setRowId(null);
  }
  
  const handleClosePostTagItemModal = () => {
    setIsOpenPostTagItemModal(false);
    setRowId(null);
  }
  
  const handleCloseRelatedPostItemModal = () => {
    setIsOpenRelatedPostItemModal(false);
    setRowId(null);
  }

  const handleClosePostCommentItemModal = () => {
    setIsOpenPostCommentItemModal(false);
    setRowId(null);
  }

  const handleCloseForm = () => {
    getGridData();
    handleCloseFormModal();
  }

  return (
    <>
      {hasViewPermission && <Card>
        <CardHeader
          title={t('post', CommonMessage.Post)}
          titleTypographyProps={{ variant: 'h6' }} />
        <CardContent>
          <Box mx={1}>
            <Button
              variant='contained'
              size='small'
              disabled={!hasInsertPermission}
              title={Hotkey.New.toLocaleUpperCase()}
              startIcon={<AddIcon />}
              onClick={handleAddNew}>
              <span>{t('new', CommonMessage.New)}</span>
            </Button>
          </Box>
          <Box mt={2}>
            <div style={{ height: ApplicationParams.GridDefaultHeight, width: '100%' }}>
              <CustomDataGrid
                rows={posts}
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
          <CustomDialog
            title={t('post', CommonMessage.Post)}
            isOpen={isOpenFormModal}
            size='lg'
            onClose={() => handleCloseFormModal()}>
            <PageForm
              id={rowId}
              permissions={userPagePermissions}
              onClose={handleCloseForm} />
          </CustomDialog>
          <CustomDialog
            title={t('postImage', CommonMessage.PostImage)}
            isOpen={isOpenPostImageItemModal}
            size='lg'
            onClose={() => handleClosePostImageItemModal()}>
            <PostImage
              id={rowId}
              permissions={userPagePermissions}
              onClose={() => handleClosePostFileItemModal()} />
          </CustomDialog>
          <CustomDialog
            title={t('postFile', CommonMessage.PostFile)}
            isOpen={isOpenPostFileItemModal}
            size='lg'
            onClose={() => handleClosePostFileItemModal()}>
            <PostFile
              id={rowId}
              permissions={userPagePermissions}
              onClose={() => handleClosePostFileItemModal()} />
          </CustomDialog>
          <CustomDialog
            title={t('postTag', CommonMessage.PostTag)}
            isOpen={isOpenPostTagItemModal}
            size='lg'
            onClose={() => handleClosePostTagItemModal()}>
            <PostTag
              id={rowId}
              permissions={userPagePermissions}
              onClose={() => handleClosePostTagItemModal()} />
          </CustomDialog>
          <CustomDialog
            title={t('relatedPost', CommonMessage.RelatedPost)}
            isOpen={isOpenRelatedPostItemModal}
            size='lg'
            onClose={() => handleCloseRelatedPostItemModal()}>
            <RelatedPost
              id={rowId}
              permissions={userPagePermissions}
              onClose={() => handleCloseRelatedPostItemModal()} />
          </CustomDialog>
          <CustomDialog
            title={t('postComment', CommonMessage.PostComment)}
            isOpen={isOpenPostCommentItemModal}
            size='lg'
            onClose={() => handleClosePostCommentItemModal()}>
            <PostComment
              id={rowId}
              permissions={userPagePermissions}
              onClose={() => handleClosePostCommentItemModal()} />
          </CustomDialog>
        </CardContent>
      </Card>
      }
    </>
  )
}

Page.getLayout = (page: React.ReactNode) => <UserLayout>{page}</UserLayout>

export default Page;
type PageProps = {

}
export const getStaticProps: GetStaticProps<PageProps> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? ApplicationParams.DefaultLanguageCode, ['common'])),
  },
})