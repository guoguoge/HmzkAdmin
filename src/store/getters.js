import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  url: state => state.app.url,
  width: width => width.app.width,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => JSON.parse(Cookies.get(TokenKey)).admin_name,
  agent: state => JSON.parse(Cookies.get(TokenKey)).is_agent,
  status: state => state.user.status,
  roles: state => JSON.parse(Cookies.get(TokenKey)).permission,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs
}
export default getters
