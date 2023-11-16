import { useEffect, useState } from 'react'
import { CCartsSelect, ICarts } from '../types/cart'
import { useGetCartByProductIdQuery, useUpdateCartsMutation } from '../store/serviceApi/cart.api'
import { Button } from '@mui/material'

function CartButton({ ...props }) {
	const [value, setValue] = useState<ICarts>(new CCartsSelect())
	const { data, isSuccess } = useGetCartByProductIdQuery(props.id, { skip: !props.id.length })

	const [updateCarts] = useUpdateCartsMutation()
	useEffect(() => {
		if (isSuccess) setValue(data)
	}, [data])

	return (
		<Button
			sx={{ margin: 0, padding: 0 }}
			className="h-full w-full normal-case"
			onClick={() => {
				updateCarts({ ...value, isCarts: !value.isCarts })
			}}
			color={value?.isCarts ? 'primary' : 'secondary'}
			variant={value?.isCarts ? 'contained' : 'outlined'}
		>
			В корзину
		</Button>
	)
}
export default CartButton
