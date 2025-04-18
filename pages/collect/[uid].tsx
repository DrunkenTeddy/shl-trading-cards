import { CheckIcon } from '@chakra-ui/icons'
import {
  Badge,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Progress,
  Select,
  SimpleGrid,
  Spinner,
  Switch,
  VStack,
} from '@chakra-ui/react'
import DisplayCollection from '@components/collection/DisplayCollection'
import { PageWrapper } from '@components/common/PageWrapper'
import CardLightBoxModal from '@components/modals/CardLightBoxModal'
import TablePagination from '@components/table/TablePagination'
import { GetServerSideProps } from 'next'
import { GET } from '@constants/http-methods'
import { rarityMap } from '@constants/rarity-map'
import { allTeamsMaps, shlTeamMap, iihfTeamsMap } from '@constants/teams-map'
import { query } from '@pages/api/database/query'
import { ListResponse, SortDirection } from '@pages/api/v3'
import {
  OwnedCard,
  OwnedCardSortOption,
  OwnedCardSortValue,
} from '@pages/api/v3/collection/uid'
import { UserData } from '@pages/api/v3/user'
import axios from 'axios'
import { useSession } from 'contexts/AuthContext'
import { pluralizeName } from 'lib/pluralize-name'
import filterTeamsByLeague from 'utils/filterTeamsByLeague'
import { Fragment, useEffect, useState } from 'react'
import DisplayPacks from '@components/collection/DisplayPacks'
import { toggleOnfilters } from '@utils/toggle-on-filters'
import { useCookie } from '@hooks/useCookie'
import config from 'lib/config'
import { useDebounce } from 'use-debounce'
import ImageWithFallback from '@components/images/ImageWithFallback'

const SORT_OPTIONS: OwnedCardSortOption[] = [
  {
    value: 'overall',
    label: 'Overall',
    sortLabel: (direction: SortDirection) =>
      direction === 'DESC' ? '(Descending)' : '(Ascending)',
  },
  {
    value: 'player_name',
    label: 'Player Name',
    sortLabel: (direction: SortDirection) =>
      direction === 'DESC' ? '(A-Z)' : '(Z-A)',
  },
  {
    value: 'teamID',
    label: 'Team Name',
    sortLabel: (direction: SortDirection) =>
      direction === 'DESC' ? '(A-Z)' : '(Z-A)',
  },
  {
    value: 'quantity',
    label: 'Cards Owned',
    sortLabel: (direction: SortDirection) =>
      direction === 'DESC' ? '(Most to Least)' : '(Least to Most)',
  },
  {
    value: 'season',
    label: 'Draft Season',
    sortLabel: (direction: SortDirection) =>
      direction === 'DESC' ? '(S1->Present)' : '(Present->S1)',
  },
] as const

const ROWS_PER_PAGE: number = 12 as const

const LOADING_GRID_DATA: { rows: OwnedCard[] } = {
  rows: Array.from({ length: ROWS_PER_PAGE }, (_, index) => ({
    quantity: 1,
    cardID: index,
    teamID: 1,
    teamName: 'name',
    teamNickName: 'nickName',
    player_name: 'player_name',
    position: 'F',
    season: 1,
    card_rarity: 'Bronze',
    image_url: 'image_url',
    overall: 1,
    skating: 1,
    shooting: 1,
    hands: 1,
    checking: 1,
    defense: 1,
    high_shots: 1,
    low_shots: 1,
    quickness: 1,
    control: 1,
    conditioning: 1,
    playerID: 1,
  })),
} as const

