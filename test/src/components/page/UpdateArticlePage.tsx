import { useParams } from "react-router-dom";
import CreateArticleForm from "./article/CreateArticleForm";
import { ArticleContextProvider } from "../store/ArticleContext";

/**
 * 게시물 수정을 담당하는 컴포넌트
 * @CreateArticleForm의 item값에 따라 파라미터를 넣어서 
 * 안의 함수와 훅이 실행되어 로직이 실행된다.
 */

const UpdateArticlePage = () => {
    let { articleId } = useParams();

    return (
        <ArticleContextProvider>
            <CreateArticleForm item={articleId}/>
        </ArticleContextProvider>
    );
}

export default UpdateArticlePage;
