import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import Videos from './Videos';
import ChannelCard from './ChannelCard';
import { fetchFromAPI } from '../utils/fetchFromAPI';

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState('null');
  const [videos,setVideos]=useState([]);
  const {id} = useParams();

  // console.log(channelDetail,videos);
  useEffect(()=>{
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data)=>setChannelDetail(data?.items[0]));
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then((data)=> setVideos(data?.items));
  },[id]);


  return (
   <Box minHeight='95vh'>
      <Box>
        <div style={{background: 'linear-gradient(90deg, rgba(75,4,4,1) 15%, rgba(202,33,33,1) 43%, rgba(75,4,4,1) 85%)', zIndex:'10',height:'300px'}}/>
        <ChannelCard channelDetail={channelDetail} marginTop='-100px'/>
      </Box>
      <Box display='flex' p={2}>
        <Box sx={{mr:{sm:'100px'}}}/>
          <Videos videos={videos}/>
      </Box>
   </Box>
  )
}

export default ChannelDetail