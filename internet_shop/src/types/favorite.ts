export interface IFavorite {
	id?: string
	userId?: string
	productId: string
	isFavorite?: boolean
}
export class CFavorite {
	id = ''
	userId = ''
	productId = ''
	isFavorite? = false
}
