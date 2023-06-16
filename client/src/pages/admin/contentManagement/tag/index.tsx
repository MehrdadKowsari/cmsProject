import { AppProps } from "next/app";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import * as React from 'react';
import { DataGrid, GridActionsCellItem, GridColDef, GridPaginationModel, GridRowId, GridSortModel, GridValueGetterParams } from '@mui/x-data-grid';
import UserLayout from "src/layouts/admin/UserLayout";
import useConfirm from "src/state/hooks/useConfirm";
import SecurityIcon from '@mui/icons-material/Security';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { Button, CardContent, CardHeader } from "@mui/material";
import Box from "@mui/material/Box";
import { useAppDispatch } from "src/state/hooks/hooks";
import { getAllByParams, remove, toggleActive } from "src/state/slices/contentManagement/tagSlice";
import CustomDialog from "src/components/Modal/Modal";
import TagForm from "./form";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Card from "@mui/material/Card";
import CommonMessage from "src/constants/commonMessage";
import { useTranslation } from "next-i18next";
import { GridParameter } from "src/models/shared/grid/gridPrameter";
import ApplicationParams from "src/constants/applicationParams";
import { PermissionDTO } from "src/models/security/permission/permissionDTO";
import { PageTypeEnum } from "src/models/security/enums/pageTypeEnum";
import { PermissionTypeEnum } from "src/models/shared/enums/permissionTypeEnum";
import { getAllByPageId } from "src/state/slices/rolePagePermissionSlice";
import Hotkey from 'src/constants/hotkey';
import notificationService from "src/services/shared/notificationService";
import { useHotkeys } from "react-hotkeys-hook";

