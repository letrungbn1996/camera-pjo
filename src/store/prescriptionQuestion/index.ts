import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'

export type updatePayload = any

let initialState = {
    questions: Array(),
}

export const prescriptionQuestionSlice = createSlice({
    name: 'prescriptionQuestion',
    initialState,
    reducers: {
        updatePrescriptionQuestion(
            state,
            action: PayloadAction<updatePayload>
        ) {
            state.questions = action.payload
        },
        reset() {
            return initialState
        },
    },
})
