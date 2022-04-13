import React from 'react'
import css from './OriginalRegistNav.module.scss'

type Props = {
    step: number
    total: number
}

const getClassNames = (i: number, step: number, total: number) => {
    // return className: css.active or css.disabled or '' / css.lastItem or ''
    return `${i + 1 === step ? css.active : ''}${
        i + 1 < step ? css.disabled : ''
    } ${step === total ? css.lastItem : ''}`
}

const Steps = ({ step, total }: Props) => {
    const items = []
    for (let i = 0; i < total; i++) {
        items.push(
            <li
                key={i}
                className={`${getClassNames(i, step, total)} regist-nav`}
            >
                STEP{i + 1}
            </li>
        )
    }
    return <>{items}</>
}

const RegistNav = ({ step, total }: Props) => {
    return (
        <ul className={`${css.registNav} regist-nav`}>
            <Steps step={step} total={total} />
        </ul>
    )
}

export default RegistNav
