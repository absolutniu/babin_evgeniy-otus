import { CRating, IRating } from '../types/rating'
import Rating from '@mui/material/Rating/Rating'
import {
	useGetRatingByProductIdQuery,
	useUpdateRatingMutation
} from '../store/serviceApi/rating.api'
import { useEffect, useState } from 'react'

function FavoriteButton({ ...props }) {
	const [value, setValue] = useState<IRating>(new CRating())
	const { data: ratingQuery, isFetching, isSuccess } = useGetRatingByProductIdQuery(props.id)

	const [updateRating] = useUpdateRatingMutation()
	useEffect(() => {
		if (isSuccess) setValue(ratingQuery)
	}, [isFetching])

	const onClickUpdateRating = (NewValue: number | null) => {
		if (!NewValue) NewValue = Math.round(value.rating)
		const ratingParam = (value.totalVote * value.rating + NewValue) / (value.totalVote + 1)
		const totalVote = value.totalVote + 1
		updateRating({
			...value,
			rating: ratingParam,
			totalVote: totalVote
		})
		console.log(value)
	}
	const getColor = () => {
		if (value?.rating <= 2) return 'red'
		else if (value?.rating > 2 && value?.rating <= 3) return 'yellow'
		else if (value?.rating > 3) return 'green'
	}
	return (
		<Rating
			key={props.id}
			name="simple-controlled"
			value={value?.rating}
			onChange={(_event, NewValue) => {
				onClickUpdateRating(NewValue)
			}}
			sx={{ color: () => getColor() }}
		/>
	)
}
export default FavoriteButton
