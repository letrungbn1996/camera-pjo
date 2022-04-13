import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '../../../../../../components/templates/DefaultLayout'
import OriginalHeader from '../../../../../../components/organisms/OriginalHeader'
import { MainLead, MainBody } from '../../../../../../components/organisms/Main'
import OnlineCalendar, {
    OnlineCalendarHeader,
    OnlineCalendarBody,
    OnlineCalendarTimetable,
} from '../../../../../../components/organisms/OnlineCalendar'
import {
    CalendarPreviousButton,
    CalendarNextButton,
    TimetableButton,
} from '../../../../../../components/atoms/OnlineButton'
import {
    CalendarPreviousIcon,
    CalendarNextIcon,
} from '../../../../../../components/atoms/OnlineIcon'
import { format, addDays, subDays, isBefore } from 'date-fns'
import ja from 'date-fns/locale/ja'

const OnlineTimetablePage: React.FC = () => {
    const router = useRouter()
    const query = router.query
    const processing = useRef(false)

    // 今日
    const today = useMemo(() => {
        const dateObj = new Date()
        return dateObj
    }, [])

    // 表示日
    const [targetDate, setTargetDate] = useState(today)

    // 時間を選択
    const onSelectTime = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        router.push('/online/application/detail')
    }

    useEffect(() => {
        let dateId = query.dateId
        if (dateId) {
            if (Array.isArray(dateId)) {
                dateId = dateId.join()
            }
            const newDate = new Date(
                Number(dateId.split('-')[0]),
                Number(dateId.split('-')[1]) - 1,
                Number(dateId.split('-')[2])
            )
            setTargetDate(newDate)
        }
    }, [query])

    return (
        <>
            <DefaultLayout>
                <OriginalHeader
                    title="希望時間登録"
                    prevURL="back"
                    isHomeBtn={false}
                />
                <main className="main">
                    <MainLead>予約時間枠を選択してください。</MainLead>
                    <MainBody>
                        <OnlineCalendar>
                            <OnlineCalendarHeader>
                                <CalendarPreviousButton
                                    href="#"
                                    disabled={isBefore(
                                        subDays(targetDate, 1),
                                        today
                                    )}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        if (processing.current) return
                                        setTargetDate((current) =>
                                            subDays(current, 1)
                                        )
                                        processing.current = true
                                        setTimeout(() => {
                                            processing.current = false
                                        }, 300)
                                    }}
                                >
                                    <CalendarPreviousIcon />
                                </CalendarPreviousButton>
                                {format(targetDate, 'y年M月d日（E）', {
                                    locale: ja,
                                })}
                                <CalendarNextButton
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        if (processing.current) return
                                        setTargetDate((current) =>
                                            addDays(current, 1)
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
                                <OnlineCalendarTimetable>
                                    <div className="timetable">
                                        <div className="time">9:00</div>
                                        <ul className="lists">
                                            <li>
                                                <TimetableButton
                                                    href="#"
                                                    onClick={onSelectTime}
                                                >
                                                    09:00～09:30
                                                </TimetableButton>
                                            </li>
                                            <li>
                                                <TimetableButton
                                                    href="#"
                                                    onClick={onSelectTime}
                                                >
                                                    09:30～10:00
                                                </TimetableButton>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="timetable">
                                        <div className="time">10:00</div>
                                        <ul className="lists">
                                            <li>
                                                <TimetableButton
                                                    href="#"
                                                    onClick={onSelectTime}
                                                >
                                                    10:00～10:30
                                                </TimetableButton>
                                            </li>
                                            <li>
                                                <TimetableButton
                                                    href="#"
                                                    onClick={onSelectTime}
                                                >
                                                    10:30～11:00
                                                </TimetableButton>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="timetable">
                                        <div className="time">11:00</div>
                                        <ul className="lists">
                                            <li>
                                                <TimetableButton
                                                    href="#"
                                                    onClick={onSelectTime}
                                                >
                                                    11:00～11:30
                                                </TimetableButton>
                                            </li>
                                            <li>
                                                <TimetableButton
                                                    href="#"
                                                    onClick={onSelectTime}
                                                >
                                                    11:30～12:00
                                                </TimetableButton>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="timetable">
                                        <div className="time">12:00</div>
                                        <ul className="lists">
                                            <li>
                                                <TimetableButton
                                                    href="#"
                                                    onClick={onSelectTime}
                                                >
                                                    12:00～12:30
                                                </TimetableButton>
                                            </li>
                                            <li>
                                                <TimetableButton
                                                    href="#"
                                                    onClick={onSelectTime}
                                                >
                                                    12:30～13:00
                                                </TimetableButton>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="timetable">
                                        <div className="time">13:00</div>
                                        <ul className="lists">
                                            <li>
                                                <TimetableButton
                                                    href="#"
                                                    onClick={onSelectTime}
                                                >
                                                    13:00～13:30
                                                </TimetableButton>
                                            </li>
                                            <li>
                                                <TimetableButton
                                                    href="#"
                                                    onClick={onSelectTime}
                                                >
                                                    13:30～14:00
                                                </TimetableButton>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="timetable">
                                        <div className="time">14:00</div>
                                        <ul className="lists">
                                            <li>
                                                <TimetableButton
                                                    href="#"
                                                    onClick={onSelectTime}
                                                >
                                                    14:00～14:30
                                                </TimetableButton>
                                            </li>
                                            <li>
                                                <TimetableButton
                                                    href="#"
                                                    onClick={onSelectTime}
                                                >
                                                    14:30～15:00
                                                </TimetableButton>
                                            </li>
                                        </ul>
                                    </div>
                                </OnlineCalendarTimetable>
                            </OnlineCalendarBody>
                        </OnlineCalendar>
                    </MainBody>
                </main>
            </DefaultLayout>
        </>
    )
}

export default OnlineTimetablePage
