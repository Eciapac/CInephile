import { Link } from "react-router-dom"

const BtnMore = ({type, id}) => {
  return (
   <Link to={`${type}/${id}`} className="btn-more">
    <i className="fa-solid fa-bars"></i>
    Подробнее
   </Link>
)
}

export default BtnMore