import Stack from '@mui/material/Stack'
import Card from './card'
import { useGetFavoriteForUserQuery } from '../store/serviceApi/favotite.api'
import { useGetFavoriteProductsQuery } from '../store/serviceApi/product.api'
import { useEffect, useState } from 'react'
import { IProduct } from '../types/product'

export function Favorite() {
	const userId = '65247a15c42649f6fcd32e1'
	const [favorite, setFavorite] = useState<string[]>([])
	const [products, setProducts] = useState<IProduct[]>([])
	const {
		data: productsId,
		isFetching: isQuery,
		isSuccess: favoriteSuccess
	} = useGetFavoriteForUserQuery(userId)
	const buildURL = favorite.reduce((url, productId) => `${url}id=${productId}&&`, '?')
	const {
		data: queryProducts,
		isFetching: isFetchingProducts,
		isSuccess: isSuccessProducts
	} = useGetFavoriteProductsQuery(buildURL)
	useEffect(() => {
		if (favoriteSuccess) {
			setFavorite(productsId)
		}
		if (isSuccessProducts) {
			setProducts(queryProducts)
		}
	}, [isQuery, isFetchingProducts])

	return (
		<div
			style={{
				width: '1208px',
				justifyContent: 'center',
				margin: 'auto',
				display: 'flex',
				flexDirection: 'column',
				gap: '60px'
			}}
		>
			<div
				style={{
					alignItems: 'flex-start'
				}}
				className="text"
			>
				Избранное
			</div>
			<Stack useFlexGap flexWrap="wrap" direction="row" alignItems="flex-start" spacing={'40px'}>
				{products?.map(product => <Card product={product} key={product.id} />)}
			</Stack>
		</div>
	)
}
