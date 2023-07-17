import React, { useCallback, useContext, useEffect, useState, useRef } from 'react';
import AuthContext from '../../store/AuthContext';
import CommentContext from '../../store/CommentContext';
import Comment from './Comment';

/**
 * @Comment에서 삭제를 구현할 때 함수를 값으로 주고 받아야하기 때문에, onDelete라는 
 * 함수를 선택적으로 프로퍼티에 넣어준다
 * 또한 댓글을 작성하기 위한 @PostComment 타입도 추가
 */

type Props = { item:string | undefined}

type CommentInfo = {
    commentId: number,
    memberNickname: string,
    commentBody: string,
    createdAt: Date,
    written: boolean,
    onDelete?: (id:string) => void;
}

type PostComment = {
    articleId: string,
    body: string
}

/**
 * @Context에서 값을 가져와서 저장할 state로 @CommentInfo type 객체 리스트인 @comments 설정
 * 이후 @Context와 @useRef와 같은 훅 존재
 */
const CommentList:React.FC<Props> = (props) => {

    const [comments, setComments] = useState<CommentInfo[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const commentRef = useRef<HTMLTextAreaElement>(null);

    const authCtx = useContext(AuthContext);
    const CommentCtx = useContext(CommentContext);

    let isLogin = authCtx.isLoggedIn;
    let isSuccess = CommentCtx.isSuccess;
    const token = authCtx.token;
    const articleId = String(props.item);

    // 댓글을 불러오는 로직, useEffect와 useCallBack 훅을 이용한 함수로 구현한 로직
    const getContext = useCallback(() => {
        setIsLoading(false);
        (isLogin? CommentCtx.getComments(articleId, authCtx.token) : CommentCtx.getComments(articleId));
        console.log("get comment")
        console.log(CommentCtx)
    }, [isLogin]);

    useEffect(() => {
        getContext();
    }, [getContext]);

    useEffect(() => {
        if(isSuccess){
            setComments(CommentCtx.commentList);
            setIsLoading(true)
        }
    }, [isSuccess]);

    // 댓글 생성과 삭제로직
    // 생성은 useRef 훅을 통해 얻어온 본문과, 해당 CommentList에서 받은 Props에 있는 게시물 id값을 추출
    // 삭제는 comment id로 실행하며, 이는 Comment에서 매개변수 값을 받으며 실행된다.
    const createComment = (event:React.FormEvent) => {
        event.preventDefault();
        const comment:PostComment = {
            articleId: articleId,
            body:commentRef.current!.value
        }

        CommentCtx.createComment(comment, token);
    };

    const deleteComment = (commentId:string) => {
        CommentCtx.deleteComment(commentId, articleId, token);
    }

    // 만약 로딩상태가 아니고, comments 상태가 존재하며, 빈값이 아닐 경우(0보다 크면)
    // media라는 데이터는 comments 상태로부터 있는 모든값이, Comment객체에 map을 통해 들어가게 된값이 된다.
    // 만약 댓글이 없다면, media는 div태그 안에 잇는 빈 값이 된다 
    let media = <h3>로딩중...</h3>

    if (isLoading && comments) {
        if(comments!.length > 0) {
            console.log("if start")
            console.log(comments)
            media = <ul>
                {
                    comments.map((comment) => {
                        return <Comment
                        key = {comment.commentId}
                        commentId = {comment.commentId}
                        memberNickname = {comment.memberNickname}
                        commentBody = {comment.commentBody}
                        createdAt = {comment.createdAt.toString()}
                        written = {comment.written}
                        onDelete = {deleteComment}
                        />}
                    )
                }
                </ul>
        } else {
            media = <div></div>
        }
    }

    // 앞의 로직을 기반으로 JSX 부분을 구현한다
    // 댓글 작성 부분에는 로그인이 되었을 때만 구현되게 하고, authContext를 통해 닉네임을 끌어와,
    // label을 통해 닉네임을 나타나게 한다.
    return (
        <div>
            {media}
            {isLogin &&
            <form onSubmit={createComment}>
                <div>

                <label htmlFor="iputName" style={{fontWeight: 'bold'}}>닉네임: {authCtx.userObj.nickname}</label>
                </div>

                <textarea
                name="comment"
                cols={100}
                rows={3}
                ref = {commentRef}/>
                <div>

                <input type="submit"/>
                </div>

                </form>}
        </div>
    );
}

export default CommentList;