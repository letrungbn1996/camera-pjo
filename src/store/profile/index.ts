import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'

export type updatePayload = any

export type ProfileState = {
    user_registration_token: string
    birthday: string
    nickname: string
    gender: string
    is_push_notification: string
    // secrets_questions?: question[]
}

let initialState: ProfileState = {
    user_registration_token: '',
    birthday: '',
    nickname: '',
    gender: '',
    is_push_notification: '',
    // secrets_questions: [],
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    // HACK: reducerは肥大化したらファイル分けたくなるかも
    reducers: {
        updateProfile(state, action: PayloadAction<updatePayload>) {
            // current(state).slides.push(action.payload)
            // let test = [...state.slides, action.payload]
            state.user_registration_token =
                action.payload.user_registration_token
            state.birthday = action.payload.birthday
            state.gender = action.payload.gender
            state.nickname = action.payload.nickname
            state.is_push_notification = action.payload.is_push_notification
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
