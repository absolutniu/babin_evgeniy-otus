import { ICarts, ICartsSelect } from '../../types/cart'

import { api } from '../api'

export const cartApi = api.injectEndpoints({
	endpoints: builder => ({
		getCarts: builder.query<ICartsSelect[], void | null>({
			query: () => `/carts?isCarts=true`,

			providesTags: result => {
				return result
					? [
							...result.map(({ id, productId }) => ({ type: 'carts' as const, id, productId })),
							'carts'
					  ]
					: ['carts']
			}
		}),
		getCartByProductId: builder.query<ICarts, string>({
			query: id => `/carts?productId=${id}&singular=1`,
			providesTags: (result, error, productId) => [{ type: 'carts', productId }],
			transformResponse: (response: ICarts) => {
				return { ...response, isSelected: false, counter: 1 }
			}
		}),
		getCartById: builder.query<ICarts, string>({
			query: id => `/carts/${id}`,
			providesTags: (result, error, id) => [{ type: 'carts', id }]
		}),
		updateCarts: builder.mutation<void, Pick<ICartsSelect, 'productId'> & Partial<ICartsSelect>>({
			query: (cart: ICartsSelect) => {
				return {
					url: `/carts/${cart.id}`,
					method: 'PUT',
					body: { ...cart }
				}
			},
			invalidatesTags: (result, error, args) => [{ type: 'carts', productId: args.productId }]
		})
	})
})
export const {
	useGetCartsQuery,
	useGetCartByIdQuery,
	useUpdateCartsMutation,
	useGetCartByProductIdQuery
} = cartApi
