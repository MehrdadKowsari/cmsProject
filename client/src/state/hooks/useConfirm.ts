import { useContext } from 'react';
import ConfirmContext from '../context/ConfirmContext';
import { hideConfirm, showConfirm } from '../slices/confirmSlice';

let resolveCallback: any;
function useConfirm() {
    const [confirmState, dispatch] = useContext(ConfirmContext);
    const onConfirm = () => {
        closeConfirm();
        resolveCallback(true);
    };

    const onCancel = () => {
        closeConfirm();
        resolveCallback(false);
    };
    const confirm = (text?: string) => {
        dispatch(showConfirm(text));
        return new Promise((res, rej) => {
            resolveCallback = res;
        });
    };

    const closeConfirm = () => {
        dispatch(hideConfirm());
    };

    return { confirm, onConfirm, onCancel, confirmState };
}

export default useConfirm;