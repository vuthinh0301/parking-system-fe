import axios from 'axios'
import { defineAbility } from '@casl/ability'

export default function ({ $auth }, inject) {
  axios.interceptors.request.use((request) => {
    const token = $auth.strategy.token.get()
    if (token) {
      request.headers.common.Authorization = `${token}`
    }

    return request
  })

  inject('can', (checkPerm) => {
    const ability = defineAbility((can, cannot) => {
      $auth.user.role.permissions.forEach((p) => {
        can(p.action, p.object)
      })
    })

    if (!checkPerm) {
      return true
    }

    return ability.can(...checkPerm)
  })
}
