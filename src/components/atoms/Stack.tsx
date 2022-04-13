import React from 'react'
import { FCProps } from '../../types/Props'
import css from './Stack.module.scss'

type StackProps = {
    spacing?: number
} & FCProps

type ItemProps = {
    width?: string
} & FCProps

export const Stack = ({ children, spacing = 1 }: StackProps) => {
    return (
        <div className={`${css.stack} ${'spacing' + spacing}`}>{children}</div>
    )
}

export const StackMulti = ({ children }: FCProps) => {
    return <div className={css.stackMulti}>{children}</div>
}

export const Item = ({ children, width }: ItemProps) => {
    return (
        <>
            {width !== '' ? (
                <div className={`${css.stackItem} ${'width' + width}`}>
                    {children}
                </div>
            ) : (
                <div className={css.stackItem}>{children}</div>
            )}
        </>
    )
}

export const ItemInline = ({ children }: ItemProps) => {
    return <div className={css.stackItemInline}>{children}</div>
}
