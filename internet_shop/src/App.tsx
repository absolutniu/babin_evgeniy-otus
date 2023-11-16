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
import DetailCard from './page/detailCard'
import { Favorite } from './components/favorite'
import Main from './page/main'
import Delivery from './page/delivery'

function App() {
	const [searchValue, setSearchValue] = useState('')
	const [category, setCategory] = useState<string>('')

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
						<Route path="/DetailCard/:id" element={<DetailCard />} />
						<Route path="/Delivery" element={<Delivery />} />
					</Routes>
				</div>
			</ThemeProvider>
		</BrowserRouter>
	)
}

export default App
