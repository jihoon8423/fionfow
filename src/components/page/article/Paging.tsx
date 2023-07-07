import React from "react";
import { Pagination } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';


/**
 * @Props로 받는 두 데이터 type로 지정해주고 이를 통해 함수형 컴포넌트를 구형한다
 * 이후 페이지 이동을 위해 @useNavigate ()훅을 불러오고, @props에서 현재 페이지와 최대 페이지 값을 불러온다.
 */
type Props = { currentPage:number, maxPage:number }

const Paging:React.FC<Props> = (props) => {
    let navigate = useNavigate();

    const maxNum = props.maxPage;
    const currentNum = props.currentPage;

    // 해당하는 숫자와 event를 매개변수로 넣으면, 그에 맞게 이동해주는 로직
    // 리팩토링을 통해 함수를 분리
    // 만약 현재 페이지를 클릭한다면, 이동할 수 없게 if값으로 설정 해준다.
    const navigateToPage = (page:number) => (event:React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        console.log(page);
        if (props.currentPage !== page) {
        const pageNumb = String(page);
        navigate(`../page/${pageNumb}`);
        }
    };
    /**
     * @Props의 주어진 값을 토대로 if를 통해, @Pagination을 만드는 함수
     * Pagination 컴포넌트를 넣은 JSX.Eliment 리스트를 만들고, 이후 @maxNum과 
     * @CurrentNum에 따라 Pagination 구조를 정한 다음, 리스트에 넣어 return하는 것
     * 그리고 안에 있는 if 로직들은 그림으로 만들면 이러한 형식으로 요약 가능
     * 
     */
    const definePage = () => {
        let pageProp: JSX.Element[] =[]
        if(maxNum < 6) {
            for (let num = 1; num <= maxNum; num ++) {
                pageProp.push(
                    <Pagination.Item key={num} active={num === currentNum} onClick={navigateToPage(num)}>
                        {num}
                    </Pagination.Item>
                )
            }
            return pageProp;
        }

        if (currentNum < 5) {
            for(let num = 1; num <= 4; num++) {
                pageProp.push(
                    <Pagination.Item key ={num} active={num === currentNum} onClick={navigateToPage(num)}>
                        {num}
                    </Pagination.Item>
                )
            }

            pageProp.push(<Pagination.Ellipsis/>);
            pageProp.push(<Pagination.Item>{maxNum}</Pagination.Item>);
            pageProp.push(<Pagination.Next/>)
            return pageProp;
        }

        if (maxNum - currentNum < 4) {
            pageProp.push(<Pagination.First/>)
            pageProp.push(<Pagination.Item>{1}</Pagination.Item>);
            pageProp.push(<Pagination.Ellipsis/>);
            for (let num = maxNum-3; num <= maxNum; num ++) {
                pageProp.push(
                    <Pagination.Item key={num} active={num === currentNum} onClick={navigateToPage(num)}>
                        {num}
                    </Pagination.Item>
                )
            }
            return pageProp;
        }

        pageProp.push(<Pagination.First/>)
        pageProp.push(<Pagination.Item>{1}</Pagination.Item>);
        pageProp.push(<Pagination.Ellipsis/>);
        for (let num = currentNum - 2; num <= currentNum + 2; num++){
            pageProp.push(
            <Pagination.Item key={num} active={num === currentNum} onClick={navigateToPage(num)}>
                {num}
            </Pagination.Item>
            )
        }
        return pageProp;
    }

    // 이에 해당하는 함수를 Pagination 컴포넌트에 넣는걸로 마무리
    return (
        <Pagination>
            {definePage()}
        </Pagination>
    );
}

export default Paging;

