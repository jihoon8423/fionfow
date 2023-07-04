import React, { useRef } from "react";

type Props = {
    commentId: number,
    memberNickname: string,
    commentBody: string,
    createdAt: string,
    written: boolean,
    onDelete: (id:string) => void;
}

/**
 * @useRef 를 통해 삭제하려는 댓글의 id를 알아내도
 * 그 id를 상위 컴포넌트에 보내게 한다.
 */
const Comment:React.FC<Props> = (props) => {
    const deleteRef = useRef<HTMLInputElement>(null);

    const submitDeleteHandler = (event:React.FormEvent) => {
        event.preventDefault();
        const deleteId = deleteRef.current!.value;
        props.onDelete(deleteId);
    };

    // props를 통해 구현하는건 Aritcle과 비슷하지만 여기에는
    // written 정보를 통해, 삭제 버튼을 표시할지 안할지를 구분
    return (
        <li>
            <h4>{props.memberNickname}</h4>
            <p>{props.memberNickname}</p>
            <p>{props.commentBody}</p>
            <p>{props.createdAt}</p>
            <form onSubmit={submitDeleteHandler}>
                <input
                    type="hidden"
                    name="commentId"
                    value={props.commentId}
                    ref={deleteRef}
                />
                {props.written && <button type="submit">삭제</button>}
            </form>
        </li>
    )
}

export default Comment;