import { QueryClient, useMutation, useQueryClient } from 'react-query'
import { PATCH } from '@constants/http-methods'
import axios, { AxiosResponse } from 'axios'
import { UseGetApprovedCardsKey } from '@pages/api/queries/use-get-approved-cards'
import { UseGetUnapprovedCardsKey } from '@pages/api/queries/use-get-unapproved-cards'
import { UseGetRequestedCardsKey } from '@pages/api/queries/use-get-requested-cards'
import { UseGetAllCardsKey } from '@pages/api/queries/use-get-all-cards'
import { invalidateQueries } from './invalidate-queries'
import { useToast } from '@chakra-ui/react'
import { errorToastOptions, successToastOptions } from '@utils/toast'

type UseAcceptCardRequest = {
  cardID: number
}

type UseAcceptCard = {
  acceptCard: (UseAcceptCardRequest) => void
  response: AxiosResponse
  isSuccess: boolean
  isLoading: boolean
  isError: any
}

const useAcceptCard = (): UseAcceptCard => {
  const toast = useToast()
  const queryClient: QueryClient = useQueryClient()
  const { mutate, data, error, isLoading, isSuccess } = useMutation(
    async ({ cardID }: UseAcceptCardRequest) => {
      return await axios({
        method: PATCH,
        url: `/api/v2/cards/${cardID}/accept`,
      })
    },
    {
      onSuccess: async () => {
        invalidateQueries(queryClient, [
          UseGetAllCardsKey,
          UseGetApprovedCardsKey,
          UseGetUnapprovedCardsKey,
          UseGetRequestedCardsKey,
        ])
        toast({ title: 'Card Accepted', ...successToastOptions })
      },
      onError: () => {
        toast({ title: 'Error Accepting Card', ...errorToastOptions })
      },
    }
  )
  return {
    acceptCard: mutate,
    response: data,
    isSuccess: isSuccess,
    isLoading: isLoading,
    isError: error,
  }
}

export default useAcceptCard
