import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DiaryStateContext } from "../App";
import DiaryEdit from "../component/DiaryEdit";

const Edit = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const diaryList = useContext(DiaryStateContext);

    const [originData, setOriginData] = useState();

    useEffect(()=>{
        if(diaryList.length >= 1){
            const targetDiary = diaryList.find((it) => 
                parseInt(it.id) === parseInt(id) 
            );
            if(targetDiary){
                setOriginData(targetDiary);
            } else {
                alert('없는 자료입니다.');
                navigate('/');
            }
        }
    }, [id, diaryList]);

    return (
        <div className="Edit">
            {originData && <DiaryEdit isEdit={true} originData={originData} />}
        </div>
    );
};

export default Edit;