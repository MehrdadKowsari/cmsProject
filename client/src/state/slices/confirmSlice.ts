import { createSlice } from "@reduxjs/toolkit";

interface ConfirmState{
    text?: string | null,
    show: boolean;
}

export const confirmState: ConfirmState = {
   show: false,
   text: 'Are You Sure Confirm The Action?'
} 

const confirmSlice = createSlice({
    name: 'confirms',
    initialState: confirmState,
    reducers: {
        showConfirm(state, { payload }) {
            state.show = true;
            state.text = payload ?? confirmState.text;
        },        
        hideConfirm(state) {
            state.show = false;
        }        
    }
});

export const { showConfirm , hideConfirm } = confirmSlice.actions;
export default confirmSlice.reducer;