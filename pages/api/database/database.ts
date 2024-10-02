import mysql, { ServerlessMysql } from 'serverless-mysql'
import { SQLStatement } from 'sql-template-strings'

type SelectQueryResult<T> = T[] | { error: unknown }

const initializeDB = (database: string | undefined): ServerlessMysql =>
  mysql({
    config: {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database,
    },
  })

const cardsDatabase: ServerlessMysql = initializeDB(
  process.env.NODE_ENV === 'production' ? 'dev_cards' : 'dev_cards'
  // process.env.NODE_ENV === 'production' ? 'admin_cards' : 'dev_cards'
)

const usersDatabase: ServerlessMysql = initializeDB(
  process.env.NODE_ENV === 'production' ? 'admin_mybb' : 'admin_testdb'
)

const portalDatabase: ServerlessMysql = initializeDB(
  process.env.NODE_ENV === 'production' ? 'admin_portal' : 'dev_portal'
)

const getQueryFn =
  (db: ServerlessMysql) =>
  async <T extends unknown>(
    query: SQLStatement
  ): Promise<SelectQueryResult<T>> => {
    try {
      const results: T[] = await db.query(query)
      await db.end()
      return results
    } catch (error) {
      return { error }
    }
  }

export const cardsQuery = getQueryFn(cardsDatabase)
export const usersQuery = getQueryFn(usersDatabase)
export const portalQuery = getQueryFn(portalDatabase)
