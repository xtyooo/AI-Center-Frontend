/**
 * 检查权限（判断当前登录用户是否具有某个权限）
 * @param loginUser 当前登录用户
 * @param needAccess 需要有的权限
 * @return boolean 有无权限
 *   type LoginUserVO = {
    createTime?: string
    id?: number
    updateTime?: string
    userAvatar?: string
    userName?: string
    userProfile?: string
    userRole?: string
  }
 */

import ACCESS_ENUM from "./accessEnum"

const checkAccess = (loginUser:API.LoginUserVO | null, needAccess: string): boolean => {
  // 获取当前登录用户具有的权限（如果没有 loginUser，则表示未登录）
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN
  //

  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true // 如果需要的是未登录权限，则直接返回 true
  }
  // 如果用户登录才能访问
  if (needAccess === ACCESS_ENUM.USER) {
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false // 如果用户未登录，则返回 false
    }
  }
  // 如果用户是管理员才能访问
  if (needAccess === ACCESS_ENUM.ADMIN) {
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN || loginUserAccess === ACCESS_ENUM.USER) {
      return false // 如果用户未登录或只是普通用户，则返回 false
    }
  }
  return true // 如果用户具有所需权限，则返回 true
}


export default checkAccess
