import Close from 'images/Close.svg'
import BtnMore from '../UI/BtnMore'
import { imageFull } from '../../store/url'
import Actors from '../Actors/Actors'

const ItemBlock = ({ media, active, type, close }) => {
  return (
    <div className={`media__info ${active ? 'active' : ''}`}>
      {media &&
        <>
          <img onClick={close} src={Close} alt="" className="close" />
          <div className="media__info-content">
            <div className="media__info-content-block">
              <h2>{media.title || media.name}</h2>
              <p>{media.overview || 'Меня забыли добавить...'}</p>
              <span>{new Date(media.release_date || media.first_air_date).getFullYear()}</span>
              <Actors type={type} id={media.id} count={4}/>
              <BtnMore type={type} id={media.id}/>
            </div>
            <img src={imageFull + media.backdrop_path} alt="" />
          </div>
        </>
      }
    </div>
  )
}

export default ItemBlock