import { userGroups } from 'lib/constants'
import { useRouter } from 'next/router'
import { usePermissions } from './usePermissions'
import { useEffect } from 'react'

export const useRedirectIfNotAuthorized = (
  redirectPath: string,
  options:
    | {
        roles:
          | keyof Readonly<typeof userGroups>
          | (keyof Readonly<typeof userGroups>)[]
      }
    | {
        permissions: keyof Permissions | (keyof Permissions)[]
      }
) => {
  const router = useRouter()
  const { loading, groups, permissions } = usePermissions()

  useEffect(() => {
    if (
      !loading && // if roles exist check to see if we don't match any roles
      (('roles' in options &&
        ((typeof options.roles === 'string' &&
          !groups?.includes(options.roles)) ||
          (typeof options.roles !== 'string' &&
            !options.roles.some((role) => groups?.includes(role))))) ||
        ('permissions' in options &&
          ((typeof options.permissions === 'string' &&
            !permissions[options.permissions]) ||
            (typeof options.permissions !== 'string' &&
              !options.permissions.some(
                (permission) => permissions[permission]
              )))))
    ) {
      router.replace(redirectPath)
    }
  }, [loading])
}
