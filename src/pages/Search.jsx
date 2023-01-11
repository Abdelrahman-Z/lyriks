import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components'; 
import { useGetSongsBySearchQuery } from '../redux/services/shazamCore';

const Search = () => {

  const { activeSong, isPlaying } = useSelector((state)=> state.player)
  
  const {searchTerm} = useParams()
  

  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm)
  console.log(data)
  if (isFetching) return <Loader title='Loading Sounds Around You' />
  
  if(error) return <Error/>

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">showing resaults for <span className='font-black'>{searchTerm}</span></h2>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks?.hits?.map((song , i) => (
          <SongCard key={song?.track.key} song={song} i={i} isPlaying={isPlaying} data={song} activeSong={activeSong} />
        ))}
      </div>
    </div>
  )

};

export default Search;