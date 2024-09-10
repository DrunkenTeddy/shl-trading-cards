import { NextRouter, useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { Link } from './Link'
import { IceLevelLogo } from './IceLevelLogo'
import { useSession } from 'contexts/AuthContext'
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MoonIcon,
  SunIcon,
} from '@chakra-ui/icons'
import { useQuery } from 'react-query'
import axios from 'axios'
import { GET } from '@constants/http-methods'
import classNames from 'classnames'

const CURRENT_PAGE_LINK_CLASSES =
  'border-b-0 sm:border-b-[4px] border-l-[4px] sm:border-l-0 pt-0 sm:pt-[4px] pr-[14px] sm:pr-[10px] border-secondary dark:border-secondaryDark'
const LINK_CLASSES =
  '!hover:no-underline flex h-12 w-full items-center justify-center px-[10px] text-sm font-bold capitalize !text-secondaryText dark:!text-secondaryTextDark hover:bg-borderblue dark:hover:bg-borderblueDark sm:h-full sm:w-max'

const linkClasses = (router: NextRouter, path: string): string =>
  classNames(
    router.asPath.startsWith(path) && CURRENT_PAGE_LINK_CLASSES,
    LINK_CLASSES
  )

export const Header = ({ showAuthButtons = true }) => {
  // const [drawerVisible, setDrawerVisible] = useState(false)
  const { session, loggedIn, handleLogout } = useSession()
  const router = useRouter()

  const { toggleColorMode } = useColorMode()
  const isDarkMode = useColorModeValue(false, true)

  const { data } = useQuery<{ username: string; avatar: string }>({
    queryKey: ['baseUser', session?.token],
    queryFn: () =>
      axios({
        url: 'api/v3/user',
        method: GET,
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      }),
  })

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
    }
  }, [isDarkMode])

  const handleToggleDarkMode = () => {
    const newIsDarkMode: boolean = !isDarkMode
    toggleColorMode()
    localStorage.setItem('theme', newIsDarkMode ? 'dark' : 'light')
  }

  return (
    <div>
      <div
        className="z-50 h-16 w-full bg-primary dark:bg-primaryDark"
        role="navigation"
        aria-label="Header"
      >
        <div className="relative mx-auto flex flex-row h-full w-full items-center justify-between px-[5%] sm:w-11/12 sm:justify-start sm:p-0 lg:w-3/4">
          <Link
            href="/"
            className="m-0 h-full transition-all"
            aria-label="Ice Level Homepage"
          >
            <IceLevelLogo className="relative top-[5%] h-[90%] sm:top-[2.5%]" />
          </Link>
          <Link href="/community" className={linkClasses(router, '/community')}>
            Community
          </Link>
          <Link
            href="/collection"
            className={linkClasses(router, '/collection')}
          >
            Collection
          </Link>
          <Link href="/trade-hub" className={linkClasses(router, '/trade-hub')}>
            Trade Hub
          </Link>
          <Link href="/pack-shop" className={linkClasses(router, '/pack-shop')}>
            Pack Shop
          </Link>
          <Link
            href="/open-packs"
            className={linkClasses(router, '/open-packs')}
          >
            Open Packs
          </Link>
          <Menu>
            <MenuButton className={linkClasses(router, '/admin')}>
              Admin
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => router.push('/admin/cards')}>
                Cards
              </MenuItem>
              <MenuItem onClick={() => router.push('/admin/users')}>
                Users
              </MenuItem>
              <MenuItem onClick={() => router.push('/admin/scripts')}>
                Scripts
              </MenuItem>
            </MenuList>
          </Menu>
          <IconButton
            aria-label={`Toggle Dark Mode`}
            icon={
              localStorage.getItem('theme') === 'dark' ? (
                <SunIcon />
              ) : (
                <MoonIcon />
              )
            }
            onClick={handleToggleDarkMode}
            variant="ghost"
            color="white"
          />
          {!loggedIn && showAuthButtons && (
            <Button onClick={() => router.push('/login')}>Log In</Button>
          )}
          {loggedIn && showAuthButtons && (
            <Menu isLazy>
              {({ isOpen }) => (
                <>
                  <MenuButton className="font-mont text-secondaryText hover:underline dark:text-secondaryTextDark">
                    <div className="flex h-full items-center space-x-1">
                      <span className="hidden sm:inline">{data.username}</span>
                      {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      <Avatar
                        size="sm"
                        name={data.username}
                        src={data.avatar}
                      />
                    </div>
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
          )}
        </div>
      </div>
    </div>
  )
}
