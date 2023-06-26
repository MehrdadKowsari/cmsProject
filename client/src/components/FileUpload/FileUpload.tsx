import { ChangeEventHandler } from "react"
import Button from "@mui/material/Button/Button"
import UploadFileIcon from '@mui/icons-material/UploadFile'
import CommonMessage from "src/constants/commonMessage"
import { useTranslation } from "react-i18next"

type FileUploadType = {
    id: string,
    name: string,
    onChange: ChangeEventHandler<HTMLInputElement>
}

export const FileUpload = ({id, name, onChange}: FileUploadType) =>{
    const { t } = useTranslation(['common']);
    return(
        <>
            <Button
            variant="contained"
            component="label"
            startIcon={<UploadFileIcon/>}>
                {t('uploadAFile', CommonMessage.UploadAFile)}
                <input
                id={id}
                name={name}
                type="file"
                onChange={onChange} 
                hidden/>
            </Button>
        </>
    )
}
export default FileUpload;