export default ({ uid }: { uid: string }) => {
  const [totalCards, setTotalCards] = useState<number>(0)
  const [totalOwnedCards, setTotalOwnedCards] = useState<number>(0)
  const { session } = useSession()
  const [showNotOwnedCards, setShowNotOwnedCards] = useState<boolean>(false)
  const [playerName, setPlayerName] = useState<string>('')
  const [teams, setTeams] = useState<string[]>([])
  const [leagues, setLeague] = useState<string[]>([])
  const [rarities, setRarities] = useState<string[]>([])
  const [lightBoxIsOpen, setLightBoxIsOpen] = useState<boolean>(false)
  const [selectedCard, setSelectedCard] = useState<CollectionCard | null>(null)
  const [sortColumn, setSortColumn] = useState<OwnedCardSortValue>(
    SORT_OPTIONS[0].value
  )
  const [sortDirection, setSortDirection] = useState<SortDirection>('DESC')
  const [tablePage, setTablePage] = useState<number>(1)
  const [otherUID, setOtherUID] = useState<string>('')
  const [debouncedPlayerName] = useDebounce(playerName, 500)

  const [loggedInUID] = useCookie(config.userIDCookieName)

  const setFilteredUID = (value: boolean) => {
    if (value) {
      setOtherUID(loggedInUID)
    } else {
      setOtherUID('')
    }
  }
  const { payload: user, isLoading: userIsLoading } = query<UserData>({
    queryKey: ['collectionUser', session?.token, uid],
    queryFn: () =>
      axios({
        method: GET,
        url: `/api/v3/user/${uid}`,
      }),
  })

  const { payload, isLoading, refetch } = query<ListResponse<OwnedCard>>({
    queryKey: [
      'collection',
      uid,
      debouncedPlayerName,
      JSON.stringify(teams),
      JSON.stringify(rarities),
      JSON.stringify(leagues),
      String(tablePage),
      sortColumn,
      sortDirection,
      String(showNotOwnedCards),
      otherUID,
    ],
    queryFn: () =>
      axios({
        method: GET,
        url: `/api/v3/collection/uid`,
        params: {
          uid,
          playerName:
            debouncedPlayerName.length >= 1 ? debouncedPlayerName : '',
          teams: JSON.stringify(teams),
          rarities: JSON.stringify(rarities),
          leagues: JSON.stringify(leagues),
          limit: ROWS_PER_PAGE,
          offset: Math.max((tablePage - 1) * ROWS_PER_PAGE, 0),
          sortColumn,
          sortDirection,
          showNotOwnedCards,
          otherUID: otherUID,
        },
      }),
  })
  useEffect(() => {
    if (payload) {
      setTotalCards(payload.total)
      setTotalOwnedCards(payload.totalOwned)
    }
  }, [payload])

  useEffect(() => {
    refetch()
  }, [
    uid,
    playerName,
    teams,
    rarities,
    sortColumn,
    sortDirection,
    tablePage,
    showNotOwnedCards,
    otherUID,
  ])

  const toggleLeague = (league: string) => {
    setLeague([league])
  }

  const toggleTeam = (team: string) => {
    setTeams((currentValue) => toggleOnfilters(currentValue, team))
  }

  const toggleRarity = (rarity: string) => {
    setRarities((currentValue) => toggleOnfilters(currentValue, rarity))
  }

  const getActiveFilters = () => {
    const activeFilters = []
    const selectedTeamMap = rarities.includes('IIHF Awards')
      ? iihfTeamsMap
      : shlTeamMap

    if (teams.length > 0) {
      activeFilters.push(
        `Teams: ${teams.map((id) => selectedTeamMap[id]?.label).join(', ')}`
      )
    }
    if (rarities.length > 0) {
      activeFilters.push(
        `Rarities: ${rarities.map((r) => rarityMap[r]?.label || r).join(', ')}`
      )
    }
    return activeFilters.join(' | ')
  }
  return (
    <PageWrapper>
      <div className="border-b-8 border-b-blue700 bg-secondary p-4 text-lg font-bold text-secondaryText sm:text-xl">
        {userIsLoading ? (
          <Spinner />
        ) : (
          <div>{pluralizeName(user?.username)}&nbsp;Collection</div>
        )}
      </div>
      <div className="mb-3" />
      {payload && payload.totalOwned !== null && (
        <DisplayCollection uid={uid} />
      )}
      <div className="mb-3" />
      {payload && payload.totalOwned !== null && <DisplayPacks userID={uid} />}
      <div className="mb-3" />

      <div className="border-b-8 border-b-blue700 bg-secondary p-4 text-lg font-bold text-secondaryText sm:text-xl mb-6">
        Filters
      </div>
      <VStack spacing={4} align="stretch" className="px-4">
        <FormControl>
          <Input
            className="w-full bg-secondary border-grey100"
            placeholder="Search By Player Name"
            size="lg"
            onChange={(event) => setPlayerName(event.target.value)}
          />
        </FormControl>
        <div className="flex flex-col sm:flex-row justify-start items-stretch gap-4">
          <FormControl className="w-full sm:w-auto">
            <Menu closeOnSelect={false}>
              <MenuButton className="w-full sm:w-auto border-grey800 border-1 rounded p-2 cursor-pointer bg-secondary hover:bg-highlighted/40 ">
                Teams&nbsp;{`(${teams.length})`}
              </MenuButton>
              <MenuList>
                <MenuOptionGroup type="checkbox">
                  <MenuItemOption
                    className="hover:bg-highlighted/40"
                    icon={null}
                    isChecked={false}
                    aria-checked={false}
                    closeOnSelect
                    onClick={() => setTeams([])}
                  >
                    Deselect All
                  </MenuItemOption>
                  {filterTeamsByLeague(allTeamsMaps, rarities).map(
                    ([key, value]) => {
                      const isChecked: boolean = teams.includes(
                        String(value.teamID)
                      )
                      return (
                        <MenuItemOption
                          className="hover:bg-highlighted/40"
                          icon={null}
                          isChecked={isChecked}
                          aria-checked={isChecked}
                          key={value.teamID}
                          value={String(value.teamID)}
                          onClick={() => {
                            toggleTeam(String(value.teamID))
                            toggleLeague(value.league)
                          }}
                        >
                          {value.label}
                          {isChecked && <CheckIcon className="mx-2" />}
                        </MenuItemOption>
                      )
                    }
                  )}
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </FormControl>
          <FormControl className="w-full sm:w-auto">
            <Menu closeOnSelect={false}>
              <MenuButton className="w-full sm:w-auto border-grey800 border-1 rounded p-2 cursor-pointer bg-secondary hover:bg-highlighted/40">
                Rarities&nbsp;{`(${rarities.length})`}
              </MenuButton>
              <MenuList>
                <MenuOptionGroup type="checkbox">
                  <MenuItemOption
                    className="hover:bg-highlighted/40"
                    icon={null}
                    isChecked={false}
                    aria-checked={false}
                    closeOnSelect
                    onClick={() => {
                      if (rarities.includes('IIHF Awards')) {
                        setTeams([])
                      }
                      setRarities([])
                    }}
                  >
                    Deselect All
                  </MenuItemOption>
                  {Object.entries(rarityMap).map(([key, value]) => {
                    const isChecked: boolean = rarities.includes(value.label)

                    // Disable selection of any IIHF Awards and another rarity because trying to select different leagues teams at the same time with the same ID is hell
                    const isDisabled =
                      (value.label === 'IIHF Awards' &&
                        rarities.length > 0 &&
                        !rarities.includes('IIHF Awards')) ||
                      (rarities.includes('IIHF Awards') &&
                        value.label !== 'IIHF Awards')

                    return (
                      <MenuItemOption
                        className="hover:bg-highlighted/40"
                        icon={null}
                        isChecked={isChecked}
                        aria-checked={isChecked}
                        key={value.label}
                        value={value.label}
                        onClick={() => !isDisabled && toggleRarity(value.label)}
                        isDisabled={isDisabled}
                      >
                        {value.label}
                        {isChecked && <CheckIcon className="mx-2" />}
                      </MenuItemOption>
                    )
                  })}
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </FormControl>
        </div>
        <FormControl className="flex flex-row justify-start items-center">
          <FormLabel className="flex items-center mr-4">
            Show Unowned Cards
          </FormLabel>
          <Switch
            className="flex items-center"
            onChange={() => setShowNotOwnedCards(!showNotOwnedCards)}
          />
        </FormControl>
        {loggedInUID && loggedInUID !== uid && (
          <FormControl className="flex flex-row justify-start items-center">
            <FormLabel className="flex items-center mr-4">
              Filter Out Your Cards
            </FormLabel>
            <Switch
              className="flex items-center"
              placeholder="User ID"
              onChange={(e) => setFilteredUID(e.target.checked)}
            />
          </FormControl>
        )}
        <FormControl>
          <FormLabel>Sort</FormLabel>
          <Select
            className="cursor-pointer w-full sm:w-auto border-grey800 border-1 rounded px-2 !bg-secondary"
            onChange={(event) => {
              const [sortColumn, sortDirection] = event.target.value.split(
                ':'
              ) as [OwnedCardSortValue, SortDirection]
              setSortColumn(sortColumn)
              setSortDirection(sortDirection)
            }}
          >
            {SORT_OPTIONS.map((option, index) => (
              <Fragment key={`${option.value}-${index}`}>
                <option
                  className="!bg-secondary"
                  value={`${option.value}:DESC`}
                >
                  {option.label}&nbsp;{option.sortLabel('DESC')}
                </option>
                <option className="!bg-secondary" value={`${option.value}:ASC`}>
                  {option.label}&nbsp;{option.sortLabel('ASC')}
                </option>
              </Fragment>
            ))}
          </Select>
        </FormControl>
      </VStack>

      {showNotOwnedCards && (
        <div>
          Owned Cards: {totalOwnedCards} / {totalCards} (
          {((totalOwnedCards / totalCards) * 100).toFixed(2)}%)
        </div>
      )}
      {getActiveFilters() && (
        <div className="text-sm">Active Filters: {getActiveFilters()}</div>
      )}

      <SimpleGrid
        columns={{ base: 2, sm: 3, md: 4, lg: 6 }}
        spacing={4}
        className="mt-6 px-4"
      >
        {isLoading
          ? LOADING_GRID_DATA.rows.map((_, index) => (
              <div
                key={`loading-${index}`}
                className="m-4 flex flex-col relative max-w-xs sm:max-w-sm"
              >
                <div className="relative aspect-[3/4]">
                  <ImageWithFallback
                    src="/cardback.png"
                    alt="Loading card"
                    priority
                    fill
                    sizes="(max-width: 768px) 100vw, 256px"
                    style={{
                      objectFit: 'contain',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </div>
                <div className="mt-2">
                  <Progress size="xs" isIndeterminate />
                </div>
              </div>
            ))
          : payload?.rows.map((card, index) => (
              <div
                key={`${card.cardID}-${index}`}
                onClick={() => {
                  setSelectedCard(card)
                  setLightBoxIsOpen(true)
                }}
                className="m-4 relative transition ease-linear shadow-none hover:scale-105 hover:shadow-xl max-w-xs sm:max-w-sm aspect-[3/4]"
              >
                <ImageWithFallback
                  className={`cursor-pointer ${
                    card.quantity === 0 ? 'grayscale' : ''
                  }`}
                  src={`https://simulationhockey.com/tradingcards/${card.image_url}`}
                  alt={`${card.player_name} Card`}
                  loading="lazy"
                  fill
                  sizes="(max-width: 768px) 100vw, 256px"
                  style={{
                    objectFit: 'contain',
                    width: '100%',
                    height: '100%',
                  }}
                />
                <Badge className="z-30 absolute top-0 left-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform -translate-x-1/4 -translate-y-3/4 bg-neutral-800 rounded-full">
                  {`${card.card_rarity} - ${card.quantity}`}
                </Badge>
                {lightBoxIsOpen && (
                  <CardLightBoxModal
                    cardName={selectedCard.player_name}
                    cardImage={selectedCard.image_url}
                    owned={selectedCard.quantity}
                    rarity={selectedCard.card_rarity}
                    playerID={selectedCard.playerID}
                    cardID={selectedCard.cardID}
                    userID={uid}
                    setShowModal={() => setLightBoxIsOpen(false)}
                  />
                )}
              </div>
            ))}
      </SimpleGrid>
      <TablePagination
        totalRows={payload?.total}
        rowsPerPage={ROWS_PER_PAGE}
        onPageChange={(newPage) => setTablePage(newPage)}
      />
    </PageWrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { uid } = query

  return {
    props: {
      uid,
    },
  }
}
