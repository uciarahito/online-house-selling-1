export const Mutations = {
  signIn: (state, payload) => {
    window.localStorage.setItem('token', payload.token)
    window.localStorage.setItem('user', payload.username)
    window.localStorage.setItem('id', payload.id)
    window.localStorage.setItem('login_method', 'local');
    state.user.push(payload)
    window.location = "/"
  },
  signUp: (state, payload) => {
    state.user.push(payload)
  },
  dataHouses: (state, payload) => {
    state.dataHouses = payload
  },
  newHouse: (state, payload) => {
    state.dataHouses.push(payload)
  },
  setMarker(state, coordinateObj) {
    state.marker.lng = coordinateObj.lng;
    state.marker.lat = coordinateObj.lat;
  }
}