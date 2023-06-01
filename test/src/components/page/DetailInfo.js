import data from '../../data/data.json';
import { useSelector } from 'react-redux';
import "./PlayerPage.css"

const DetailInfo = ({selectedLevel}) =>{
    const selectedPlayer = useSelector((state) => state.selectedPlayer) || {};
    const selectedPlayerId = selectedPlayer.id;
    const playerData = data.find(player => player.id === selectedPlayerId);
    
    const plusAbility = () => {
        const level = parseInt(selectedLevel);
        if (level === 2) {
            return 1;
        } else if (level === 3) {
            return 2;
        } else if (level === 4) {
            return 4;
        } else if (level === 5) {
            return 6;
        } else if (level === 6) {
            return 8;
        } else if (level === 7) {
            return 11;
        } else if (level === 8) {
            return 15;
        } else if (level === 9) {
            return 19;
        } else if (level === 10) {
            return 24;
        } else {
            return 0;
        }
        };

        const abilityIncrease = plusAbility();

const getValueColorClass = (value) => {
    if (value < 60) {
    return 'light-gray';
    } else if (value >= 60 && value < 70) {
    return 'light-light-gray';
    } else if (value >= 70 && value < 80) {
    return 'dark-gray';
    } else if (value >= 80 && value < 90) {
    return 'sky-blue';
    } else if (value >= 90 && value < 100) {
    return 'blue';
    } else if (value >= 100 && value < 110) {
    return 'purple';
    } else if (value >= 110 && value < 120) {
    return 'light-purple';
    } else if (value >= 120 && value < 130) {
    return 'light-light-purple';
    } else if (value >= 130 && value < 140) {
    return 'red';
    } else if (value >= 140 && value < 150) {
    return 'mustard';
    } else if (value >= 150) {
    return 'golden';
    }
    return '';
};

    return(
        <div>
        <ul className='page-data-wrap'>
                    <li className='page-data'>
                        <div className='data-text'>
                        속력
                        </div>
                        <div className={`data-value-${getValueColorClass(playerData.sprint+abilityIncrease)}`}>
                        {playerData.sprint +abilityIncrease}
                        </div>
                    </li>
                    <li className='page-data'>
                        <div className='data-text'>
                        가속력
                        </div>
                        <div className={`data-value-${getValueColorClass(playerData.accel+abilityIncrease)}`}>
                        {playerData.accel + abilityIncrease}
                        </div>
                    </li>
                    <li className='page-data'>
                        <div className='data-text'>
                        골 결정력
                        </div>
                        <div className={`data-value-${getValueColorClass(playerData.finish+abilityIncrease)}`}>
                        {playerData.finish + abilityIncrease}
                        </div>
                    </li>
                    <li className='page-data'>
                        <div className='data-text'>
                        슛 파워
                        </div>
                        <div className={`data-value-${getValueColorClass(playerData.shotpower+abilityIncrease)}`}>
                        {playerData.shotpower + abilityIncrease}
                        </div>
                    </li>
                    <li className='page-data'>
                        <div className='data-text'>
                        중거리 슛
                        </div>
                        <div className={`data-value-${getValueColorClass(playerData.longshot+abilityIncrease)}`}>
                        {playerData.longshot + abilityIncrease}
                        </div>
                    </li>
                    <li className='page-data'>
                        <div className='data-text'>
                        위치선정
                        </div>
                        <div className={`data-value-${getValueColorClass(playerData.positioning+abilityIncrease)}`}>
                        {playerData.positioning + abilityIncrease}
                        </div>
                    </li>
                    <li className='page-data'>
                        <div className='data-text'>
                        발리슛
                        </div>
                        <div className={`data-value-${getValueColorClass(playerData.volley+abilityIncrease)}`}>
                        {playerData.volley + abilityIncrease}
                        </div>
                    </li>
                    </ul>
                    <ul className='page-data-wrap'>
                    <li className='page-data'>
                        <div className='data-text'>
                        패널티 킥
                        </div>
                        <div className={`data-value-${getValueColorClass(playerData.penalty+abilityIncrease)}`}>
                        {playerData.penalty + abilityIncrease}
                        </div>
                    </li>
                    <li className='page-data'>
                        <div className='data-text'>
                        짧은 패스
                        </div>
                        <div className={`data-value-${getValueColorClass(playerData.shortpass+abilityIncrease)}`}>
                        {playerData.shortpass + abilityIncrease}
                        </div>
                    </li>
                    <li className='page-data'>
                        <div className='data-text'>
                        시야
                        </div>
                        <div className={`data-value-${getValueColorClass(playerData.vision+abilityIncrease)}`}>
                        {playerData.vision + abilityIncrease}
                        </div>
                    </li>
                    <li className='page-data'>
                        <div className='data-text'>
                        크로스
                        </div>
                        <div className={`data-value-${getValueColorClass(playerData.cross+abilityIncrease)}`}>
                        {playerData.cross + abilityIncrease}
                        </div>
                    </li>
                    <li className='page-data'>
                        <div className='data-text'>
                        긴 패스
                        </div>
                        <div className={`data-value-${getValueColorClass(playerData.longpass+abilityIncrease)}`}>
                        {playerData.longpass + abilityIncrease}
                        </div>
                    </li>
                    <li className='page-data'>
                        <div className='data-text'>
                        프리킥
                        </div>
                        <div className={`data-value-${getValueColorClass(playerData.freekick+abilityIncrease)}`}>
                        {playerData.freekick + abilityIncrease}
                        </div>
                    </li>
                    <li className='page-data'>
                        <div className='data-text'>
                        커브
                        </div>
                        <div className={`data-value-${getValueColorClass(playerData.curve+abilityIncrease)}`}>
                        {playerData.curve + abilityIncrease}
                        </div>
                    </li>
                    </ul>
                    <ul className='page-data-wrap'>
                    <li className='page-data'>
                        <div className='data-text'>
                        드리블
                        </div>
                        <div className={`data-value-${getValueColorClass(playerData.dribble+abilityIncrease)}`}>
                        {playerData.dribble + abilityIncrease}
                        </div>
                    </li>
                    <li className='page-data'>
                        <div className='data-text'>
                        볼 컨트롤
                        </div>
                        <div className={`data-value-${getValueColorClass(playerData.control+abilityIncrease)}`}>
                        {playerData.control + abilityIncrease}
                        </div>
                    </li>
                    <li className='page-data'>
                        <div className='data-text'>
                        민첩성
                        </div>
                        <div className={`data-value-${getValueColorClass(playerData.agility+abilityIncrease)}`}>
                        {playerData.agility + abilityIncrease}
                        </div>
                    </li>
                    <li className='page-data'>
                        <div className='data-text'>
                        밸런스
                        </div>
                        <div className={`data-value-${getValueColorClass(playerData.balance+abilityIncrease)}`}>
                        {playerData.balance + abilityIncrease}
                        </div>
                    </li>
                    <li className='page-data'>
                        <div className='data-text'>
                        반응속도
                        </div>
                        <div className={`data-value-${getValueColorClass(playerData.reaction+abilityIncrease)}`}>
                        {playerData.reaction + abilityIncrease}
                        </div>
                    </li>
                    <li className='page-data'>
                        <div className='data-text'>
                        대인 수비
                        </div>
                        <div className={`data-value-${getValueColorClass(playerData.marking+abilityIncrease)}`}>
                        {playerData.marking + abilityIncrease}
                        </div>
                    </li>
                    <li className='page-data'>
                        <div className='data-text'>
                        태클
                        </div>
                        <div className={`data-value-${getValueColorClass(playerData.tackle+abilityIncrease)}`}>
                        {playerData.tackle + abilityIncrease}
                        </div>
                    </li>
                    </ul>
                    <ul className='page-data-wrap'>
                    <li className='page-data'>
                        <div className='data-text'>
                        가로채기
                        </div>
                        <div className={`data-value-${getValueColorClass(playerData.intercept+abilityIncrease)}`}>
                        {playerData.intercept + abilityIncrease}
                        </div>
                    </li>
                    <li className='page-data'>
                        <div className='data-text'>
                        헤더
                        </div>
                        <div className={`data-value-${getValueColorClass(playerData.header+abilityIncrease)}`}>
                        {playerData.header + abilityIncrease}
                        </div>
                    </li>
                    <li className='page-data'>
                        <div className='data-text'>
                        슬라이딩 태클
                        </div>
                        <div className={`data-value-${getValueColorClass(playerData.sliding+abilityIncrease)}`}>
                        {playerData.sliding + abilityIncrease}
                        </div>
                    </li>
                    <li className='page-data'>
                        <div className='data-text'>
                        몸싸움
                        </div>
                        <div className={`data-value-${getValueColorClass(playerData.strength+abilityIncrease)}`}>
                        {playerData.strength + abilityIncrease}
                        </div>
                    </li>
                    <li className='page-data'>
                        <div className='data-text'>
                        스태미너
                        </div>
                        <div className={`data-value-${getValueColorClass(playerData.stamina+abilityIncrease)}`}>
                        {playerData.stamina + abilityIncrease}
                        </div>
                    </li>
                    <li className='page-data'>
                        <div className='data-text'>
                        적극성
                        </div>
                        <div className={`data-value-${getValueColorClass(playerData.aggression+abilityIncrease)}`}>
                        {playerData.aggression + abilityIncrease}
                        </div>
                    </li>
                    <li className='page-data'>
                        <div className='data-text'>
                        점프
                        </div>
                        <div className={`data-value-${getValueColorClass(playerData.jump+abilityIncrease)}`}>
                        {playerData.jump + abilityIncrease}
                        </div>
                    </li>
                    </ul>
                    <ul className='page-data-wrap'>
                    <li className='page-data'>
                        <div className='data-text'>
                        침착성
                        </div>
                        <div className={`data-value-${getValueColorClass(playerData.composure+abilityIncrease)}`}>
                        {playerData.composure + abilityIncrease}
                        </div>
                    </li>
                    <li className='page-data'>
                        <div className='data-text'>
                        GK 다이빙
                        </div>
                        <div className={`data-value-${getValueColorClass(playerData.gk_diving+abilityIncrease)}`}>
                        {playerData.gk_diving + abilityIncrease}
                        </div>
                    </li>
                    <li className='page-data'>
                        <div className='data-text'>
                        GK 핸들링
                        </div>
                        <div className={`data-value-${getValueColorClass(playerData.gk_handle+abilityIncrease)}`}>
                        {playerData.gk_handle + abilityIncrease}
                        </div>
                    </li>
                    <li className='page-data'>
                        <div className='data-text'>
                        GK 킥
                        </div>
                        <div className={`data-value-${getValueColorClass(playerData.gk_kick+abilityIncrease)}`}>
                        {playerData.gk_kick + abilityIncrease}
                        </div>
                    </li>
                    <li className='page-data'>
                        <div className='data-text'>
                        GK 반응속도
                        </div>
                        <div className={`data-value-${getValueColorClass(playerData.gk_reflex+abilityIncrease)}`}>
                        {playerData.gk_reflex + abilityIncrease}
                        </div>
                    </li>
                    <li className='page-data'>
                        <div className='data-text'>
                        GK 위치선정
                        </div>
                        <div className={`data-value-${getValueColorClass(playerData.gk_positioning+abilityIncrease)}`}>
                        {playerData.gk_positioning + abilityIncrease}
                        </div>
                    </li>
                    </ul>
                    </div>
        )}
        export default DetailInfo;