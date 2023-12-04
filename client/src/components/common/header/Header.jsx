import React from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Header() {
  return (
        <div className='custom-header-container'>
          <div className='custom-header-heading pt-2'>
            <h3 style={{ fontWeight: 'bold', color : 'var(--secondary-bg)' }}>EMPLOYEE PAYROLL MANAGEMENT</h3>
          </div>
          <Link to="/" className='custom-header-logout'>
          <span className='cur-po abs-center'>
            <div style={{color : 'var(--secondary-bg)'}} >Logout</div>
            <FontAwesomeIcon icon={faRightFromBracket} size="lg" style={{color: 'var(--secondary-bg)',marginLeft:'10px'}}/>
          </span>
          </Link>
        </div>

  );
}

export default Header;
