type SmallButtonProps = {
    label: String;
    disabled: boolean;
    onPressed: () => void;
}


const SmallButton: React.FC<SmallButtonProps> = ({ label, disabled, onPressed }) => {
    return(
        <button 
            disabled = {disabled}
            className='w-20 
                           h-15 
                           rounded-3xl 
                         bg-neutralDark 
                         text-neutralLight 
                           hover:opacity-60
                           disabled:opacity-40'
            onClick={() => onPressed()}>
            {label}
            
        </button>
    )
}

export default SmallButton;