const Tag = ({Component, pageProps}: AppProps) => {
  const dispatch = useAppDispatch();
  const { tags, totalCount, isLoading } = useSelector((state: any) => state?.tag?.tags ? state?.tag : { tags: [], totalCount: 0, isLoading: false });
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [userPagePermissions, setUserPagePermissions] = useState<PermissionDTO[]>([]);
  const [hasViewPermission, setHasViewPermission] = useState<boolean>(false);
  const [hasInsertPermission, setHasInsertPermission] = useState<boolean>(false);
  const [hasUpdatePermission, setHasUpdatePermission] = useState<boolean>(false);
  const [hasDeletePermission, setHasDeletePermission] = useState<boolean>(false);
  const [hasToggleActivePermission, setHasToggleActivePermission] = useState<boolean>(false);
  const [rowId, setRowId] = useState<number| string | null>(null);
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
  
  const { t } = useTranslation(['common'])
  
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
    }, [queryOptions])
    
    useEffect(() => {
      getRolePagePermissions();
    }, [])
    
    useEffect(() => {
      const hasViewPermission: boolean = userPagePermissions?.some(p => p.type === PermissionTypeEnum.View);
      setHasViewPermission(hasViewPermission);
      const hasInsertPermission: boolean = userPagePermissions?.some(p => p.type === PermissionTypeEnum.Add);
      setHasInsertPermission(hasInsertPermission);
      const hasUpdatePermission: boolean = userPagePermissions?.some(p => p.type === PermissionTypeEnum.Update);
      setHasUpdatePermission(hasUpdatePermission);
      const hasDeletePermission: boolean = userPagePermissions?.some(p => p.type === PermissionTypeEnum.Delete);
      setHasDeletePermission(hasDeletePermission);
      const hasToggleActivePermission: boolean = userPagePermissions?.some(p => p.type === PermissionTypeEnum.ToggleActive);
      setHasToggleActivePermission(hasToggleActivePermission);
    }, [userPagePermissions])

    const getRolePagePermissions = async () => {
      const permissions: PermissionDTO[] = await dispatch(getAllByPageId(PageTypeEnum.Tag)).unwrap();
      if (permissions?.length > 0) {
        setUserPagePermissions(permissions);
      }
      else {
        notificationService.showErrorMessage(t('youHaveNotAccessToThePageOrAction', CommonMessage.DoNotHaveAccessToThisActionOrSection));
      }
    }

    const showConfirm =  async () =>{
      const isConfirmed = await confirm();
      return isConfirmed;
    }
    
    const handleDelete = useCallback( 
    async(id: GridRowId) => {
        const isConfirmed = await showConfirm();
        if (isConfirmed) {
          const result: boolean = await dispatch(remove(id)).unwrap();
          if(result){
            getGridData();
          }
        }
      },
      []
    )
  
    const handleUpdate = useCallback(
      async(id: GridRowId) => {
        setRowId(id);
        setIsOpenModal(true);
      },
      [],
    );

    const handleToggleIsActive = useCallback(
      async(id: GridRowId) => {
        const result: boolean = await dispatch(toggleActive(id)).unwrap();
        if(result !== null){
          getGridData();
        }
      },
      [],
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
  useHotkeys(Hotkey.New, () => handleAddNew())
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
  useHotkeys(Hotkey.ToggleActive, async () => {
    if (selectedRows?.length === 1 && hasToggleActivePermission) {
      const rowId: GridRowId = selectedRows[0];
      await handleToggleIsActive(rowId);
    }
    else {
      notificationService.showErrorMessage(t('youHaveNotAccessToThePageOrAction', CommonMessage.DoNotHaveAccessToThisActionOrSection));
    }
  })
  //#endregion
  
    const columns: GridColDef[] = [
      { field: 'name', headerName: t('name', CommonMessage.Name)!, width: 130 },
      { field: 'isActive', headerName: t('isActive', CommonMessage.IsActive)!, width: 130, type: 'boolean' },
      { field: 'locale', headerName: t('locale', CommonMessage.Locale)!, width: 130 },
      {
          field: 'actions',
          type: 'actions',
          width: 100,
          getActions: (params) => [
            <GridActionsCellItem
              key={params.id}
              icon={<EditIcon color="success" />}
              label={t('update', CommonMessage.Update)}
              disabled={!hasUpdatePermission}
              title={Hotkey.Update.toUpperCase()}
              onClick={() => handleUpdate(params.id)}
            />,
            <GridActionsCellItem
              key={params.id}
              icon={<DeleteIcon color="error" />}
              label={t('delete', CommonMessage.Delete)}
              disabled={!hasDeletePermission}
              title={Hotkey.Delete.toUpperCase()}
              onClick={() => handleDelete(params.id)}
            />,
            <GridActionsCellItem
              key={params.id}
              icon={<SecurityIcon />}
              label={t('toggleActive', CommonMessage.ToggleActive)}
              disabled={!hasToggleActivePermission}
              title={Hotkey.ToggleActive.toUpperCase()}
              onClick={() => handleToggleIsActive(params.id)}
              showInMenu
        />,
          ],
        },
    ];
    const handleAddNew = () => {
      setRowId(null);
      handleOpenModal();
    }

    const handleOpenModal = () => {
      setIsOpenModal(true);
    }

    const handleCloseModal = () => {
      setIsOpenModal(false);
      setRowId(null);
    }

    const handleCloseForm = () => {
      getGridData();
      handleCloseModal();
    }

    return(
        <>
        { hasViewPermission && <Card>
            <CardHeader 
            title={t('tag', CommonMessage.Tag)} 
            titleTypographyProps={{ variant: 'h6' }}/>
            <CardContent>
            <Box mx={1}>
          <Button
            variant="contained" 
            size="small"
            startIcon={<AddIcon/>}
            disabled={!hasInsertPermission}
            title={Hotkey.New.toUpperCase()}
            onClick={handleAddNew}>
              <span>{t('new', CommonMessage.New)}</span>
          </Button>
        </Box>
        <Box mt={2}>
          <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={tags}
            columns={columns}
            rowCount={totalCount}
            loading={isLoading}
            pageSizeOptions={ApplicationParams.GridPageSize}
            paginationModel={paginationModel}
            paginationMode="server"
            onPaginationModelChange={setPaginationModel}
            onSortModelChange={setSortModel}
            onRowSelectionModelChange={setSelectedRows}
            getRowId={(row: any) => row?.id}
          />
          </div>  
        </Box>  
        <CustomDialog 
        title={t('tag', CommonMessage.Tag)} 
        isOpen={isOpenModal}
        onClose={() => handleCloseModal()}>
          <TagForm 
          id={rowId}
          permissions={userPagePermissions}
          onClose={handleCloseForm}/>
        </CustomDialog>
            </CardContent>
          </Card>
      }
        </>
    )
}

Tag.getLayout = (page: React.ReactNode) => <UserLayout>{page}</UserLayout>

export default Tag;
export const getStaticProps: GetStaticProps<{}> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
})