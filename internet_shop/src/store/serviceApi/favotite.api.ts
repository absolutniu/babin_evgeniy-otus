import { IFavorite } from '../../types/favorite'
import { api } from '../api'

export const serviceApi = api.injectEndpoints({
	endpoints: builder => ({
		getFavorites: builder.query<IFavorite[], void>({
			query: () => `/favorites/`,
			providesTags: result =>
				// is result available?
				result
					? [...result.map(({ id }) => ({ type: 'favorites' as const, id })), 'favorites']
					: ['favorites']
		}),
		getFavoriteByProductId: builder.query<IFavorite, string>({
			query: id => `/favorites?&productId=${id}&singular=1`,
			providesTags: (result, error, productId) => [{ type: 'favorites', productId }]
		}),
		getFavoriteForUser: builder.query<string[], string>({
			query: userId => `favorites?userId=${userId}&&isFavorite=true`,
			transformResponse: (resp: IFavorite[]) => {
				const arrOut: string[] = []
				resp.map((item: IFavorite) => {
					arrOut.push(item.productId)
				})
				return arrOut
			}
		}),
		updateFavorites: builder.mutation<void, Pick<IFavorite, 'id'> & Partial<IFavorite>>({
			query: (favorite: IFavorite) => {
				if (!favorite.id)
					return {
						url: `/favorites/`,
						method: 'POST',
						body: { ...favorite, isFavorite: !favorite.isFavorite }
					}
				return {
					url: `/favorites/${favorite.id}`,
					method: 'PUT',
					body: { ...favorite, isFavorite: !favorite.isFavorite }
				}
			},
			invalidatesTags: (result, error, arg) => {
				return [{ type: 'favorites', productId: arg.productId }]
			}
		})
	})
})
export const {
	useGetFavoritesQuery,
	useGetFavoriteByProductIdQuery,
	useUpdateFavoritesMutation,
	useGetFavoriteForUserQuery
} = serviceApi
