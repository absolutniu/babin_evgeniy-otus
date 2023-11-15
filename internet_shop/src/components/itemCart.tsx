import { CardMedia, Checkbox, Stack } from '@mui/material'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton/IconButton'
import { FC, useEffect, useState } from 'react'
import { ICartsDetails } from '../types/cart'
import logo from './../asset/images/1.png'
import { useGetProductByIdQuery } from '../store/serviceApi/product.api'
import { useUpdateCartsMutation } from '../store/serviceApi/cart.api'
import { CProduct, IProduct } from '../types/product'

const ItemCart: FC<ICartsDetails> = ({ cart }) => {
	const [product, setProduct] = useState<IProduct>(new CProduct())
	const [updateCarts] = useUpdateCartsMutation()
	const { data: productQuery, isSuccess } = useGetProductByIdQuery(cart.productId, {
		skip: !cart.productId
	})

	useEffect(() => {
		if (isSuccess) setProduct(productQuery)
	}, [isSuccess])

	const getSummProduct = () => {
		return (cart?.counter * product.price.price).toFixed(2)
	}

	const getSummDiscont = () => {
		return (priceCard() * cart.counter).toFixed(2)
	}
	const priceCard = () => {
		if (product.price.discount)
			return product.price.price - (product.price.price * product.price.discount) / 100
		return product.price.price
	}

	return (
		<Card
			style={{
				display: 'flex',
				width: '876px',
				minHeight: product.price.discount ? '90px' : '72px',
				borderRadius: '4px',
				boxShadow: '1px 2px 4px 0px  #0000001A'
			}}
		>
			<Stack
				direction="row"
				spacing={1}
				style={{ width: '876px' }}
				justifyContent="space-between"
				alignItems="center"
			>
				<CardMedia
					component="img"
					src={logo}
					style={{ width: '80px', marginLeft: '8px', boxShadow: '1px 2px 4px 0px  #0000001A' }}
				/>
				<Checkbox
					style={{ position: 'absolute', display: 'flex', paddingBottom: '60px' }}
					color="secondary"
					checked={cart?.isSelected}
					onChange={() => updateCarts({ ...cart, isSelected: !cart.isSelected })}
					inputProps={{ 'aria-label': 'controlled' }}
				/>

				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						width: '536px'
					}}
				>
					<label style={{ fontWeight: 'bold' }}>{product.name}</label>

					{!product.price.discount && <label>{product.price.price} ₽ за шт.</label>}
					{product.price.discount && (
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								height: '32px'
							}}
						>
							<div
								style={{
									paddingRight: '8px',
									display: 'flex',
									flexDirection: 'column'
								}}
							>
								<label
									style={{
										fontSize: '12px',
										color: '#606060',
										fontWeight: 'bold'
									}}
								>
									{priceCard()} ₽
								</label>
								<label
									style={{
										fontSize: '12px',
										color: '#BFBFBF',
										lineHeight: '12px'
									}}
								>
									C картой
								</label>
							</div>
							<div
								style={{
									paddingRight: '8px',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'end'
								}}
							>
								<label
									style={{
										fontSize: '12px',
										color: '#606060'
									}}
								>
									{product.price.price} ₽
								</label>
								<label
									style={{
										fontSize: '12px',
										color: '#BFBFBF',
										lineHeight: '12px'
									}}
								>
									Обычная
								</label>
							</div>
							<label style={{ fontSize: '12px', color: '#606060' }}>за шт.</label>
							<div
								style={{
									backgroundColor: '#FF6633',
									height: '100%',
									width: '53px',
									margin: '4px 8px 4px 8px',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: '4px'
								}}
							>
								<label style={{ fontSize: '16px', color: '#FFFFFF' }}>
									-{product.price.discount} %
								</label>
							</div>
						</div>
					)}
				</div>

				<div
					style={{
						width: '100px',
						display: 'flex',
						flexDirection: 'row',
						backgroundColor: '#70C05B',
						justifyContent: 'space-around',
						height: '40px',
						alignItems: 'center',
						borderRadius: '4px'
					}}
				>
					<IconButton
						onClick={() =>
							cart?.counter !== undefined && cart?.counter > 1
								? updateCarts({ ...cart, counter: cart.counter - 1 })
								: 1
						}
						style={{ height: '24px', width: '24px', color: '#FFFFFF' }}
					>
						-
					</IconButton>

					<label style={{ color: '#FFFFFF' }}>{cart.counter}</label>
					<IconButton
						style={{ height: '24px', width: '24px', color: '#FFFFFF' }}
						onClick={() => updateCarts({ ...cart, counter: cart.counter + 1 })}
					>
						+
					</IconButton>
				</div>
				{!product.price.discount && (
					<label
						style={{
							fontWeight: 'bold',
							fontSize: '18px',
							width: '120px',
							textAlign: 'end',
							marginRight: '8px'
						}}
					>
						{getSummProduct()} ₽
					</label>
				)}
				{product.price.discount && (
					<div
						style={{
							width: '120px',
							display: 'flex',
							flexDirection: 'column',
							marginRight: '8px'
						}}
					>
						<label
							style={{
								fontWeight: 'bold',
								fontSize: '18px',
								textAlign: 'end'
							}}
						>
							{getSummDiscont()} ₽
						</label>
						<label
							style={{
								fontSize: '16px',
								color: '#8F8F8F',
								textDecoration: 'line-through',
								textAlign: 'end'
							}}
						>
							{getSummProduct()} ₽
						</label>
					</div>
				)}
			</Stack>
		</Card>
	)
}
export default ItemCart
