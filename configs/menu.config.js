import { MANAGE } from '~/constants/permission-action.constant'
import {
  PERMISSION,
  ROLE,
  USER, VEHICLE,
} from '~/constants/permission-object.constant'

export default [
  {
    title: 'Dashboard',
    icon: 'flaticon2-architecture-and-city',
    route: '/',
  },
  {
    title: 'Quản lý phương tiện',
    icon: 'flaticon-truck',
    route: '/vehicle',
    permission: [MANAGE, VEHICLE],
  },
  {
    title: 'Quản lý vé',
    icon: 'flaticon-tabs',
    subMenus: [
      {
        title: 'Vé tháng',
        route: '/monthly-card',
        permission: [MANAGE, ROLE],
      },
      {
        title: 'Vé lượt',
        route: '/daily-card',
        permission: [MANAGE, PERMISSION],
      },
    ],
  },
  {
    title: 'Quản lý người dùng',
    icon: 'flaticon2-user',
    route: '/user',
    permission: [MANAGE, USER],
  },
  {
    title: 'Phân quyền người dùng',
    icon: 'flaticon-web',
    subMenus: [
      {
        title: 'Nhóm người dùng',
        route: '/role',
        permission: [MANAGE, ROLE],
      },
      {
        title: 'Quyền truy cập',
        route: '/permission',
        permission: [MANAGE, PERMISSION],
      },
    ],
  },
]
