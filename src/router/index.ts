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
      path: '/add/app',
      name: '创建应用',
      component:()=> import('../views/add/AddAppView.vue') ,
    },

    {
      path: '/add/app/:id',
      name: '修改应用',
      props: true,
      component: ()=> import('../views/add/AddAppView.vue'),
      meta: {
        hideInMenu: true,
      },
    },
    {
      path: '/add/question/:appId',
      name: '创建题目',
      component: ()=> import('../views/add/AddQuestionView.vue'),
      props: true,
      meta: {
        hideInMenu: true,
      },
    },
    {
      path: '/add/scoring_result/:appId',
      name: '创建评分',
      component: ()=> import('../views/add/AddScoringResultView.vue'),
      props: true,
      meta: {
        hideInMenu: true,
      },
    },
    {
      path: '/app/detail/:id',
      name: '应用详情页',
      props: true,
      component: ()=> import('../views/app/AppDetailView.vue'),
      meta: {
        hideInMenu: true,
      },
    },
    {
      path: '/answer/do/:appId',
      name: '答题',
      component: ()=> import('../views/answer/DoAnswerView.vue'),
      props: true,
      meta: {
        hideInMenu: true,
        access: ACCESS_ENUM.USER,
      },
    },
    {
      path: '/answer/result/:id',
      name: '答题结果',
      component: ()=> import('../views/answer/AnswerResultView.vue'),
      props: true,
      meta: {
        hideInMenu: true,
        access: ACCESS_ENUM.USER,
      },
    },
    {
      path: '/answer/my',
      name: '我的答题',
      component: ()=> import('../views/answer/MyAnswerView.vue'),
      meta: {
        access: ACCESS_ENUM.USER,
      },
    },
    {
      path: '/admin/user',
      name: '用户管理',
      component: ()=> import('../views/admin/AdminUserView.vue'),
      meta: {
        access: ACCESS_ENUM.ADMIN,
      },
    },
    {
      path: '/admin/app',
      name: '应用管理',
      component: ()=> import('../views/admin/AdminAppView.vue'),
      meta: {
        access: ACCESS_ENUM.ADMIN,
      },
    },
    {
      path: '/admin/question',
      name: '题目管理',
      component: ()=> import('../views/admin/AdminQuestionView.vue') ,
      meta: {
        access: ACCESS_ENUM.ADMIN,
      },
    },
    {
      path: '/admin/scoring_result',
      name: '评分管理',
      component: ()=> import('../views/admin/AdminScoringResultView.vue'),
      meta: {
        access: ACCESS_ENUM.ADMIN,
      },
    },
    {
      path: '/admin/user_answer',
      name: '回答管理',
      component: ()=> import('../views/admin/AdminUserAnswerView.vue'),
      meta: {
        access: ACCESS_ENUM.ADMIN,
      },
    },
    {
      path: '/app_statistic',
      name: '应用统计',
      component: ()=> import('../views/statistic/AppStatisticView.vue') ,
      meta: {
        access: ACCESS_ENUM.ADMIN,
      },
    },
    {
      path: '/noAuth',
      name: '无权限',
      component: ()=>('../views/NoAuthView.vue'),
      meta: {
        hideInMenu: true,
      },
    },
    {
      path: '/hide',
      name: '隐藏页面',
      component: ()=> import('../views/HomeView.vue'),
      meta: {
        hideInMenu: true,
      },
    },
  ],
})

export default router
