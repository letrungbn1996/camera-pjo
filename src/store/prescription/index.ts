import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    visit_at: '',
    phone_number: '',
    comment: '',
    first_name: '',
    last_name: '',
    first_name_kana: '',
    last_name_kana: '',
    birthday: '',
    gender: 0,
    day: '',
    // zip_code: '',
    // pref: '',
    // city: '',
    // town: '',
    // apartment: '',
}

export const prescriptionSlice = createSlice({
    name: 'prescription',
    initialState,
    reducers: {
        updatePrescription(state, action: PayloadAction<typeof initialState>) {
            state.visit_at = action.payload.visit_at
            state.phone_number = action.payload.phone_number
            state.comment = action.payload.comment
            state.first_name = action.payload.first_name
            state.last_name = action.payload.last_name
            state.first_name_kana = action.payload.first_name_kana
            state.last_name_kana = action.payload.last_name_kana
            state.birthday = action.payload.birthday
            state.gender = action.payload.gender
            state.day = action.payload.day
            // state.zip_code = action.payload.zip_code
            // state.pref = action.payload.pref
            // state.city = action.payload.city
            // state.town = action.payload.town
            // state.apartment = action.payload.apartment
        },
        reset() {
            return initialState
        },
    },
})
