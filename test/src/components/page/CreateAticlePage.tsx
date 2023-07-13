import CreateArticleForm from "./article/CreateArticleForm";
import { ArticleContextProvider } from "../store/ArticleContext";

/**
 * 게시물 생성을 담당하는 page 컴포넌트
 * @CreateArticleForm 컴포넌트에 undefined를 넣고 있는데
 */

const CreateArticlePage = () => {
    return(
        <ArticleContextProvider>
            <CreateArticleForm item={undefined}/>
        </ArticleContextProvider>
    )
}

export default CreateArticlePage;