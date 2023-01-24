import { Add, Camera, Edit, Photo, PhotoCamera, } from '@mui/icons-material'
import { Avatar, Button, Fab } from '@mui/material'

import './Share.css'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from "../state/AuthContext"
import { red } from '@mui/material/colors';
import axios from 'axios';
 


export default function Share() {
    const desc = useRef();
    const desc2 = useRef();
    const { user } = useContext(AuthContext);

    const [file, setFile] = useState(null);
    console.log(file);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user._id)
        

        const newPost = {
            userId: user._id,
            desc: desc.current.value,
            desc2: desc2.current.value
        };

        if (file) {
           const data = new FormData();
           const fileName = file.name;
           data.append("name", fileName);
           data.append("file", file);
           newPost.img = fileName;

            try {
             await axios.post("/upload",data)
            } catch(err) {
             console.log(err)
            }
        }
        try {
            await axios.post("/posts", newPost);
            window.location.reload();
        } catch(err) {
            console.log(err);
        }
    };
    return (
        <div className='share'>
            <div className="shareWrapper">
            
                <div className="shareTop">
                    <img src={user.profileimg ? user.profileimg : "img/avatar.png"} alt='' className='shareProfile' />
                    <input type="text" className='shareInputtitle' alt='' placeholder='제목' ref={desc}/>
                    
                    <Fab size="medium" color="secondary" aria-label="edit" className='sharePostbutton' type='submit'
                    onClick={(e) => handleSubmit(e)}>
                        
                        <Edit />
                    </Fab>
                    
                </div>
                <textarea type="text" className='shareInput' alt='' placeholder='글 작성' ref={desc2}/>
                

                <div className="shareOption">



                    <IconButton color="primary" aria-label="upload picture" component="label" className='shareIcon'>
                        <span className='shareOptionText' typeof='file'></span>
                        <input type="file" id="file" accept='.png, .jpeg, .jpg, .gjf' style={{display : "none"}}
                                onChange={(e) => setFile(e.target.files[0])}/>

                        
                    </IconButton>

                    
                </div>
            </div>
        </div>
    )
}
