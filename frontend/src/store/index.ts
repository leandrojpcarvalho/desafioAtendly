import { createStore } from 'vuex'
import { UserCreation } from '../../../shared/interfaces/User.interface'
import Validations from '../../../shared/utils/validations'
import Mapping from '../../../shared/mapping/route'
import axios from 'axios'
const { getRoute } = Mapping.Routes
const { isEmail, isPassword, isName } = Validations.Validations

export interface AppStore extends UserCreation {
  frontHandler: {
    isValidField: {
      name: boolean | undefined
      email: boolean | undefined
      password: boolean | undefined
    }
    userInfo: {
      id: string
      name: string
      email: string
    }
    isLogged: boolean
    isLoading: boolean
    loginError: string
  }
}

const store = createStore<AppStore>({
  state: {
    name: '',
    email: '',
    password: '',
    frontHandler: {
      isValidField: {
        name: undefined,
        email: undefined,
        password: undefined,
      },
      userInfo: {
        id: '',
        name: '',
        email: '',
      },
      isLogged: false,
      isLoading: false,
      loginError: '',
    },
  },
  mutations: {
    setFields(state, { field, value }) {
      state[field] = value
    },
    setIsLogged(state, boolean) {
      state.frontHandler.isLogged = boolean
    },
    setValid(state, { field, value }) {
      state.frontHandler.isValidField[field] = value
    },
    setIsLoading(state, boolean) {
      state.frontHandler.isLoading = boolean
    },
    setError(state, error) {
      state.frontHandler.loginError = error
    },
    resetForm(state) {
      state.password = ''
      state.frontHandler.isValidField = {
        name: undefined,
        email: undefined,
        password: undefined,
      }
      state.frontHandler.loginError = ''
    },
    setFormError(state) {
      state.frontHandler.isValidField = {
        name: false,
        email: false,
        password: false,
      }
    },
    setUserInfo(state, { id, name, email }) {
      state.frontHandler.userInfo.id = id
      state.frontHandler.userInfo.name = name
      state.frontHandler.userInfo.email = email
    },
  },

  actions: {
    validateLogin({ state, commit }) {
      if (!isEmail(state.email)) {
        commit('setValid', { field: 'email', value: false })
      } else {
        commit('setValid', { field: 'email', value: true })
      }
      if (!isPassword(state.password)) {
        commit('setValid', { field: 'password', value: false })
      } else {
        commit('setValid', { field: 'password', value: true })
      }
    },
    async validateEmail({ state, dispatch, commit }) {
      await dispatch('validateLogin')
      if (!isName(state.name)) {
        commit('setValid', { field: 'name', value: false })
      } else {
        commit('setValid', { field: 'name', value: true })
      }
    },
    async validateRegister({ state, commit }) {
      if (isName(state.name)) {
        commit('setValid', { field: 'name', value: true })
      } else {
        commit('setValid', { field: 'name', value: false })
      }
      if (isPassword(state.password)) {
        commit('setValid', { field: 'password', value: true })
      } else {
        commit('setValid', { field: 'password', value: false })
      }
    },
    async getInformation({ commit }) {
      const token = localStorage.getItem('token')
      if (token) {
        const header: Headers = new Headers()
        header.append('Authorization', token)
        const request: Request = new Request(getRoute('login', 'fetch'), {
          method: 'POST',
          headers: header,
        })
        try {
          const response = await fetch(request)
          const data = await response.json()
          if (data) {
            commit('setUserInfo', data)
            commit('setIsLogged', true)
          } else {
            commit('setIsLogged', false)
          }
        } catch (error) {
          console.log(error)
        }
      }
    },
    async fetchLogin({ commit, state }) {
      const {
        email,
        password,
        frontHandler: { isValidField },
      } = state
      if (isValidField.email && isValidField.password) {
        commit('setIsLoading', true)
        try {
          const { status, data } = await axios.post(getRoute('login', 'fetch'), {
            email,
            password,
          })
          if (status === 200) {
            commit('setIsLogged', true)
            localStorage.setItem('token', data.token)
            commit('resetForm')
          } else {
            commit('setError', 'Invalid email or password')
          }
        } catch (error) {
          if (error.message.includes('401')) {
            commit('setError', 'Usuário ou senha inválidos')
            commit('setFormError')
          } else {
            commit('setError', 'Something went wrong')
          }
        } finally {
          commit('setIsLoading', false)
        }
      }
    },
    async fetchRegister({ commit, state, dispatch }) {
      await dispatch('validateRegister')
      const { isValidField } = state.frontHandler
      if (isValidField.email && isValidField.name && isValidField.password) {
        commit('setIsLoading', true)
        const { name, email, password } = state
        try {
          const { status, data } = await axios.post(getRoute('register', 'fetch'), {
            name,
            email,
            password,
          })
          if (status === 201) {
            localStorage.setItem('token', data.token)
            commit('setIsLogged', true)
            commit('resetForm')
          }
        } catch (error) {
          if (error.message.includes('409')) {
            commit('setError', 'Email already registered')
            commit('setFormError')
          } else {
            commit('setError', 'Something went wrong')
          }
        } finally {
          commit('setIsLoading', false)
        }
      }
    },
    async fetchEmail({ commit, state }) {
      const { email } = state
      if (isEmail(email)) {
        commit('setIsLoading', true)
        try {
          const { data } = await axios.post(getRoute('email', 'fetch'), {
            email,
          })
          if (data.exist) {
            commit('setValid', { field: 'email', value: !data.exist })
            commit('setError', 'Email ja cadastrado')
          } else {
            commit('setValid', { field: 'email', value: !data.exist })
            commit('setError', '')
          }
        } catch (error) {
          console.log(error.message)
        } finally {
          commit('setIsLoading', false)
        }
      } else if (email === '') {
        commit('setValid', { field: 'email', value: undefined })
      } else {
        commit('setValid', { field: 'email', value: false })
        commit('setError', '')
      }
    },
  },
})

export default store
