/**
 * 全局权限校验核心文件。

逻辑如下：

首先判断页面是否需要登录权限，如果不需要，直接放行。

如果页面需要登录权限

如果用户未登录，则跳转到登录页面。
如果已登录，判断登录用户的权限是否符合要求，否则跳转到 401 无权限页面。
 */

import router from '@/router'
import { useLoginUserStore } from '@/stores/user'
import ACCESS_ENUM from './accessEnum'

router.beforeEach(async (to, from, next) => {
  const loginUserStore = useLoginUserStore()

  let loginUser = loginUserStore.loginUser
  //全局自动登录
  // // 如果之前没登陆过，自动登录
  if (!loginUser || !loginUser.userRole) {
    // 加 await 是为了等用户登录成功之后，再执行后续的代码
    await loginUserStore.fetchLoginUser()
    loginUser = loginUserStore.loginUser
  }
  console.log('登陆用户信息', loginUser)
  const needAccess = to.meta?.access ?? ACCESS_ENUM.NOT_LOGIN
  // 判断页面是否需要登录权限
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    // 判断用户是否已登录
    if (
      !loginUser ||
      !loginUser.userRole ||
      loginUser.userRole === ACCESS_ENUM.NOT_LOGIN
    ) {
      // 用户未登录，跳转到登录页面
      next({
        path: '/login',
        query: { redirect: to.fullPath },
        /**
         * redirect: to.fullPath这样做的目的是在用户登录成功后，
         * 可以将用户重定向到他们原本尝试访问的页面。
         * 例如，用户尝试访问 /dashboard，但没有登录，于是被重定向到 /login。
         * 在登录成功后，可以使用 redirect 查询参数将用户重定向回 /dashboard。
         * 通常，这种机制在处理需要身份验证的路由时非常有用。用户在访问受保护的页面，
         * 如果未登录，会被重定向到登录页面，
         * 并在登录成功后返回他们原本尝试访问的页面
         */
      })
    } else {
      // 用户已登录，判断权限，权限不足，那么跳转到无权限页面
      if (
        needAccess === ACCESS_ENUM.ADMIN &&
        loginUser.userRole !== ACCESS_ENUM.ADMIN
      ) {
        next({
          path: '/noAuth',
          query: { redirect: to.fullPath },
        })
      }
      // 权限足够，放行
      next()
    }
  } else {
    // 页面不需要登录权限，直接放行
    next()
  }
})
