type DataProps = {
    text: string
    value: string
}[]

// 年を生成
const thisYear = new Date().getFullYear()
const createYears = () => {
    let years: DataProps = []
    for (let i = 1; i <= 100; i++) {
        years[i - 1] = {
            text: String(thisYear - (100 - i)) + '年',
            value: String(thisYear - (100 - i)),
        }
    }
    return years
}
export const years = createYears()

// 月を生成
const createMonths = () => {
    let months: DataProps = []
    for (let i = 1; i <= 12; i++) {
        months[i - 1] = {
            text: String(i) + '月',
            value: String(i),
        }
    }
    return months
}
export const months = createMonths()

// 日を生成
const createDays = (n: number) => {
    let days: DataProps = []
    for (let i = 1; i <= n; i++) {
        days[i - 1] = {
            text: String(i) + '日',
            value: String(i),
        }
    }
    return days
}
export const days31 = createDays(31)
export const days30 = createDays(30)
export const days29 = createDays(29)
export const days28 = createDays(28)
