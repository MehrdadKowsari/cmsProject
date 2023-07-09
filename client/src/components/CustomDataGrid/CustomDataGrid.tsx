import { DataGrid } from "@mui/x-data-grid";
import DataGridPagination from "../DataGridPagination/DataGridPagination";
import ApplicationParams from "src/constants/applicationParams";

const CustomDataGrid = (props: any) =>{     
  const { getDataMethod, ...rest } = props;
    return(
        <>
             <DataGrid
                {...rest}
                pageSizeOptions={ApplicationParams.GridPageSize}
                slots={{
                  pagination: DataGridPagination,
                }}
                slotProps={{
                    pagination: { 
                      handleRefreshButtonClick: getDataMethod
                    }
                }}  
                getRowId={(row: any) => row?.id}
              />
        </>
    )
}

export default CustomDataGrid;