import React from 'react'
import { FCProps } from '../../types/Props'
import css from './Map.module.scss'

const MapA = ({ children }: FCProps) => {
    return <div className={css.mapA}>{children}</div>
}

export const MapAreaA = ({ children }: FCProps) => {
    return <div className={css.mapAreaA}>{children}</div>
}

export const MapB = ({ children }: FCProps) => {
    return <div className={css.mapB}>{children}</div>
}

export const MapAreaB = ({ children }: FCProps) => {
    return <div className={css.mapAreaB}>{children}</div>
}

type MapCProps = {
    id?: string
    type: string
} & FCProps
export const MapC = ({ id, type, children }: MapCProps) => {
    let classString: string
    const getClassName = () => {
        if (type === 'prescription') {
            classString = `${css.mapC} ${css.prescriptionPharmacy}`
        } else if (type === 'register') {
            classString = `${css.mapC} ${css.registerPharmacy}`
        }
        return classString
    }

    return (
        <div id={id} className={getClassName()}>
            {children}
        </div>
    )
}

export const MapAreaC = ({ children }: FCProps) => {
    return <div className={css.mapAreaC}>{children}</div>
}

export const MapD = ({ children }: FCProps) => {
    return <div className={css.mapD}>{children}</div>
}

export const MapAreaD = ({ children }: FCProps) => {
    return <div className={css.mapAreaD}>{children}</div>
}

type MapBtmProps = {
    app?: string
} & FCProps

export const MapBtm = ({ children, app = 'LINQ' }: MapBtmProps) => {
    return <div className={`${css.mapBtm} ${css[app]}`}>{children}</div>
}

export const MapBtmInner = ({ children }: FCProps) => {
    return <div className={css.mapBtmInner}>{children}</div>
}

export const MapCurrent = ({ children }: FCProps) => {
    return <div className={css.mapCurrent}>{children}</div>
}

export const MapSearch = ({ children }: FCProps) => {
    return <div className={css.mapSearch}>{children}</div>
}

export default MapA
