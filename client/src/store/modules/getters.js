export const Getters = {
  isLogin: (state) => {
    return window.localStorage.getItem('token')
  },
  dataHouses: (state) => {
    return state.dataHouses
  },
  marker(state) {
    return state.marker
  }
}