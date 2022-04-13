import css from './Text.module.scss'

export const ErrorText: React.FC<React.HTMLProps<HTMLDivElement>> = (props) => {
    return <div className={css.error} {...props} />
}

export const H1Text: React.FC = (props) => {
    return <h1 className={css.h1} {...props} />
}

export const H2Text: React.FC<React.HTMLProps<HTMLHeadingElement>> = (
    props
) => {
    return <h2 className={css.h2} {...props} />
}

export const H3Text: React.FC<React.HTMLProps<HTMLHeadingElement>> = (
    props
) => {
    return <h3 className={css.h3} {...props} />
}
