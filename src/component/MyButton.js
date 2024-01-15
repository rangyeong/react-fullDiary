const MyButton = ({type, text, onClick}) => {
    return (
        <p className="MyButton">
            {/* <button className={type} onClick={onClick}> */}
            <button className={`myBtn ${type}`} onClick={onClick}>
                {text}
            </button>
        </p>
    );
};

MyButton.defaultProps = {
    type : 'default'
}

export default MyButton;