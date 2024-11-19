import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import popularStore, { selectPopularMovies, selectPopularTvs } from '../../store/popularStore';
import { useEffect, useRef, useState } from 'react';
import { imageMini } from '../../store/url';
import ItemBlock from '../ItemBlock/ItemBlock';

const Content = ({type}) => {
  const fetchPopular = popularStore((state) => state.fetchPopular)
  const popularMovies = popularStore(selectPopularMovies)
  const popularTvs = popularStore(selectPopularTvs)
  const isMounted = useRef(false)
  useEffect(() => {
    if(isMounted.current){
      fetchPopular(type, 1)
    }
    isMounted.current = true
  }, [isMounted.current])
  const [media, setMedia] = useState(null)
  const [active, setActive] = useState(false)
  const getMedia = (type, item) => {
    if(type === 'movie') setMedia(item)
    else setMedia(item)
    setActive(true)
  }
  const closeItemBlock = () => {
    setActive(false)
  }
  return (
    <section className="media">
      <h2>
        <a href="" className="media-title">
          {type === 'movie' ? 'Фильмы' : 'Сериалы'}
          <i className="fa-solid fa-chevron-right"></i>
        </a>
      </h2>
      {isMounted.current && 
        <Splide 
        className="media__slider"
        options={{
          type: 'loop',
          autoplay: true,
          gap: '24px',
          perPage: 5.5,
          perMove: 3,
          pagination: false
        }}
      >
        { type === 'movie' ? popularMovies?.map((item, idx) => (
          <SplideSlide 
            className="media__slider-item"
            key={idx}
            onClick={() => getMedia(type, item)}
          >
            <img src={imageMini + item.poster_path} alt="" />
          </SplideSlide>
        )) :  popularTvs?.map((item, idx) => (
          <SplideSlide 
            className="media__slider-item"
            key={idx}
            onClick={() => getMedia(type, item)}
          >
            <img src={imageMini + item.poster_path} alt="" />
          </SplideSlide>
        ))}
        
      </Splide>
      }
      <ItemBlock media={media} active={active} type={type} close={closeItemBlock}/>
      
    </section>
  )
}

export default Content