import classNames from "classnames";
import { MouseEvent, ReactNode } from "react";

interface IButtonProps {
    children?: ReactNode
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void
    className?: string
    title?: string
}

export default function Button({ children, className, ...rest }: IButtonProps) {
    return (
        <button className={classNames("py-4 px-8 rounded border flex justify-center items-center", className)} {...rest}>
            {children}
        </button>
    )
}