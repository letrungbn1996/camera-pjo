import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'

export type updatePayload = any
// export type question = {
//     question_content: string
//     answer: string
// }

export type AuthState = {
    authorized_key: string
    // secrets_questions?: question[]
}

let initialState: AuthState = {
    authorized_key: '',
    // secrets_questions: [],
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    // HACK: reducerは肥大化したらファイル分けたくなるかも
    reducers: {
        updateAuth(state, action: PayloadAction<updatePayload>) {
            // current(state).slides.push(action.payload)
            // let test = [...state.slides, action.payload]
            state.authorized_key = action.payload.authorized_key
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
