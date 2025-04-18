import React from 'react'
import { Box, useBreakpointValue, Image } from '@chakra-ui/react'
import pathToCards from '@constants/path-to-cards'
import Head from 'next/head'

export type TradingCardProps = {
  source: string
  playerName: string
  rarity: string
  className?: string
}

const TradingCard = ({
  source,
  playerName,
  rarity,
  className,
}: TradingCardProps) => {
  const aspectRatio = useBreakpointValue({ base: 4 / 6, md: 3 / 4 })
  const maxHeight = useBreakpointValue({ base: '70vh', md: '80vh' })

  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/cardback.png" />
      </Head>
      <Box
        width="100%"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
      >
        <Box
          width="auto"
          height={`min(${maxHeight}, 100%)`}
          position="relative"
          aspectRatio={aspectRatio}
        >
          <Image
            src={`${pathToCards}${source}`}
            alt={`${rarity} ${playerName}`}
            loading="lazy"
            fallback={
              <div className="relative z-10">
                <Image src="/cardback.png" />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-20"></div>
              </div>
            }
            objectFit="contain"
            width="100%"
            height="100%"
            className={`rounded-sm ${className}`}
          />
        </Box>
      </Box>
    </>
  )
}

export default TradingCard
