import { useState, ChangeEvent, ChangeEventHandler } from "react"
import FileUpload from "./FileUpload";
import { styled} from '@mui/material/styles';

type FileUploadProps = {
    id: string,
    name: string,
    imageWidth: number,
    imageHeight: number
    onChange?: ChangeEventHandler<HTMLInputElement>
}

const ImageStyled = styled('img')(({theme}) => ({
    marginRight: theme.spacing(6),
    marginLeft: theme.spacing(6),
    borderRadius: theme.shape.borderRadius
}));

export const FileUploadWithImagePreview = ({id, name, imageHeight, imageWidth, onChange}: FileUploadProps) =>{
    const [file, setFile] = useState<string | null>(null)
    const onChangeInputFileSelection = (file: ChangeEvent) => {
        const reader = new FileReader()
        const { files } = file.target as HTMLInputElement
        if (files && files.length !== 0) {
          reader.onload = () => { 
            setFile(reader.result as string);
            (file.target as HTMLInputElement).value = '';
          }
      
          reader.readAsDataURL(files[0])
        }
    }

    return(
        <>
            <FileUpload 
            id={id}
            name={name}
            onChange={onChangeInputFileSelection}
            />
            <ImageStyled src={file ?? ''} width={imageWidth} height={imageHeight}/>
        </>
    )
}
export default FileUploadWithImagePreview;