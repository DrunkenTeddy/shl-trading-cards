import { NextApiRequest, NextApiResponse } from 'next'
import { queryDatabase } from '@pages/api/database/database'
import { GET } from '@constants/index'
import { StatusCodes } from 'http-status-codes'
import middleware from '@pages/api/database/middleware'
import Cors from 'cors'
import SQL from 'sql-template-strings'

const allowedMethods = [GET]
const cors = Cors({
  methods: allowedMethods,
})

const index = async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  await middleware(request, response, cors)
  const { method, query } = request

  // Get most recently acquired cards by user
  if (method === GET) {
    const { uid } = query
    const result = await queryDatabase(SQL`
      SELECT co.userID,
        ca.cardID,
        p.packID,
        ca.player_name,
        ca.teamID,
        ca.playerID,
        ca.card_rarity,
        ca.image_url,
        ca.pullable,
        ca.approved,
        ca.position,
        ca.overall,
        ca.high_shots,
        ca.low_shots,
        ca.quickness,
        ca.control,
        ca.conditioning,
        ca.skating,
        ca.shooting,
        ca.hands,
        ca.checking,
        ca.defense,
        ca.author_userID,
        ca.season,
        ca.author_paid
        FROM cards as ca 
    INNER JOIN collection AS co
     ON ca.cardID = co.cardID
    INNER JOIN packs_owned AS p
     ON co.packID = p.packID
    WHERE p.openDate = (SELECT openDate FROM packs_owned WHERE userID = ${uid} ORDER BY openDate DESC LIMIT 1);
    `)

    response.status(StatusCodes.OK).json(result)
    return
  }

  response.setHeader('Allowed', allowedMethods)
  response.status(StatusCodes.METHOD_NOT_ALLOWED).end()
}

export default index
