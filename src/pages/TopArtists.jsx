import { Error, Loader, ArtistCard } from '../components'; 
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopArtists = () => {

  const {data , isFetching , error} = useGetTopChartsQuery()

  if (isFetching) return <Loader title='Loading Sounds Around You' />
  
  if(error) return <Error/>


  console.log(data)

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Top Artists</h2>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks?.map((song) => (
          <ArtistCard key={song.key} track={song} />
        ))}
      </div>
    </div>
  )

};


export default TopArtists;