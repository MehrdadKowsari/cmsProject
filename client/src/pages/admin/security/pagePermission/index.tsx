import { AppProps } from "next/app";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as React from 'react';
import { DataGrid, GridActionsCellItem, GridColumns, GridRowId, GridSortModel } from '@mui/x-data-grid';
import UserLayout from "src/layouts/admin/UserLayout";
import useConfirm from "src/state/hooks/useConfirm";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { Button, CardContent, CardHeader } from "@mui/material";
import Box from "@mui/material/Box";
import { useAppDispatch } from "src/state/hooks/hooks";
import { getAllByParams, remove } from "src/state/slices/pagePermissionSlice";
import CustomDialog from "src/components/Modal/Modal";
import PagePermissionForm from "./form";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Card from "@mui/material/Card";
import CommonMessage from "src/constants/commonMessage";
import { useTranslation } from "next-i18next";
import { GridParameter } from "src/models/shared/grid/gridPrameter";
import ApplicationParams from "src/constants/applicationParams";
import SecurityMessage from "src/constants/securityMessage";
import { PermissionDTO } from "src/models/security/permission/permissionDTO";
import { PermissionTypeEnum } from "src/models/shared/enums/permissionTypeEnum";
import { PageTypeEnum } from "src/models/security/enums/pageTypeEnum";
import { getAllByPageId } from "src/state/slices/rolePagePermissionSlice";
 
const PagePermission = ({Component, pageProps}: AppProps) => {
  const dispatch = useAppDispatch();
  const { pagePermissions, totalCount, isLoading} = useSelector((state:any) => state?.pagePermission);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const userPagePermissions: PermissionDTO[] = useSelector((state:any) => state?.rolePagePermission?.userPagePermissions);
  const [hasViewPermission, setHasViewPermission] = useState<boolean>(false);
  const [hasInsertPermission, setHasInsertPermission] = useState<boolean>(false);
  const [hasUpdatePermission, setHasUpdatePermission] = useState<boolean>(false);
  const [hasDeletePermission, setHasDeletePermission] = useState<boolean>(false);
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
    }, [userPagePermissions])

    const getRolePagePermissions = async () => {
      await dispatch(getAllByPageId(PageTypeEnum.PagePermission));
    }

    const showConfirm =  async () =>{
      const isConfirmed = await confirm();
      return isConfirmed;
    }
    
    const deletePagePermission = useCallback( 
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
  
    const updatePagePermission = useCallback(
      (id: GridRowId) => async () => {
        setRowId(id);
        setIsOpenModal(true);
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
      { field: 'pageName', headerName: t('page', CommonMessage.Page)!, width: 200 },
      { field: 'permissionName', headerName: t('permission', CommonMessage.Permission)!, width: 150 },
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
              onClick={updatePagePermission(params.id)}
            />,
            <GridActionsCellItem
              key={params.id}
              icon={<DeleteIcon color="error" />}
              label={t('delete', CommonMessage.Delete)}
              disabled={!hasDeletePermission}
              onClick={deletePagePermission(params.id)}
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
            title={t('security:pagePermission', SecurityMessage.PagePermission)} 
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
          {pagePermissions && pagePermissions.length > 0 ? <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={pagePermissions}
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
        title={t('security:pagePermission', SecurityMessage.PagePermission)} 
        isOpen={isOpenModal}
        onClose={() => handleCloseModal()}>
          <PagePermissionForm 
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

PagePermission.getLayout = (page: React.ReactNode) => <UserLayout>{page}</UserLayout>

export default PagePermission;
type PagePermissionProps = {

}
export const getStaticProps: GetStaticProps<PagePermissionProps> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'security'])),
  },
})