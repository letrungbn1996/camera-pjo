import React from 'react'
import { FCProps } from '../../types/Props'
import css from './HomeInformation.module.scss'

const HomeInformation = ({ children }: FCProps) => {
    return <div className={css.information}>{children}</div>
}

export const HomeInformationHeader = ({ children }: FCProps) => {
    return <div className={css.informationHeader}>{children}</div>
}

export const HomeInformationBody = ({ children }: FCProps) => {
    return <div className={css.informationBody}>{children}</div>
}

export default HomeInformation
