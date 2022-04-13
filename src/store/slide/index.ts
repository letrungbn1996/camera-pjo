import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'

export type Slide = {
    data: string[]
}

export type SlideState = {
    slide: Slide
}
export type AddSlidePayload = string
export type DelSlidePayload = string

let initialState = {
    slides: Array(),
}

export const slideSlice = createSlice({
    name: 'slide',
    initialState,
    // HACK: reducerは肥大化したらファイル分けたくなるかも
    reducers: {
        addSlide(state, action: PayloadAction<AddSlidePayload>) {
            // current(state).slides.push(action.payload)
            let test = [...state.slides, action.payload]
            state.slides = test
        },
        delSlide(state, action: PayloadAction<DelSlidePayload>) {
            state.slides = state.slides.filter(
                (slide) => slide !== action.payload
            )
        },
        reset() {
            return initialState
        },
    },
})
