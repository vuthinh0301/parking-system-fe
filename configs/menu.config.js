import { MANAGE } from '~/constants/permission-action.constant'
import {
  DAILY_CARD,
  DAILY_VEHICLE,
  MONTHLY_CARD,
  MONTHLY_CARD_REGISTER,
  PERMISSION,
  ROLE,
  USER,
  VEHICLE,
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
    subMenus: [
      {
        title: 'Phương tiện đăng kí vé tháng',
        route: '/vehicle',
        permission: [MANAGE, VEHICLE],
      },
      {
        title: 'Phương tiện vãng lai',
        route: '/daily-vehicle',
        permission: [MANAGE, DAILY_VEHICLE],
      },
    ],
  },
  {
    title: 'Quản lý vé',
    icon: 'flaticon-tabs',
    subMenus: [
      {
        title: 'Vé tháng',
        route: '/monthly-card',
        permission: [MANAGE, MONTHLY_CARD],
      },
      {
        title: 'Quản lý đăng kí vé tháng',
        route: '/monthly-card-register',
        permission: [MANAGE, MONTHLY_CARD_REGISTER],
      },
      {
        title: 'Vé lượt',
        route: '/daily-card',
        permission: [MANAGE, DAILY_CARD],
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
