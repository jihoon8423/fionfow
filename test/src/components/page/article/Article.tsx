import { useNavigate } from "react-router-dom";

type Props = { item:ArticleInfo, onDelete: (id:string) => void}

type ArticleInfo = {
    articleId: number,
    memberNickname: string,
    articleTitle: string,
    articleBody?: string,
    createdAt: string,
    updatedAt?: string,
    written?: boolean
};

/**
 * @useNavigate 훅을 사용하먀, id는 props에서 가져온걸 뽑아낸다
 * @backHandler와 @updatehandler는 둘다 userNavigate를 통해 각각 페이지와 수정페이지로 이동
 */
const Article:React.FC<Props> = (props) => {
    let navigate = useNavigate();

    

    const id = props.item!.articleId.toString();

    const backHandler = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate("/page/1");
    }

    const updateHandler = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate("../update/" + id);
    }

    const deleteHandler = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (window.confirm("삭제하시겠습니까?")){
            props.onDelete(id);
        }
    }

    return(
        <div>
            <header>
                <h4>{props.item!.articleTitle}</h4>
                <div>
                    <span>이름: {props.item!.memberNickname}</span><br />
                    <span>날짜: {props.item!.updatedAt}</span>
                </div>
            </header>
            <div>
                <div>{props.item!.articleBody}</div>
            </div>
            <button onClick={backHandler}>뒤로</button>
            {props.item!.written &&
            <div>
                <button onClick={updateHandler}>수정</button><br />
                <button onClick={deleteHandler}>삭제</button>
            </div>
            }
        </div>
    );
}

export default Article;