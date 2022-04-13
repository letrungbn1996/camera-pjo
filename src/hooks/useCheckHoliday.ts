import holiday_jp from '@holiday-jp/holiday_jp'

/**
 * 祝日かどうかを判定する
 */
export const useCheckHoliday = (from: Date, end?: Date) => {
    // 第2引数`end`があるとき -> 期間内に祝日があるか判定する
    // （期間内の祝日が配列で返る）
    if (end) {
        const holidays = holiday_jp.between(
            new Date(formatDate(from)),
            new Date(formatDate(end))
        )
        return holidays
    } else {
        // 第2引数`end`がないとき -> 第1引数の日が祝日かどうかをbooleanで判定
        const isHoliday = holiday_jp.isHoliday(new Date(formatDate(from)))
        return isHoliday
    }
}

const formatDate = (date: Date) => {
    var y = date.getFullYear()
    var m = ('00' + (date.getMonth() + 1)).slice(-2)
    var d = ('00' + date.getDate()).slice(-2)
    return y + '-' + m + '-' + d
}
