import React, { useEffect } from 'react';
import '../styles/scss/Footer.scss';
import { Link } from 'react-scroll';
import { feedbackMouseEnter, feedbackMouseLeave, showFooterHidenElements, redirectToLink } from '../utils/workWithBrowser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faVk, faFacebook } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  useEffect(() => {
    showFooterHidenElements();
  }, []);
  
  return (
    <footer className='footer'>
      <Link className='upArrow hidenElem' to='header' smooth={true}>
        <FontAwesomeIcon className='fas' icon={faChevronUp} />
      </Link>
      <div onMouseLeave={() => feedbackMouseLeave()} className='feedback hidenElem'>
        <div onMouseEnter={() => feedbackMouseEnter()} className='mainIcon'>
          <FontAwesomeIcon className='fas' icon={faPhone} />
        </div>
        <div className='helperIcon helperIcon1 hidenElem'>
          <FontAwesomeIcon onClick={() => redirectToLink('https://www.instagram.com/dan4yk_/?hl=ru')} icon={faInstagram} />
        </div>
        <div className='helperIcon helperIcon2 hidenElem'>
          <FontAwesomeIcon onClick={() => redirectToLink('https://vk.com/dan4yks')} icon={faVk} />
        </div>
        <div className='helperIcon helperIcon3 hidenElem'>
          <FontAwesomeIcon onClick={() => redirectToLink('https://www.facebook.com/profile.php?id=100007511921453')} icon={faFacebook} />
        </div>
      </div>
      <div className='modalWraper hidenElem' data-close={true}></div>
    </footer>
  );
};

export default Footer;
