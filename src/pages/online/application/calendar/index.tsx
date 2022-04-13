import React, { useState, useMemo, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import DefaultLayout from '../../../../components/templates/DefaultLayout'
import OriginalHeader from '../../../../components/organisms/OriginalHeader'
import { MainLead, MainBody } from '../../../../components/organisms/Main'
import OnlineCalendar, {
    OnlineCalendarHeader,
    OnlineCalendarBody,
    OnlineCalendarWeek,
    OnlineCalendarDate,
} from '../../../../components/organisms/OnlineCalendar'
import {
    CalendarPreviousButton,
    CalendarNextButton,
} from '../../../../components/atoms/OnlineButton'
import {
    CalendarPreviousIcon,
    CalendarNextIcon,
} from '../../../../components/atoms/OnlineIcon'
import {
    format,
    getDate,
    getDay,
    eachDayOfInterval,
    endOfWeek,
    eachWeekOfInterval,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    isSameMonth,
    isSunday,
    isBefore,
} from 'date-fns'
import * as holiday_jp from '@holiday-jp/holiday_jp'

const OnlineCalendarPage: React.FC = () => {
    const router = useRouter()
    const processing = useRef(false)

    // 今日
    const today = useMemo(() => {
        const dateObj = new Date()
        return dateObj
    }, [])

    // 表示月指定ステート
    const [targetMonthDate, setTargetMonthDate] = useState(today)

    // カレンダー生成用配列を返す関数（週毎の2次元配列）
    const getCalendarArray = (date: Date) => {
        const sundays = eachWeekOfInterval({
            start: startOfMonth(date),
            end: endOfMonth(date),
        })
        return sundays.map((sunday) =>
            eachDayOfInterval({ start: sunday, end: endOfWeek(sunday) })
        )
    }

    // カレンダー用配列データを取得
    const calendar = getCalendarArray(targetMonthDate)

    // 日付セルをタップ時の処理（日付ステート変更処理）
    const onClickDate = (date: Date) => {
        router.push(
            `/online/application/calendar/timetable/${format(date, 'y-M-d')}`
        )
    }

    return (
        <>
            <DefaultLayout>
                <OriginalHeader
                    title="希望日登録"
                    prevURL="back"
                    isHomeBtn={false}
                />
                <main className="main">
                    <MainLead>予約希望日を選択してください。</MainLead>
                    <MainBody>
                        <OnlineCalendar>
                            <OnlineCalendarHeader>
                                <CalendarPreviousButton
                                    href="#"
                                    disabled={isBefore(
                                        subMonths(targetMonthDate, 1),
                                        today
                                    )}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        if (processing.current) return
                                        setTargetMonthDate((current) =>
                                            subMonths(current, 1)
                                        )
                                        processing.current = true
                                        setTimeout(() => {
                                            processing.current = false
                                        }, 300)
                                    }}
                                >
                                    <CalendarPreviousIcon />
                                </CalendarPreviousButton>
                                {format(targetMonthDate, 'y年M月')}
                                <CalendarNextButton
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        if (processing.current) return
                                        setTargetMonthDate((current) =>
                                            addMonths(current, 1)
                                        )
                                        processing.current = true
                                        setTimeout(() => {
                                            processing.current = false
                                        }, 300)
                                    }}
                                >
                                    <CalendarNextIcon />
                                </CalendarNextButton>
                            </OnlineCalendarHeader>
                            <OnlineCalendarBody>
                                <OnlineCalendarWeek>
                                    <div className="week weekend">日</div>
                                    <div className="week">月</div>
                                    <div className="week">火</div>
                                    <div className="week">水</div>
                                    <div className="week">木</div>
                                    <div className="week">金</div>
                                    <div className="week">土</div>
                                </OnlineCalendarWeek>
                                <OnlineCalendarDate>
                                    {calendar.map((weekRow, rowNum) => (
                                        <ul className="days" key={rowNum}>
                                            {weekRow.map((date) => (
                                                <li key={getDay(date)}>
                                                    {isBefore(date, today) ? (
                                                        // 過去
                                                        <div
                                                            className={(() => {
                                                                return 'day day-outside'
                                                            })()}
                                                        >
                                                            <span>
                                                                {getDate(date)}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <Link href="#">
                                                            <a
                                                                className={(() => {
                                                                    if (
                                                                        holiday_jp.isHoliday(
                                                                            date
                                                                        ) ||
                                                                        isSunday(
                                                                            date
                                                                        )
                                                                    ) {
                                                                        if (
                                                                            !isSameMonth(
                                                                                date,
                                                                                targetMonthDate
                                                                            )
                                                                        ) {
                                                                            // 祝日、違う月
                                                                            return 'day day-outside day-holiday'
                                                                        } else {
                                                                            // 祝日
                                                                            return 'day day-holiday'
                                                                        }
                                                                    } else {
                                                                        if (
                                                                            !isSameMonth(
                                                                                date,
                                                                                targetMonthDate
                                                                            )
                                                                        ) {
                                                                            // 違う月
                                                                            return 'day day-outside'
                                                                        } else {
                                                                            return 'day'
                                                                        }
                                                                    }
                                                                })()}
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.preventDefault()
                                                                    onClickDate(
                                                                        date
                                                                    )
                                                                }}
                                                            >
                                                                <span>
                                                                    {getDate(
                                                                        date
                                                                    )}
                                                                </span>
                                                            </a>
                                                        </Link>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    ))}
                                </OnlineCalendarDate>
                            </OnlineCalendarBody>
                        </OnlineCalendar>
                    </MainBody>
                </main>
            </DefaultLayout>
        </>
    )
}

export default OnlineCalendarPage
