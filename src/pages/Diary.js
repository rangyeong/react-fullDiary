import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import { DiaryDispatchContext } from "../App";

import MyHeader from "../component/MyHeader.js";
import MyButton from "../component/MyButton.js";
import{ getStringDate } from "../util/date.js";
import { emotionList } from "../util/emotion.js";

const Diary = () => {   
    const {id} = useParams();
    const diaryList = useContext(DiaryStateContext);
    const navigate = useNavigate();
    const [data, setData] = useState();
    const {onRemove} = useContext(DiaryDispatchContext);

    useEffect(()=>{
        if(diaryList.length >= 1){
            const targetDiary = diaryList.find((it) => 
                parseInt(it.id) === parseInt(id)
            );
            if(targetDiary){
                setData(targetDiary);
            } else {
                alert('없는 일기입니다.');
                navigate('/', {replace:true});
            }
        }
    },[id, diaryList]);

    if(!data){
        return <div className="loadingMsg">로딩중입니다.</div>
    } else {
        const thisEmotionData = emotionList.find((it) => parseInt(it.emotion_id) === parseInt(data.emotion));
        // console.log(thisEmotionData);

        const handleRemove = (id) => {
            onRemove(id);
            navigate('/');
        }

        return (
            <div className="Diary">
                <MyHeader
                    headTxt={`${getStringDate(new Date(data.date))}의 기록`}
                    leftChild={<MyButton
                            text={'뒤로가기'}
                            onClick={()=>{navigate(-1)}}
                        />}
                />
                <div className="diaryPage">
                    <div className="title">
                            {data.title}
                            <span><img src={thisEmotionData.emotion_img} /></span>
                        </div>
                        <div className="content">
                            {data.content}
                    </div>
                </div>
                    <div className="btn">
                        <MyButton
                            text={'삭제하기'}
                            type={'negative'}
                            onClick={()=>{handleRemove(data.id)}}
                        />
                        <MyButton
                            text={'수정하기'}
                            onClick={()=>{navigate(`/edit/${data.id}`)}}
                        />
                    </div>
            </div>
        );
    }
};

export default Diary;