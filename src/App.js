import React, { useReducer, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import Edit from './pages/Edit';
import Diary from './pages/Diary';
import Home from './pages/Home';
import New from './pages/New';

const dummyList = [
    {
        id: 4,
        title : '소풍가는 날',
        content: '다행이 비가 그쳤다. 아침 일찍부터 김밥을 준비하고 음료를 준비하며 들뜬 마음에 콧노래가 저절로 나왔다.',
        emotion: 4,
        date: 1704326400000
    },
    {
        id: 3,
        title : '비야! 제발 그쳐줘!',
        content: '어제 밤부터 내리기 시작한 비가 멈출 생각이 없어 보인다. 내일 소풍을 위해서는 어서 비가 그쳐야 할텐데...',
        emotion: 2,
        date: 1704240000000
    },
    {
        id: 2,
        title : '해피뉴이어!',
        content: '한 해의 시작을 다짐하기 위해 해돋이를 보러갔다. 새벽부터 일어나 뜨거운 물을 끓여 준비하고 단단히 채비해서 나갔다. 다행히 날씨가 많이 춥지 않았다.',
        emotion: 5,
        date: 1704067200000
    },
    {
        id: 1,
        title : '참! 잘했어요!!',
        content: '아무리 해도 풀리지 않던 문제를 해결했다! 정말 기쁜 마음에 소영 언니에게 바로 알렸더니 내 노력에 대해 아낌없이 칭찬을 해준다.',
        emotion: 5,
        date: 1703635200000
    },
    {
        id: 0,
        title : '순두부 멘탈',
        content: '오늘은 아침부터 실수연발, 우당탕한 하루였다. 체력적으로도 힘들고 연달아 터진 실수에 멘탈도 나가버린 하루였다.',
        emotion: 1,
        date: 1700870400000
    }
]

let newState = dummyList;
const reducer = (state, action) => {
    switch(action.type){
        case 'INIT' : {
            return action.data;
        }
        case 'CREATE' : {
            const newItem = {
                ...action.data
            }
            newState = [newItem, ...newState];
            break;
        }
        case 'REMOVE' : {
            newState = state.filter((item)=> item.id !== action.targetID);
            break;
        }        
        case 'EDIT' :{
            newState = state.map((item) => 
                item.id === action.data.id ? {...action.data} : item);
            break;
        }
        default :
            return state;
    }
    return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {

    // 상태관리 변수 data를 만들고 초깃값으로 dummyList를 설정.
    // data의 상태를 변경하기 위해 dispatch를 호출하고, dispatch를 호출하면 reducer함수의 내용이 실행 됨.
    const [data, dispatch] = useReducer(reducer, dummyList);
    const dateId = useRef(5);

    const onCreate = (title, content, date, emotion) => {
        dispatch({
            type : 'CREATE',
            data : {
                id : dateId.current,
                title,
                content,
                date : new Date(date).getTime(),
                emotion
            }
        });
        dateId.current += 1;
    };

    const onRemove = (targetID) => {
        dispatch({
            type : 'REMOVE',
            targetID
        });
    }

    const onEdit = (targetID, title, content, date, emotion) => {
        dispatch({
            type : 'EDIT',
            data : {
                id : targetID,
                title,
                content,
                date : new Date(date).getTime(),
                emotion
            }
        });
    }

    return (
        <DiaryStateContext.Provider value={data}>
            <DiaryDispatchContext.Provider value={{onCreate, onRemove, onEdit}}>
                <BrowserRouter>
                    <div className="App">
                        <Routes>
                            <Route path='/diary/:id' element={<Diary />} />
                            <Route path='/edit/:id' element={<Edit />} />
                            <Route path='/new' element={<New />} />
                            <Route path='/' element={<Home />} />
                        </Routes>
                    </div>
                </BrowserRouter>
            </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
    );
}

export default App;
