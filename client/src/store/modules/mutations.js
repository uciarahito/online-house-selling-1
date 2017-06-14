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
  detailHouse: (state, payload) => {
    state.detailHouse = payload
  },
  newHouse: (state, payload) => {
    state.dataHouses.push(payload)
  },
  editHouse: (state, payload) => {
    state.detailHouse = payload
  },
  deleteHouse: (state, payload) => {
    // console.log('Mutations payload ', payload);

    let newHouses = state.dataHouses.filter(house => house._id !== payload._id)
    console.log('its  newHouses ', newHouses);
    console.log('its state houses', state.dataHouses);
    state.dataHouses = newHouses
  },
  setMarker(state, coordinateObj) {
    state.marker.lng = coordinateObj.lng;
    state.marker.lat = coordinateObj.lat;
  }
}