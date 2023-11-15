import { Button, FormControlLabel, Switch } from '@mui/material'

import { useGetCartsQuery } from '../store/serviceApi/cart.api'
import { useEffect, useState } from 'react'
import { useGetUserId } from '../hooks/useGetUserId'
import { useGetIndividualCardByUserIdQuery } from '../store/serviceApi/individualCard.api'
import { useGetProductsQuery } from '../store/serviceApi/product.api'
import { IProduct } from '../types/product'
import { ICartsSelect } from '../types/cart'
import { Link } from 'react-router-dom'
import { CIndividualCard, IIndividualCard } from '../types/individualCard'

function CartPrice({ ...props }) {
	const [carts, setCarts] = useState<ICartsSelect[]>([])
	const [individualCard, setIndividualCard] = useState<IIndividualCard>(new CIndividualCard())
	const [discont, setDiscont] = useState(true)
	const { product } = useGetProductsQuery(undefined, {
		selectFromResult: ({ data }) => ({ product: data ?? ([] as IProduct[]) })
	})
	const { cart } = useGetCartsQuery(undefined, {
		selectFromResult: ({ data }) => ({ cart: data ?? ([] as ICartsSelect[]) })
	})
	const {
		data: cartsQuery,
		isSuccess: isSuccessCarts,
		isFetching: isFetchingCarts
	} = useGetCartsQuery()

	const { userId } = useGetUserId()
	const {
		data: individualCardQuery,
		isSuccess: isSuccessIndividual,
		isFetching: isFetchingIndividual
	} = useGetIndividualCardByUserIdQuery(userId)

	useEffect(() => {
		if (isSuccessCarts) setCarts(cartsQuery)
		if (isSuccessIndividual) setIndividualCard(individualCardQuery)
	}, [isFetchingCarts, isFetchingIndividual])

	const selectProductsCounter = () => {
		let counter = 0
		cart.map(item => {
			if (item.isSelected) counter = counter + 1
			return counter
		})
		return counter
	}
	const getProductPrice = (productId: string) => {
		return product.find(product => product.id === productId)?.price
	}
	const summDiscont = () => {
		const summ = carts.reduce((a, item) => {
			const price = getProductPrice(item.productId)
			const productPrice = price?.price ?? 0
			const productDiscont = price?.discount ?? 0
			if (price?.discount !== undefined && item.isSelected && item.isCarts) {
				const test = (item.counter * productPrice * productDiscont) / 100
				return a + test
			} else return a
		}, 0)
		return Number(summ.toFixed(2))
		return 0
	}

	const summNotDiscont = () => {
		const summ = carts.reduce((a, item) => {
			const price = getProductPrice(item.productId)
			const productPrice = price?.price ?? 0
			if (item.isSelected) {
				const test = item.counter * productPrice
				return a + test
			} else return a
		}, 0)
		return Number(summ.toFixed(2))
		return 0
	}
	const total = summNotDiscont() - summDiscont()
	const totalSumm = () => {
		let summ = 0
		const calcBonusSumm = Number(discont ? individualCard.total : 0)
		const isBonusSumm = total - Number(discont ? individualCard.total : 0) > 1
		if (isBonusSumm) summ += total - calcBonusSumm
		else {
			summ += calcBonusSumm - total - 1
		}
		return summ.toFixed(2)
	}

	return (
		<div className={props.className}>
			<div className="flex flex-col pt-5  pl-4 w-full">
				<FormControlLabel
					label={'Списать ' + individualCard.total + ' ₽'}
					defaultChecked
					control={
						<Switch checked={discont} onChange={event => setDiscont(event.target.checked)} />
					}
				/>
				<label className="pt-5">На карте накоплено {individualCard.total} ₽</label>
				<div className="flex flex-row  justify-between pt-12">
					<div className="flex flex-col text-gray">
						<label>Кол-во: {selectProductsCounter()}</label>
						<label>Скидка</label>
					</div>
					<div className="flex flex-col items-end ">
						<label>{summNotDiscont()} ₽</label>
						<label className="text-primary font-bold">- {summDiscont()} ₽</label>
					</div>
				</div>
				<div className="flex flex-row justify-between pt-14 text-main">
					<div>
						<label className="text-12xl font-bold">Итог</label>
					</div>
					<div>
						<label>{totalSumm()}₽</label>
					</div>
				</div>
				<label className="text-center text-secondary">Вы получяете 100 бонусов</label>
				{Number(totalSumm()) < 1000 && (
					<div className="pt-18 bg-error h-6 mt-8 text-white text-center align-middle rounded">
						<label>Минимальная сумма заказа 1000р</label>
					</div>
				)}
				{Number(totalSumm()) > 1000 && <div className="pt-18 h-6 mt-8"></div>}

				<Button sx={{ marginTop: '16px' }} variant="contained">
					<Link to="/delivery">Оформить заказ</Link>
				</Button>
			</div>
		</div>
	)
}
export default CartPrice
