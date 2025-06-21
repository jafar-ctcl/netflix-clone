import React,{useEffect,useState} from 'react'
import YouTube from 'react-youtube'
import "./RowPost.css"
import {API_KEY, imageUrl } from '../../constants/constants'
import axios from '../../axios'

function RowPost(props) {
 const [movies, setMovies] = useState([]);
  const [urlId, setUrlId] = useState(null);

  useEffect(() => {
    axios.get(props.url)
      .then(response => {
        setMovies(response.data.results);
      })
      .catch(err => {
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
        if (response.data.results.length !== 0) {
          setUrlId(response.data.results[0].key);
        } else {
          setUrlId(null); // Clear if no trailer
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
export default RowPost
