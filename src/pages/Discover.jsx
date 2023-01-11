import { Error, Loader, SongCard } from "../components";
import { genres } from '../assets/constants'
import { useDispatch , useSelector } from 'react-redux'
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { selectGenreListId } from "../redux/features/playerSlice";



const Discover = () => { 
  const dispatch = useDispatch();
  const {activeSong , isPlaying , genreListId} = useSelector((state)=> state.player)
  const { data, isFetching, error } = useGetTopChartsQuery()

  console.log(data)

  if (isFetching) return <Loader title='lodaing songs...' />
  if (error) return <Error/>
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Discover</h2>
        <select onChange={(e) => dispatch(selectGenreListId(e.target.value))} value={genreListId || 'pop'} className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5">
          {genres.map(el => (
            <option key={el.value} value={el.value}>{el.title}</option>
          ))}
        </select> 
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks?.map((song , i) => (
          <SongCard key={song.key} song={song} i={i} isPlaying={isPlaying} data={data?.tracks} activeSong={activeSong} />
        ))}
      </div>
    </div>
  )

};


export default Discover;
