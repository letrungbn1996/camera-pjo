import React, { useState, useEffect, useMemo, useRef } from 'react'
import { FieldError } from 'react-hook-form'
import {
    years,
    months,
    days31,
    days30,
    days29,
    days28,
} from '../../types/Calendar'
import formCss from './OriginalForm.module.scss'

type Props = {
    onChangeBirthday: (data: string) => void
    value?: string // 初期値設定（ex:1980-06-03）
    initial?: string // 初期ドラムロール選択値（ex:1980-06-03）
    error?: FieldError | boolean | undefined
}

const BirthdayDrumroll = ({
    onChangeBirthday,
    value = '',
    initial = '',
    error,
}: Props) => {
    const Picker = require('better-picker')
    const [birthday, setBirthday] = useState('')
    const [displayBirthday, setDisplayBirthday] = useState('')

    const suppressZero = (string: string) => {
        return string.replace(/^0+/, '')
    }

    // 年・月・日の初期設定
    let initialYear = '1970'
    let initialMonth = '1'
    let initialDay = '1'
    if (value !== '') {
        initialYear = value.split('-')[0]
        initialMonth = suppressZero(value.split('-')[1])
        initialDay = suppressZero(value.split('-')[2])
    } else if (initial !== '') {
        initialYear = initial.split('-')[0]
        initialMonth = suppressZero(initial.split('-')[1])
        initialDay = suppressZero(initial.split('-')[2])
    }
    const [year, setYear] = useState(initialYear)
    const currentYearRef = useRef('')
    currentYearRef.current = year // yearのインスタンス
    const [month, setMonth] = useState(initialMonth)
    const currentMonthRef = useRef('')
    currentMonthRef.current = month // monthのインスタンス
    const initialYearIndex = years.findIndex(
        (el) => el['value'] === initialYear
    )
    const initialMonthIndex = months.findIndex(
        (el) => el['value'] === initialMonth
    )
    const initialDayIndex = days31.findIndex((el) => el['value'] === initialDay)

    // ピッカー初期設定
    const picker = useMemo(
        () =>
            new Picker({
                data: [years, months, days31],
                selectedIndex: [
                    initialYearIndex,
                    initialMonthIndex,
                    initialDayIndex,
                ],
                title: '生年月日',
            }),
        [initialYearIndex]
    )

    useEffect(() => {
        // マスク領域にクリックイベント追加（ピッカーを隠す）
        document.querySelectorAll('.mask-hook').forEach(function (mask) {
            mask.addEventListener('click', function () {
                picker.hide()
            })
        })
        // 日本語にローカライズ（取消 → 閉じる）
        document.querySelectorAll('.cancel-hook').forEach(function (cancel) {
            cancel.innerHTML = '閉じる'
        })
        // 日本語にローカライズ（确定 → OK）
        document.querySelectorAll('.confirm-hook').forEach(function (confirm) {
            confirm.innerHTML = 'OK'
        })
        if (value !== '') {
            setBirthday(value)
            setDisplayBirthday(
                value.split('-')[0] +
                    '年' +
                    value.split('-')[1] +
                    '月' +
                    value.split('-')[2] +
                    '日'
            )
        }
    }, [initialYearIndex])

    const birthInputEl = useRef<HTMLInputElement>(null)
    // 生年月日フィールド、フォーカス時
    const onFocusBirthday = () => {
        // フィールドからフォーカスを外す（ウィンドウを切り替えただけで再フォーカスが何度も発生するため）
        birthInputEl?.current?.blur()
        picker.show()
    }

    // ピッカー選択
    picker.on(
        'picker.select',
        function (selectedVal: string[], selectedIndex: number[]) {
            // selectedVal : レーンの左から選択した全てのvalue["1970", "1", "7"]
            // selectedIndex : レーンの左から選択した全ての番号[0, 1, 2]
            setBirthday(
                selectedVal[0] +
                    '-' +
                    ('0' + selectedVal[1]).slice(-2) +
                    '-' +
                    ('0' + selectedVal[2]).slice(-2)
            )
            setDisplayBirthday(
                selectedVal[0] +
                    '年' +
                    ('0' + selectedVal[1]).slice(-2) +
                    '月' +
                    ('0' + selectedVal[2]).slice(-2) +
                    '日'
            )
        }
    )

    // ピッカー回転
    picker.on('picker.change', function (index: number, selectedIndex: number) {
        // index : 動かしたレーンの番号（0 | 1 | 2）
        // selectedIndex : 動かしたレーン内の選択した番号（0 | 1 | 2 ・・・）
        // 月によって日にちのレーンを変更する
        const getLastDay = () => {
            // 月末日を求める
            const lastDay = new Date(
                Number(currentYearRef.current),
                Number(currentMonthRef.current),
                0
            ).getDate()
            if (lastDay === 29) {
                picker.refillColumn(2, days29)
                picker.scrollColumn(2, 0)
            } else if (lastDay === 28) {
                picker.refillColumn(2, days28)
                picker.scrollColumn(2, 0)
            } else if (lastDay === 30) {
                picker.refillColumn(2, days30)
                picker.scrollColumn(2, 0)
            } else {
                picker.refillColumn(2, days31)
                picker.scrollColumn(2, 0)
            }
        }
        // 年
        if (index === 0) {
            setYear(years[selectedIndex].value)
            getLastDay()
        }
        // 月
        if (index === 1) {
            setMonth(months[selectedIndex].value)
            getLastDay()
        }
    })

    useEffect(() => {
        onChangeBirthday(birthday)
    }, [birthday])

    return (
        <input
            type="text"
            value={displayBirthday}
            className={`${formCss.formText} ${formCss.textCenter} ${
                error && formCss.error
            }`}
            onFocus={onFocusBirthday}
            onChange={() => {}}
            ref={birthInputEl}
        />
    )
}

export default BirthdayDrumroll
