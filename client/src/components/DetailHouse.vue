<template lang="html">
  <el-row :gutter="20" type="flex" class="row-bg" justify="center">

    <el-col :span="13">
      <div style="text-align:-webkit-auto;margin-top:15px;" class="teks-bawah">
        <span style="color:blue;" @click="backToContent">homepage</span>&nbsp;&nbsp;<span>/</span>&nbsp;&nbsp;<span>detail house</span>
      </div>
      <el-card :body-style="{ padding: '10px' }" style="height:auto;margin-top:15px;">
        <!-- {{detailHouse}} -->
        <div slot="header" class="clearfix">
          <h1 style="font-size:22px;font-weight:500;color:navy;margin:0px;">{{detailHouse.title}}</h1>
          <el-row>
            <el-col :span="19">
              <img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png" alt="Map" style="width:13px;height:15px;"><span style="font-size:95%;color:#848d95;"> {{detailHouse.state}}, {{detailHouse.city}}</span>
            </el-col>
            <el-col :span="5">
              <span style="font-size:95%;color:#848d95;">size: {{detailHouse.size}}</span>
            </el-col>
          </el-row>
        </div>
        <div class="text item">
          <el-row style="text-align:center;">
            <img :src="detailHouse.image" alt="gambar rumah" style="width:600px;height:450px;">
          </el-row>
          <hr style="border-color:white;margin-bottom:10px;">
          <span><u><b>Description</b></u></span><br><br>
          <span>{{detailHouse.description}}</span>
          <hr style="border-color:white;margin-bottom:10px;">
          <span><u><b>Location</b></u></span><br>
          <div v-model="this.map_latlong">
            <gmap-map
              :center="markerDetail"
              :zoom="15"
              scrollwheel="false"
              style="width: 100%;height: 300px">
              <gmap-marker
                :position="markerDetail">
              </gmap-marker>
            </gmap-map>
          </div>
        </div>
      </el-card>
    </el-col>

    <el-col :span="7">
      <div class="grid-content">
        <div style="margin-top:45px;text-align:-webkit-auto;">
          <el-button type="primary" style="width:auto;height:auto;font-size:xx-large">Rp. {{detailHouse.price}}</el-button><br>
          <el-button style="background-color:#F0F0F0;width:auto;height:auto;font-size:x-large;margin-top:20px;">
            <el-row>
              <el-col :span="1">
                <img src="http://www.offshoreindependents.com/wp-content/uploads/2016/07/person-icon-295x300-dbl-1.png" alt="Map" style="width:35px;height:35px;">
              </el-col>
              <el-col :span="1" style="margin-left:40px;margin-top:5px;">
                <span style="color:#848d95;"> {{detailHouse.owner}}</span>
              </el-col>
            </el-row>
          </el-button><br>
          <el-button style="background-color:#F0F0F0;width:auto;height:auto;font-size:x-large;margin-top:20px;">
            <el-row>
              <el-col :span="1">
                <img src="https://cdn1.iconfinder.com/data/icons/ui-5/502/call-512.png" alt="Phone" style="width:35px;height:35px;">
              </el-col>
              <el-col :span="1" style="margin-left:40px;margin-top:5px;">
                <span style="color:#848d95;"> {{detailHouse.phone}}</span>
              </el-col>
            </el-row>
          </el-button>
          <el-row :gutter="20" style="margin-top:10px;">
            <el-col :span="5">
              <el-button type="warning" icon="edit" @click="viewFormEditHouse">Edit</el-button>
            </el-col>
            <el-col :span="5">
              <el-button type="danger" icon="delete" @click="deleteHouse">Delete</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-col>

    <el-dialog title="Edit Question" v-model="dialogFormVisibleEditHouse">
      <el-form :model="formEditHouse" :rules="rules" ref="formEditHouse" label-width="120px" class="demo-ruleForm" style="padding:0px 20px 0px 5px;margin-top:10px;">
        <el-form-item label="Title" prop="title">
          <el-input v-model="formEditHouse.title"></el-input>
        </el-form-item>
        <el-form-item label="Description" prop="desc">
          <el-input type="textarea" v-model="formEditHouse.desc"></el-input>
        </el-form-item>
        <el-form-item label="Owner" prop="owner">
          <el-input v-model="formEditHouse.owner"></el-input>
        </el-form-item>
        <el-form-item label="Phone" prop="phone">
          <el-input v-model="formEditHouse.phone"></el-input>
        </el-form-item>
        <el-form-item label="Size" prop="size">
          <el-input v-model="formEditHouse.size"></el-input>
        </el-form-item>
        <el-form-item label="Price" prop="price">
          <el-input v-model="formEditHouse.price"></el-input>
        </el-form-item>
        <!-- <el-form-item label="Upload Image">
          <el-input @change="uploadImage" type="file" accept="image/*"></el-input>
        </el-form-item> -->
        <el-form-item label="Image">
          <el-card :body-style="{ padding: '10px' }" style="height:auto;">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-change="handleChange"
              :file-list="fileList3">
              <el-button size="small" type="primary">Click to upload</el-button>
              <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
            </el-upload>
          </el-card>
        </el-form-item>
        <el-form-item label="Location">
          <el-input v-model="formEditHouse.location"></el-input>
        </el-form-item>
        <el-form-item label="City" prop="city">
          <el-input v-model="formEditHouse.city"></el-input>
        </el-form-item>
        <el-form-item label="State" prop="state">
          <el-input v-model="formEditHouse.state"></el-input>
        </el-form-item>
        <!-- <el-form-item label="Latlong">
          <el-input :value="marker.lat+','+marker.lng"></el-input>
        </el-form-item> -->
        <el-card :body-style="{ padding: '10px' }">
          <gmap-map
            :center="stateMarker"
            :zoom="18"
            :clickable="true"
            scrollwheel="false"
            style="width: 100%; height: 500px"
            v-on:click="mapClicked">
              <gmap-marker
                :position="stateMarker"
                :clickable="true"
                :draggable="true"
                @g-click="center">
              </gmap-marker>
          </gmap-map>
        </el-card>
        <el-form-item style="margin-left:0px;margin-top:15px;">
          <el-button type="primary" @click="submitFormEditHouse('formEditHouse')">Edit</el-button>
          <el-button @click="resetForm('formEditHouse')">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-row>
