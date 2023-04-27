import { ReactNode } from 'react';
import { toast, ToastOptions } from 'react-toastify';
import CommonMessage  from '../constants/commonMessage';
const AUTO_CLOSE_TIMEOUT = 5000;
class NotificationService{
    showSuccessMessage(titleOrMessage?: string, message?: string, autoClose?: number) {
        if (!message && !titleOrMessage) {
            titleOrMessage = `${CommonMessage.Success}`;
            message = `${CommonMessage.SuccessOperation}`;
        }
        else if (!message) {
            message = titleOrMessage;
            titleOrMessage = `${CommonMessage.Success}`;
        }
        if (typeof autoClose === 'undefined') {
            autoClose = AUTO_CLOSE_TIMEOUT;
        }
        var toastOptions: ToastOptions = {
            position:  toast.POSITION.TOP_RIGHT,
            closeButton: true,
            autoClose: autoClose,
            theme: 'colored'
        };
        
        toast.success(message, toastOptions);
    }

    showErrorMessage(titleOrMessage?: string | ReactNode, message?: string | ReactNode, autoClose?: number) {
        if (!message && !titleOrMessage) {
            titleOrMessage = `${CommonMessage.Error}`;
            message = `${CommonMessage.ErrorOperation}`;
        }
        else if (!message) {
            message = titleOrMessage;
            titleOrMessage = `${CommonMessage.Error}`;
        }
        if (typeof autoClose === 'undefined') {
            autoClose = AUTO_CLOSE_TIMEOUT;
        }
        var toastOptions: ToastOptions = {
            position:  toast.POSITION.TOP_RIGHT,
            closeButton: true,
            autoClose: autoClose,
            theme: 'colored'
        };

        toast.error(message, toastOptions);
    }

    showInfoMessage(titleOrMessage?: string, message?: string, autoClose?: number) {
        if (!titleOrMessage) {
            message = `${CommonMessage.InfoOperation}`;
        }
        if (!message) {
            message = titleOrMessage;
            titleOrMessage = `${CommonMessage.Info}`;
        }
        if (typeof autoClose === 'undefined') {
            autoClose = AUTO_CLOSE_TIMEOUT;
        }
        var toastOptions: ToastOptions = {
            position:  toast.POSITION.TOP_RIGHT,
            closeButton: true,
            autoClose: autoClose,
            theme: 'colored'
        };

        toast.info(message, toastOptions);
    }

    showWarningMessage(titleOrMessage?: string, message?: string, autoClose?: number) {
        if (!message && !titleOrMessage) {
            titleOrMessage = `${CommonMessage.Warning}`;
            message = `${CommonMessage.WarningOperation}`;
        }
        else if (!message) {
            message = titleOrMessage;
            titleOrMessage = `${CommonMessage.Warning}`;
        }
        if (typeof autoClose === 'undefined') {
            autoClose = AUTO_CLOSE_TIMEOUT;
        }
        var toastOptions: ToastOptions = {
            position:  toast.POSITION.TOP_RIGHT,
            closeButton: true,
            autoClose: autoClose,
            theme: 'colored'
        };

        toast.warning(message, toastOptions);
    }
}
export default new NotificationService();