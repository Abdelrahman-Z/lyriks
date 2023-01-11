import { createApi , fetchBaseQuery} from "@reduxjs/toolkit/query/react";
    
export const shazamCoreAPI = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '90612f05f5msh5d0dce1e8416814p11a20fjsne8c0c9488f45')
      return headers
    }
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => '/charts/track' }),
    getSongDetails: builder.query({ query: (songid) => `/songs/get-details?key=${songid}` }),
    getSongRelated: builder.query({query:(artistid) => `/artists/get-top-songs?id=${artistid}`}),
    getArtistDetails: builder.query({ query: (artistid) => `/artists/get-details?id=${artistid}` }),
    getSongsByCounrty: builder.query({ query: (countryCode) => `/charts/track?locale=${countryCode}` }),
    getSongsBySearch: builder.query({ query: (searchTerm) => `/search?term=${searchTerm}` })
  })
})
  
export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongsByCounrtyQuery,
  useGetSongsBySearchQuery,
} = shazamCoreAPI;


// 90612f05f5msh5d0dce1e8416814p11a20fjsne8c0c9488f45