import * as React from 'react';
import {
  gridPageCountSelector,
  GridPagination,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid';
import MuiPagination from '@mui/material/Pagination';
import { TablePaginationProps } from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh'

declare module '@mui/x-data-grid' {
    interface PaginationPropsOverrides{
        handleRefreshButtonClick: () => void
    }
}
function Pagination({
  page,
  onPageChange,
  className,
}: TablePaginationProps ) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1);
      }}
    />
  );
}

const DataGridPagination = (props: any) => {
  return (<>
    <GridPagination ActionsComponent={Pagination} {...props} /> <IconButton onClick={props.handleRefreshButtonClick}><RefreshIcon/></IconButton>
  </>)
}

export default DataGridPagination;

