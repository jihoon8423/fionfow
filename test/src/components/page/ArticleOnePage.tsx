import { Fragment } from "react";
import { useParams } from "react-router-dom";
import ArticleOne from "./article/ArticleOne";
import Comment from "./article/CommentList";
import Recommend from "./article/Recommend";
import { ArticleContextProvider } from "../store/ArticleContext";
import { CommentContextProvider } from "../store/CommentContext";
import { RecommendContextProvider } from "../store/RecommendContext";

/**
 * @ArticleListPage와 비슷한 구성으로 존재 
 * 그러나 게시판 하나에는 단순히 게시판뿐만 아니라 추천과 댓글 기능이 들어가야 하므로
 * 그에 해당되는 컴포넌트들을 적용
 */


const ArticleOnePage = () => {
    let { articleId } = useParams();
    return(
        <Fragment>
            <ArticleContextProvider>
                <ArticleOne item = {articleId}/>
            </ArticleContextProvider>
            <RecommendContextProvider>
                <Recommend item = {articleId}/>
            </RecommendContextProvider>
            <CommentContextProvider>
                <Comment item= {articleId}/>
            </CommentContextProvider>
        </Fragment>
    )
}

export default ArticleOnePage;