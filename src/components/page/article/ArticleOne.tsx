import { useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import ArticleContext from '../../store/ArticleContext';
import AuthContext from '../../store/AuthContext';
import Article from './Article';

type Props = { item:string | undefined }

type ArticleInfo = {
    articleId: number,
    memberNickname: string,
    articleTitle: string,
    articleBody?: string,
    cratedAt: string,
    updatedAt?: string,
    written?: boolean
};

const ArticleOne:React.FC<Props> = (props) => {

    let navigate = useNavigate();

    const [article, setArticle] = useState<ArticleInfo>();
    const [isLoading, setIsLoading ] = useState<boolean>(false);

    const articleCtx = useContext(ArticleContext);
    const authCtx = useContext(AuthContext);
    let isLogin = authCtx.isLoggedIn;
    const id = String(props.item);

    // 게시물을 삭제해주는 함수 삭제되었다면 alert해준다음 자동으로 첫번째 페이지로 이동
    const deleteHandler = (id:string) => {
        articleCtx.deleteArticle(authCtx.token, id);
        alert("삭제되었습니다.");
        navigate("/page/1")
    }

    // 게시물을 불러오는 메소드 
    //로그인 여부에 따라 ArticleContext의 함수에 보내는 매개변수가 다르다
    const getContext = useCallback(() => {
        setIsLoading(false);
        (isLogin ? articleCtx.getArticle(id, authCtx.token) : articleCtx.getArticle(id));
    }, [isLogin])

    useEffect(() => {
        getContext();
    }, [getContext])

    useEffect(() => {
        if (articleCtx.isSuccess) {
        setArticle(articleCtx.article);
        console.log(article);
        console.log(article?.cratedAt);
        setIsLoading(true);
        }
    }, [articleCtx, article]);

    // useEffect 훅에 의해, 로딩 상태면 로딩을 내보내고
    // 성공되었다면 Article 컴포넌트에 값을 집어넣은 콘텐츠를 불러온다
    let content = <p>Loading</p>

    if (isLoading && article) {
        content = <Article item={article} onDelete={deleteHandler} />
    }

    return ( 
        <div>
        {content}
        </div>
        
    );
}

export default ArticleOne;