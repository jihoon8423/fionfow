import data from '../../data/data.json';
import { useSelector } from 'react-redux';
import "./PlayerPage.css"

const OveralAbility = ({selectedLevel}) => {
   const selectedPlayer = useSelector((state) => state.selectedPlayer) || {};
   const selectedPlayerId = selectedPlayer.id;
   const playerData = data.find(player => player.id === selectedPlayerId);


   console.log(selectedLevel);
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
           return 'slight-light-gray';
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

   return (
       <div className='overal-container'>
       <ul className='overal-ability'>
           {playerData.position === 'GK' ? (
           <>
               <li className='aberage'>
               <div className='txt'>
                   다이빙
               </div>
               <div className={`ovr-data-value-${getValueColorClass(playerData.o_pac + abilityIncrease)}`}>
                   {playerData.o_pac + abilityIncrease}
               </div>
               </li>
               <li className='aberage'>
               <div className='txt'>
                   핸들링
               </div>
               <div className={`ovr-data-value-${getValueColorClass(playerData.o_sho + abilityIncrease)}`}>
                   {playerData.o_sho + abilityIncrease}
               </div>
               </li>
               <li className='aberage'>
               <div className='txt'>
                   킥
               </div>
               <div className={`ovr-data-value-${getValueColorClass(playerData.o_pas + abilityIncrease)}`}>
                   {playerData.o_pas + abilityIncrease}
               </div>
               </li>
               <li className='aberage'>
               <div className='txt'>
                   반응속도
               </div>
               <div className={`ovr-data-value-${getValueColorClass(playerData.o_dri + abilityIncrease)}`}>
                   {playerData.o_dri + abilityIncrease}
               </div>
               </li>
               <li className='aberage'>
               <div className='txt'>
                   스피드
               </div>
               <div className={`ovr-data-value-${getValueColorClass(playerData.o_def + abilityIncrease)}`}>
                   {playerData.o_def + abilityIncrease}
               </div>
               </li>
               <li className='aberage'>
               <div className='txt'>
                   위치선정
               </div>
               <div className={`ovr-data-value-${getValueColorClass(playerData.o_phy + abilityIncrease)}`}>
                   {playerData.o_phy + abilityIncrease}
               </div>
               </li>      
           </>
           ) : (
           <>
           <li className='aberage'>
               <div className='txt'>
                   스피드
               </div>
               <div className={`ovr-data-value-${getValueColorClass(playerData.o_pac + abilityIncrease)}`}>
                   {playerData.o_pac + abilityIncrease}
               </div>
               </li>
               <li className='aberage'>
               <div className='txt'>
                   슛
               </div>
               <div className={`ovr-data-value-${getValueColorClass(playerData.o_sho + abilityIncrease)}`}>
                   {playerData.o_sho + abilityIncrease}
               </div>
               </li>
               <li className='aberage'>
               <div className='txt'>
                   패스
               </div>
               <div className={`ovr-data-value-${getValueColorClass(playerData.o_pas + abilityIncrease)}`}>
                   {playerData.o_pas + abilityIncrease}
               </div>
               </li>
               <li className='aberage'>
               <div className='txt'>
                   드리블
               </div>
               <div className={`ovr-data-value-${getValueColorClass(playerData.o_dri + abilityIncrease)}`}>
                   {playerData.o_dri + abilityIncrease}
               </div>
               </li>
               <li className='aberage'>
               <div className='txt'>
                   수비
               </div>
               <div className={`ovr-data-value-${getValueColorClass(playerData.o_def + abilityIncrease)}`}>
                   {playerData.o_def + abilityIncrease} 
               </div>
               </li>
               <li className='aberage'>
               <div className='txt'>
                   피지컬
               </div>
               <div className={`ovr-data-value-${getValueColorClass(playerData.o_phy + abilityIncrease)}`}>
                   {playerData.o_phy + abilityIncrease}
               </div>
               </li>
              
           </>
           )}
       </ul>
       </div>
   )}


   export default OveralAbility;