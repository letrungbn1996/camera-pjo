/**
 * 日付データを文字列に変換する
 */

export const useDateString = (dateData: string, mode?: string) => {
    // 第2引数 mode: 指定なし -> 基本表示`YY年MM月DD日 HH時SS分`
    // 第2引数 mode: `simplified` -> 省略表示`YY/MM/DD HH:SS`
    let string = ''
    const dataArray = dateData.split(' ')

    if (dataArray.length === 1) {
        // dateDataが`yyyy-mm-dd`
        string = getDateString(dataArray[0], mode)

        // dateDataが`yyyy-mm-dd tt:mm:ss`
    } else if (dataArray.length === 2) {
        string = `${getDateString(dataArray[0], mode)} ${getTimeString(
            dataArray[1],
            mode
        )}`
    }
    return string
}

const getDateString = (item: string, mode?: string) => {
    const year = item.split('-')[0]
    const month = item.split('-')[1]
    const date = item.split('-')[2]
    let dateString = ''
    if (mode === 'simplified') {
        dateString = `${year}/${month}/${date}`
    } else {
        dateString = `${year}年 ${month}月${date}日`
    }
    return dateString
}

const getTimeString = (item: string, mode?: string) => {
    const time = item.split(':')[0]
    const minits = item.split(':')[1]
    let timeString = ''
    if (mode === 'simplified') {
        timeString = `${time}:${minits}`
    } else {
        timeString = `${time}時${minits}分`
    }
    return timeString
}
