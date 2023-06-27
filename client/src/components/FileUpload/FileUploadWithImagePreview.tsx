import { useState, ChangeEvent, ChangeEventHandler, Dispatch, SetStateAction, useEffect } from "react"
import FileUpload from "./FileUpload";
import { styled} from '@mui/material/styles';
import Grid from "@mui/material/Grid";

type FileUploadProps = {
    id: string,
    name: string,
    imageWidth: number,
    imageHeight: number
    setFile: (file: string) => void,
    file: string | null
}

const ImageStyled = styled('img')(({theme}) => ({
    marginRight: theme.spacing(6),
    marginLeft: theme.spacing(6),
    borderRadius: theme.shape.borderRadius
}));

export const FileUploadWithImagePreview = ({id, name, imageHeight, imageWidth, setFile, file}: FileUploadProps) =>{
    const [_file, _setFile] = useState<string | null>(name)
    useEffect(() => {
      _setFile(file);
    
    }, [file])
    
    const onChangeInputFileSelection = (file: ChangeEvent) => {
        const reader = new FileReader()
        const { files } = file.target as HTMLInputElement
        if (files && files.length !== 0) {
          reader.onload = () => { 
            const result: string = reader.result as string;
            setFile(result);
            _setFile(result);
            (file.target as HTMLInputElement).value = '';
        }
        
        reader.readAsDataURL(files[0])
    }
    }

    return(
        <>
            <Grid container>
                <Grid item lg={6}>
                    <FileUpload 
                    id={id}
                    name={name}
                    onChange={onChangeInputFileSelection}
                    />
                </Grid>
                <Grid item lg={6}>
                    { _file && <ImageStyled src={_file ?? ''} width={imageWidth} height={imageHeight}/>}
                </Grid>
            </Grid>
        </>
    )
}
export default FileUploadWithImagePreview;