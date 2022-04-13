export type StoreDetail = {
    store_name: string // 薬局名
    postal_code: string //郵便番号
    prefecture: string
    address: string // 住所
    phone_number: string // 電話番号
    fax_number: string
    monday_business_from_time: string // 月営業時間（始）
    monday_business_end_time: string // 月営業時間（終）
    tuesday_business_from_time: string // 火営業時間（始）
    tuesday_business_end_time: string // 火営業時間（終）
    wednesday_business_from_time: string // 水営業時間（始）
    wednesday_business_end_time: string // 水営業時間（終）
    thursday_business_from_time: string // 木営業時間（始）
    thursday_business_end_time: string // 木営業時間（終）
    friday_business_from_time: string // 金営業時間（始）
    friday_business_end_time: string // 金営業時間（終）
    saturday_business_from_time: string // 土営業時間（始）
    saturday_business_end_time: string // 土営業時間（終）
    sunday_business_from_time: string // 日営業時間（始）
    sunday_business_end_time: string // 日営業時間（終）
    national_holiday_business_from_time: string
    national_holiday_business_end_time: string
    regular_holiday: string // 定休日
    transportation: string // 交通手段
    can_credit_card: number // クレジットカード利用可否
    can_use_credit_card_brands: string // 利用できるクレジットカード
    business_time_comment: string
    news_from_store: string // 店舗からのお知らせ
    exist_parking: number // 駐車場有無
    latitude: string
    longitude: string
    store_image: string
}
