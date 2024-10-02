import { useEffect, useRef } from "react"
import currentStore, { selectCurrentMovie, selectCurrentTv } from "../../store/currentStore"
import { Link, useParams } from "react-router-dom"
import { imageFull, imageMini } from "../../store/url"
import videosStore, { selectVideoMovie, selectVideoTv } from "../../store/videosStore"
import Actors from "../Actors/Actors"
import recStore, { selectRec } from "../../store/recStore"

const Current = () => {
    const fetchCurrent = currentStore((state) => state.fetchCurrent)
    const movie = currentStore(selectCurrentMovie)
    const tv = currentStore(selectCurrentTv)
    const fetchVideos = videosStore((state) => state.fetchVideos)
    const movieVideo  = videosStore(selectVideoMovie)
    const tvVideo     = videosStore(selectVideoTv)
    const fetchRec = recStore((state) => state.fetchRec)
    const rec  = recStore(selectRec)
    const isMounted = useRef<boolean>(false)
    const {type, id} = useParams()
    useEffect(() => {
      if(isMounted.current){
        fetchCurrent(type, id)
        fetchVideos(type, id)
        fetchRec(type, id)
        window.scroll(0, 0)
      }
      isMounted.current = true
    }, [isMounted.current, id])
    const getBudget = () => {
      if (movie) {
        return '$' + movie?.budget.toString().split("").join("").match(/.{1,3}/g).join(",")
      } else {
        return 'Неизвестно...'
      }
    }
    const getRevenue = () => {
      if (movie) {
        return '$' + movie?.revenue.toString().split("").join("").match(/.{1,3}/g).join(",")
      } else {
        return 'Неизвестно...'
      }
    }
  return (
    <>
      <div className="current">
          {isMounted.current && 
              <div className="current__content">
                  <div className="current__content-descr">
                      <h1>{movie?.title ?? tv?.name}</h1>
                      <p>{movie?.overview ?? tv?.overview}</p>
                      <div>
                          <span>{new Date(movie?.release_date ?? tv?.first_air_date).getFullYear()},</span>
                          {movie ? movie?.genres.map((item, idx:number) => (
                            <span key={idx}>{item.name},</span>
                          )) : tv?.genres.map((item, idx:number) => (
                            <span key={idx}>{item.name},</span>
                          ))}
                          <span>
                                {movie ? 
                                  `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` :
                                  `${tv.number_of_seasons}s ${tv.number_of_episodes}e`
                                }
                          </span>
                      </div>
                      <a href={`https://www.youtube.com/watch?v=${movieVideo ?? tvVideo}`} target="_blank" className="btn-more">
                          <i className="fa-solid fa-play"></i>
                          Смотреть трейлер
                      </a>
                      <h2>В главных ролях</h2>
                      <div className="current__content-descr-actors">
                        <Actors type={type} id={id} count={6}/>
                      </div>
                  </div>
                  <img src={imageMini + (movie ? movie?.poster_path : tv?.poster_path)} alt="" className="poster" />
                  <img src={imageMini + (movie ? movie?.backdrop_path : tv?.backdrop_path)} alt="" className="backdrop" />
              </div>
          }
      </div>
      <div className="container extra">
        <div className="extra__info">
          <div className="extra__info-item">
              <h2>Бюджет</h2>
              <p>{getBudget()}</p>
          </div>
          <div className="extra__info-item">
              <h2>Сборы</h2>
              <p>{getRevenue()}</p>
          </div>
          <div className="extra__info-item">
              <h2>Статус</h2>
              <p>{movie?.status ?? tv?.status}</p>
          </div>
          <div className="extra__info-item">
              <h2>Исходное название</h2>
              <p>{movie?.original_title ?? tv?.original_name}</p>
          </div>
        </div>
        <div className="extra__rec">
          <h2>Рекомендации</h2>
          <div className="content__info">
            { rec?.map((item, idx) => (
                <Link to={`/${type}/${item.id}`} key={idx}>
                    <img src={imageMini + item.poster_path} alt="" />
                </Link>
            )) }
        </div>
        </div>
      </div>
    </>
    
  )
}

export default Current