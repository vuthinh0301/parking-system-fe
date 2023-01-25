import { MANAGE } from '~/constants/permission-action.constant'
import {
  CATEGORY,
  CHARACTER,
  LESSON,
  PAGE,
  PERMISSION,
  ROLE,
  SELF_REVIEW,
  SPATIAL,
  USER,
} from '~/constants/permission-object.constant'

export default [
  {
    title: 'Dashboard',
    icon: 'flaticon2-architecture-and-city',
    route: '/',
  },
  {
    title: 'Quản lý nội dung học',
    icon: 'flaticon2-digital-marketing',
    subMenus: [
      {
        title: 'Quản lý danh mục',
        route: '/category',
        permission: [MANAGE, CATEGORY],
      },
      {
        title: 'Bài học',
        route: '/lesson',
        permission: [MANAGE, LESSON],
      },
      {
        title: 'Nhân vật',
        route: '/character',
        permission: [MANAGE, CHARACTER],
      },
      {
        title: 'Không gian học',
        route: '/spatial',
        permission: [MANAGE, SPATIAL],
      },
      {
        title: 'Trang',
        route: '/page',
        permission: [MANAGE, PAGE],
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
  {
    title: 'Nhận xét người dùng',
    icon: 'flaticon2-chat',
    route: '/self-review',
    permission: [MANAGE, SELF_REVIEW],
  },
]
