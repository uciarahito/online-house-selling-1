export const Getters = {
  isLogin: (state) => {
    return window.localStorage.getItem('token')
  },
  dataHouses: (state) => {
    return state.dataHouses
  },
  detailHouse: (state) => {
    return state.detailHouse
  },
  marker(state) {
    return state.marker
  }
}