import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const { user } = useUser();
    const navigate = useNavigate();
  return (
    <nav>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link to="/Articles">Articles</Link>
            </li>
        </ul>
        <div className='nav-right'>
            {user 
                ? <button onClick={() => {
                    signOut(getAuth());
                }}>Logout</button>
                : <button onClick={() => {
                    navigate('/login');
                }} >Login</button>
            }
        </div>
    </nav>
  )
}

export default NavBar;