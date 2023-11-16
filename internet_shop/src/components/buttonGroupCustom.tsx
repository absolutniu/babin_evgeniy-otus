import { FC, useState } from 'react'

interface IButtonProps {
	label: string
	disabled: boolean
}
interface IButtonGroupProps {
	data: IButtonProps[]
	className: string
}
const ButtonGroupCustom: FC<IButtonGroupProps> = ({ className, data }) => {
	const [selectedButton, setSelectedButton] = useState<number | null>(null)
	const getColor = (index: number, style: string) =>
		selectedButton === index
			? 'bg-secondary text-white ' + style
			: 'bg-white text-grayscale ' + style
	return (
		<div className={className}>
			<label className="text-gray">Время</label>
			<div className="flex flex-row h-full">
				{data.map((button, index) => (
					<button
						className={getColor(index, 'w-full rounded')}
						key={index}
						disabled={button.disabled}
						onClick={() => setSelectedButton(index)}
					>
						{button.label}
						{selectedButton === index}
					</button>
				))}
			</div>
		</div>
	)
}

export default ButtonGroupCustom
