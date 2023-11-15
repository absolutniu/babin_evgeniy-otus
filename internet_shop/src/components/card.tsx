import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

import { IProduct } from '../types/product'
import logo from './../asset/images/1.png'

import cardStyle from './card.module.css'
import FavoriteButton from './favoriteButton'
import RatingButton from './ratingButton'
import CartButton from './cartButton'
function сard(props: { product: IProduct }) {
	const product = props.product

	const parseText = (text: string, limit: number) => {
		if (text.length > limit) {
			for (let i = limit; i > 0; i--) {
				if (
					text.charAt(i) === ' ' &&
					(text.charAt(i - 1) !== ',' || text.charAt(i - 1) !== '.' || text.charAt(i - 1) !== ';')
				) {
					return text.substring(0, i) + '...'
				}
			}
			return text.substring(0, limit) + '...'
		} else return text
	}
	const priceCard = () => {
		if (product.price.discount)
			return product.price.price - (product.price.price * product.price.discount) / 100
		return product.price.price
	}

	return (
		<Card className={cardStyle.card} key={product.id}>
			<div className={cardStyle.media}>
				<FavoriteButton id={product.id} sx={{ position: 'absolute', left: '82%' }} />

				<CardMedia component="img" src={logo} />
				{!!product.price.discount && (
					<div className={cardStyle.notice}>
						<label className={cardStyle.noticeText}>{product.price.discount} %</label>
					</div>
				)}
			</div>
			<CardContent className={cardStyle.cardContent} sx={{ margin: 0, padding: '8px' }}>
				<div className={cardStyle.priceContainer}>
					<div className={cardStyle.priceBlock}>
						<label className={cardStyle.priceCard}>{priceCard()} ₽</label>
						{!!product.price.discount && <label className={cardStyle.labelCard}>С картой</label>}
					</div>

					{!!product.price.discount && (
						<div className={cardStyle.priceBlock}>
							<label className={cardStyle.priceNoCard}>{product.price.price} ₽</label>
							<label className={cardStyle.labelCard}>Обычная</label>
						</div>
					)}
				</div>
				<div className={cardStyle.desc}>
					<label>{parseText(product.name, 54)}</label>
				</div>

				<RatingButton id={product.id} />

				<CardActions className={cardStyle.cardActions}>
					<CartButton id={product.id} />
				</CardActions>
			</CardContent>
		</Card>
	)
}
export default сard
