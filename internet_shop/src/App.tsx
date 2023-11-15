import ThemeProvider from '@mui/material/styles/ThemeProvider'
import appCss from './App.module.css'
import Theme from './Theme'
import Cart from './page/сart'
import { Menu } from './components/menu'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { OutputSearchCard } from './components/outputSearchCard'
import { useState } from 'react'
import { Catalog } from './components/catalog'
import { CarouselCatalogCard } from './components/carouselCatalogCard'
import { Favorite } from './components/favorite'
import Main from './page/main'

function App() {
	const [searchValue, setSearchValue] = useState('')
	const [category, setCategory] = useState<string>('')

	/* const product = {
		image:
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII',
		name: 'Page',
		category: 'Milk',
		articul: 'арт. 371431',
		price: {
			productId: '65247a1553f98048592a9bb9',
			price: 3334,
			discount: 78
		},
		id: '65247a1553f98048592a9bb9'
	} */
	return (
		<BrowserRouter>
			<ThemeProvider theme={Theme}>
				<div style={appCss} className="App bg-background">
					<Menu setSearchValue={setSearchValue}></Menu>
					<Routes>
						<Route path="/shopping_cart" Component={Cart} />
						<Route path="/search" element={<OutputSearchCard value={searchValue} />} />
						<Route path="/" Component={Main} />
						<Route path="/favorite" Component={Favorite} />
						<Route path="/catalog" element={<Catalog setCategory={setCategory} />} />
						<Route path="/catalogProducts" element={<CarouselCatalogCard category={category} />} />
					</Routes>
					{/* <DetailCard product={product} /> */}
				</div>
			</ThemeProvider>
		</BrowserRouter>
	)
}

export default App
