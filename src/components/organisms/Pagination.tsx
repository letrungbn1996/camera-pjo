import React from 'react'
import { FCProps } from '../../types/Props'
import css from './Pagination.module.scss'

const Pagination = ({ children }: FCProps) => {
    return <ul className={css.pagination}>{children}</ul>
}

export const PaginationSeparator = ({ children }: FCProps) => {
    return <div className={css.paginationSeparator}>{children}</div>
}

export default Pagination
