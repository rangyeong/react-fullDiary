const EmotionItem = ({
    emotion_id, emotion_img, emotion_descript, click, isSelect
}) => {
    return(
        <li 
            className={isSelect ? `active${emotion_id}` : ''}
            onClick={()=>{click(emotion_id)}}
        >
            <p className="icon"><img src={emotion_img} /></p>
            <p className="txt">{emotion_descript}</p>
        </li>
    )
}

export default EmotionItem;