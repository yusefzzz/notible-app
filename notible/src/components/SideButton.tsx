import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type SideButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
    src?: string;
}

const SideButton = ({ children, src,  ...props }: SideButtonProps) => {
    return(
        <button 
            className={`w-25 h-25 bg-gray-100`} 
            {...props}
        >
            {src && <img src={src}/>}
        </button>
    )
}
export default SideButton;