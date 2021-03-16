import { AnyAction, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import Request from "../../services/axios.service";
import { IPostUrlResponse, IPostUrlRequest } from 'cyberproof-types';


interface PostUrlState {
    post_url_value: string;
    current_message: string;
}

const initialState: PostUrlState = {
    post_url_value: '',
    current_message: '',
};

export const PostUrlSlice = createSlice({
    name: 'post_url',
    initialState,
    reducers: {
        setPostUrlValue: (state: PostUrlState, action: PayloadAction<string>) => {
            state.post_url_value = action.payload;
        },
        setCurrentMessage: (state: PostUrlState, action: PayloadAction<string>) => {
            state.current_message = action.payload;
        },
    },
});

export const { setPostUrlValue, setCurrentMessage } = PostUrlSlice.actions;


export const getPostUrlValue = (state: RootState): string => state.post_url.post_url_value;
export const getPostUrlMessage = (state: RootState): string => state.post_url.current_message;




export const postUrlToServer = async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    const state = getState();
    const requestBody: IPostUrlRequest = {
        long_url: state.post_url.post_url_value,
    };
    try {
        const urlData = await Request<IPostUrlResponse>({
            url: 'urls',
            method: 'POST',
            data: requestBody
        });
        console.log('urlData is: ', urlData);
        if (urlData.data && urlData.data.success) {
            dispatch(setCurrentMessage('Shortened url is: ' + urlData.data.shortened_url))
        } else {
            dispatch(setCurrentMessage(urlData.data.message || 'Unexpected error'));
        }
    } catch (error) {
        console.log('error is: ', error);
        dispatch(setCurrentMessage(JSON.stringify(error) || 'Unexpected error'));

    }
}




export default PostUrlSlice.reducer;

