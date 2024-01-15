import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const DiaryItem = ({id, title, emotion, date}) => {

    const navigate = useNavigate();

    const goDetail = () => {
        navigate(`/diary/${id}`);
    }
    const goEdit = () => {
        navigate(`/edit/${id}`);
    }


    return (
        <li className="DiaryItem">
            <p className="item_emo" onClick={goDetail}>
                <img src={`/assets/emotion${emotion}.png`} />
            </p>
            <div className="item_info" onClick={goDetail}>
                <p className="item_date">{new Date(date).toLocaleDateString()}</p>
                <p className="item_title">{title}</p>
            </div>
            <div className="item_btn">
                <MyButton text={'수정'} onClick={goEdit} />
            </div>
        </li>
    );
};

export default DiaryItem;