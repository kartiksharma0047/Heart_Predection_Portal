import React, { useContext } from 'react'
import "./CSS/FirstPage.css"
import { Link } from 'react-router-dom';
import { DataContext } from './DataContext';

function FirstPage() {
  const {userLogin}=useContext(DataContext);
  return (
    <div className='FirstPage'>
      <h1>Health Disease Predection</h1>
      <div className='FirstPageBtn'>
        <Link to='./AdminPannel'>Admin Login</Link>
        <Link to={userLogin?'./UserAccess':'./UserPannel'}>User Prediction</Link>
      </div>
    </div>
  )
}

export default FirstPage;