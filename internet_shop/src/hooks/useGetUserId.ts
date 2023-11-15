import { useTypedSelector } from './useTypedSelector'

export const useGetUserId = () => {
	const userId = useTypedSelector(() => {
		return '65247a15c42649f6fcd32e1'
	})
	return { userId }
}
