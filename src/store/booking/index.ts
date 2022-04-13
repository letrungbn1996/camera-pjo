import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'

export type updatePayload = any

export type BookingState = {
    start_schedule_at?: string,
    finish_schedule_at?: string,
    omi_service_alias?: string,
    payment_token?: string
    credit_card_number_last_4_digits?: string,
    payment_ordered_at?: string,
    payment_completed_at?: string,
    omi_service_reservable_datetime_alias?: string,
}

let initialState: BookingState = {
    // secrets_questions: [],
    start_schedule_at: '',
    finish_schedule_at: '',
    omi_service_alias: '',
    payment_token: '',
    credit_card_number_last_4_digits: '',
    payment_ordered_at: '',
    payment_completed_at: '',
    omi_service_reservable_datetime_alias: ''
}

export const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    // HACK: reducerは肥大化したらファイル分けたくなるかも
    reducers: {
        updateCalendar(state, action: PayloadAction<updatePayload>) {            
            state.start_schedule_at =action.payload.start_schedule_at
            state.finish_schedule_at =action.payload.finish_schedule_at
            state.omi_service_reservable_datetime_alias =action.payload.omi_service_reservable_datetime_alias
        },
        reset() {
            return initialState
        },
    },
})
