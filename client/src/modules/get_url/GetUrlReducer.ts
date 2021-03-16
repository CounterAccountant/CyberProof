import { AnyAction, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { IGetUrlResponse } from "cyberproof-types";
import { RootState } from "../../store";
import Request from "../../services/axios.service";


interface GetUrlState {
    get_url_value: string;
    current_message: string;
    browse_to: string | null;
}

const initialState: GetUrlState = {
    get_url_value: '',
    current_message: '',
    browse_to: null,
};

export const GetUrlSlice = createSlice({
    name: 'get_url',
    initialState,
    reducers: {
        setGetUrlValue: (state: GetUrlState, action: PayloadAction<string>) => {
            state.get_url_value = action.payload;
        },
        setCurrentMessage: (state: GetUrlState, action: PayloadAction<string>) => {
            state.current_message = action.payload;
        },
        setBrowseTo: (state: GetUrlState, action: PayloadAction<string>) => {
            state.browse_to = action.payload;
        }
    },
});

export const { setGetUrlValue, setCurrentMessage, setBrowseTo } = GetUrlSlice.actions;


export const getGetUrlValue = (state: RootState): string => state.get_url.get_url_value;
export const getGetUrlMessage = (state: RootState): string => state.get_url.current_message;
export const getBrowseTo = (state: RootState): string | null => state.get_url.browse_to;



export const GetUrlToServer = async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    const state = getState();
    try {
        const urlData = await Request<IGetUrlResponse>({
            url: `urls/get_url/${state.get_url.get_url_value}`,
            method: 'GET'
        });
        console.log('urlData is: ', urlData);
        if (urlData.data && urlData.data.success) {
            dispatch(setCurrentMessage('url is: ' + urlData.data.original_url))
        } else {
            dispatch(setCurrentMessage(urlData.data.message || 'Unexpected error'));
        }
    } catch (error) {
        console.log('error is: ', error);
        dispatch(setCurrentMessage(JSON.stringify(error) || 'Unexpected error'));

    }
}




export default GetUrlSlice.reducer;

