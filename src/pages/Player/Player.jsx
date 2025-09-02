import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'

const Player = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [apiData, setApiData] = useState({
    name : "",
    key : "",
    published_at : "",
    type : ""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Zjc2ODQ3NzZmYjAzY2EzZjZiODM4YTZkM2U5MmM1OCIsIm5iZiI6MTc1NjczMjE5MS4yMzgwMDAyLCJzdWIiOiI2OGI1OWIxZmE1Y2Q5ZDRlOGE5ZTIyMjEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.XRTWsBOojcfOu_Kv1vSNuGFkXNt3SpUf8QTTaWHuHrs'
    }
  }

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => {
        if (res.results && res.results.length > 0) {
          setApiData(res.results[0])
        }
      })
      .catch(err => console.error(err))
  }, [id])

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="back" onClick={() => navigate(-1)} />
      
      {apiData.key ? (
        <iframe
          src={`https://www.youtube.com/embed/${apiData.key}`}
          frameBorder="0"
          title="trailer"
          width="90%"
          height="90%"
          allowFullScreen
        ></iframe>
      ) : (
        <p style={{color: "white"}}>Loading video...</p>
      )}

      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
