import {
    configureStore,
    getDefaultMiddleware,
    combineReducers,
    EnhancedStore,
} from '@reduxjs/toolkit'
import { slideSlice } from './slide'
import { profileSlice } from './profile'
import { authSlice } from './auth'
import { selectedStoreSlice } from './selectedStore'
import { messageStoreDataSlice } from './messageStoreData'
import { prescriptionSlice } from './prescription'
import { bookingSlice } from './booking'
import { selectedPatientSlice } from './selectedPatient'
import { selectedServiceSlice } from './selectedService'
import { prescriptionQuestionSlice } from './prescriptionQuestion'
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

// // HACK: `redux-persist failed to create sync storage. falling back to noop storage.`の対応
// // https://github.com/vercel/next.js/discussions/15687#discussioncomment-45319
// const createNoopStorage = () => {
//     return {
//         getItem(_key: any) {
//             return Promise.resolve(null)
//         },
//         setItem(_key: any, value: any) {
//             return Promise.resolve(value)
//         },
//         removeItem(_key: any) {
//             return Promise.resolve()
//         },
//     }
// }
// const storage =
//     typeof window !== 'undefined'
//         ? createWebStorage('local')
//         : createNoopStorage()
const storage = createWebStorage('local')
const persistConfig = {
    key: 'root', // Storageに保存されるキー名を指定する
    storage, // 保存先としてlocalStorageがここで設定される
    whitelist: [
        'profile',
        'auth',
        'selectedStore',
        'selectedPatient',
        'selectedService',
        'prescription',
        'prescriptionQuestion',
        'booking'
    ], // Stateは`todos`のみStorageに保存する
    // blacklist: ['visibilityFilter'] // `visibilityFilter`は保存しない
}

const rootReducer = combineReducers({
    slide: slideSlice.reducer,
    profile: profileSlice.reducer,
    auth: authSlice.reducer,
    selectedStore: selectedStoreSlice.reducer,
    messageStoreData: messageStoreDataSlice.reducer,
    selectedPatient: selectedPatientSlice.reducer,
    selectedService: selectedServiceSlice.reducer,
    prescription: prescriptionSlice.reducer,
    prescriptionQuestion: prescriptionQuestionSlice.reducer,
    booking: bookingSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

const persistedReducer = persistReducer(persistConfig, rootReducer)

// const persistConfig = {
//     key: 'p-next-test',
//     version: 1,
//     storage,
// }
// const persistedReducer = persistReducer(persistConfig, rootReducer)

// export const useStore = (): EnhancedStore => {
//     return configureStore({
//         reducer: slideSlice.reducer,
//         // middleware: getDefaultMiddleware({
//         //     serializableCheck: {
//         //         ignoredActions: [
//         //             FLUSH,
//         //             REHYDRATE,
//         //             PAUSE,
//         //             PERSIST,
//         //             PURGE,
//         //             REGISTER,
//         //         ],
//         //     },
//         // }),
//     })
// }
export const useStore = configureStore({
    reducer: persistedReducer,
    // middleware: getDefaultMiddleware({
    //     serializableCheck: {
    //         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //     },
    // }),
})
