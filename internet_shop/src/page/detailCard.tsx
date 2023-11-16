import IconButton from '@mui/material/IconButton/IconButton'
import CartButton from '../components/cartButton'
import FavoriteButton from '../components/favoriteButton'
import PriceField from '../components/priceText'
import RatingButton from '../components/ratingButton'
import ShareButton from '../components/shareButton'
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined'
import { useGetDetailProductByIdQuery } from '../store/serviceApi/product.api'
import { CProduct, IProductDetail } from '../types/product'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function DetailCard() {
	const params = useParams()
	const id = params.id ?? ''
	const [product, setProduct] = useState<IProductDetail>(new CProduct())
	const { data, isFetching, isSuccess } = useGetDetailProductByIdQuery(id)
	useEffect(() => {
		if (isSuccess) setProduct(data)
	}, [isFetching])
	return (
		<div className=" bg-background m-auto w-[1208px]">
			<div className="flex flex-col">
				<label className="text-bold text-2xl">{product.name}</label>
				<div className="flex flex-row mt-4 items-center	">
					<label className="pr-6 text-xs	">{product.articul}</label>
					<RatingButton id={product.id} />
					<label className="pr-6">отзывы</label>
					<ShareButton label />
					<FavoriteButton id={product.id} label />
				</div>
			</div>
			<div className="flex ">
				{product.image && (
					<div className="max-h-[496px]	overflow-auto	max-w-16 flex flex-col justify-between	">
						{product.image.map((img, index) => (
							<img src={img} key={index} className="h-[86px] w-16 "></img>
						))}
						{/* 			<img src={product.image} className="h-[86px] w-16 "></img>
					<img src={product.image} className="h-[86px] w-16 "></img>
					<img src={product.image} className="h-[86px] w-16 "></img>
					<img src={product.image} className="h-[86px] w-16 "></img>
					<img src={product.image} className="h-[86px] w-16 "></img> */}
					</div>
				)}

				{/* 	<CardMedia component="img" src={props.image} className="h-[100px]" /> */}

				<img src={product.mainImage} className="h-[496px] w-[504px] ml-4"></img>
				<div className="h-[496px]	w-[376px] flex flex-col  ml-4">
					<PriceField product={product} fontSizeDiscount="text-4xl" fontSize="text-2xl" reverse />
					<div className="h-16 w-full mt-4">
						<CartButton id={product.id} />
					</div>
					<label className="flex mt-4 justify-center text-secondary text-xs">
						Вы получите 10 бонусов
					</label>
					<div className="flex flex-row justify-center">
						<IconButton size="small">
							<NotificationsOffOutlinedIcon />
						</IconButton>
						<label className="text-xs flex items-center text-grayscale">
							Уведомить о снижении цены
						</label>
					</div>
					<div className="flex justify-between flex-row mt-6">
						<div className="flex  flex-col ">
							<label className="text-xs mt-1 px-2 py-1">Бренд</label>
							<label className="text-xs mt-1 px-2 py-1">Страна производителя</label>
							<label className="text-xs mt-1 px-2 py-1">Упаковка</label>
						</div>
						<div className="flex  flex-col">
							<label className="text-xs font-bold mt-1 px-2 py-1">{product.brend}</label>
							<label className="text-xs font-bold mt-1 px-2 py-1">{product.made}</label>
							<label className="text-xs font-bold mt-1 px-2 py-1">{product.mass} г</label>
						</div>
					</div>
				</div>
				<div className="max-h-[496px]	overflow-auto	w-[168px] flex flex-col justify-between ml-4">
					<label className="text-grayscale">Похожие</label>
					{/* 				<div className="h-[104px]">
						<img src={product.image} className="h-1/2 w-full"></img>
						<label className="font-bold h-1/2  w-full	flex justify-center items-center">Цена</label>
					</div>
					<div className="h-[104px]">
						<img src={product.image} className="h-1/2 w-full"></img>
						<label className="font-bold h-1/2  w-full	flex justify-center items-center">Цена</label>
					</div>

					<div className="h-[104px]">
						<img src={product.image} className="h-1/2 w-full"></img>
						<label className="font-bold h-1/2  w-full	flex justify-center items-center">Цена</label>
					</div>
					<div className="h-[104px]">
						<img src={product.image} className="h-1/2 w-full"></img>
						<label className="font-bold h-1/2  w-full	flex justify-center items-center">Цена</label>
					</div>
					<div className="h-[104px]">
						<img src={product.image} className="h-1/2 w-full"></img>
						<label className="font-bold h-1/2  w-full	flex justify-center items-center">Цена</label>
					</div> */}
				</div>
			</div>
		</div>
	)
}
export default DetailCard
