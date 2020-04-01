import React from 'react';
import '../styles/scss/Footer.scss';
import { Link } from 'react-scroll';
import { feedbackMouseEnter, feedbackMouseLeave, showHidenElements, redirectToLink } from '../utils/helpFuncsForBrouser';

const Footer = () => {
  showHidenElements();
  return (
    <footer className='footer'>
      <Link className='upArrow' to='header' smooth={true}>
        <i className='fas fa-chevron-up'></i>
      </Link>
      <div onMouseLeave={() => feedbackMouseLeave()} className='feedback .hidenElem'>
        <div onMouseEnter={() => feedbackMouseEnter()} className='mainIcon'>
          <i className='fas fa-phone'></i>
        </div>
        <div className='helperIcon helperIcon1'>
          <i onClick={() => redirectToLink('https://www.instagram.com/dan4yk_/?hl=ru')} className='fab fa-instagram'></i>
        </div>
        <div className='helperIcon helperIcon2'>
          <i onClick={() => redirectToLink('https://vk.com/dan2801')} className='fab fa-vk'></i>
        </div>
        <div className='helperIcon helperIcon3'>
          <i onClick={() => redirectToLink('https://www.facebook.com/profile.php?id=100007511921453')} className='fab fa-facebook'></i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
