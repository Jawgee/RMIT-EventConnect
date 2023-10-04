import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface EventInfo {
    name: string;
    description: string;
    location: string;
    owner: string;
    image: string;
    [key: string]: string;
}

export const defaultInfo: EventInfo = {
    name: '',
    description: '',
    location: '',
    owner: '',
    image: 'https://cdn.mos.cms.futurecdn.net/wtqqnkYDYi2ifsWZVW2MT4.jpg',
};

export const eventSlice = createSlice({
    name: 'event',
    initialState: {
        value: defaultInfo,
    },
    reducers: {
        setEventInfo: (state, action: PayloadAction<EventInfo>) => {
            const payload = action.payload;
            console.log(payload.image);
            if (payload.image == undefined) {
                payload.image = defaultInfo.image;
            }
            state.value = payload;
        },
        clearEventInfo: (state) => {
            state.value = defaultInfo;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setEventInfo, clearEventInfo } = eventSlice.actions;

export default eventSlice.reducer;
