export interface IRating {
	id: string
	productId: string
	totalVote: number
	rating: number
}

export class CRating {
	id = ''
	productId = ''
	totalVote = 0
	rating = 0
}
