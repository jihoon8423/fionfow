import React, { useState } from 'react';
import data from '../../data/data.json';
import './Tradepage.css';


function Tradepage(){
  const [nickname, setNickname] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tradeRecords, setTradeRecords] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    fetch(`https://api.nexon.co.kr/fifaonline4/v1.0/users?nickname=${nickname}`, {
      headers: {
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJYLUFwcC1SYXRlLUxpbWl0IjoiNTAwOjEwIiwiYWNjb3VudF9pZCI6Ijk1NjQ2MDcxNSIsImF1dGhfaWQiOiIyIiwiZXhwIjoxNzAyMTAwODkzLCJpYXQiOjE2ODY1NDg4OTMsIm5iZiI6MTY4NjU0ODg5Mywic2VydmljZV9pZCI6IjQzMDAxMTQ4MSIsInRva2VuX3R5cGUiOiJBY2Nlc3NUb2tlbiJ9.fl2KCjFNhs5WmpYY-a4pgrJl5J43i5F8KvhGugyFoAo'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data); // 확인용
        if (data != null) {
          setUserId(data.accessId);
          fetchTradeRecords(data.accessId, selectedType);
        } else {
          setUserId('User not found');
          fetchTradeRecords(null, selectedType); // 검색 결과가 없을 경우 userId를 null로 전달하여 모든 결과를 검색합니다.
        }
      })
      .catch(error => {
        console.error('API 요청 에러:', error);
      });
  };

  const fetchTradeRecords = (userId, type) => {
    let requests = [];

    if (type === 'buy' || type === '') {
      requests.push(
        fetch(`https://api.nexon.co.kr/fifaonline4/v1.0/users/${userId}/markets?tradetype=buy&offset=0&limit=50`, {
          headers: {
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJYLUFwcC1SYXRlLUxpbWl0IjoiNTAwOjEwIiwiYWNjb3VudF9pZCI6Ijk1NjQ2MDcxNSIsImF1dGhfaWQiOiIyIiwiZXhwIjoxNzAyMTAwODkzLCJpYXQiOjE2ODY1NDg4OTMsIm5iZiI6MTY4NjU0ODg5Mywic2VydmljZV9pZCI6IjQzMDAxMTQ4MSIsInRva2VuX3R5cGUiOiJBY2Nlc3NUb2tlbiJ9.fl2KCjFNhs5WmpYY-a4pgrJl5J43i5F8KvhGugyFoAo'
          }
        })
      );
    }

    if (type === 'sell' || type === '') {
      requests.push(
        fetch(`https://api.nexon.co.kr/fifaonline4/v1.0/users/${userId}/markets?tradetype=sell&offset=0&limit=50`, {
          headers: {
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJYLUFwcC1SYXRlLUxpbWl0IjoiNTAwOjEwIiwiYWNjb3VudF9pZCI6Ijk1NjQ2MDcxNSIsImF1dGhfaWQiOiIyIiwiZXhwIjoxNzAyMTAwODkzLCJpYXQiOjE2ODY1NDg4OTMsIm5iZiI6MTY4NjU0ODg5Mywic2VydmljZV9pZCI6IjQzMDAxMTQ4MSIsInRva2VuX3R5cGUiOiJBY2Nlc3NUb2tlbiJ9.fl2KCjFNhs5WmpYY-a4pgrJl5J43i5F8KvhGugyFoAo'
          }
        })
      );
    }

    Promise.all(requests)
      .then(responses => Promise.all(responses.map(response => response.json())))
      .then(data => {
        console.log(data); // 확인용

        let mergedRecords = [];

        data.forEach(records => {
          mergedRecords = mergedRecords.concat(records);
        });

        const sortedRecords = mergedRecords.sort((a, b) => new Date(b.tradeDate) - new Date(a.tradeDate));
        setTradeRecords(sortedRecords);
      })
      .catch(error => {
        console.error('API 요청 에러:', error);
      });
  };

  const handleTradeTypeChange = (type) => {
    if (selectedType === type) {
      setSelectedType(''); // 이미 선택된 버튼을 다시 클릭하면 선택이 해제됩니다.
    } else {
      setSelectedType(type);
    }
  };
  


    const getPlayergrade = (val) => {
      if (val <= 1){
        return 'black';
      } else if (val <= 4){
        return 'bronze';
      } else if (val <= 7){
        return 'silver';
      } else {
        return 'gold';
      }
    };
  
    return (
      <div className='trade-page-container'>
        <div className='trade-s-container'>
         <div className='header'>유저 조회</div>
           <div className='trade-tabs'>거래 내역</div>
           <div className='trade-search'>
             <form onSubmit={handleSearch}>
             <input className='nickname-bar' value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="닉네임 입력" />
               <button type='submit'>검색</button>
             </form>
               <div className='trade-type'>
                 <button
                   onClick={() => handleTradeTypeChange('buy')}
                   className={selectedType === 'buy' ? 'selected' : ''}
                 >
                   Buy
                 </button>
                 <button
                   onClick={() => handleTradeTypeChange('sell')}
                   className={selectedType === 'sell' ? 'selected' : ''}
                 >
                   Sell
                 </button>
               </div>
           </div>
        </div>

        <div className='trade-r-container'>
         <div className='trade-result-header'>거래 기록</div>
          <div className='trade-result'>
            {tradeRecords.map(record => {
              const tradeDate = new Date(record.tradeDate);
              const formattedDate = `${tradeDate.getFullYear()}-${String(tradeDate.getMonth() + 1).padStart(2, '0')}-${String(tradeDate.getDate()).padStart(2, '0')} ${String(tradeDate.getHours()).padStart(2, '0')}:${String(tradeDate.getMinutes()).padStart(2, '0')}`;

              const player = data.find(item => item.id === record.spid);
              const playerName = player ? player.name : 'Unknown';

              const priceData = data.find(item => item.id === record.spid && item.price !== undefined);
              const price = priceData ? priceData.price : 'Unknown';

              const playerClass = player ? player.smallclass : 'Unknown';

              return (
                <tr key={record.saleSn} className='trade-box'>
                  <div className='trade-date'>{formattedDate}</div>
                  {/*<td className='trade-localnm'>{record.saleSn}</td>*/}
                  {/*<td className='trade-playerid'>{record.spid}</td>*/}
                  <img className='trade-playerclass' src={playerClass}></img>
                  <div className='trade-playername'>{playerName}</div>
                  <div className={`trade-grade-${getPlayergrade(record.grade)}`}>{record.grade}</div>
                  <div className='trade-price'>{record.value.toLocaleString()}</div>
                  <div className='trade-marketprice'>{price}</div>
                </tr>
              );
            })}
          </div>
        </div>
      </div>
    );
}

export default Tradepage;