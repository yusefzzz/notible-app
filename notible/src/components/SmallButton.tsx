type SmallButtonProps = {
    label: String;
    onPressed: () => void;
}


const SmallButton: React.FC<SmallButtonProps> = ({ label, onPressed }) => {
    return(
        <button className='w-20 h-15 rounded-3xl bg-neutralDark text-neutralLight hover:opacity-60'
            onClick={() => onPressed()}>
            {label}
            
        </button>
    )
}

export default SmallButton;