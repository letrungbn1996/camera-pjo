import React from 'react'
import { FCProps } from '../../types/Props'
import css from './Icon.module.scss'

export const UserIcon = () => {
    return (
        <>
            {process.env.NEXT_PUBLIC_PRODUCT_ID === 'KHA' ? (
                <img src="/img_kha/icon_user.svg" alt="" />
            ) : (
                <img src="/img/icon_user.svg" alt="" />
            )}
        </>
    )
}

export const CloseIcon = () => {
    return (
        <>
            {process.env.NEXT_PUBLIC_PRODUCT_ID === 'KHA' ? (
                <div className={css.close}>
                    <img src="/img_kha/icon_close.svg" alt="" />
                </div>
            ) : (
                <div className={css.close}>
                    <img src="/img/icon_close.svg" alt="" />
                </div>
            )}
        </>
    )
}

export const ArrowLeftIcon = () => {
    return (
        <>
            {process.env.NEXT_PUBLIC_PRODUCT_ID === 'KHA' ? (
                <img src="/img_kha/icon_arrow_left.svg" alt="" />
            ) : (
                <img src="/img/icon_arrow_left.svg" alt="" />
            )}
        </>
    )
}

export const ScanIcon = () => {
    return (
        <>
            {process.env.NEXT_PUBLIC_PRODUCT_ID === 'KHA' ? (
                <div className={css.scan}>
                    <img src="/img_kha/icon_scan.svg" alt="" />
                </div>
            ) : (
                <div className={css.scan}>
                    <img src="/img/icon_scan.svg" alt="" />
                </div>
            )}
        </>
    )
}

export const PassCodeIcon = () => {
    return (
        <>
            {process.env.NEXT_PUBLIC_PRODUCT_ID === 'KHA' ? (
                <div className={css.passcode}>
                    <img src="/img_kha/icon_passcode.svg" alt="" />
                </div>
            ) : (
                <div className={css.passcode}>
                    <img src="/img/icon_passcode.svg" alt="" />
                </div>
            )}
        </>
    )
}

export const MapIcon = () => {
    return (
        <>
            {process.env.NEXT_PUBLIC_PRODUCT_ID === 'KHA' ? (
                <img src="/img_kha/icon_link_map.svg" alt="" />
            ) : (
                <img src="/img/icon_link_map.svg" alt="" />
            )}
        </>
    )
}

type TelIcon = {
    onClick?: (e: React.MouseEvent<HTMLImageElement>) => void
}

export const TelIcon = ({ onClick }: TelIcon) => {
    return (
        <>
            {process.env.NEXT_PUBLIC_PRODUCT_ID === 'KHA' ? (
                <img
                    src="/img_kha/icon_link_tel.svg"
                    alt=""
                    onClick={onClick}
                />
            ) : (
                <img src="/img/icon_link_tel.svg" alt="" onClick={onClick} />
            )}
        </>
    )
}

type SizeProps = {
    size?: string
}

export const PhotoLibraryIcon = ({ size }: SizeProps) => {
    return (
        <>
            {process.env.NEXT_PUBLIC_PRODUCT_ID === 'KHA' ? (
                <div className={size === 'small' ? '' : css.photoLibrary}>
                    <img src="/img_kha/icon_photo_library.svg" alt="" />
                </div>
            ) : (
                <div className={size === 'small' ? '' : css.photoLibrary}>
                    <img src="/img/icon_photo_library.svg" alt="" />
                </div>
            )}
        </>
    )
}

export const CameraShotIcon = ({ size }: SizeProps) => {
    return (
        <>
            {process.env.NEXT_PUBLIC_PRODUCT_ID === 'KHA' ? (
                <div className={size === 'small' ? '' : css.cameraShot}>
                    <img src="/img_kha/icon_camera_shot.svg" alt="" />
                </div>
            ) : (
                <div className={size === 'small' ? '' : css.cameraShot}>
                    <img src="/img/icon_camera_shot.svg" alt="" />
                </div>
            )}
        </>
    )
}

export const SlideNextArrowIcon = () => {
    return (
        <>
            {process.env.NEXT_PUBLIC_PRODUCT_ID === 'KHA' ? (
                <img src="/img_kha/icon_arrow_right.svg" alt="" />
            ) : (
                <img src="/img/icon_arrow_right.svg" alt="" />
            )}
        </>
    )
}
export const MedicationCommentIcon = () => {
    return (
        <>
            {process.env.NEXT_PUBLIC_PRODUCT_ID === 'KHA' ? (
                <img src="/img_kha/icon_comment.svg" alt="" />
            ) : (
                <img src="/img/icon_comment.svg" alt="" />
            )}
        </>
    )
}

export const SlidePrevArrowIcon = () => {
    return (
        <>
            {process.env.NEXT_PUBLIC_PRODUCT_ID === 'KHA' ? (
                <img src="/img_kha/icon_arrow_left.svg" alt="" />
            ) : (
                <img src="/img/icon_arrow_left.svg" alt="" />
            )}
        </>
    )
}

