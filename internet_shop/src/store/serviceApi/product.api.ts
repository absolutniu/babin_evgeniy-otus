import { IProduct, IProductCatalog, IProductDetail, IProductSearch } from '../../types/product'
import { api } from '../api'

export const productApi = api.injectEndpoints({
	endpoints: builder => ({
		getProducts: builder.query<IProduct[], void>({
			query: () => `/products/`,
			providesTags: result => {
				// is result available?
				return result
					? [...result.map(({ id }) => ({ type: 'products' as const, id })), 'products']
					: ['products']
			}
		}),
		getProductById: builder.query<IProduct, string>({
			query: id => `/products/${id}`,
			providesTags: (result, error, id) => [{ type: 'products', id }]
		}),
		getDetailProductById: builder.query<IProductDetail, string>({
			query: id => `/products/${id}`,
			providesTags: (result, error, id) => [{ type: 'products', id }]
		}),
		getProductsBySearch: builder.query<IProduct[], string>({
			query: value => `/products?name_like=${value}`,
			providesTags: result => {
				// is result available?
				return result
					? [...result.map(({ id }) => ({ type: 'products' as const, id })), 'products']
					: ['products']
			}
		}),
		getProductsByCategory: builder.query<IProductCatalog[], string>({
			query: value => `/products?category=${value}`,
			providesTags: result => {
				// is result available?
				return result
					? [...result.map(({ id }) => ({ type: 'products' as const, id })), 'products']
					: ['products']
			}
		}),
		getFavoriteProducts: builder.query<IProduct[], string>({
			query: value => `/products${value}`,
			providesTags: result => {
				// is result available?
				return result
					? [...result.map(({ id }) => ({ type: 'products' as const, id })), 'products']
					: ['products']
			}
		}),
		getProductsByName: builder.query<IProductSearch[], string>({
			query: value => {
				return {
					url: `/products?name_like=${value}`
				}
			},
			transformResponse: (resp: IProduct[]) => {
				const arrOut: IProductSearch[] = []
				resp.map(item => {
					arrOut.push({
						id: item.id,
						name: item.name
					})
				})
				return arrOut
			}
			/* buildUrl('/products', params) */
		})
	})
})

export const {
	useGetProductsQuery,
	useGetProductByIdQuery,
	useGetDetailProductByIdQuery,
	useGetProductsByNameQuery,
	useGetProductsBySearchQuery,
	useGetProductsByCategoryQuery,
	useGetFavoriteProductsQuery
} = productApi
