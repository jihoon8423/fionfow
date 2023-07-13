import {GET, POST, PUT, DELETE} from "./Fetch";

interface PostArticle{
    id? : string,
    title: string,
    body: string
}

const createTokenHeader = (token:string) => {
    return {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
}

export const getPageList = (param:string) => {
    const URL = '/article/page?page=' + param;
    const response = GET(URL, {});
    return response;
}

// 수정/삭제와 같은 버튼이 표기되어야 하는 여부가 정해져야 하기 때문에
// 토큰을 넣을 수 있는 함수

export const getOneArticle = (param:string, token?:string) => {
    const URL = '/article/one?id=' + param;
    if(!token) {
        const response = GET(URL, {});
        return response
    } else {
        const response = GET(URL, createTokenHeader(token));
        return response;
    }
};

// article 매개변수는 PostArticle이라는 인터페이스 타입으로 
// token이 필요하다
export const makeArticle = (token:string, article:PostArticle) => {
    const URL = '/article/';
    const response = POST(URL, article, createTokenHeader(token));
    return response;
};

export const getChangeArticle = (token:string, param:string) => {
    const URL = '/article/change?id=' + param;
    const response = GET(URL, createTokenHeader(token));
    return response;
};

export const changeArticle = (token:string, article:PostArticle) => {
    const URL = '/article/';
    const response = PUT(URL, article, createTokenHeader(token));
    return response
}

export const deleteArticle = (token:string, param:string) => {
    const URL = '/article/one?id=' + param;
    const response = DELETE(URL, createTokenHeader(token));
    return response;
}