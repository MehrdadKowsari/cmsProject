import { AppProps } from "next/app";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as React from 'react';
import { DataGrid, GridActionsCellItem, GridColumns, GridRowId, GridSortModel, GridValueGetterParams } from '@mui/x-data-grid';
import UserLayout from "src/layouts/admin/UserLayout";
import useConfirm from "src/state/hooks/useConfirm";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SecurityIcon from '@mui/icons-material/Security';
import { Button, CardContent, CardHeader } from "@mui/material";
import Box from "@mui/material/Box";
import { useAppDispatch } from "src/state/hooks/hooks";
import { getAllByParams, remove, toggleActive, toggleHidden } from "src/state/slices/pageSlice";
import CustomDialog from "src/components/Modal/Modal";
import PageForm from "./form";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Card from "@mui/material/Card";
import CommonMessage from "src/constants/commonMessage";
import { GridParameter } from "src/models/shared/grid/gridPrameter";
import ApplicationParams from "src/constants/applicationParams";
import { PageTypeEnum, PageTypeEnumLabelMapping } from "src/models/security/enums/pageTypeEnum";
import { PermissionDTO } from "src/models/security/permission/permissionDTO";
import { PermissionTypeEnum } from "src/models/shared/enums/permissionTypeEnum";
import { getAllByPageId } from "src/state/slices/rolePagePermissionSlice";
 
const Page = ({Component, pageProps}: AppProps) => {
  const dispatch = useAppDispatch();
  const { pages, totalCount, isLoading} = useSelector((state:any) => state?.page);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const userPagePermissions: PermissionDTO[] = useSelector((state:any) => state?.rolePagePermission?.userPagePermissions);
  const [hasViewPermission, setHasViewPermission] = useState<boolean>(false);
  const [hasInsertPermission, setHasInsertPermission] = useState<boolean>(false);
  const [hasUpdatePermission, setHasUpdatePermission] = useState<boolean>(false);
  const [hasDeletePermission, setHasDeletePermission] = useState<boolean>(false);
  const [hasToggleActivePermission, setHasToggleActivePermission] = useState<boolean>(false);
  const [rowId, setRowId] = useState<number| string | null>(null);
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(ApplicationParams.GridDefaultPageSize);
  const [sortModel, setSortModel] = React.useState<GridSortModel>([
    {
      field: '_id',
      sort: 'desc',
    },
  ]);
  const { t } = useTranslation(['common', 'security'])
  
  const queryOptions = React.useMemo(
    () => ({
      page,
      pageSize,
      sortModel
    }),
    [page, pageSize, sortModel, hasViewPermission],
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
      await dispatch(getAllByPageId(PageTypeEnum.Page));
    }

    const showConfirm =  async () =>{
      const isConfirmed = await confirm();
      return isConfirmed;
    }
    
    const deletePage = useCallback( 
    (id: string | number) => async() => {
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
  
    const updatePage = useCallback(
      (id: GridRowId) => async () => {
        setRowId(id);
        setIsOpenModal(true);
      },
      [],
    );

    const toggleIsActive = useCallback(
      (id: GridRowId) => async () => {
        const result: boolean = await dispatch(toggleActive(id)).unwrap();
        if(result !== null){
          getGridData();
        }
      },
      [],
    );
    
    const toggleIsHidden = useCallback(
      (id: GridRowId) => async () => {
        const result: boolean = await dispatch(toggleHidden(id)).unwrap();
        if(result !== null){
          getGridData();
        }
      },
      [],
    );

    const getGridData = () => {
      const gridparameter: GridParameter = {
        currentPage: queryOptions.page,
        pageSize: queryOptions.pageSize,
        sortModel: sortModel
      }
      dispatch(getAllByParams(gridparameter))
    }
  
    const columns: GridColumns = [
      { field: 'parentName', headerName: t('parent', CommonMessage.Name)!, width: 130 },
      { field: 'name', headerName: t('name', CommonMessage.Name)!, width: 130 },
      { field: 'type', headerName: t('type', CommonMessage.Type)!, valueFormatter(params) {
        return t(PageTypeEnumLabelMapping[params.value as PageTypeEnum]) 
       }, width: 130 },
      { field: 'priority', headerName: t('priority', CommonMessage.Priority)!, width: 130 },
      { field: 'iconClass', headerName: t('iconClass', CommonMessage.IconClass)!, width: 130 },
      { field: 'isActive', headerName: t('isActive', CommonMessage.IsActive)!, width: 130, type: 'boolean'},
      { field: 'isHidden', headerName: t('isHidden', CommonMessage.IsHidden)!, width: 130, type: 'boolean'},
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
              onClick={updatePage(params.id)}
            />,
            <GridActionsCellItem
              key={params.id}
              icon={<DeleteIcon color="error" />}
              label={t('delete', CommonMessage.Delete)}
              disabled={!hasDeletePermission}
              onClick={deletePage(params.id)}
            />,
            <GridActionsCellItem
              key={params.id}
              icon={<SecurityIcon />}
              label={t('toggleActive', CommonMessage.ToggleActive)}
              disabled={!hasToggleActivePermission}
              onClick={toggleIsActive(params.id)}
              showInMenu
            />,
            <GridActionsCellItem
              key={params.id}
              icon={<SecurityIcon />}
              label={t('toggleHidden', CommonMessage.ToggleHidden)}
              onClick={toggleIsHidden(params.id)}
              showInMenu
            />
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
            title={t('page', CommonMessage.Page)} 
            titleTypographyProps={{ variant: 'h6' }}/>
            <CardContent>
            <Box mx={1}>
          <Button
            variant="contained" 
            size="small"
            color="success"
            disabled={!hasInsertPermission}
            startIcon={<AddIcon/>}
            onClick={handleAddNew}>
              <span>{t('new', CommonMessage.New)}</span>
          </Button>
        </Box>
        <Box mt={2}>
          {pages && pages.length > 0 ? <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={pages}
            columns={columns}
            page={page}
            pageSize={pageSize}
            rowCount={totalCount}
            loading={isLoading}
            paginationMode="server"
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={ApplicationParams.GridPageSize}
            onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
            checkboxSelection
            getRowId={(row: any) => row?.id}
          />
          </div>
          : <div>
          {t('noDataExist', CommonMessage.NoDataExist)}
          </div>}  
        </Box>  
        <CustomDialog 
        title={t('page', CommonMessage.Page)} 
        isOpen={isOpenModal}
        onClose={() => handleCloseModal()}>
          <PageForm 
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

Page.getLayout = (page: React.ReactNode) => <UserLayout>{page}</UserLayout>

export default Page;
type PageProps = {

}
export const getStaticProps: GetStaticProps<PageProps> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'security'])),
  },
})