import { createStore } from 'vuex'
import { UserCreation } from '../../../shared/interfaces/User.interface'
import Validations from '../../../shared/utils/validations'
import Mapping from '../../../shared/mapping/route'

const { isEmail, isName, isPassword } = Validations
const {
  Routes: { getRoute },
} = Mapping

interface AppStore extends UserCreation {
  frontHandler: {
    error: string[]
    isLogged: boolean
  }
}

const store = createStore<AppStore>({
  state: {
    name: '',
    email: '',
    password: '',
    frontHandler: {
      error: [],
      isLogged: false,
    },
  },
  mutations: {
    setName(state, string) {
      state.name = string
    },
    setEmail(state, string) {
      state.email = string
    },
    setPassword(state, string) {
      state.password = string
    },
    setLogged(state, boolean) {
      state.frontHandler.isLogged = boolean
    },
    validateState(state) {
      const { error } = state.frontHandler
      if (!isEmail(state.email)) {
        error.push('email')
      } else if (!isName(state.name)) {
        error.push('name')
      } else if (!isPassword(state.password)) {
        error.push('password')
      } else {
        state.frontHandler.error = []
      }
    },
  },
  actions: {
    async login({ commit, dispatch, state }) {
      commit('validateState')
      if (state.frontHandler.error.length === 0) {
        dispatch('fetchLogin')
      } else {
        commit('setIsLogged', false)
      }
    },
    async fetchLogin({ commit, state }) {
      const { frontHandler, ...rest } = state
      const data = await axios.post(getRoute('login', 'fetch'), { rest })
      const { status } = await data.json()
      if (status === 200) {
        commit('setIsLogged', true)
      }
    },
  },
})

export default store
