import SongBar from './SongBar'


const RelatedSongs = ({ data, isPlaying, activeSong, handlePauseClick, handlePlayClick ,artistId }) => {
  return(
    <div className='flex flex-col'>
      <h1 className='font-bold text-3xl text-white'>Related Songs:</h1>

      <div className='mt-6 w-full flex flex-col'>
        {!artistId ? data?.tracks?.map((song, i) => (
          <SongBar key={song.key}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}

          />
        )) : data?.map((song, i) => (
          <SongBar key={song.id}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
            artistId={artistId}
          />
        ))  }
      </div>
    </div>
  )
}

export default RelatedSongs;
