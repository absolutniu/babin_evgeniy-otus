import { CPrice, IPrice } from './price'
import { CRating, IRating } from './rating'

export interface IProduct {
	id: string
	mainImage: string
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
	image = []
	rating = new CRating()
	name = ''
	price = new CPrice()
	articul = ''
	brend = ''
	mass = ''
	made = ''
	mainImage = ''
}
export interface IProductCatalog extends IProduct {
	category: string
}
export interface IProductDetail extends IProduct {
	articul: string
	brend: string
	mass: string
	made: string
	image: Array<string>
}
