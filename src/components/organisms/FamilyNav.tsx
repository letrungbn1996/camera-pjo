import React from 'react'
import { FCProps } from '../../types/Props'
import css from './FamilyNav.module.scss'

const FamilyNav = ({ children }: FCProps) => {
    return <ul className={css.familyNav}>{children}</ul>
}

export default FamilyNav
