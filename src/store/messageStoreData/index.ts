import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'

// export type MessageStoreData = {
//     data: string[]
// }

export type MessageStoreDataState = {
    nickname: string
    sent_at_last: string
    store_alias: string
    store_name: string
}
export type updatePayload = any
// export type question = {
//     question_content: string
//     answer: string
// }

let initialState: MessageStoreDataState = {
    nickname: '',
    sent_at_last: '',
    store_alias: '',
    store_name: '',
}

export const messageStoreDataSlice = createSlice({
    name: 'messageStoreData',
    initialState,
    reducers: {
        updateMessageStoreData(state, action: PayloadAction<updatePayload>) {
            state.nickname = action.payload.nickname
            state.sent_at_last = action.payload.sent_at_last
            state.store_alias = action.payload.store_alias
            state.store_name = action.payload.store_name
        },
        reset() {
            return initialState
        },
    },
})
