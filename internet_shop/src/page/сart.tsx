import { Box, Button, Card, Checkbox, FormControlLabel, Stack } from '@mui/material'
import ItemCart from '../components/itemCart'
import { useGetCartsQuery, useUpdateCartsMutation } from '../store/serviceApi/cart.api'
import { useEffect, useState } from 'react'

import IndeterminateCheckBoxRoundedIcon from '@mui/icons-material/IndeterminateCheckBoxRounded'
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded'
import CartPrice from '../components/cartPrice'
import { ICartsSelect } from '../types/cart'

function Cart() {
	const [carts, setCarts] = useState<ICartsSelect[]>([])
	const [checked, setChecked] = useState(true)
	const [updateCard] = useUpdateCartsMutation()
	const { data: cartsQuery, isSuccess, isFetching } = useGetCartsQuery()

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked)
		carts.map(cart => updateCard({ ...cart, isSelected: event.target.checked }))
	}
	useEffect(() => {
		if (isSuccess) setCarts(cartsQuery)
	}, [isFetching])
	const handleDeleteSelected = () => {
		carts.map(item => {
			if (item?.isSelected) updateCard({ ...item, isCarts: false })
		})
	}

	return (
		<Card style={{ width: '1208px' }} className="m-auto bg-background">
			<div className="flex flex-row mb-16">
				<div className="text-main text-7xl font-bold">Корзина</div>
			</div>
			<div className="text-xs">
				<FormControlLabel
					sx={{
						'.MuiFormControlLabel-label': {
							fontSize: '12px'
						}
					}}
					control={
						<Checkbox
							sx={{
								color: '#70C05B'
							}}
							style={{ paddingLeft: '28px' }}
							icon={<CheckBoxRoundedIcon />}
							color="secondary"
							checked={checked}
							checkedIcon={<IndeterminateCheckBoxRoundedIcon />}
							onChange={handleChange}
							inputProps={{ 'aria-label': 'controlled' }}
						/>
					}
					label="Выделить всё"
				/>
				<Button
					style={{ paddingLeft: '12px' }}
					variant="text"
					onClick={() => {
						handleDeleteSelected()
					}}
				>
					<label className="text-primary text-xs normal-case	">Удалить выбранные</label>
				</Button>
			</div>
			<div className="flex flex-row">
				<Box className="w-3/4">
					<Stack spacing={2}>
						{carts?.map(cart => {
							return (
								<ItemCart
									key={cart?.id}
									cart={{
										...cart
									}}
								/>
							)
						})}
					</Stack>
				</Box>
				<CartPrice className="flex flex-row w-1/4" />
			</div>
		</Card>
	)
}
export default Cart
