import React,{useEffect,useState} from 'react'
import YouTube from 'react-youtube'
import "./RowPost.css"
import {API_KEY, imageUrl } from '../../constants/constants'
import axios from '../../axios'

function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const [urlId, urlSetId] = useState('');
  
  useEffect(() => {
    axios.get(props.url).then(response => {
      // console.log(response.data.results);
      setMovies(response.data.results);
    }).catch(err => {
      console.error('Error fetching movies:', err);
    });
  }, [props.url]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleMovie = (id) => {
    console.log(`Fetching video for movie ID: ${id}`);
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then(response => {
        console.log(response.data);
        if (response.data.results.length !== 0) {
          // Save the YouTube video key
          urlSetId(response.data.results[0].key);
        } else {
          console.log("No videos available");
        }
      })
      .catch(err => {
        console.error("Error fetching movie videos:", err);
      });
  };

  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((obj) => (
          <img
            key={obj.id}
            onClick={() => handleMovie(obj.id)}
            className={props.isSmall ? 'smallPoster' : 'poster'}
            src={`${imageUrl + obj.backdrop_path}`}
            alt="poster"
          />
        ))}
      </div>

      {/* Only show the YouTube video player when a video is selected */}
      {urlId && <YouTube opts={opts} videoId={urlId} />}
    </div>
  );
}
// function RowPost(props) {
//  const [movies,setMovies]= useState([])
//  const [urlId,urlSetId]= useState('')
//   useEffect(()=>{
//   axios.get(props.url).then(response=>{
//     console.log(response.data.results);
//     setMovies(response.data.results)
//   }).catch(err=>{
//     //alert("Error")
//   })
// },[props.url])
// const opts = {
//   height: '390',
//   width: '100%',
//   playerVars: {
//     // https://developers.google.com/youtube/player_parameters
//     autoplay: 1,
//   },
// };
// const handleMovie = (id)=>{
//   console.log(id);
//   axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
//     console.log(response.data);
//     if(response.data.results.length!==0)
//     {

//       urlSetId(response.data.results[0])
//     }
//     else{
//       console.log("Array is empty");
//     }
//   })
// }
//   return (
//     <div className='row'>
//       <h2>{props.title}</h2>
//       <div className="posters">
//         {movies.map((obj)=>
          
//           <img onClick={()=>handleMovie(obj.id)} className={props.isSmall ? 'smallPoster' : 'poster'} src={`${imageUrl+obj.backdrop_path}` } alt="poster"/>
//         )}
//       </div>
//     {
//       urlId && <YouTube opts={opts} videoId={urlSetId.key} /> 
      
      
//     } 
//     </div>
//   )
// }

export default RowPost
