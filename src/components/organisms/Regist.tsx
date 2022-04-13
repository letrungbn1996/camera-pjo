import React from 'react'
import { FCProps } from '../../types/Props'
import css from './Regist.module.scss'

const Regist = ({ children }: FCProps) => {
    return <div className={css.regist}>{children}</div>
}

export const RegistSection = ({ children }: FCProps) => {
    return <section className={css.section}>{children}</section>
}

export const RegistHeader = ({ children }: FCProps) => {
    return <div className={css.registHeader}>{children}</div>
}

export const RegistBody = ({ children }: FCProps) => {
    return <div className={css.registBody}>{children}</div>
}

export const RegistInput = ({ children }: FCProps) => {
    return <div className={css.registInput}>{children}</div>
}

export const RegistConfirm = ({ children }: FCProps) => {
    return <div className={css.registConfirm}>{children}</div>
}

export const RegistQuestion = ({ children }: FCProps) => {
    return <div className={css.registQuestion}>{children}</div>
}

export default Regist
