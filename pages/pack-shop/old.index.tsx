import React from 'react'
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import styled from 'styled-components'
import Router from 'next/router'
import { packsMap } from '@constants/index'
import { PageHeader } from '@components/index'
import { useBuyPack } from '@pages/api/mutations'
import { getUidFromSession } from '@utils/index'
import { AxiosResponse } from 'axios'

const OpenPacksScreen = styled.div`
  @media only screen and (max-width: 768px) {
    margin: 10px;
  }

  @media only screen and (min-width: 768px) {
    margin: 10px;
  }
`
const ImageItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledImage = styled.img`
  cursor: pointer;
  transition: all ease 200ms;
  &:hover {
    transform: scale(1.05);
  }
`

const StyledBarContainer = styled.div`
  text-align: center;
`

type UseBuyPack = {
  buyPack: Function
  response: AxiosResponse
  isLoading: boolean
  isError: any
}

const OpenPacks = () => {
  const { buyPack, response, isLoading, isError }: UseBuyPack = useBuyPack()

  if (response?.data?.purchaseSuccessful) {
    Router.push('/pack-shop/pack-viewer')
  }

  return (
    <OpenPacksScreen>
      <PageHeader>Pack Shop</PageHeader>
      <ImageList gap={16} rowHeight={400} cols={3}>
        {packsMap.map((pack: PackType) => {
          const { key, label, imageUrl } = pack
          return (
            <ImageListItem key={key}>
              <ImageItem>
                <StyledImage
                  height={'400px'}
                  src={imageUrl}
                  onClick={() => {
                    buyPack({ uid: getUidFromSession(), packType: pack.key })
                  }}
                />
              </ImageItem>
              <StyledBarContainer>
                <ImageListItemBar
                  position={'bottom'}
                  title={`Open ${label} Pack`}
                />
              </StyledBarContainer>
            </ImageListItem>
          )
        })}
      </ImageList>
    </OpenPacksScreen>
  )
}

export default OpenPacks