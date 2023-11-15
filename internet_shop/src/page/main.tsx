import { CarouselCard } from '../components/carouselCard'

function Main() {
	return (
		<div>
			<div
				className="h-[200px] w-full"
				style={{
					background: ' url(' + require(`./../asset/images/image.png`) + ')'
				}}
			></div>
			<div className="pt-20">
				<CarouselCard label="Акции" hrefLabel="Все акции" count={4} value={[]} />
			</div>
			<div className="pt-32">
				<CarouselCard label="Новинки" hrefLabel="Все новинки" count={4} value={[]} />
			</div>
			<div className="pt-32">
				<CarouselCard label="Покупали раньше" hrefLabel="Все покупки" count={4} value={[]} />
			</div>
			<div>
				<div>Специальное предложение хедер</div>
				<div>
					<div>Покупали раньше Карусель</div>
					<div>Покупали раньше Карусель</div>
				</div>
			</div>
			<div>
				<div>Наши Магазины хедер</div>
				<div>карта</div>
			</div>
			<div>
				<div>Статьи хедер</div>
				<div>
					<div>карта</div>
					<div>карта</div>
				</div>
			</div>
		</div>
	)
}
export default Main
