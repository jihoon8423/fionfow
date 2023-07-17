import BootStrapTable from 'react-bootstrap-table-next';
import { Button } from 'react-bootstrap';
import { useCallback, useContext, useEffect, useState } from 'react';
import AuthContext from '../../store/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import ArticleContext from '../../store/ArticleContext';
import Paging from './Paging';


/**
 * @Props 타입은, @page 컴포넌트로부터 값을 전달받기 위해 설정
 * @ArticleInfo 게시물을 정렬하기 위해 쓴다
 */
type Props = {item:string | undefined}

type ArticleInfo = {
    articleId: number,
    memberNickname: string,
    articleTitle: string,
    articleBody?: string,
    createdAt: string,
    updatedAt?: string,
    isWritten?: boolean
};

const ArticleList:React.FC<Props> = (props) => {
    let navigate = useNavigate();

    // 아래가 이전의 코드 useParams로 받는 값이 존재하지 않는 경우 1을 default 값으로 진행
    // const pageId = String(props.item);
    const { item: pageId = "1" } = props;
    
    const columns = [{
        dataField: 'articleId',
        text: '#',
        headerStyle: () => {
            return {width: "8%"};
        }
    }, {
        // events를 추가해서 제목을 클릭하면, useNavigate() 훅을 사용해서 그에 맞는 게시물로 이동
        dataField: 'articleTitle',
        text: '제목',
        headerStyle: () => {
            return{ width: "65%"};
        },
        events: {
            onClick: (e:any, column:any, columnIndex:any, row:any, rowIndex:any) => {
                const articleIdNum:string = row.articleId;
                navigate(`../article/${articleIdNum}`);
            }
        }
    }, {
        dataField: 'memberNickname',
        text: '닉네임'
    }, {
        dataField: 'createdAt',
        text: '작성일'
    }]

    const authCtx = useContext(AuthContext);
    const articleCtx = useContext(ArticleContext)

    const[aList, setAList] = useState<ArticleInfo[]>([]);
    const [maxNum, setMaxNum] = useState<number>(1);

    // useEffect 훅을 통해 사이트가 실행되면 fetchListHandler 함수를 실행한다
    // 그러면 무한루프 방지를 위한, useCallback 훅으로 감싼 fetchListHandler 함수가 실행되며,
    // 이는 ArticleContext를 통해 원하는 페이지의 리스트로 이동
    // 다음 useEffect로 isSuccess가 반환되면 리스트와 페이지 전체숫자 저장
    let isLogin = authCtx.isLoggedIn;

    const fetchListHandler = useCallback(() => {
        articleCtx.getPageList(pageId);
    }, []);

    //fetchListHandler -> pageId
    useEffect(() => {
        fetchListHandler();
    }, [fetchListHandler, pageId]);


    useEffect(() => {
        if (articleCtx.isSuccess) {
            setAList(articleCtx.page);
            console.log(articleCtx);
            setMaxNum(articleCtx.totalPages);
        }
    }, [articleCtx])

    // BootStrapTable의 data를 state alist로하고, 전체적인 형태는 앞서 말한 columns 객체를 싱행하면수 구현
    // 맨 밑의 paging 객체에 현재 페이지 값인 pageId와 전체 페이지 값인 maxNum을 넘기게 된다
    return (
        <div>
            <BootStrapTable keyField='id' data = { aList } columns={ columns } />
            <div>{isLogin &&(
                <Link to="/create">
                    <Button>글 작성</Button>
                </Link>
        )}
            </div>
            <Paging currentPage={Number(pageId)} maxPage={maxNum}/>
        </div>
    );
}
    export default ArticleList;