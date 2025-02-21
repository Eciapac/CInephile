import { useEffect, useRef } from "react"
import topRatedStore, { selectTop } from "../../store/TopRatedStore"
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { imageMini } from "../../store/url";
import { Link } from "react-router-dom";
const TopRated = () => {
  const fetchTop = topRatedStore((state) => state.fetchTop)
  const top = topRatedStore(selectTop)
  const isMounted = useRef(false)
  useEffect(() => {
    if(isMounted.current){
      fetchTop()
    }
    isMounted.current = true
  }, [isMounted.current,fetchTop, top])
  return (
    <section className="top">
        <h2 className="top-title">
            ТОП
            <span>10</span>
        </h2>
        {isMounted.current && 
        <Splide 
        className="top__slider"
        options={{
          type: 'loop',
          autoplay: true,
          gap: '23px',
          perPage: 3.5,
          perMove: 1,
          pagination: false
        }}
      >
        { top?.map((item, idx) => (
          <SplideSlide 
            className="top__slider-item"
            key={idx}
          >
            <Link to={`/movie/${item.id}`} className="top__slider-item-content">
              <img src={imageMini + item.poster_path} alt="" />
              <div><span>{idx+1}</span></div>
            </Link>
          </SplideSlide>
        ))}
      </Splide>
      }
    </section>
  )
}

export default TopRated