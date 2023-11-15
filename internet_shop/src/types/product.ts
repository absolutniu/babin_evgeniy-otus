import { CPrice, IPrice } from './price'
import { CRating, IRating } from './rating'

export interface IProduct {
	id: string
	image: string
	rating: IRating
	name: string
	price: IPrice
}

export interface IProductSearch {
	id: string
	name: string
}

export class CProduct {
	id = ''
	image = ''
	rating = new CRating()
	name = ''
	price = new CPrice()
}
export interface IProductCatalog extends IProduct {
	category: string
}
