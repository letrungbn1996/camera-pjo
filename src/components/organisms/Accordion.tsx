import React from 'react'
import Link from 'next/link'
import { LinkProps, FCProps } from '../../types/Props'
import css from './Accordion.module.scss'

type Props = {
    app?: string
} & FCProps

const Accordion = ({ children, app = 'LINQ' }: Props) => {
    return <div className={`${css.accordion} ${css[app]}`}>{children}</div>
}

export const AccordionTitle = ({ href, children, onClick }: LinkProps) => {
    return (
        <Link href={href}>
            <a className={css.accordionTitle} onClick={onClick}>
                {children}
            </a>
        </Link>
    )
}

export const AccordionContent = ({ children }: FCProps) => {
    return <div className={css.accordionContent}>{children}</div>
}

export default Accordion
