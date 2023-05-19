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
import { getAllByParams, remove } from "src/state/slices/userRoleSlice";
import CustomDialog from "src/components/Modal/Modal";
import UserRoleForm from "./form";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Card from "@mui/material/Card";
import CommonMessage from "src/constants/commonMessage";
import { useTranslation } from "next-i18next";
import { GridParameter } from "src/models/shared/grid/gridPrameter";
import ApplicationParams from "src/constants/applicationParams";
import SecurityMessage from "src/constants/securityMessage";
 
const UserRole = ({Component, pageProps}: AppProps) => {
  const dispatch = useAppDispatch();
  const { userRoles, totalCount, isLoading} = useSelector((state:any) => state?.userRole);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
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
    [page, pageSize,sortModel],
  );
  
  const { confirm } = useConfirm();
    useEffect(() => {
      getGridData();
    }, [queryOptions])

    const showConfirm =  async () =>{
      const isConfirmed = await confirm();
      return isConfirmed;
    }
    
    const deleteUserRole = useCallback( 
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
  
    const updateUserRole = useCallback(
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
      { field: 'userFullName', headerName: t('fullName', CommonMessage.FullName)!, width: 130 },
      { field: 'roleName', headerName: t('role', CommonMessage.Role)!, width: 130 },
      {
          field: 'actions',
          type: 'actions',
          width: 100,
          getActions: (params) => [
            <GridActionsCellItem
              key={params.id}
              icon={<EditIcon color="success" />}
              label={t('update', CommonMessage.Update)}
              onClick={updateUserRole(params.id)}
            />,
            <GridActionsCellItem
              key={params.id}
              icon={<DeleteIcon color="error" />}
              label={t('delete', CommonMessage.Delete)}
              onClick={deleteUserRole(params.id)}
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
        <Card>
            <CardHeader 
            title={t('security:userInRole', SecurityMessage.UserInRole)} 
            titleTypographyProps={{ variant: 'h6' }}/>
            <CardContent>
            <Box mx={1}>
          <Button
            variant="contained" 
            size="small"
            color="success"
            startIcon={<AddIcon/>}
            onClick={handleAddNew}>
              <span>{t('new', CommonMessage.New)}</span>
          </Button>
        </Box>
        <Box mt={2}>
          {userRoles && userRoles.length > 0 ? <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={userRoles}
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
        title={t('security:userInRole', SecurityMessage.UserInRole)} 
        isOpen={isOpenModal}
        onClose={() => handleCloseModal()}>
          <UserRoleForm id={rowId}
          onClose={handleCloseForm}/>
        </CustomDialog>
            </CardContent>
          </Card>
        </>
    )
}

UserRole.getLayout = (page: React.ReactNode) => <UserLayout>{page}</UserLayout>

export default UserRole;
type UserRoleProps = {

}
export const getStaticProps: GetStaticProps<UserRoleProps> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'security'])),
  },
})