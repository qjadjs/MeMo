import { Login, Logout, Search } from '@mui/icons-material';
import React from 'react'
import "./Topbar.css";
import PageviewIcon from '@mui/icons-material/Pageview';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';



export default function Topbar() {
    return (

        <div className='topbarContainer'>

            <div className='topbarLeft'>
            
            </div>
            <div className="topbarCenter">
            <span className='logo'>MeMo</span>
            
                {/* <div className="searchbar">
                <Search className='searchIcon' />
                    <input type="text" className="searchInput" placeholder/>
                </div> */}
                </div>
            
            <div className="topbarRight">
                <div className="topbarIconItem">
                   
                </div>
                <Link to='/login' style={{ textDecoration: "none"}}>
                <Button >Login</Button>
                
                </Link>
                
                <Button  href='/register'>Register</Button>
                
            </div>
        </div>
    )
}
