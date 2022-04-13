import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'

export type updatePayload = any

export type SelectedPatientState = {
    patient_alias: string
}

let initialState: SelectedPatientState = {
    patient_alias: '',
}

export const selectedPatientSlice = createSlice({
    name: 'selectedPatient',
    initialState,
    // HACK: reducerは肥大化したらファイル分けたくなるかも
    reducers: {
        updateSelectedPatient(state, action: PayloadAction<updatePayload>) {
            state.patient_alias = action.payload.patient_alias
        },
        // delSlide(state, action: PayloadAction<DelSlidePayload>) {
        //     state.slides = state.slides.filter(
        //         (slide) => slide !== action.payload
        //     )
        // },
        reset() {
            return initialState
        },
    },
})
