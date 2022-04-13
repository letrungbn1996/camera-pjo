import React from 'react'
import { FCProps } from '../../types/Props'
import css from './OriginalIcon.module.scss'

export const ArrowLeftIcon = () => {
    return (
        <>
            <img src="/img/icon_arrow_left.svg" alt="" />
        </>
    )
}

export const InfoCloseIcon = () => {
    return (
        <>
            <img src="/img/icon_close_info.svg" alt="" />
        </>
    )
}

export const MapCurrentIcon = () => {
    return (
        <>
            <img src="/img/icon_map_current.svg" alt="" />
        </>
    )
}

export const ScanIcon = () => {
    return (
        <>
            <div className={css.scan}>
                <img src="/img/icon_scan.svg" alt="" />
            </div>
        </>
    )
}

export const PassCodeIcon = () => {
    return (
        <>
            <div className={css.passcode}>
                <img src="/img/icon_passcode.svg" alt="" />
            </div>
        </>
    )
}

export const MapSearchIcon = () => {
    return (
        <>
            <div className={css.mapSearch}>
                <img src="/img/icon_search_map.svg" alt="" />
            </div>
        </>
    )
}

export const ListSearchIcon = () => {
    return (
        <>
            <div className={css.listSearch}>
                <img src="/img/icon_search_list.svg" alt="" />
            </div>
        </>
    )
}

export const MapIcon = () => {
    return (
        <>
            <img src="/img/icon_link_map.svg" alt="" />
        </>
    )
}

export const TelIcon = () => {
    return (
        <>
            <img src="/img/icon_link_tel.svg" alt="" />
        </>
    )
}

export const DeleteImageIcon = () => {
    return (
        <>
            <img src="/img/icon_delete_image.svg" alt="" />
        </>
    )
}

type SizeProps = {
    size?: string
}

export const PhotoLibraryIcon = ({ size }: SizeProps) => {
    return (
        <>
            <div className={size === 'small' ? '' : css.photoLibrary}>
                <img src="/img/icon_photo_library.svg" alt="" />
            </div>
        </>
    )
}

export const CameraShotIcon = ({ size }: SizeProps) => {
    return (
        <>
            <div className={size === 'small' ? '' : css.cameraShot}>
                <img src="/img/icon_camera_shot.svg" alt="" />
            </div>
        </>
    )
}

export const SendMessageIcon = () => {
    return (
        <>
            <img src="/img/icon_send_message_wt.svg" alt="" />
        </>
    )
}

export const SlideNextArrowIcon = () => {
    return (
        <>
            <img src="/img/icon_arrow_right.svg" alt="" />
        </>
    )
}

export const SlidePrevArrowIcon = () => {
    return (
        <>
            <img src="/img/icon_arrow_left.svg" alt="" />
        </>
    )
}

export const QuestionIcon = () => {
    return (
        <>
            <img src="/img/icon_question.svg" alt="" />
        </>
    )
}

export const PagerTopIcon = () => {
    return (
        <div className={css.pagerTop}>
            <img src="/img/icon_pager_top.svg" alt="" />
        </div>
    )
}

export const PagerPrevIcon = () => {
    return (
        <div className={css.pagerPrev}>
            <img src="/img/icon_pager_prev.svg" alt="" />
        </div>
    )
}

export const PagerNextIcon = () => {
    return (
        <div className={css.pagerNext}>
            <img src="/img/icon_pager_next.svg" alt="" />
        </div>
    )
}

export const PagerLastIcon = () => {
    return (
        <div className={css.pagerLast}>
            <img src="/img/icon_pager_last.svg" alt="" />
        </div>
    )
}

type PharmacyImageBlankIconProps = {
    size?: string
}

export const PharmacyImageBlankIcon = ({
    size = 'thmub',
}: PharmacyImageBlankIconProps) => {
    return (
        <>
            <div className={`${css.pharmacyImageBlank} ${css[size]}`}>
                <div className="icon">
                    <img src="/img/icon_pharmacy_blank.svg" alt="" />
                </div>
            </div>
        </>
    )
}

export const PatientIconTitleWith = ({ children }: FCProps) => {
    return (
        <>
            <div className={css.patientIconTitleWith}>{children}</div>
        </>
    )
}

export const ClockIconTitleWith = ({ children }: FCProps) => {
    return (
        <>
            <div className={css.clockIconTitleWith}>{children}</div>
        </>
    )
}

export const MedicineTitleWith = ({ children }: FCProps) => {
    return (
        <>
            <div className={css.medicineTitleWith}>{children}</div>
        </>
    )
}

export const CommentIconTitleWith = ({ children }: FCProps) => {
    return (
        <>
            <div className={css.commentTitleWith}>{children}</div>
        </>
    )
}

export const CalendarIconTitleWith = ({ children }: FCProps) => {
    return (
        <>
            <div className={css.calendarTitleWith}>{children}</div>
        </>
    )
}

export const DocumentIconTitleWith = ({ children }: FCProps) => {
    return (
        <>
            <div className={css.documentTitleWith}>{children}</div>
        </>
    )
}

export const PharmacyIconTitleWith = ({ children }: FCProps) => {
    return (
        <>
            <div className={css.pharmacyTitleWith}>{children}</div>
        </>
    )
}

export const PaymentIconTitleWith = ({ children }: FCProps) => {
    return (
        <>
            <div className={css.paymentTitleWith}>{children}</div>
        </>
    )
}

export const InsuranceIconTitleWith = ({ children }: FCProps) => {
    return (
        <>
            <div className={css.insuranceTitleWith}>{children}</div>
        </>
    )
}
