import { useNavigate } from "react-router-dom";

type Props = { item:ArticleInfo, onDelete: (id:string) => void}

type ArticleInfo = {
    articleId: number,
    memberNickname: string,
    articleTitle: string,
    articleBody?: string,
    createdAt: string,
    updatedAt?: string,
    written?: boolean,
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

    return (
        <div>
            <header>
                <h4 style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>Title: {props.item!.articleTitle}</h4>
                <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
                    <span style={{ marginRight: '10px' }}>Name: {props.item!.memberNickname}</span><br />
                    <span>Date: {props.item!.updatedAt}</span>
                </div>
            </header>
            <div style={{ marginTop: '30px', border: '1px solid #ccc', padding: '100px' }}>
                <div>{props.item!.articleBody}</div>
            </div>
            <div style={{ display: 'flex', marginTop: '2%' }}>
                <button onClick={backHandler}>이전</button>
                {props.item!.written && (
                    <div style={{ display: 'flex', marginLeft: '2px' }}>
                        <button onClick={updateHandler}>수정</button>
                        <button onClick={deleteHandler}>삭제</button>
                    </div>
                )}
            </div>
        </div>
    );
    
}

export default Article;