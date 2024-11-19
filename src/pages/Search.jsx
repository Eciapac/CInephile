import { useEffect, useRef, useState } from "react"
import searchStore, { selectData } from "../store/searchStore"
import { Link } from "react-router-dom"
import { imageMini } from "../store/url"

const Search = () => {
  const [query, setQuery] = useState<string>('')
  const fetchData = searchStore((state) => state.fetchData)
  const data = searchStore(selectData)
  const isMounted = useRef(false)
  useEffect(() => {
    if(isMounted.current && query.length > 1){
      fetchData(query)
    }
    isMounted.current = true
  }, [isMounted.current, query])
  
  return (
    <div className="container search">
      <input type="search" placeholder="Найти фильм, сериал..." autoFocus onChange={(e) => setQuery(e.target.value)}/>
      <div className="search__results">
        { data?.map((item,idx) => (
          <Link to={`/${item.title ? 'movie' : 'tv'}/${item.id}`} key={idx}>
            <img src={imageMini + item.poster_path} alt="" />
          </Link>
        )) }
      </div>
    </div>
  )
}

export default Search