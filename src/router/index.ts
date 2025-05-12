import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import UserLayout from '@/layouts/UserLayout.vue'
import ACCESS_ENUM from '@/access/accessEnum'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '主页',
      redirect: '/user/login',
    },
    {
      path: '/home',
      name: '首页',
      component: HomeView,
    },
    {
      path: '/user',
      name: 'user',
      component: UserLayout,
      meta: {
        hideInMenu: true,
      },
      children: [
        {
          path: '/user/register',
          component: () => import('../views/user/UserRegisterView.vue'),
          meta: {
            access: ACCESS_ENUM.NOT_LOGIN,
          },
        },
        {
          path: '/user/login',
          component: () => import('../views/user/UserLoginView.vue'),
          meta: {
            access: ACCESS_ENUM.NOT_LOGIN,
          },
        },
      ],
    },
    {
      path: '/admin/user',
      name: '用户管理',
      component: () => import('@/views/user/AdminUserView.vue'),
      meta: {
        access: ACCESS_ENUM.ADMIN,
      },
    },

    {
      path: '/quiz/home',
      name: '智能答题系统',
      component: () => import('../views/quiz/QuizHome.vue'),
      meta: {},
    },
    {
      path: '/quiz/add/app',
      name: '创建应用',
      component: () => import('@/views/quiz/add/AddAppView.vue'),
    },

    {
      path: '/quiz/add/app/:id',
      name: '修改应用',
      props: true,
      component: () => import('@/views/quiz/add/AddAppView.vue'),
      meta: {
        hideInMenu: true,
      },
    },
    {
      path: '/quiz/add/question/:appId',
      name: '创建题目',
      component: () => import('@/views/quiz/add/AddQuestionView.vue'),
      props: true,
      meta: {
        hideInMenu: true,
      },
    },
    {
      path: '/quiz/add/scoring_result/:appId',
      name: '创建评分',
      component: () => import('@/views/quiz/add/AddScoringResultView.vue'),
      props: true,
      meta: {
        hideInMenu: true,
      },
    },
    {
      path: '/quiz/app/detail/:id',
      name: '应用详情页',
      props: true,
      component: () => import('@/views/quiz/app/AppDetailView.vue'),
      meta: {
        hideInMenu: true,
      },
    },
    {
      path: '/quiz/answer/do/:appId',
      name: '答题',
      component: () => import('@/views/quiz/answer/DoAnswerView.vue'),
      props: true,
      meta: {
        hideInMenu: true,
        access: ACCESS_ENUM.USER,
      },
    },
    {
      path: '/quiz/answer/result/:id',
      name: '答题结果',
      component: () => import('@/views/quiz/answer/AnswerResultView.vue'),
      props: true,
      meta: {
        hideInMenu: true,
        access: ACCESS_ENUM.USER,
      },
    },
    {
      path: '/quiz/answer/my',
      name: '我的答题',
      component: () => import('@/views/quiz/answer/MyAnswerView.vue'),
      meta: {
        access: ACCESS_ENUM.USER,
      },
    },

    {
      path: '/quiz/admin/app',
      name: '应用管理',
      component: () => import('@/views/quiz/admin/AdminAppView.vue'),
      meta: {
        access: ACCESS_ENUM.ADMIN,
      },
    },
    {
      path: '/quiz/admin/question',
      name: '题目管理',
      component: () => import('@/views/quiz/admin/AdminQuestionView.vue'),
      meta: {
        access: ACCESS_ENUM.ADMIN,
      },
    },
    {
      path: '/quiz/admin/scoring_result',
      name: '评分管理',
      component: () => import('@/views/quiz/admin/AdminScoringResultView.vue'),
      meta: {
        access: ACCESS_ENUM.ADMIN,
      },
    },
    {
      path: '/quiz/admin/user_answer',
      name: '回答管理',
      component: () => import('@/views/quiz/admin/AdminUserAnswerView.vue'),
      meta: {
        access: ACCESS_ENUM.ADMIN,
      },
    },
    {
      path: '/quiz/app_statistic',
      name: '应用统计',
      component: () => import('@/views/quiz/statistic/AppStatisticView.vue'),
      meta: {
        access: ACCESS_ENUM.ADMIN,
      },
    },
    {
      path: '/noAuth',
      name: '无权限',
      component: () => '../views/NoAuthView.vue',
      meta: {
        hideInMenu: true,
      },
    },
    {
      path: '/hide',
      name: '隐藏页面',
      component: () => import('../views/HomeView.vue'),
      meta: {
        hideInMenu: true,
      },
    },

    {
      path: '/image/home',
      name: 'AI 图像工坊',
      component: () => import('../views/image/ImageHome.vue'),
      meta: {},
    },
    {
      path: '/image/createPicture',
      name: '创建图片',
      component: () => import('../views/image/CreatePicture.vue'),
      meta: {},
    },
    {
      path: '/image/pictureManage',
      name: '图片管理',
      component: () => import('../views/image/PictureManage.vue'),
      meta: {},
    },
    {
      path: '/video/home',
      name: '视频创作室',
      component: () => import('../views/video/ImageHome.vue'),
      meta: {
        hideInMenu: true,
      },
    },
    {
      path: '/bi/home',
      name: '智能 BI 分析',
      component: () => import('../views/bi/BiHome.vue'),
      meta: {
        hideInMenu: true,
      },
    },
  ],
})

export default router
