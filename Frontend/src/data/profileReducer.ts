import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface UserInfo {
    first_name: string;
    last_name: string;
    email: string;
    profile: string;
}

export const defaultInfo: UserInfo = {
    first_name: '',
    last_name: '',
    email: '',
    profile: '',
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        value: defaultInfo,
    },
    reducers: {
        setProfileInfo: (state, action: PayloadAction<UserInfo>) => {
            state.value = action.payload;
        },
        clearProfileInfo: (state) => {
            state.value = defaultInfo;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setProfileInfo, clearProfileInfo } = profileSlice.actions;

export default profileSlice.reducer;
