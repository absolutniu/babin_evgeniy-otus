import { IRating } from '../../types/rating'
import { api } from '../api'

export const ratingApi = api.injectEndpoints({
	endpoints: builder => ({
		getRatings: builder.query<IRating[], string>({
			query: () => `/ratings/`,
			providesTags: result =>
				// is result available?
				result
					? [...result.map(({ id }) => ({ type: 'ratings' as const, id })), 'ratings']
					: ['ratings']
		}),
		getRatingByProductId: builder.query<IRating, string>({
			query: id => `/ratings?productId=${id}&singular=1`,
			providesTags: (result, error, productId) => [{ type: 'ratings', productId }]
		}),
		getRatingById: builder.query<IRating, string>({
			query: id => `/ratings/${id}`,
			providesTags: (result, error, id) => [{ type: 'ratings', id }]
		}),
		updateRating: builder.mutation<void, Pick<IRating, 'productId'> & Partial<IRating>>({
			query: (rating: IRating) => {
				return {
					url: `/ratings/${rating.id}`,
					method: 'PUT',
					body: rating
				}
			},
			invalidatesTags: (result, error, args) => [{ type: 'ratings', productId: args.productId }]
		})
	})
})
export const {
	useGetRatingsQuery,
	useGetRatingByIdQuery,
	useUpdateRatingMutation,
	useGetRatingByProductIdQuery
} = ratingApi
