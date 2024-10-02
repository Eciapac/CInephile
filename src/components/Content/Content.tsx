import { Link } from "react-router-dom"
import popularStore, { selectPopularMovies, selectPopularTvs } from "../../store/popularStore"
import { popularState, TAM } from "../../types/type"
import { useEffect, useRef, useState } from "react"
import { imageMini } from "../../store/url"

const Content = ({type}) => {
    const fetchPopular = popularStore((state:popularState) => state.fetchPopular)
    const popularMovies = popularStore(selectPopularMovies)
    const popularTvs = popularStore(selectPopularTvs)
    const isMounted = useRef<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(500)
    const [content, setContent] = useState<null | TAM[]>(null)
    useEffect(() => {
      if(isMounted.current){
        fetchPopular(type, currentPage)
        if(type === 'movie') setContent(popularMovies)
        else  setContent(popularTvs)
      }
      isMounted.current = true
    }, [isMounted.current, fetchPopular, popularMovies, popularTvs])
    const changePage = (dir:string) => {
      if(dir === 'back'){
        setCurrentPage(currentPage-1)
      }else{
        setCurrentPage(currentPage+1)
      }
      window.scroll(0, 0)
    }
    return (
    <div className="container content">
        <h2>{type === 'movie' ? 'Все фильмы' : 'Все сериалы'}</h2>
        <div className="content__info">
            { content?.map((item, idx) => (
                <Link to={`/${type}/${item.id}`} key={idx}>
                    <img src={imageMini + item.poster_path} alt="" />
                </Link>
            )) }
        </div>
        <div className="pagination">
          <button onClick={() => changePage('back')}>BACK</button>
          <span>Страница: {currentPage} - {totalPages}</span>
          <button onClick={() => changePage('next')}>NEXT</button>
        </div>
    </div>
  )
}

export default Content