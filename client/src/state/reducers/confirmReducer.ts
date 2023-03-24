export const initialState = {
    show: false,
    text: 'Are You Sure Confirm The Action?' 
}
const confirmReducer = (state: any = initialState, action: any) => {
    // switch (action.type) {
    //     case SHOW_CONFIRM:
    //         return{
    //             ...state,
    //             show: true,
    //             text: action.payload ?? initialState.text
    //         }
    //     case HIDE_CONFIRM:
    //         return{
    //             ...state,
    //             show: false
    //         }
    
    //     default:
    //         return state;
    // }
}

export default confirmReducer;