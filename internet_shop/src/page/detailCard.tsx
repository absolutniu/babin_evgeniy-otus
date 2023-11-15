import FavoriteButton from '../components/favoriteButton'
import RatingButton from '../components/ratingButton'
import ShareButton from '../components/shareButton'

function DetailCard({ ...props }) {
	const { product } = props

	return (
		<div>
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
				<div className="max-h-[496px]	overflow-auto	max-w-[64px] flex flex-col justify-between	">
					<img src={props.image} className="h-[86px] w-[64px] "></img>
					<img src={props.image} className="h-[86px] w-[64px] "></img>
					<img src={props.image} className="h-[86px] w-[64px] "></img>
					<img src={props.image} className="h-[86px] w-[64px] "></img>
					<img src={props.image} className="h-[86px] w-[64px] "></img>
				</div>
				{/* 	<CardMedia component="img" src={props.image} className="h-[100px]" /> */}

				<img src={props.image} className="h-[496px] w-[504px] ml-4"></img>
				<div className="h-[496px]	w-[376px] flex flex-col  ml-4">Прайс</div>
				<div className="max-h-[496px]	overflow-auto	w-[168px] flex flex-col justify-between ml-4">
					<label className="text-grey10">Похожие</label>
					<div className="h-[104px]">
						<img src={props.image} className="h-1/2 w-full"></img>
						<label className="font-bold h-1/2  w-full	flex justify-center items-center">Цена</label>
					</div>
					<div className="h-[104px]">
						<img src={props.image} className="h-1/2 w-full"></img>
						<label className="font-bold h-1/2  w-full	flex justify-center items-center">Цена</label>
					</div>

					<div className="h-[104px]">
						<img src={props.image} className="h-1/2 w-full"></img>
						<label className="font-bold h-1/2  w-full	flex justify-center items-center">Цена</label>
					</div>
					<div className="h-[104px]">
						<img src={props.image} className="h-1/2 w-full"></img>
						<label className="font-bold h-1/2  w-full	flex justify-center items-center">Цена</label>
					</div>
					<div className="h-[104px]">
						<img src={props.image} className="h-1/2 w-full"></img>
						<label className="font-bold h-1/2  w-full	flex justify-center items-center">Цена</label>
					</div>
				</div>
			</div>
		</div>
	)
}
export default DetailCard
