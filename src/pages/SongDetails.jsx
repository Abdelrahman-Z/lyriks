import {useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components'
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery, useGetSongRelatedQuery ,useGetTopChartsQuery} from '../redux/services/shazamCore';
const SongDetails = () => { 
  const { songid } = useParams()
  const dispatch = useDispatch()
  const { activeSong, isPlaying } = useSelector(state => state.player)
  const { data, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery(songid)
  const {data : artistRlatedData , isFetching: isFetchingRelatedData , error } = useGetTopChartsQuery()
  if (isFetchingRelatedData || isFetchingSongDetails) return <Loader />
  if (error) return <Error />
  

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  const handlePlayClick = (song , i) => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  }


  return (
    <div className='flex flex-col'>
    <DetailsHeader artistId='' songData={data} />
      <div className='mb-10'>
        <h2 className='text-white text-3xl font-bold'>Lyrics:</h2>
        <div className='mt-5'>
          {data?.sections[1]?.type === 'LYRICS' ?
            data?.sections[1]?.text?.map((text, i) => <p key={i} className='text-gray-400 text-base my-1'>{text} </p>) :
            <p className='text-gray-400 text-base my-1'>no Lyrics Found</p>
          }
        </div>
      </div>
      <RelatedSongs data={artistRlatedData} isPlaying={isPlaying} activeSong={activeSong} handlePauseClick={handlePauseClick} handlePlayClick={handlePlayClick} /> 
    </div>
  )
};

export default SongDetails;
