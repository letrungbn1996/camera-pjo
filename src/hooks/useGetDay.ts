import { useCheckHoliday } from './useCheckHoliday'
/**
 * 今日が何曜日か・祝日かを判定する
 */

const dayOfWeekArray = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
]
export const useGetDay = (targetDay: Date, targetDayOfWeek: number) => {
    let result: string
    if (useCheckHoliday(targetDay)) {
        result = 'national_holiday'
    } else {
        result = dayOfWeekArray[targetDayOfWeek]
    }
    return result
}
