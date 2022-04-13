import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'

export type updatePayload = any

export type SelectedStoreState = {
    store_alias: string
    store_name: string
    address: string
    sunday_reception_from_time: string
    sunday_reception_end_time: string
    monday_reception_from_time: string
    monday_reception_end_time: string
    tuesday_reception_from_time: string
    tuesday_reception_end_time: string
    wednesday_reception_from_time: string
    wednesday_reception_end_time: string
    thursday_reception_from_time: string
    thursday_reception_end_time: string
    friday_reception_from_time: string
    friday_reception_end_time: string
    saturday_reception_from_time: string
    saturday_reception_end_time: string
}

let initialState: SelectedStoreState = {
    store_alias: '',
    store_name: '',
    address: '',
    sunday_reception_from_time: '',
    sunday_reception_end_time: '',
    monday_reception_from_time: '',
    monday_reception_end_time: '',
    tuesday_reception_from_time: '',
    tuesday_reception_end_time: '',
    wednesday_reception_from_time: '',
    wednesday_reception_end_time: '',
    thursday_reception_from_time: '',
    thursday_reception_end_time: '',
    friday_reception_from_time: '',
    friday_reception_end_time: '',
    saturday_reception_from_time: '',
    saturday_reception_end_time: '',
}

export const selectedStoreSlice = createSlice({
    name: 'selectedStore',
    initialState,
    reducers: {
        updateSelectedStore(state, action: PayloadAction<updatePayload>) {
            state.store_alias = action.payload.store_alias
            state.store_name = action.payload.store_name
            state.address = action.payload.address
            state.sunday_reception_from_time =
                action.payload.sunday_reception_from_time
            state.sunday_reception_end_time =
                action.payload.sunday_reception_end_time
            state.monday_reception_from_time =
                action.payload.monday_reception_from_time
            state.monday_reception_end_time =
                action.payload.monday_reception_end_time
            state.tuesday_reception_from_time =
                action.payload.tuesday_reception_from_time
            state.tuesday_reception_end_time =
                action.payload.tuesday_reception_end_time
            state.wednesday_reception_from_time =
                action.payload.wednesday_reception_from_time
            state.wednesday_reception_end_time =
                action.payload.wednesday_reception_end_time
            state.thursday_reception_from_time =
                action.payload.thursday_reception_from_time
            state.thursday_reception_end_time =
                action.payload.thursday_reception_end_time
            state.friday_reception_from_time =
                action.payload.friday_reception_from_time
            state.friday_reception_end_time =
                action.payload.friday_reception_end_time
            state.saturday_reception_from_time =
                action.payload.saturday_reception_from_time
            state.saturday_reception_end_time =
                action.payload.saturday_reception_end_time
        },
        reset() {
            return initialState
        },
    },
})
