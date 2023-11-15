import IconButton from '@mui/material/IconButton/IconButton'
import {
	useGetFavoriteByProductIdQuery,
	useUpdateFavoritesMutation
} from '../store/serviceApi/favotite.api'
import { useEffect, useState } from 'react'
import { CFavorite, IFavorite } from '../types/favorite'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

function FavoriteButton({ ...props }) {
	const [favorite, setFavorite] = useState<IFavorite>(new CFavorite())
	const {
		data: favoriteQuery,
		isFetching: isFetchingFavorite,
		isSuccess: isSuccessFavorite
	} = useGetFavoriteByProductIdQuery(props.id)
	const [updateFavorites] = useUpdateFavoritesMutation()
	useEffect(() => {
		if (isSuccessFavorite) setFavorite(favoriteQuery)
	}, [isFetchingFavorite])

	return (
		<div>
			<IconButton
				color={favorite?.isFavorite ? 'primary' : 'default'}
				onClick={() => {
					updateFavorites(favorite)
				}}
				sx={props.sx}
			>
				{favorite?.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
			</IconButton>
			{props.label && <label className="text-sm text-grey10">В избранное</label>}
		</div>
	)
}
export default FavoriteButton
