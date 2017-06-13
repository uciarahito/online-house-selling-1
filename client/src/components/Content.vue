<template lang="html">
  <div>

    <div v-show="statusLogin">

      <el-row style="margin-top: 15px;" :gutter="20" type="flex" class="row-bg" justify="center">
        <el-col :span="17">
          <div class="grid-content">
            <el-input placeholder="Please input">
              <el-button slot="append" icon="search"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="5" style="text-align:right">
          <div class="grid-content">
            <el-button @click="viewFormNewHouse" icon="plus" style="background-color:darkred;color:#fff;">New House</el-button>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" type="flex" class="row-bg" justify="center">
        <el-col :span="17">
          <div class="grid-content">
            <p style="color:navy;text-align:-webkit-auto">List of Houses</p>
            <hr style="border-color:white;">
            <el-row style="margin-right:0px;">
              <el-col :span="7" v-for="(house, index) in dataHouses" :key="index" :offset="index > 0 ? 3 : 0" style="margin:0px 20px 20px 0px;">
                <el-card :body-style="{ padding: '0px' }" style="height:auto;">

                  <img :src="house.image" class="image">
                  <div style="padding: 14px;">

                    <router-link v-if="house.title.length >= 20" :to="'detailhouse/'+house._id">{{ house.title.slice(0, 20) }}...</router-link>
                    <router-link v-else :to="'detailhouse/'+house._id">{{house.title}}</router-link>
                    <br>
                    <el-row style="margin:10px 0px 0px 0px;">
                      <span class="mini-title">Rp. {{ house.price }}</span>
                    </el-row>

                    <hr style="border-color:white;">
                    <div class="bottom clearfix">
                      <img src="https://cdn3.iconfinder.com/data/icons/black-easy/512/538642-user_512x512.png" alt="Person" style="width:13px;height:13px;"><span style="font-size:95%;color:#848d95;"> {{house.owner}}</span><br>
                      <span class="teks-bawah" style="margin-top:5px;">{{house.state}}, {{house.city}}</span><br>
                      <span class="teks-bawah">{{house.created_at}}</span>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>

        </el-col>
        <el-col :span="5">
          <div class="grid-content">
            <div style="margin-top:15px;text-align:-webkit-auto;">
              <p style="color:navy;">Related</p>
              <el-tag style="margin:0px 5px 5px 0px;" type="gray" v-for="(house, index) in dataHouses" :key="index">
                <span v-if="house.title.length >= 20">{{ house.title.slice(0, 20) }}...</span>
                <span v-else>{{ house.title }}</span></el-tag>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-dialog title="New Question" v-model="dialogFormVisibleNewHouse">
        <el-form :model="formNewHouse" :rules="rules" ref="formNewHouse" label-width="120px" class="demo-ruleForm" style="padding:0px 20px 0px 5px;margin-top:10px;">
          <el-form-item label="Title" prop="title">
            <el-input v-model="formNewHouse.title"></el-input>
          </el-form-item>
          <el-form-item label="Description" prop="desc">
            <el-input type="textarea" v-model="formNewHouse.desc"></el-input>
          </el-form-item>
          <el-form-item label="Owner" prop="owner">
            <el-input v-model="formNewHouse.owner"></el-input>
          </el-form-item>
          <el-form-item label="Phone" prop="phone">
            <el-input v-model="formNewHouse.phone"></el-input>
          </el-form-item>
          <el-form-item label="Size" prop="size">
            <el-input v-model="formNewHouse.size"></el-input>
          </el-form-item>
          <el-form-item label="Price" prop="price">
            <el-input v-model="formNewHouse.price"></el-input>
          </el-form-item>
          <el-form-item label="Upload Image">
            <el-input @change="uploadImage" type="file" accept="image/*"></el-input>
          </el-form-item>
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
            <el-input v-model="formNewHouse.location"></el-input>
          </el-form-item>
          <el-form-item label="City" prop="city">
            <el-input v-model="formNewHouse.city"></el-input>
          </el-form-item>
          <el-form-item label="State" prop="state">
            <el-input v-model="formNewHouse.state"></el-input>
          </el-form-item>
          <el-form-item label="Latlong">
            <el-input :value="marker.lat+','+marker.lng"></el-input>
          </el-form-item>
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
            <el-button type="primary" @click="submitFormNewHouse('formNewHouse')">Create</el-button>
            <el-button @click="resetForm('formNewHouse')">Reset</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      fileList3: [],
      dialogFormVisibleNewHouse: false,
      formNewHouse: {
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
      },
      center: {
        lat: -6.2372963,
        lng: 106.7904324
      }
    }
  },
  methods: {
    handleChange(file, fileList) {
      this.fileList3 = fileList.slice(-3);
    },
    viewFormNewHouse() {
      this.dialogFormVisibleNewHouse = true
    },
    submitFormNewHouse(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let payload = {
            title: this.formNewHouse.title,
            description: this.formNewHouse.desc,
            owner: this.formNewHouse.owner,
            phone: this.formNewHouse.phone,
            size: this.formNewHouse.size,
            price: this.formNewHouse.price,
            image: this.fileList3[0].url,
            location: this.formNewHouse.location,
            latlong: `${this.marker.lat},${this.marker.lng}`,
            city: this.formNewHouse.city,
            state: this.formNewHouse.state
          }
          console.log('payload new house');
          console.log(payload);
          this.$store.dispatch('createHouse', payload)
          this.formNewHouse.title = ''
          this.formNewHouse.desc = ''
          this.formNewHouse.owner = ''
          this.formNewHouse.phone = ''
          this.formNewHouse.size = ''
          this.formNewHouse.price = ''
          this.formNewHouse.location = ''
          this.formNewHouse.latlong = ''
          this.formNewHouse.city = ''
          this.formNewHouse.state = ''
          this.dialogFormVisibleNewHouse = false
        } else {
          console.log('error add new house!!');
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
    ...mapGetters({
      statusLogin: 'isLogin'
    }),
    dataHouses() {
      return this.$store.state.dataHouses
    },
    marker() {
      return this.$store.getters.marker
    },
    stateMarker() {
      return this.$store.getters.marker
    }
  },
  created() {
    this.$store.dispatch('dataHouses')
    console.log('DataHouses');
    console.log(this.dataHouses);
  }
}
</script>

<style lang="css">
.time {
  font-size: 13px;
  color: #999;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: auto;
  height: 220px;
  display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.el-card {
  height: 400px;
}

.mini-title {
  font-size: 17px;
  font-weight: 300;
  color: #6a737c;
}

.teks-bawah {
  font-size: 85%;
  color: #848d95;
}

.el-dialog__body {
  padding: 10px 10px;
}

</style>
