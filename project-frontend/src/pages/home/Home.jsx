import React from 'react'
import Topbar from '../../components/Topbar'
import Main from '../../components/Main'
import { Login } from '@mui/icons-material'
import Share from '../../components/Share'
import Leftbar from '../../components/Leftbar'
import "./Home.css"
import Rightbar from '../../components/Rightbar'


export default function Home() {
    return (
        <>
         <Topbar />
        <div className="homeContainer" >
         <Leftbar />
         <Main />
         <Rightbar />
         </div>
                 </>
    )
}
