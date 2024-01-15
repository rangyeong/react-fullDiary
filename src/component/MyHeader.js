const MyHeader = ({headTxt, leftChild, rightChild}) => {
    return (
        <div className="MyHeader">
            <div className="head_btn_left">
                {leftChild}
            </div>
            <h1 className="head_text">
                {headTxt}
            </h1>
            <div className="head_btn_right">
                {rightChild}
            </div>
        </div>
    );
};

export default MyHeader;