import { useEffect, useRef } from "react"
import actorsStore, { selectMovieActors, selectTvActors } from "../../store/actorsStore"
import { imageMini } from "../../store/url"

interface actorsProps {
  type: string,
  id: number,
  count: number
}
const Actors: React.FC<actorsProps> = ({ type, id, count }) => {
  const fetchActors = actorsStore((state) => state.fetchActors)
  const movieActors = actorsStore(selectMovieActors)
  const tvActors = actorsStore(selectTvActors)
  const isMounted = useRef<boolean>(false)
  useEffect(() => {
    if (isMounted.current) {
      fetchActors(type, id, count)
    }
    isMounted.current = true
  }, [isMounted.current, id])
  return (
    <div className="actors">
      {type === 'movie' ? movieActors?.map((item, idx) => (
        <div className="actors__item" key={idx}>
          <img src={imageMini + item.profile_path} alt="" />
          <span>{item.name}</span>
        </div>
      )) : tvActors?.map((item, idx) => (
        <div className="actors__item" key={idx}>
          <img src={imageMini + item.profile_path} alt="" />
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  )
}

export default Actors