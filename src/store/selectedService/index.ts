import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'

export type updatePayload = any

export type SelectedServiceState = {
    omi_service_alias: string,
    reservation_alias: string,
}

let initialState: SelectedServiceState = {
    omi_service_alias: '',
    reservation_alias: '',
}

export const selectedServiceSlice = createSlice({
    name: 'selectedService',
    initialState,
    reducers: {
        updateSelectedService(state, action: PayloadAction<updatePayload>) {
            state.omi_service_alias = action.payload.omi_service_alias;
            state.reservation_alias = action.payload.reservation_alias;
        },

        clearStore(state) {
            state.omi_service_alias = '';
            state.reservation_alias = '';
        },
        reset() {
            return initialState
        },
    },
})
