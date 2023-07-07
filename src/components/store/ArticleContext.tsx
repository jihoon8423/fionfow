import React, { useState, useEffect, useCallback, useRef } from "react";
import * as articleAction from '../ts/ArticleAction';

type Props = { children?: React.ReactNode }

//context와 더불어 다른 컴포넌트에서도 많이 쓰게되는 type
type ArticleInfo = {
    articleId: number,
    memberNickname: string,
    articleTitle: string,
    articleBody?: string,
    createdAt: string,
    updatedAt?: string,
    isWritten?: boolean,
    // playerId: string
};

// 게시물 수정이나 삭제를 위해 받는 interface
interface PostArticle {
id? : string,
title: string,
body: string
} 

//Ctx는 객체를 전역상태로 돌리기위한 인터페이스 
//Ctx안에서 article의 type을 
//ArticleInfo | undefined으로 설정해놨기 때문에 객체 안의 article의 value를 undefined로 삼을 수 있다
interface Ctx {
article?: ArticleInfo | undefined;
page: ArticleInfo[];
isSuccess: boolean;
isGetUpdateSuccess: boolean;
totalPages: number;
getPageList: (pageId: string) => void;
getArticle: (param:string, token?:string) => void;
createArticle: (article:PostArticle, token:string) => void;
getUpdateArticle: (token:string, param:string) => void;
updateArticle: (token:string, article:PostArticle) => void;
deleteArticle: (token:string, param:string) => void;
}

// 위를 articlecontext가 
const ArticleContext = React.createContext<Ctx>({
article: undefined,
page: [],
isSuccess: false,
isGetUpdateSuccess: false,
totalPages: 0,
getPageList: () => {},
getArticle: ()=>{},
createArticle:  ()=>{},
getUpdateArticle: ()=>{},
updateArticle: ()=>{},
deleteArticle: ()=>{}
});

//context의 변화를 알리는 provider를 반환하는 함수
export const ArticleContextProvider:React.FC<Props> = (props) => {

const [article, setArticle] = useState<ArticleInfo>();
const [page, setPage] = useState<ArticleInfo[]>([]);
const [totalPages, setTotalPages] = useState<number>(0);
const [isSuccess, setIsSuccess] = useState<boolean>(false);
const [isGetUpdateSuccess, setIsGetUpdateSuccess] = useState<boolean>(false);


const getPageHandler = async (pageId: string) => {
    setIsSuccess(false);
    const data = await articleAction.getPageList(pageId);
    const page:ArticleInfo[] = data?.data.content
    const pages:number = data?.data.totalPages;
    setPage(page);
    setTotalPages(pages);
    setIsSuccess(true);
}
// 토큰값에 따라 action함수에 넣는 값이 달라진다
// 게시물 한개를 얻는 함수 
const getArticleHandler = (param: string, token?: string) => {
    setIsSuccess(false);
    const data = token ? articleAction.getOneArticle(param, token) : articleAction.getOneArticle(param);
    data.then((result) => {
    if (result !== null) {
        const article: ArticleInfo = result.data;
        setArticle(article);
    }
      setIsSuccess(true); // Move this line inside the .then() block
    });
};


// 게시물 생성 함수 토큰값과 postArticle 타입의 객체를 매개변수로 받는다
const createArticleHandler = (article:PostArticle, token:string) => {
    setIsSuccess(false);
    const data = articleAction.makeArticle(token, article);
    data.then((result) => {
    if (result !== null) {
        console.log(isSuccess);
    }
    })
    setIsSuccess(true);
}

// 수정할때 이전의 게시글을 가져오는 함수, 이전 게시판의 id와 토큰을 매개변수로 받는다 
// 수정은 생생과 동을한 컴포넌트를 사용하기 때문에 그와 동일한 isGetUpdateSuccess를 사용
const getUpdateArticleHandler = async (token:string, param:string) => {
    setIsGetUpdateSuccess(false);
    const updateData = await articleAction.getChangeArticle(token, param);
    const article:ArticleInfo = updateData?.data;
    setArticle(article);
    setIsGetUpdateSuccess(true);
}

// 수정한 게시물을 서버에 등록하는 함수, 생성과 마찬가지로 PostArticle타입의 객체를 매개변수로 갖는다
const updateArticleHandler = (token:string, article:PostArticle) => {
    setIsSuccess(false);
    console.log('update api start')
    const data = articleAction.changeArticle(token, article);
    data.then((result) => {
    if (result !== null) {
        
    }
    })
    setIsSuccess(true);
}

const deleteArticleHandler = (token:string, param:string) => {
    setIsSuccess(false);
    const data = articleAction.deleteArticle(token, param);
    data.then((result) => {
    if (result !== null) {
        
    }
    })
    setIsSuccess(true);

}

//전역 상태는 article은 앞에서 만든 articleInfo의 형태로
const contextValue:Ctx = {
    article,
    page,
    isSuccess,
    isGetUpdateSuccess,
    totalPages,
    getPageList: getPageHandler,
    getArticle: getArticleHandler,
    createArticle: createArticleHandler,
    getUpdateArticle: getUpdateArticleHandler,
    updateArticle: updateArticleHandler,
    deleteArticle: deleteArticleHandler,
}

return (
<ArticleContext.Provider value={contextValue}>
    {props.children}
</ArticleContext.Provider>)
}

export default ArticleContext;