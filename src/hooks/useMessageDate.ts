/**
 * メッセージ送受信時間表示のフック処理
 */

export const useMessageDate = (sentAt: string) => {
    // 表示形式
    // 2021/09/09 09:18 （年が違うとき）
    // 09/09 09:18（日が違うとき）
    // 09:18（同日）

    const sentAtObj = {
        year: '',
        month: '',
        date: '',
        time: '',
    }
    sentAtObj.year = sentAt.split('-')[0]
    sentAtObj.month = sentAt.split('-')[1]
    sentAtObj.date = sentAt.split('-')[2].split(' ')[0]
    sentAtObj.time =
        sentAt.split('-')[2].split(' ')[1].split(':')[0] +
        ':' +
        sentAt.split('-')[2].split(' ')[1].split(':')[1]

    const now = new Date()
    let sentAtString
    if (sentAtObj.year !== String(now.getFullYear())) {
        sentAtString =
            sentAtObj.year +
            '/' +
            sentAtObj.month +
            '/' +
            sentAtObj.date +
            ' ' +
            sentAtObj.time
    } else if (
        sentAtObj.month !== String(now.getMonth()) ||
        sentAtObj.date !== String(now.getDate())
    ) {
        sentAtString =
            sentAtObj.month + '/' + sentAtObj.date + ' ' + sentAtObj.time
    } else {
        sentAtString = sentAtObj.date + ' ' + sentAtObj.time
    }
    return sentAtString
}
