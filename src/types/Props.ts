export type FCProps = {
    children: React.ReactNode
}

export type AnchorProps = {
    children: React.ReactNode
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export type LinkProps = {
    href: string
    children: React.ReactNode
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export type ButtonProps = {
    children: React.ReactNode
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}
