import React from 'react';
import "./Footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faGooglePlus, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left col-md-4 col-sm-6">
        <p className="about">
          <span> About the company</span> Ut congue augue non tellus bibendum, in varius tellus condimentum. In scelerisque nibh tortor, sed rhoncus odio condimentum in. Sed sed est ut sapien ultrices eleifend. Integer tellus est, vehicula eu lectus tincidunt,
          ultricies feugiat leo. Suspendisse tellus elit, pharetra in hendrerit ut, aliquam quis augue. Nam ut nibh mollis, tristique ante sed, viverra massa.
        </p>
        <div className="icons">
         <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
         <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
         <a href="#"><FontAwesomeIcon icon={faLinkedin} /></a>
         <a href="#"><FontAwesomeIcon icon={faGooglePlus} /></a>
         <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
        </div>
      </div>
      <div className="footer-center col-md-4 col-sm-6">
        <div>
          <i className="fa fa-map-marker"></i>
          <p><span> 가산디지털1로 25 대륭테크노타운 17차 18층 플레이데이터</span> 금천구, 서울시</p>
        </div>
        <div>
          <i className="fa fa-phone"></i>
          <p> (+82) 010-9600-1629</p>
        </div>
        <div>
          <i className="fa fa-envelope"></i>
          <p><a href="#"> tizm591@naver.com</a></p>
        </div>
      </div>
      <div className="footer-right col-md-4 col-sm-6">
        <h2> Company<span> Fionfow</span></h2>
        <p className="menu">
          <a href="#"> Home </a> 
          <a href="#"> | About </a> 
          <a href="#"> | Services </a> 
          <a href="#"> | News </a> 
          <a href="https://playdata.io/" target="_blank" rel="noopener noreferrer"> | Contact </a>
        </p>
        <p className="name"> Copyright &copy; 2023 Fionfow Korea Corporation All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

