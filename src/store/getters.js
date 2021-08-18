const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userCode: state => state.user.userCode,
  roleCode: state => state.user.roleCode,
  name: state => state.user.userName
}
export default getters