export const QuestionIcon = () => {
    return (
        <>
            {process.env.NEXT_PUBLIC_PRODUCT_ID === 'KHA' ? (
                <img src="/img_kha/icon_question.svg" alt="" />
            ) : (
                <img src="/img/icon_question.svg" alt="" />
            )}
        </>
    )
}
export const MedicationBellIcon = () => {
    return (
        <>
            {process.env.NEXT_PUBLIC_PRODUCT_ID === 'KHA' ? (
                <img src="/img_kha/icon_bell.svg" alt="" />
            ) : (
                <img src="/img/icon_bell.svg" alt="" />
            )}
        </>
    )
}

export const InfoCloseIcon = () => {
    return (
        <>
            {process.env.NEXT_PUBLIC_PRODUCT_ID === 'KHA' ? (
                <img src="/img_kha/icon_close_info.svg" alt="" />
            ) : (
                <img src="/img/icon_close_info.svg" alt="" />
            )}
        </>
    )
}

export const MapCurrentIcon = () => {
    return (
        <>
            {process.env.NEXT_PUBLIC_PRODUCT_ID === 'KHA' ? (
                <img src="/img_kha/icon_map_current.svg" alt="" />
            ) : (
                <img src="/img/icon_map_current.svg" alt="" />
            )}
        </>
    )
}

export const SendMessageIcon = () => {
    return (
        <>
            {process.env.NEXT_PUBLIC_PRODUCT_ID === 'KHA' ? (
                <img src="/img_kha/icon_send_message_wt.svg" alt="" />
            ) : (
                <img src="/img/icon_send_message_wt.svg" alt="" />
            )}
        </>
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
                    {process.env.NEXT_PUBLIC_PRODUCT_ID === 'KHA' ? (
                        <img src="/img_kha/icon_pharmacy_blank.svg" alt="" />
                    ) : (
                        <img src="/img/icon_pharmacy_blank.svg" alt="" />
                    )}
                </div>
            </div>
        </>
    )
}

export const EndingCharacterIconKHA = () => {
    return (
        <>
            <div className={css.endingCharacterIconKHA}>
                <img src="/img_kha/illust_sakura_ending.png" alt="" />
            </div>
        </>
    )
}

export const NotebookIconWith = ({ children }: FCProps) => {
    return (
        <>
            {process.env.NEXT_PUBLIC_PRODUCT_ID === 'KHA' ? (
                <div className={css.notebookBgKHA}>{children}</div>
            ) : (
                <div className={css.notebookBg}>{children}</div>
            )}
        </>
    )
}

export const SendIconWith = ({ children }: FCProps) => {
    return (
        <>
            {process.env.NEXT_PUBLIC_PRODUCT_ID === 'KHA' ? (
                <div className={css.sendBgKHA}>{children}</div>
            ) : (
                <div className={css.sendBg}>{children}</div>
            )}
        </>
    )
}

export const MessageIconWith = ({ children }: FCProps) => {
    return (
        <>
            {process.env.NEXT_PUBLIC_PRODUCT_ID === 'KHA' ? (
                <div className={css.messageBgKHA}>{children}</div>
            ) : (
                <div className={css.messageBg}>{children}</div>
            )}
        </>
    )
}

export const VitalIconWith = ({ children }: FCProps) => {
    return (
        <>
            {process.env.NEXT_PUBLIC_PRODUCT_ID === 'KHA' ? (
                <div className={css.vitalBgKHA}>{children}</div>
            ) : (
                <div className={css.vitalBg}>{children}</div>
            )}
        </>
    )
}

export const MealIconWith = ({ children }: FCProps) => {
    return (
        <>
            {process.env.NEXT_PUBLIC_PRODUCT_ID === 'KHA' ? (
                <div className={css.mealBgKHA}>{children}</div>
            ) : (
                <div className={css.mealBg}>{children}</div>
            )}
        </>
    )
}

export const CalendarIconWith = ({ children }: FCProps) => {
    return (
        <>
            {process.env.NEXT_PUBLIC_PRODUCT_ID === 'KHA' ? (
                <div className={css.calendarBgKHA}>{children}</div>
            ) : (
                <div className={css.calendarBg}>{children}</div>
            )}
        </>
    )
}

export const MedicalInstitutionIconWith = ({ children }: FCProps) => {
    return (
        <>
            <div className={css.medicalInstitutionBgKHA}>{children}</div>
        </>
    )
}

export const ChatBigIconWith = ({ children }: FCProps) => {
    return <div className={css.chatBigBg}>{children}</div>
}

export const FamilyBigIconWith = ({ children }: FCProps) => {
    return (
        <>
            {process.env.NEXT_PUBLIC_PRODUCT_ID === 'KHA' ? (
                <div className={css.familyBigBgKHA}>{children}</div>
            ) : (
                <div className={css.familyBigBg}>{children}</div>
            )}
        </>
    )
}

export const CorporateIconWith = ({ children }: FCProps) => {
    return (
        <>
            {process.env.NEXT_PUBLIC_PRODUCT_ID === 'KHA' ? (
                <div className={css.corporateBgKHA}>{children}</div>
            ) : (
                <div className={css.corporateBg}>{children}</div>
            )}
        </>
    )
}
