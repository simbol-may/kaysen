import { login, resetPassword, logout } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    userCode: '',
    roleCode: '',
    roleName: '',
    userName: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER: (state, userCode) => {
    state.userCode = userCode
  },
  SET_ROLE: (state, roleCode) => {
    state.roleCode = roleCode
  },
  SET_ROLENAME: (state, roleName) => {
    state.roleName = roleName
  },
  SET_NAME: (state, userName) => {
    state.userName = userName
  },
}

const actions = {
  // user login
  login ({ commit }, userInfo) {
    const { userCode, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ userCode: userCode.trim(), password: password }).then(response => {
        console.log(response)
        const data = response.dataInfo
        const { userCode, roleCode, userName, roleName } = data
        commit('SET_USER', userCode)
        commit('SET_ROLE', roleCode)
        commit('SET_NAME', userName)
        commit('SET_ROLENAME', roleName)
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 重置密码
  resetPassword ({ commit }, userInfo) {
    // const { userCode, userName,roleCode,oldPwd,newPwd } = userInfo
    return new Promise((resolve, reject) => {
      resetPassword(userInfo).then(response => {
        console.log(response)
        const data = response.dataInfo
        // const { userCode, roleCode, userName, roleName } = data
        // commit('SET_USER', userCode)
        // commit('SET_ROLE', roleCode)
        // commit('SET_NAME', userName)
        // commit('SET_ROLENAME', roleName)
        // commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  // getInfo ({ commit }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token).then(response => {
  //       const { data } = response
  //       if (!data) {
  //         return reject('Verification failed, please Login again.')
  //       }
  //       const { name, avatar } = data
  //       commit('SET_NAME', name)
  //       commit('SET_AVATAR', avatar)
  //       resolve(data)
  //     }).catch(error => {
  //       console.log(error, 'res')

  //       reject(error)
  //     })
  //   })
  // },

  // user logout
  logout ({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

