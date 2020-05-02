import React from 'react';
import '../styles/scss/Footer.scss';
import { Link } from 'react-scroll';
import { feedbackMouseEnter, feedbackMouseLeave, showHidenElements, redirectToLink } from '../utils/helpFuncsForBrouser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faVk, faFacebook } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  showHidenElements();
  return (
    <footer className='footer'>
      <Link className='upArrow hidenElem' to='header' smooth={true}>
        <FontAwesomeIcon className='fas' icon={faChevronUp} />
      </Link>
      <div onMouseLeave={() => feedbackMouseLeave()} className='feedback hidenElem'>
        <div onMouseEnter={() => feedbackMouseEnter()} className='mainIcon'>
          <FontAwesomeIcon className='fas' icon={faPhone} />
        </div>
        <div className='helperIcon helperIcon1'>
          <FontAwesomeIcon onClick={() => redirectToLink('https://www.instagram.com/dan4yk_/?hl=ru')} icon={faInstagram} />
        </div>
        <div className='helperIcon helperIcon2'>
          <FontAwesomeIcon onClick={() => redirectToLink('https://vk.com/dan4yks')} icon={faVk} />
        </div>
        <div className='helperIcon helperIcon3'>
          <FontAwesomeIcon onClick={() => redirectToLink('https://www.facebook.com/profile.php?id=100007511921453')} icon={faFacebook} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
