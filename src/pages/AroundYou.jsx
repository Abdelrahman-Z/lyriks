import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components'; 
import { useGetSongsByCounrtyQuery } from '../redux/services/shazamCore';

const AroundYou = () => {

  const [country, setCountry] = useState("")
  const [loading, setLoading] = useState(true)
  const { activeSong, isPlaying } = useSelector((state)=> state.player)
  
  const {data , isFetching , error} = useGetSongsByCounrtyQuery(country)

  useEffect(() => {
    axios.get(`https://geo.ipify.org/api/v2/country?apiKey=at_6PF5FvZkUWPwH9f15Ca0c5oRGiQqB`)
      .then(res => setCountry(res?.data?.location?.country))
      .catch(err => console.log(err)).finally(()=> setLoading(false))
  }, [country])

  if (isFetching && loading) return <Loader title='Loading Sounds Around You' />
  
  if(error && country) return <Error/>

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Around You <span className='font-black'>{country}</span></h2>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks?.map((song , i) => (
          <SongCard key={song.key} song={song} i={i} isPlaying={isPlaying} data={data?.tracks} activeSong={activeSong} />
        ))}
      </div>
    </div>
  )

};


export default AroundYou;
