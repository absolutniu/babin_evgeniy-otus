import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = 'http://localhost:4300'
const API_URL_ADDRESS = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address'
export const api = createApi({
	reducerPath: 'api',
	tagTypes: ['products', 'favorites', 'carts', 'ratings', 'categories','individualCard'],
	baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
	endpoints: () => ({})
})
export const apiAddress = createApi({
	reducerPath: 'address',
	tagTypes: ['address'],
	baseQuery: fetchBaseQuery({ baseUrl: API_URL_ADDRESS }),
	endpoints: () => ({})
})
