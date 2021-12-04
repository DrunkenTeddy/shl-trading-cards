import useSWR from 'swr'
import cards from '@utils/test-data/cards.json'

type UseUserCards = {
  userCards: any[]
  isLoading: boolean
  isError: boolean
}

const useUserCards = (username: string): UseUserCards => {
  const { data, error } = useSWR(() => ``)

  return {
    userCards: cards.data,
    isLoading: !data && !error,
    isError: error,
  }
}

export default useUserCards
