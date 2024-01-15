import { useState } from "react"
import { useNavigate } from "react-router-dom";

import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
    {value : 'latest', name : '최신순'},
    {value : 'oldest', name : '오래된 순'}
];

const filterOptionList = [
    {value : 'all', name : '전체'},
    {value : 'good', name : '좋은 날'},
    {value : 'bad', name : '나쁜 날'}
];

const ControlMenu = ({value, onChange, optionList}) => {
    return <select value={value} onChange={(e)=>{onChange(e.target.value)}}>
        {optionList.map((it) => (
            <option key={it.value} value={it.value}>
                {it.name}
            </option>
        ))}
    </select>
}

const DiaryList = ({diaryData}) => {
    const navigate = useNavigate();

    const [sortType, setSortType] = useState('latest');
    const [filter, setFilter] = useState('all');

    const getProcessDiaryList = () => {
        const filterCallBack = (item) => {
            if(filter === 'good'){
                return parseInt(item.emotion) >= 3;
            } else {
                return parseInt(item.emotion) < 3;
            }
        };
        const compare = (a, b) => {
            if(sortType === 'latest'){
                return parseInt(b.date) - parseInt(a.date);
            } else {
                return parseInt(a.date) - parseInt(b.date);
            }
        };
        const copyList = JSON.parse(JSON.stringify(diaryData));
        const filterList 
            = filter === 'all' 
            ? copyList 
            : copyList.filter((it) => filterCallBack(it));

        const sortList = filterList.sort(compare);
        return sortList;
    };

    return (
        <div className="DiaryList">
            <div className="diaryListTop">
                <div className="left">
                    <ControlMenu 
                        value={sortType}
                        onChange={setSortType}
                        optionList={sortOptionList}
                    />
                    <ControlMenu 
                        value={filter}
                        onChange={setFilter}
                        optionList={filterOptionList}
                    />
                </div>                
                <MyButton 
                    text={'새 일기쓰기'}
                    type={'positive'}
                    onClick={()=>{navigate('/new')}}
                />
            </div>
            <div className="diaryListContent">
                <ul>
                    {getProcessDiaryList().map((it) => (
                        <DiaryItem key={it.id} {...it} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

DiaryList.defaultProps = {
    diaryData : []
};

export default DiaryList;