import MenuItem from '@mui/material/MenuItem';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageCodeEnumLabbelMapping, LanguageCodeEnum } from 'src/models/shared/enums/languageCodeEnum';
import { TextValueDTO } from 'src/models/shared/list/textValueDTO';

type LanguageDropdownProps = TextFieldProps & {

}

const LanguageDropdown = (props: LanguageDropdownProps) => {
    const [languages, setLanguages] = useState<TextValueDTO[]>([]);
    const { t } = useTranslation(['common']);
    useEffect(() => {
        getLanguageList();
      
    }, []);

    const getLanguageList = () => {
        const languageSelectList: TextValueDTO[] = Object.values(LanguageCodeEnum).filter(p => typeof p === 'string').map(p => ({
                text: t(LanguageCodeEnumLabbelMapping[p]),
                value: p.toString()
            } as TextValueDTO));
            
            setLanguages(languageSelectList);
    }

    return(
        <>
            <TextField
                  select 
                  fullWidth
                  id={props.id}
                  name={props.name}
                  label={props.label}
                  value={props.value} 
                  onChange={props.onChange}
                  onBlur={props.onBlur}
                  error={props.error}
                  helperText={props.helperText}>
                    {languages.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.text}
                      </MenuItem>
                    ))}
                  </TextField>
        </>
    )
}

export default LanguageDropdown;