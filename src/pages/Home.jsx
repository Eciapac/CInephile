import Movies from "../components/TAM/Movies"
import Tvs from "../components/TAM/Tvs"
import TopRated from "../components/TopRated/TopRated"
import Upcoming from "../components/Upcoming/Upcoming"

const Home = () => {
  return (
    <>
      <Upcoming/>
      <Movies/>
      <Tvs/>
      <TopRated/>
    </>
  )
}

export default Home