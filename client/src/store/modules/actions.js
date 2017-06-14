export const Actions = {
  signIn: ({commit}, payload) => {
    axios.post('http://localhost:3000/signin', {
      username: payload.username,
      password: payload.password
    })
    .then(response => {
      console.log('Action SignIn');
      console.log(response.data);
      commit('signIn', response.data)
    })
    .catch(error => {
      console.log(error);
      console.log('error, masuk ke catch');
    })
  },
  signUp: ({commit}, payload) => {
    axios.post('http://localhost:3000/signup', {
      name: payload.name,
      username: payload.username,
      password: payload.password,
      email: payload.email
    })
    .then(response => {
      console.log('Action SignUp');
      console.log(response.data);
      commit('signUp', response.data)
    })
    .catch(error => {
      console.log(error);
      console.log('error, masuk ke catch');
    })
  },
  dataHouses: ({commit}) => {
    axios.get('http://localhost:3000/allhouse')
    .then(response => {
      console.log('Action DataHouses');
      console.log(response.data);
      commit('dataHouses', response.data)
    })
    .catch(error => {
      console.log(error);
      console.log('error, masuk ke catch');
    })
  },
  detailHouse: ({commit}, payload) => {
    axios.get(`http://localhost:3000/detailhouse/${payload}`)
    .then(response => {
      console.log('Action DetailHouse');
      console.log(response.data);
      commit('detailHouse', response.data)
    })
    .catch(error => {
      console.log(error);
      console.log('error, masuk ke catch');
    })
  },
  createHouse: ({commit}, payload) => {
    axios.post('http://localhost:3000/createhouse', {
      title: payload.title,
      description: payload.desc,
      owner: payload.owner,
      phone: payload.phone,
      size: payload.size,
      price: payload.price,
      image: payload.image,
      location: payload.location,
      latlong: payload.latlong,
      city: payload.city,
      state: payload.state
    })
    .then(response => {
      console.log('Action create new House');
      console.log(response.data);
      commit('newHouse', response.data)
    })
    .catch(error => {
      console.log(error);
      console.log('error, masuk ke catch');
    })
  },
  editHouse: ({commit}, payload) => {
    axios.put(`http://localhost:3000/editHouse/${payload.id}`, {
      title: payload.title,
      description: payload.desc,
      owner: payload.owner,
      phone: payload.phone,
      size: payload.size,
      price: payload.price,
      image: payload.image,
      location: payload.location,
      latlong: payload.latlong,
      city: payload.city,
      state: payload.state
    })
    .then(response => {
      console.log('Action edit House');
      console.log(response.data);
      commit('editHouse', response.data)
    })
    .catch(error => {
      console.log(error);
      console.log('error, masuk ke catch');
    })
  },
  deleteHouse: ({commit}, payload) => {
    axios.delete(`http://localhost:3000/deleteHouse/${payload}`)
    .then(response => {
      console.log('Action delete House');
      console.log(response.data);
      commit('deleteHouse', response.data)
    })
    .catch(error => {
      console.log(error);
      console.log('error, masuk ke catch');
    })
  }
}