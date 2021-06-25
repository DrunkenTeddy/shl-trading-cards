import Loading from '@components/loading'
import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import { packs } from '@utils/constants'

const BuyPacks = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(false)
    }
    fetchData()
  })

  const handleOnClick = async (type) => {
    if (type === packs.regular) {
    }

    if (type === packs.challengeCup) {
    }

    return
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div>
      <Button
        onClick={() => {
          handleOnClick(packs.regular)
        }}
      >
        Buy Regular Pack
      </Button>
      <Button
        onClick={() => {
          handleOnClick(packs.challengeCup)
        }}
      >
        Buy Challenge Cup Pack
      </Button>
    </div>
  )
}

export default BuyPacks
