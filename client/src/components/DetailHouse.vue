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
          <div v-model="map_latlong">
            <gmap-map
              :center="marker"
              :zoom="15"
              scrollwheel="false"
              style="width: 100%;height: 300px">
              <gmap-marker
                :position="marker">
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
        </div>
      </div>

    </el-col>
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


export default {
  props: ['id'],
  data() {
    return {
      center: {
        lat: -6.2372963,
        lng: 106.7904324
      },
      marker: {},
      map_latlong: ''
    }
  },
  methods: {
    backToContent() {
      this.$router.push('/')
    },
    parseCoordinate() {
      // console.log('Ini latlong');
      // console.log(this.detailHouse.latlong);
      let parsedCoor = this.map_latlong.split(",");
      this.marker.lat = Number(parsedCoor[0]);
      this.marker.lng = Number(parsedCoor[1]);
    }
  },
  computed: {
    detailHouse() {
      return this.$store.state.detailHouse
    }
  },
  created() {
    this.$store.dispatch('detailHouse', this.id)
    this.map_latlong = this.detailHouse.latlong
  },
  mounted(){
    this.parseCoordinate()
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
