import ad1 from "../images/ad1.gif";
import ad2 from "../images/ad2.gif";
import "./Footer.css";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="foot-container">
           <div className="company">
              <div>
               <a>***광고 문의 및 기타 문의는 이메일주세요***</a>
              </div>
            <div>
              <address>
               <span>서울특별시 금천구 가산디지털1로 25 대륭테크노타운17차</span>
               <span> e-mail: tizm591@naver.com  전화: 010-2750-8423</span>
              </address>
            </div>
           </div>
           <div className="ad-container">
            <Link to="https://playdata.io" target="_blank">
             <img className="ad1" src={ad1} alt="광고1" />
            </Link>
            <Link to="https://playdata.io" target="_blank">
             <img className="ad2" src={ad2} alt="광고2" />
            </Link>
           </div>
        </footer>
    )
}
export default Footer