import { Fragment } from "react";
import { useParams } from "react-router-dom";
import ArticleList from "./article/ArticleList";
import { ArticleContextProvider } from "../store/ArticleContext";

/**
 * 페이지로 구성된 게시판 리스트
 * 전체를 @ArticleContextProvider 로 감싸서 @ArticleContext 사용가능
 * 또한 @pageId 를 useParams() 훅으로 설정하면서 쿼리 파라미터 설정
 * 즉 /page/ 뒤에 파라미터가 붙게 된다면, 바로 게시판 리스트 컴포넌트인
 * @ArticleList 컴포넌트의 item에 적용을 시커, 알맞은 로직을 실행 
 */


const ArticleListPage = () => {
    let { pageId } = useParams();
    return (
        <ArticleContextProvider>
            <Fragment>
                <ArticleList item= {pageId}/>
            </Fragment>
        </ArticleContextProvider>
    )
}

export default ArticleListPage;