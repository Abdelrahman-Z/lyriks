import {useParams} from 'react-router-dom'
import {  useSelector } from 'react-redux'
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components'
import { useGetSongRelatedQuery } from '../redux/services/shazamCore';


const ArtistDetails = () => { 
  const { id: artistId } = useParams()
  const { activeSong, isPlaying } = useSelector(state => state.player)
  const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetSongRelatedQuery(artistId)
  if (isFetchingArtistDetails) return <Loader title='loading artist details' />
  if (error) return <Error />
  return (
    <div className='flex flex-col'>
    <DetailsHeader artistId={artistId} artistData={artistData} />
      
      <RelatedSongs data={artistData?.data} isPlaying={isPlaying} activeSong={activeSong} artistId={artistId} /> 
    </div>
  )
};

export default ArtistDetails;
