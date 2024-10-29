import React, { useState, useMemo } from 'react'
import axios from 'axios'
import {
  Skeleton,
  SkeletonText,
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Link,
  FormControl,
  FormLabel,
  Switch,
  Button,
  useDisclosure,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { GET } from '@constants/http-methods'
import { binders } from '@pages/api/v3'
import { query } from '@pages/api/database/query'
import { useRouter } from 'next/router'
import { useCookie } from '@hooks/useCookie'
import config from 'lib/config'
import CreateBinder from '@components/modals/CreateBinder'
import { useSession } from 'contexts/AuthContext'

const BinderTables = () => {
  const { loggedIn } = useSession()
  const router = useRouter()
  const [userIDQuery, setUserID] = useState<string>(null)
  const [uid] = useCookie(config.userIDCookieName)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { payload: binders, isLoading } = query<binders[]>({
    queryKey: ['users-binders', userIDQuery],
    queryFn: () =>
      axios({
        method: GET,
        url: `/api/v3/binder`,
        params: {
          userID: userIDQuery,
        },
      }),
  })

  const userBinders =
    binders?.filter((binder) => binder.userID === Number(uid)) || []
  const reachedLimit = useMemo(
    () => userBinders.length >= 5,
    [userBinders.length]
  )

  const bindersLeft = useMemo(
    () => (reachedLimit ? 0 : 5 - userBinders.length),
    [userBinders.length, reachedLimit]
  )
  const toggleUserID = () => {
    setUserID((prevUserID) => (prevUserID ? null : uid))
  }

  return (
    <div className="w-full p-4 min-h-[400px]">
      {isLoading ? (
        <>
          <div className="flex justify-end"></div>
          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden bg-table-header">
              <div className="grid grid-cols-4 gap-4 p-4">
                {Array.from({ length: 10 }).map((_, index) => (
                  <Skeleton key={index} height="24px" />
                ))}
              </div>
              {Array.from({ length: 10 }).map((_, index) => (
                <Box key={index} p="4" borderTop="1px" borderColor="gray.200">
                  <SkeletonText noOfLines={1} spacing="4" />
                </Box>
              ))}
            </div>
            <div className="flex justify-center pt-4"></div>
          </div>
        </>
      ) : (
        <>
          {loggedIn && (
            <>
              <div className="flex justify-end">
                <FormControl className="flex items-center m-2">
                  <FormLabel className="mb-0">Toggle Your Binders:</FormLabel>
                  <Switch isChecked={!!userIDQuery} onChange={toggleUserID} />
                </FormControl>
                <Button
                  colorScheme="blue"
                  onClick={onOpen}
                  size="md"
                  isDisabled={reachedLimit}
                >
                  Create Binder
                </Button>
              </div>
              {reachedLimit ? (
                <Alert status="warning" className="text-black"  mb={4}>
                  <AlertIcon />
                  You have reached the maximum limit of 5 binders.
                </Alert>
              ) : (
                <Alert status="info" className="text-black" mb={4}>
                  <AlertIcon />
                  You can create {bindersLeft} more binder
                  {bindersLeft !== 1 ? 's' : ''}.
                </Alert>
              )}
            </>
          )}
          <Box className="rounded-lg overflow-hidden border mt-4">
            <TableContainer>
              <Table variant="simple">
                <Thead className="bg-table-header">
                  <Tr>
                    <Th
                      className="text-table-header font-semibold py-4"
                      borderBottom="1px solid"
                    >
                      Name
                    </Th>
                    <Th
                      className="text-table-header font-semibold py-4"
                      borderBottom="1px solid"
                    >
                      User
                    </Th>
                    <Th
                      className="text-table-header font-semibold py-4"
                      borderBottom="1px solid"
                    >
                      Description
                    </Th>
                  </Tr>
                </Thead>
                <Tbody className="bg-[var(--color-background-table-row)]">
                  {binders.map((binder) => (
                    <Tr
                      key={binder.binderID}
                      className="transition-colors duration-150"
                    >
                      <Td className="text-table-row py-4">
                        <Link
                          className="!hover:no-underline ml-2 block pb-2 text-left !text-blue600"
                          onClick={() =>
                            router.push(`/binder/${binder.binderID}`)
                          }
                          target="_blank"
                        >
                          {binder.binder_name}
                        </Link>
                      </Td>
                      <Td className="text-table-row py-4">{binder.username}</Td>
                      <Td className="text-table-row py-4 max-w-md truncate">
                        {binder.binder_desc}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
          <CreateBinder isOpen={isOpen} onClose={onClose} />
        </>
      )}
    </div>
  )
}

export default BinderTables
