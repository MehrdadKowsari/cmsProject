import { AppProps } from "next/app";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as React from 'react';
import { DataGrid, GridActionsCellItem, GridColDef, GridColumns, GridRowId, GridValueGetterParams } from '@mui/x-data-grid';
import UserLayout from "src/layouts/admin/UserLayout";
import useConfirm from "src/state/hooks/useConfirm";

import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { Button, CardContent, CardHeader } from "@mui/material";
import Box from "@mui/material/Box";
import { useAppDispatch } from "src/state/hooks/hooks";
import { getAll, remove, toggleActive } from "src/state/slices/userSlice";
import CustomDialog from "src/components/Modal/Modal";
import UserForm from "./form";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Card from "@mui/material/Card";
import CommonMessage from "src/constants/commonMessage";
import { useTranslation } from "react-i18next";
 
const User = ({Component, pageProps}: AppProps) => {
  const dispatch = useAppDispatch();
  const users: any[] = useSelector((state:any) => state?.user?.users);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [rowId, setRowId] = useState<number| string | null>(null);
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(5);
  const { t } = useTranslation(['common', 'security'])
  
  const queryOptions = React.useMemo(
    () => ({
      page,
      pageSize,
    }),
    [page, pageSize],
  );
  
  const { confirm } = useConfirm();
    useEffect(() => {
        dispatch(getAll())
    }, [])

    const showConfirm =  async () =>{
      const isConfirmed = await confirm();
      return isConfirmed;
    }
    
    const deleteUser = useCallback( 
    (id: string | number) => async() => {
        const isConfirmed = await showConfirm();
        if (isConfirmed) {
          const result: boolean = await dispatch(remove(id)).unwrap();
          if(result){
            dispatch(getAll());
          }
        }
      },
      []
    )
  
    const updateUser = useCallback(
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
          dispatch(getAll());
        }
      },
      [],
    );
  
    const columns: GridColumns = [
      { field: 'userName', headerName: t('username', CommonMessage.Username)!, width: 130 },
      { field: 'firstName', headerName: t('firstName', CommonMessage.FirstName)!, width: 130 },
      { field: 'lastName', headerName: t('lastName', CommonMessage.LastName)!, width: 130 },
      {
        field: 'fullName',
        headerName: t('fullName', CommonMessage.FullName)!,
        sortable: false,
         width: 160,
         valueGetter: (params: GridValueGetterParams) =>
         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        { field: 'isActive', headerName: t('isActive', CommonMessage.IsActive)!, width: 130, type: 'boolean'},
        { field: 'isCreatedByExternalAccount', headerName: t('isCreatedByExternalAccount', { ns: 'security' })!, width: 250, type: 'boolean'},
        {
          field: 'actions',
          type: 'actions',
          width: 100,
          getActions: (params) => [
            <GridActionsCellItem
              key={params.id}
              icon={<EditIcon color="success" />}
              label={t('update', CommonMessage.Update)}
              onClick={updateUser(params.id)}
            />,
            <GridActionsCellItem
              key={params.id}
              icon={<DeleteIcon color="error" />}
              label={t('delete', CommonMessage.Delete)}
              onClick={deleteUser(params.id)}
            />,
            <GridActionsCellItem
              key={params.id}
              icon={<SecurityIcon />}
              label={t('toggleActive', CommonMessage.ToggleActive)}
              onClick={toggleIsActive(params.id)}
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
      dispatch(getAll());
      handleCloseModal();
    }

    return(
        <>
        <Card>
            <CardHeader 
            title={t('user', CommonMessage.User)} 
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
          {users && users.length > 0 ? <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={users}
            columns={columns}
            page={page}
            pageSize={pageSize}
            paginationMode="server"
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            checkboxSelection
            getRowId={(row: any) => row?.id}
          />
          </div>
          : <div>
          no data
          </div>}  
        </Box>  
        <CustomDialog 
        title="user" 
        isOpen={isOpenModal}
        onClose={() => handleCloseModal()}>
          <UserForm id={rowId}
          onClose={handleCloseForm}/>
        </CustomDialog>
            </CardContent>
          </Card>
        </>
    )
}

User.getLayout = (page: React.ReactNode) => <UserLayout>{page}</UserLayout>

export default User;
type UserProps = {

}
export const getStaticProps: GetStaticProps<UserProps> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'security'])),
  },
})