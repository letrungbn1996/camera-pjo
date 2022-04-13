import { StringAnyObj } from '../types/Object'
export function useBookingStatus(payload: StringAnyObj){
    let status="";
    const {canceled_at, finished_at, reserve_fixed_at,start_schedule_at, reserve_at} = payload;
    if(canceled_at) {
        status = "キャンセル"
    }
    else if (finished_at) {
        status = "完了"
    }
    else if (reserve_fixed_at) {
        status = "予約確定"
    }
    else if (start_schedule_at) {
        status = "予約確認中"
    }
    else if (reserve_at) {
        status = "受付"
    }
    return {...payload, status}
}
