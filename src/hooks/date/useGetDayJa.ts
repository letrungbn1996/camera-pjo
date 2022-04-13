/**
 * 今日が何曜日を返却する
 */

const dayOfWeekArray = [
    '日',
    '月',
    '火',
    '水',
    '木',
    '金',
    '土',
]

const useGetDayJa = (targetDay: string) => {
    const datetime = new Date(Date.parse(targetDay))
    return dayOfWeekArray[datetime.getDay()]
}

export default useGetDayJa