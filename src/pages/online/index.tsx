import React, { useEffect, useRef, useState } from 'react'
import DefaultLayout from '../../components/templates/DefaultLayout'
import OnlineHomeHeader from '../../components/organisms/OnlineHomeHeader'
import Main, { MainLead, MainBtn, DivButton } from '../../components/organisms/Main'
import OnlineNav from '../../components/organisms/OnlineNav'
import OnlineList, {
    OnlineListItem,
    OnlineHeader,
    OnlineHeaderLabel,
    OnlineLink,
} from '../../components/organisms/OnlineList'
import { NextButton } from '../../components/atoms/OriginalButton'
import { OnlineNavButton } from '../../components/atoms/OnlineButton'
import { CalendarIconTitleWith } from '../../components/atoms/OriginalIcon'
import { PharmacyIconWith } from '../../components/atoms/OnlineIcon'
import apiManager from '../../utilities/apiManager'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { useBookingStatus } from '../../hooks/useBookingStatus'
import { useGetDayJa, format } from '../../hooks/date'
import { onlineApplicationListData } from '../../types/OnlineApplicationListData'

const OnlinePage: React.FC = () => {
    const auth = useSelector((state: RootState) => state.auth)
    const [currentTab, setCurrentTab] = useState('reserved')
    const url = process.env.NEXT_PUBLIC_NLP_API_URL + '/mpp/omi/reservations'
    const [listData, setListData] = useState<any[]>([])
    const [scrollTime, setScrollTime] = useState<any>(1)
    const [currentPage, setCurrentPage] = useState<any>(0)
    const [nextPage, setNextPage] = useState<any>(1)
    const [isLoading, setIsLoading] = useState<any>(false)
    useEffect(() => {
        getListByTab('scroll');
        return () => {
            // return an anonymous clean up function
        };

    }, [scrollTime])

    useEffect(() => {
        getListByTab('tab');
        return () => {
            // return an anonymous clean up function
        };

    }, [currentTab])

    useEffect(() => {
        initScroll();
        return () => {
            // return an anonymous clean up function
        };
    }, [])

    useEffect(() => {
        const oldTab = localStorage.getItem('online-tab');
        if (oldTab) {
            setCurrentTab(oldTab)
        }
        localStorage.removeItem('online-tab');
        return () => {
            // return an anonymous clean up function
        };
    }, [])

    const onchangeTab = (e:any, tab:string) => {
        e.preventDefault()
        setListData([])
        setNextPage(1)
        setCurrentPage(0)
        setCurrentTab(onlineApplicationListData[tab].name)
        setScrollTime(1)
        localStorage.setItem('online-tab', onlineApplicationListData[tab].name);
    }

    const initScroll = () => {
        const updateScrollPosition = (e: any) => {
            // console.log(e.currentTarget, e.currentTarget.scrollY, document.body.clientHeight, document.body.scrollHeight);
            const el = e.currentTarget
            if (el.scrollY + document.body.clientHeight >= document.body.scrollHeight) {
              console.log('load');
              setScrollTime((scrollTime: any) => scrollTime + 1);
            }
          };
        if (window) {
            window.addEventListener('scroll', updateScrollPosition, false);
          }
          return () => {
            if (window) {
                window.removeEventListener('scroll', updateScrollPosition, false);
            }
          };
    }

    const getListByTab = (typeChange: string) => {
        console.log(typeChange)
        console.log(nextPage,currentPage)
        if(nextPage>currentPage) {        
            if (isLoading) return;
            setIsLoading(true)
            apiManager
                .action(
                    'GET',
                    url,
                    {
                    is_reserved: onlineApplicationListData[currentTab].value,
                    page: typeChange === 'scroll' ? (currentPage+1) : 1
                    },
                    {
                        AUTHORIZED_KEY: auth.authorized_key,
                    }
                )
                .then((res) => {
                    if (res?.data) {
                        if (res.data.reservations.length) {
                            const convertData = res.data.reservations.map((item:object) => useBookingStatus(item))
                            let list = [...convertData]
                            if (typeChange === 'scroll') {
                                list = [ ...listData, ...convertData]
                            } 
                            setCurrentPage(currentPage+1)
                            if(res.data.total >= nextPage*res.data.per_page) setNextPage(nextPage+1)
                            setListData(list)
                        }
                        
                    }
                    setIsLoading(false)
                })
                .catch((error) => {
                    setIsLoading(false)
                })
        }
    }

    return (
        <>
            <DefaultLayout>
                <OnlineHomeHeader title="お申込み一覧" prevURL="back" />
                <Main>
                    <MainLead>
                        <OnlineNav>
                            {['reserved', 'history'].map((item) => (
                                <li key={item}>
                                    <OnlineNavButton
                                        href="#"
                                        active={currentTab === onlineApplicationListData[item].name}
                                        onClick={(e) => {
                                            onchangeTab(e, item)
                                        }}
                                    >
                                        {onlineApplicationListData[item].label}
                                    </OnlineNavButton>
                                </li>
                            ))}
                        </OnlineNav>
                    </MainLead>

                    <OnlineList>
                        {listData.map((data) => {
                            return (
                                <OnlineListItem  key={data.id}>
                                    <OnlineHeader>
                                        <CalendarIconTitleWith>
                                            <h2 className="headerTitle">
                                                {format(data.reserve_at, "jaDate")}
                                                 ({useGetDayJa(data.reserve_at)})
                                            </h2>
                                        </CalendarIconTitleWith>
                                        <OnlineHeaderLabel>
                                            {data.status}
                                        </OnlineHeaderLabel>
                                    </OnlineHeader>
                                    <OnlineLink
                                        href={`/online/detail/${data.omi_service_reservation_alias}`}
                                    >
                                        <PharmacyIconWith>
                                            {data.store_name}
                                        </PharmacyIconWith>
                                        <dl>
                                            <dt>予約内容：</dt>
                                            <dd>オンライン服薬指導</dd>
                                            <dt>利用者：</dt>
                                            <dd>
                                                {data.first_name}{' '}
                                                {data.last_name}
                                            </dd>
                                            <dt>予約日時：</dt>
                                            {
                                               data.start_schedule_at && (
                                                    <dd>
                                                        {format(data.start_schedule_at, "jaDate")}
                                                        ({useGetDayJa(data.start_schedule_at)})
                                                        <br />
                                                        {format(data.start_schedule_at, "hm")}
                                                        ～
                                                        {format(data.finish_schedule_at, "hm")}
                                                    </dd>
                                               ) 
                                            }
                                           
                                            <dt>予約番号：</dt>
                                            <dd>{data.reservation_number}</dd>
                                        </dl>
                                    </OnlineLink>
                                </OnlineListItem>
                            )
                        })}
                    </OnlineList>
                    <DivButton>
                        <MainBtn>
                            <NextButton href="/online/video/test">
                                ビデオ通話をテストする
                            </NextButton>
                        </MainBtn>
                    </DivButton>
                    
                </Main>
            </DefaultLayout>
        </>
    )
}

export default OnlinePage
