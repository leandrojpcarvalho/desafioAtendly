import { createStore } from 'vuex'
import { UserCreation } from '../../../shared/interfaces/User.interface'
import Validations from '../../../shared/utils/validations'
import Mapping from '../../../shared/mapping/route'
import axios from 'axios'
const { getRoute } = Mapping.Routes
const { isEmail, isPassword } = Validations.Validations

interface AppStore extends UserCreation {
  frontHandler: {
    isValidField: {
      name: boolean | undefined
      email: boolean | undefined
      password: boolean | undefined
    }
    isLogged: boolean
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
      isLogged: false,
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
    async fetchLogin({ commit, state }) {
      const {
        email,
        password,
        frontHandler: { isValidField },
      } = state
      if (isValidField.email && isValidField.password) {
        const { status } = await axios.post(getRoute('login', 'fetch'), {
          email,
          password,
        })
        if (status === 200) {
          commit('setIsLogged', true)
        }
      }
    },
  },
})

export default store
