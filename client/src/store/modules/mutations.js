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
    // state.dataHouses = payload

    let houses = state.dataHouses
    console.log('apa ini?????');
    // console.log(houses.indexOf(payload));
    houses.splice(houses.indexOf(payload), 1)
    // if (houses.length <= 2) {
    //   houses.splice(houses.indexOf(payload), 1)
    // } else {
    //   houses.splice(houses.indexOf(payload), 1)
    // }
  },
  setMarker(state, coordinateObj) {
    state.marker.lng = coordinateObj.lng;
    state.marker.lat = coordinateObj.lat;
  }
}