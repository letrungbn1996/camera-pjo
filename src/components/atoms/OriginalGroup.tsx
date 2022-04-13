import React from 'react'
import css from './OriginalGroup.module.scss'

type FavoriteGroupProps = {
    children: React.ReactNode
    active?: boolean
}

export const FavoriteGroup = ({
    children,
    active = false,
}: FavoriteGroupProps) => {
    return (
        <>
            <div
                className={
                    active ? `${css.favoriteGroup} active` : css.favoriteGroup
                }
            >
                {children}
            </div>
        </>
    )
}
