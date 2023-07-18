import React from "react";
import { DateTimePicker, DateTimePickerProps } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import useLocale from "src/hooks/useLocale";
import { LanguageCodeEnum } from "src/models/shared/enums/languageCodeEnum";

type Props<TDate> = {
  name: string;
} & DateTimePickerProps<TDate>;
const CustomDateTimePicker = <TInputDate, TDate = TInputDate>(
  props: Props<TDate>
) => {
  const { name, label, ...restProps } = props;
  const { getLocale } = useLocale();
  const locale  = getLocale();
  return (
    <>
        <LocalizationProvider dateAdapter={locale === LanguageCodeEnum.Persian ? AdapterDateFnsJalali : AdapterDateFns}>
            <DateTimePicker
            format='dd/MM/yyyy HH:mm'
            {...restProps}
            slotProps={{ textField: { variant: 'outlined', name: name, label: label, fullWidth: true, value: props?.value } }}
            />
        </LocalizationProvider>
    </>
  );
};

export default CustomDateTimePicker