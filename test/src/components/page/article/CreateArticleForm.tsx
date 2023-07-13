import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ArticleContext from "../../store/ArticleContext";
import AuthContext from "../../store/AuthContext";

// 인터페이스에서는 id가 선택적 프로퍼티로 되어있어서 의무적으로 객체에 들어가지 않아도 된다
type Props = { item:string | undefined }

interface PostArticle {
    id?: string
    title: string,
    body: string
} 

// state로는 제목과 본문으로 이루어진 PostArticle 타입을 사용하고, 그에 맞는 값을 가져외 위해 
// useRef 훅을 사용한다. 만약 게시물이 수정이 아니라 생성일 경우 빈 값을 넣는다.
// 제목은 HTMLInputElement으로 되어있지만, 본문은 HTMLTextAreaElement 타입으로 되어있다
const CreateArticleForm:React.FC<Props> = (props) => {

let navigate = useNavigate();


const [updateArticle, setUpdateArticle] = useState<PostArticle>({
    title: '',
    body: ''
});

const articleCtx = useContext(ArticleContext);
const authCtx = useContext(AuthContext);

const titleRef = useRef<HTMLInputElement>(null);
const mainRef = useRef<HTMLTextAreaElement>(null);

// 생성/수정한 게시물을 등록하는 로직
// useRef 훅을 통해 가져온 데이터를 PostArticle 타입 객체에 넣는다
const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    let postArticle:PostArticle = {
        title: titleRef.current!.value,
        body: mainRef.current!.value
    }

    // 만약 수정인 경우 즉 props에 데이터가 있으면 id를 추가해야 하기 때문에 props에서 id를 가져온다
    if (props.item) {
        console.log('update!');
        postArticle = { ...postArticle, id:props.item }
    }

    // 이루 props에 데이터 여부에따라 수정인가 생성인가를 정해서 데이터를 보낸다
    props.item 
    ? articleCtx.updateArticle(authCtx.token, postArticle) : articleCtx.createArticle(postArticle, authCtx.token);
}

// 게시물 수정일 경우, 게시물에 관한 데이터를 불러오는 기능
const setUpdateArticleHandler = useCallback(() => {
    if (articleCtx.isGetUpdateSuccess) {
        setUpdateArticle({
            title: articleCtx.article!.articleTitle,
            body: articleCtx.article!.articleBody
        })
    }
}, [articleCtx.isGetUpdateSuccess])

// 마찬가지로 props.item으로 판단 
useEffect(() => {
    if (props.item) {
        articleCtx.getUpdateArticle(authCtx.token, props.item);
    }
}, [props.item])

//이후의 과정은 useEffect 훅과 useCallBakc 훅을 쓴 함수를 이용
useEffect(() => {
    console.log('update effect')
    setUpdateArticleHandler();
}, [setUpdateArticleHandler])


useEffect(() => {
    if (articleCtx.isSuccess) {
        console.log("wrting success");
        navigate("/page/1", { replace: true })
    }
}, [articleCtx.isSuccess])


/**
 * 수정의 경우하면, state에 데이터가 존재하며, 생성의 경우 빈값을 넣게 된다.
 * @ref를 통해 useRef 훅과 연결
 */
return (
    <div>
        <Form onSubmit={submitHandler}>
            <Form.Group>
            <Form.Label>제목</Form.Label>
            <Form.Control 
                type="text" 
                placeholder="제목을 입력하세요"
                required
                ref={titleRef}
                defaultValue={updateArticle.title}
            />
            </Form.Group>
            <br />
            <Form.Group>
            <Form.Label>본문</Form.Label>
            <Form.Control 
                as="textarea" 
                rows={20}
                required
                ref={mainRef}
                defaultValue={updateArticle.body} 
            /> 
            </Form.Group>
            <br />
            <Button variant="primary">
            취소
            </Button>
            <Button variant="primary" type="submit">
            작성
            </Button>
        </Form>
    </div>
    );
}

export default CreateArticleForm;