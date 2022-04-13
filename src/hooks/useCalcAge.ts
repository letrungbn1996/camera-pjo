/**
 * 生年月日データから年齢を計算
 */

export const useCalcAge = (birthday: string) => {
    let age
    if (birthday) {
        const birthdayArray = birthday.split('-')
        const userBirthday = {
            year: Number(birthdayArray[0]),
            month: Number(birthdayArray[1]),
            date: Number(birthdayArray[2]),
        }
        const birthDate = new Date(
            userBirthday.year,
            userBirthday.month - 1,
            userBirthday.date
        )

        const y2 = birthDate.getFullYear().toString().padStart(4, '0')
        const m2 = (birthDate.getMonth() + 1).toString().padStart(2, '0')
        const d2 = birthDate.getDate().toString().padStart(2, '0')

        const today = new Date()
        const y1 = today.getFullYear().toString().padStart(4, '0')
        const m1 = (today.getMonth() + 1).toString().padStart(2, '0')
        const d1 = today.getDate().toString().padStart(2, '0')
        age = Math.floor((Number(y1 + m1 + d1) - Number(y2 + m2 + d2)) / 10000)
    }
    return age
}
