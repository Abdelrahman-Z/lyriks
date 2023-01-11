import axios from 'axios';
import { useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components'; 
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopCharts = () => {

  const { activeSong, isPlaying } = useSelector((state)=> state.player)
  
  const {data , isFetching , error} = useGetTopChartsQuery()




  if (isFetching) return <Loader title='Loading Sounds Around You' />
  
  if(error) return <Error/>

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Discover Top Charts</h2>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks?.map((song , i) => (
          <SongCard key={song.key} song={song} i={i} isPlaying={isPlaying} data={data?.tracks} activeSong={activeSong} />
        ))}
      </div>
    </div>
  )

};


export default TopCharts;
