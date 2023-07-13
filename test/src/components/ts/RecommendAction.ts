import { GET, POST, DELETE} from './Fetch';

const createTokenHeader = (token:string) => {
    return {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
}

// 추천의 숫자와 추천 여부를 조회하는 함수로, 토큰 여부에 따라 다른 메소드로 보낸다
export const getRecommends = (param:string, token?:string) => {
    const URL = '/recommend/list?id=' + param;
    const response = (token? GET(URL, createTokenHeader(token)) : GET(URL,{}));
    return response;
}

// 추천을 생성하는 함수로, article의 아이디를 가지고 token이 포함되어 있다
export const makeRecommend = async (id_str:string, token:string) => {
    const URL = '/recommend/';
    const id = +id_str;
    const response = POST(URL, {id:id}, createTokenHeader(token));
    return response;
}


// 위와 마찬가지로 가지고 있다
export const deleteRecommend = (param:string, token:string) => {
    const URL = '/recommend/one?id=' + param;
    const response = DELETE(URL, createTokenHeader(token));
    return response;
}