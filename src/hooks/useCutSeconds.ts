/**
 * 時間文字列
 * `HH:MM:SS`→`HH:MM`に変換する
 */

export const useCutSeconds = (time: string) => {
    let output: string
    output = time.slice(0, -3)
    return output
}