</template>

<script>

// NOTE: post to facebook
window.fbAsyncInit = function() {
  FB.init({
    appId      : '413434489050147',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.9'
  });
  FB.AppEvents.logPageView();

  FB.getLoginStatus(function(response) {
    console.log(response);
  });

};

(function(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "//connect.facebook.net/en_US/sdk.js";
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function postFacebook(status) {
  FB.api('/me/feed', 'post', {message: status}, function(response) {
    console.log(response)
    // document.getElementById('status').innerHTML = window.localStorage.getItem('id');
  });
}

import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['id', 'index'],
  data() {
    return {
      center: {
        lat: -6.2372963,
        lng: 106.7904324
      },
      markerDetail: {},
      map_latlong: '',
      dialogFormVisibleEditHouse: false,
      formEditHouse: {
        title: '',
        desc: '',
        owner: '',
        phone: '',
        size: '',
        price: '',
        location: '',
        latlong: '',
        city: '',
        state: ''
      },
      rules: {
        title: [
          { required: true, message: 'Please input the title', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: 'Please input the description', trigger: 'blur' }
        ],
        owner: [
          { required: true, message: 'Please input the owner', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: 'Please input the phone', trigger: 'blur' }
        ],
        size: [
          { required: true, message: 'Please input the size', trigger: 'blur' }
        ],
        price: [
          { required: true, message: 'Please input the price', trigger: 'blur' }
        ],
        city: [
          { required: true, message: 'Please input the city', trigger: 'blur' }
        ],
        state: [
          { required: true, message: 'Please input the state', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    backToContent() {
      this.$router.push('/')
    },
    parseCoordinate() {
      let parsedCoor = this.detailHouse.latlong.split(',');
      this.markerDetail.lat = Number(parsedCoor[0]);
      this.markerDetail.lng = Number(parsedCoor[1]);
    },
    handleChange(file, fileList) {
      this.fileList3 = fileList.slice(-3);
    },
    viewFormEditHouse() {
      this.dialogFormVisibleEditHouse = true
      this.formEditHouse.title = this.detailHouse.title
      this.formEditHouse.desc = this.detailHouse.description,
      this.formEditHouse.owner = this.detailHouse.owner,
      this.formEditHouse.phone = this.detailHouse.phone,
      this.formEditHouse.size = this.detailHouse.size,
      this.formEditHouse.price = this.detailHouse.price,
      this.formEditHouse.location = this.detailHouse.location,
      this.formEditHouse.city = this.detailHouse.city,
      this.formEditHouse.state = this.detailHouse.state
    },
    deleteHouse() {
      if (confirm(`Are you sure want to delete ${this.detailHouse.title}?`)) {
        this.$store.dispatch('deleteHouse', this.id)
        this.$router.push('/')
      }
    },
    submitFormEditHouse(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let payload = {
            id: this.id,
            title: this.formEditHouse.title,
            description: this.formEditHouse.desc,
            owner: this.formEditHouse.owner,
            phone: this.formEditHouse.phone,
            size: this.formEditHouse.size,
            price: this.formEditHouse.price,
            image: this.fileList3[0].url,
            location: this.formEditHouse.location,
            latlong: `${this.marker.lat},${this.marker.lng}`,
            city: this.formEditHouse.city,
            state: this.formEditHouse.state
          }
          console.log('payload edit house');
          console.log(payload);
          this.$store.dispatch('editHouse', payload)

          // this.map_latlong = payload.latlong
          // let parsedCoor = this.map_latlong .split(',');
          // this.markerDetail.lat = Number(parsedCoor[0]);
          // this.markerDetail.lng = Number(parsedCoor[1]);

          // this.parseCoordinate()
          this.formEditHouse.title = ''
          this.formEditHouse.desc = ''
          this.formEditHouse.owner = ''
          this.formEditHouse.phone = ''
          this.formEditHouse.size = ''
          this.formEditHouse.price = ''
          this.formEditHouse.location = ''
          this.formEditHouse.latlong = ''
          this.formEditHouse.city = ''
          this.formEditHouse.state = ''
          this.dialogFormVisibleEditHouse = false
        } else {
          console.log('error edit house!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    mapClicked(mouseArgs) {
      let coordinate = {
        lat: mouseArgs.latLng.lat(),
        lng: mouseArgs.latLng.lng()
      }
      this.$store.commit('setMarker', coordinate)
    }
  },
  computed: {
    detailHouse() {
      return this.$store.state.detailHouse
    },
    ...mapGetters({
      statusLogin: 'isLogin'
    }),
    marker() {
      return this.$store.getters.marker
    },
    stateMarker() {
      return this.$store.getters.marker
    }
  },
  created() {
    this.$store.dispatch('detailHouse', this.id)
    this.map_latlong = this.detailHouse.latlong

    let parsedCoor = this.detailHouse.latlong.split(',');
    this.markerDetail.lat = Number(parsedCoor[0]);
    this.markerDetail.lng = Number(parsedCoor[1]);

    console.log('ini index');
    console.log(this.index);
    // console.log(this.detailHouse.latlong.split(','));
    // console.log(parsedCoor[0]);
    // console.log(parsedCoor[1]);
  },
  mounted(){
    // this.parseCoordinate()
  }
}
</script>

<style lang="css">
  .teks-bawah {
    font-size: 85%;
    color: #848d95;
  }

  .el-card {
    margin: 0px;
    padding-top: 0px;
  }

  .el-card__header {
    background-color: lightgray;
    padding: 10px 10px;
  }

  .map {
  margin: 1%;
  text-align: left;
}

#map {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
