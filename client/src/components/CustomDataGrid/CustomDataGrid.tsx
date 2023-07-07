import { DataGrid } from "@mui/x-data-grid";
import DataGridPagination from "../DataGridPagination/DataGridPagination";
import ApplicationParams from "src/constants/applicationParams";

const CustomDataGrid = (props: any) =>{     
    return(
        <>
             <DataGrid
                {...props}
                pageSizeOptions={ApplicationParams.GridPageSize}
                slots={{
                  pagination: DataGridPagination,
                }}
                slotProps={{
                    pagination: { 
                      onRefreshButtonClick: props.getDataMethod
                    }
                }}  
                getRowId={(row: any) => row?.id}
              />
        </>
    )
}

export default CustomDataGrid;