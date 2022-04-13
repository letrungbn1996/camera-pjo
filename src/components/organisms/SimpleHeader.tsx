import React from 'react'
import css from './Header.module.scss'

type Props = {
    title: string
}

const SimpleHeader = ({ title }: Props) => {
    return (
        <header className={css.header}>
            <div className={css.inner}>
                <h1 className={css.title}>{title}</h1>
            </div>
        </header>
    )
}

export default SimpleHeader
