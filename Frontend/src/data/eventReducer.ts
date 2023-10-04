import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface EventInfo {
    name: string;
    description: string;
    location: string;
    owner: string;
    image: string;
    [key: string]: string;
}

export const defaultEventInfo: EventInfo = {
    name: '',
    description: '',
    location: '',
    owner: '',
    // Change the default image here
    image: 'https://cdn.mos.cms.futurecdn.net/wtqqnkYDYi2ifsWZVW2MT4.jpg',
};

export const eventSlice = createSlice({
    name: 'event',
    initialState: {
        value: defaultEventInfo,
    },
    reducers: {
        setEventInfo: (state, action: PayloadAction<EventInfo>) => {
            state.value =
                //action.payload;
                // console.log(action.payload);
                {
                    ...action.payload,
                    image: action.payload.image == undefined ? defaultEventInfo.image : action.payload.image,
                };
        },
        clearEventInfo: (state) => {
            state.value = defaultEventInfo;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setEventInfo, clearEventInfo } = eventSlice.actions;

export default eventSlice.reducer;
