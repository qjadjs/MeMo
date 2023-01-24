import React, { useContext, useEffect, useState } from 'react'
import './Post.css'

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { format, render, cancel, register } from 'timeago.js';
import { AuthContext } from '../state/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Post({ post }) {
  const { user } = useContext(AuthContext);
  
  const [expanded, setExpanded] = React.useState(false);

  const handleDelete = async (e) => {
    
    try {
      
      await axios.delete("/posts/:id" , post);
      
    } catch(err) {
      console.log(err)
    }
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/users/${post.userId}`);
      // console.log(response);
      // setUser(response.data);
    };

    fetchUser();

  }, []);
  
  return (
    <Card sx={{ maxWidth: 345 }} className='PostCard'>
      <CardHeader className='CardHeader'
        avatar={
          <Avatar src='img/avatar.png'>

          </Avatar>
        }
        action={
          <IconButton aria-label="Delete"  onClick={(e) => handleDelete(e)}>
            
          </IconButton>
        }
        title={user.username}
        subheader={post.createdAt}
      />
      <div>
          
        
      </div>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>


        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>

          <Typography paragraph>
            {post.desc2}
          </Typography>


          <Typography>

          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

