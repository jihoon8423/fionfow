import React, { useCallback, useContext, useEffect, useState } from 'react';

import EmptyHeart from '../../../images/empty-heart.png';
import Heart from '../../../images/heart.png';
import AuthContext from '../../store/AuthContext';
import RecommendContext from '../../store/RecommendContext';


type Props = { item:string | undefined }

type Recommends = {
recommendNum: number
recommended: boolean
}

const Recommend:React.FC<Props> = (props) => {
const [isLoading, setIsLoading] = useState<boolean>(false);
const [recommends, setRecommends] = useState<Recommends>();

const authCtx = useContext(AuthContext);
const recommendCtx = useContext(RecommendContext);

let isLogin = authCtx.isLoggedIn;
const id = String(props.item);

/**
 *  @RecommendContext는 생성과 삭제 같이, 변화에 대해서 판단하는 state가 존재
 *  따라서 @isChangeSuccess의 값이 true일 경우 다시 @Context의 @recommends state를 불러와서 컴포넌트의 state에 적용시킨다
 */
const getContext = useCallback(() => {
    setIsLoading(false);
    (isLogin ? recommendCtx.getRecommends(id, authCtx.token) : recommendCtx.getRecommends(id));
}, [isLogin])

useEffect(() => {
    getContext();
}, [getContext]);

useEffect(() => {
    if (recommendCtx.isSuccess) {
    setRecommends(recommendCtx.recommends);
    console.log(recommendCtx);
    console.log("set");
    setIsLoading(true);
    }
}, [recommendCtx, recommends])

useEffect(() => {
    if (recommendCtx.isChangeSuccess) {
        setRecommends(recommendCtx.recommends);
        console.log(recommendCtx)
        console.log("change set");
        setIsLoading(true);
    }
}, [recommendCtx.isChangeSuccess])

// 추천 생성, 삭제에 관한 함수다
// 로그인이 되어있지 않은 경우, alert로 거절하고, 만약 로그인이 되어있으면 recommends 상태의 recommended 값을 통해 
// 추천을 생성하려는 것인지, 삭제인지 파악하고 각각 맞는 함수를 날린다.
const changeRecommend = () => {
    if (!isLogin) {
        return alert("로그인 하세요");
    } else {
            (recommends!.recommended? recommendCtx.deleteRecommend(id, authCtx.token): recommendCtx.postRecommend(id, authCtx.token));
        }
    }

    // 구분을 쉽게하기위 2가지의 값을 가지고 와서 recommended의 여부에 따라 Heart인가 EmptyHeart가 나뉘게 된다.
    const heartImage = (heart:string) => {
        return (
            <img alt="heart" src= {heart} onClick={changeRecommend}/>
        )
    }

    let media = <h3>로딩중...</h3>

    if (isLoading && recommends) {
        media = (
            <div>
                {recommends.recommended? heartImage(Heart) : heartImage(EmptyHeart)}
                <h4>좋아요 숫자 {recommends.recommendNum}</h4>
            </div>
        )
    }

    return (
        <div>
            {media}
        </div>
    );
}

export default Recommend;
