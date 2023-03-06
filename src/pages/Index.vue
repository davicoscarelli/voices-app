<template>
  <q-page class="flex flex-center">
    <div class="music-app">
      <div class="q-mt-md q-ml-md" style="justify-content: center;">
        <!-- <img style="width: 50px; height: 50px;" src="logo.png"/> -->
        <q-btn flat class="btn-all" color="white" round icon="logout" @click="logout()"></q-btn>
      </div>
      
      <!-- <div class="cover">
        <div class="cover-title">
          <p class="title">Tame Impala</p>
        </div>
        <div class="artist"></div>
        <q-btn flat class="btn btn-search">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
        </q-btn>
      </div> -->
      <div class="content">
        <div class="content-header">
          <span class="content-title">Shared with you</span>
          <q-btn flat class="btn-all" color="white" round icon="refresh" @click="getAudio(true)"></q-btn>
        </div>
        <ul class="playlist">
          <li class="list-item">
            <img class="list-item-image" src="logo.png" alt="song">
            <div class="list-item-info">
              <div class="info-title">{{ voice_topic }}</div>
              <!-- <div class="info-subtitle">Tame Impala</div> -->
            </div>
            <q-btn flat round class="btn-add" @click="playerControl">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play" fill="currentColor">
                <path d="M5 3l14 9-14 9V3z"/>
              </svg>
            </q-btn>
          </li>
          
        </ul>
        <!-- <div class="content-header">
          <span class="content-title">Albums</span>
          <q-btn flat class="btn-all">all albums</q-btn>
        </div>
        <div class="album-list">
          <div class="album-wrapper">
            <img src="https://images.unsplash.com/photo-1497911174120-042e550e7e0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2238&q=80" alt="album" class="album-cover">
            <div class="list-item-info">
              <div class="info-title">The Slow Rush</div>
            </div>
          </div>
          <div class="album-wrapper">
            <img src="https://images.unsplash.com/photo-1565021009519-22da0e21f65c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" alt="album" class="album-cover">
            <div class="list-item-info">
              <div class="info-title">Currents</div>
            </div>
          </div>
          <div class="album-wrapper">
            <img src="https://images.unsplash.com/photo-1574155088851-0c770818ba40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" alt="album" class="album-cover">
            <div class="list-item-info">
              <div class="info-title">Lonerism</div>
            </div>
          </div>
        </div> -->
      </div>

      <q-page-sticky position="bottom" :offset="[0, 30]" >
            
            
            <div class="controls row flex flex-center fixed-bottom" :style="player_expand || recorder_expand ? 'display: none' : ''" v-if="!player_expand || !recorder_expand">
            <div class>
              
              <q-btn
                color="primary"
                class="q-mx-md"
                rounded
                icon="mic"
                size="lg"
                @click="switchRecorderExpand"
              >Record</q-btn>
              
            </div>
            </div>
          </q-page-sticky>

      <div class="player" v-if="openPlayer"> 
        <q-btn flat class="btn btn-extend" @click="switchPlayerExpand">
        </q-btn>
        <div class="player-top-content">
          <!-- <img class="list-item-image" src="https://images.unsplash.com/photo-1588465023238-f8951f48a1ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" alt="song"> -->
          <div class="list-item-info">
            <div class="info-title">{{ voice_topic }}</div>
            <!-- <div class="info-subtitle">Tame Impala</div> -->
          </div>
          <div class="buttons-wrapper">
            <q-btn flat class="btn btn-play" icon="pause" @click="playerControl">
              <!-- <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play" fill="currentColor">
                <path d="M5 3l14 9-14 9V3z"/>
              </svg> -->
            </q-btn>
            <!-- <q-btn flat class="btn btn-next">
              <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-skip-forward" width="14" height="14" viewBox="0 0 24 24">
                <defs/>
                <path d="M5 4l10 8-10 8V4zM19 5v14"/>
              </svg>
            </q-btn> -->
          </div>
        </div>
        <!-- <div class="proggress-part">
          <span class="time">01:24</span>
          <div class="proggres-bar">
            <span class="progress"></span>
          </div>
          <span class="time">03:44</span>
        </div> -->
      </div>
      <div class="player-screen" :class="{ active: player_expand }">

        <q-btn flat class="btn btn-close" @click="switchPlayerExpand">
        </q-btn>
        
        <span class="top-text">Now Playing</span>
        <!-- <div class="cover-wrapper">
          <img class="cover-shadow" src="https://images.unsplash.com/photo-1588465023238-f8951f48a1ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80">
          <img  class="cover-img" src="https://images.unsplash.com/photo-1588465023238-f8951f48a1ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80">
        </div> -->
        <div class="song-info">
          <p class="song-title">{{voice_topic}}</p>
          <!-- <p class="song-subtitle">Tame Impala</p> -->

        </div>

        <div v-if="!btnStop" style="width=150vw" id="waveformstream"></div>
        
          <q-page-sticky position="bottom" :offset="[0, 30]">
            
            
            <div class="controls row flex flex-center fixed-bottom  ">
            <div class>
              
              <q-btn
                color="primary"
                class="q-mx-md"
                round
                :icon="isPlaying ? 'pause' : 'play_arrow'"
                size="xl"
                @click="wavesurfer.playPause()"
              />
              
            </div>
            </div>
          </q-page-sticky>
        
        <!--<div class="proggress-part">
          <span class="time">01:24</span>
          <div class="proggres-bar">
            <span class="progress"></span>
          </div>
          <span class="time">03:44</span>
        </div>
      <div class="action-bar">
          <q-btn flat class="btn btn-repeat"></q-btn>
          <q-btn flat class="btn btn-back"></q-btn>
          <q-btn flat class="btn btn-rewind"></q-btn>
          <q-btn flat class="play-button"></q-btn>
          <q-btn flat class="btn btn-rewind-next"></q-btn>
          <q-btn flat class="btn btn-play-next"></q-btn>
          <q-btn flat class="btn btn-list"></q-btn>
        </div> -->
        <!-- <div class="sound-bar">
          <q-btn flat class="btn btn-volume-down"></q-btn>
          <div class="proggres-bar volume">
            <span class="progress"></span>
          </div>
          <q-btn flat class="btn btn-volume-up"></q-btn>
        </div> -->
        
      </div>

      <div class="player-screen" :class="{ active: recorder_expand }">
        <q-btn flat class="btn btn-close" @click="switchRecorderExpand">
        </q-btn>
        
        <div class="song-info">
          <p class="song-title">{{new_topic}}</p>
        </div>
        
        <div v-if="!btnStop" style="width=150vw" id="waveform"></div>
        
          <q-page-sticky position="bottom" :offset="[0, 30]">
            <q-btn
            color="primary"
            push
            round
            v-if="form.audio == null"
            size="xl"
            :icon="btnStop ? 'stop' : 'mic'"
            @click="btnStop ? stop() : record()">
            </q-btn>  
            
            <div v-else class="controls row flex flex-center fixed-bottom  ">
            <div class>
              <q-btn
                color="primary"
                flat
                round
                icon="delete"
                size="xl"
                @click="clearAudio"
              />
              <q-btn
                color="primary"
                class="q-mx-md"
                round
                :icon="isPlaying ? 'pause' : 'play_arrow'"
                size="xl"
                @click="wavesurfer.playPause()"
              />
              <q-btn
                color="primary"
                flat
                round
                icon="upload"
                size="xl"
                @click="upload"
              />
            </div>
            </div>
          </q-page-sticky>
          

      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { QSpinnerBars } from 'quasar'
import WaveSurfer from "wavesurfer.js";
import { Voice } from 'src/models/Voice'
import { User } from 'src/models/User'

export default defineComponent({
  name: 'Index',
  components: {
    
  },
  data: () => ({
    form: {
      audio: null,
      size: '',
      topic: ''
	  },
    player_expand: false,
    recorder_expand: false,
    mediaRecorder: null,
    chunks: [],
    audios: [],
    btnStop: false,
    wavesurfer: null,
    openPlayer: false,
    voice_topic: '',
    new_topic: null
  }),
  methods: {  
    switchPlayerExpand(){
      this.player_expand = !this.player_expand
    },
    async switchRecorderExpand(){
      this.recorder_expand = !this.recorder_expand
      this.clearAudio()
      if(!this.new_topic) this.getTopic()
      else this.new_topic = null
    },
    clearAudio(){
      if(this.wavesurfer) this.wavesurfer.destroy()
      this.btnStop = false
      this.wavesurfer = null
      this.form = {
        audio: null,
        size: ''
      }
    },
    playerControl(){
      this.clearAudio()
      this.switchPlayerExpand()
      this.loadAudio()
      this.wavesurfer.playPause()

    },
    init () {
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then((stream) => {
            this.mediaRecorder = new MediaRecorder(stream)
            var reader = new window.FileReader();

            this.mediaRecorder.ondataavailable = (e) => {
              this.chunks.push(e.data)
            }
            this.mediaRecorder.onstop = (e) => {
              const blob = new Blob(this.chunks, { type: 'audio/ogg; codecs=opus' })
              const audioURL = window.URL.createObjectURL(blob)
              this.chunks = []
              this.audios.push(audioURL)
              this.wavesurfer = WaveSurfer.create({
                container: "#waveform",
                barWidth: 3,
                barHeight: 3,
                cursorWidth: 2,
                cursorColor: "#6343e4"
              });
              this.wavesurfer.loadBlob(blob);
              reader.readAsDataURL(blob); 
              reader.onloadend = () => {
                this.form.audio = reader.result;
                this.form.audio = this.form.audio.split(',')[1];
                console.log(this.form.audio);
              }
            }
          })
          .catch(function (err) {
            console.log('The following getUserMedia error occured: ' + err)
          })
      } else {
        alert('getUserMedia not supported on your browser!')
      }
    },
    record () {
      this.mediaRecorder.start()
      
      this.btnStop = true
      
    },
    stop () {
      this.mediaRecorder.stop()
      // this.$q.loading.hide()
      this.btnStop = false      
    },
    async getAudio(reload=false){
      this.$q.loading.show({
              spinner: QSpinnerBars,
              spinnerColor: 'white',
            })
      
      if(localStorage.voice && localStorage.voice.length > 0 && !reload){
          this.loadAudio()
          this.$q.loading.hide()
      }else{
        const success = await Voice.getAudio()

        this.$q.loading.hide()

        if (success) {
          this.playerControl()
        }
        
      }
      this.$q.loading.hide()
      

    },

    async getTopic(){
      this.$q.loading.show({
              spinner: QSpinnerBars,
              spinnerColor: 'white',
            })

      this.new_topic = await Voice.getTopic()
      this.form.topic = this.new_topic

      this.$q.loading.hide()


    },
    loadAudio(){
      let voice = JSON.parse(localStorage.voice)
      this.voice_topic = voice.topic
      var url = voice.base64
      if(url && url.length > 100){
        let blob = Voice.b64toBlob(url)
        
        this.wavesurfer = WaveSurfer.create({
            container: "#waveformstream",
            barWidth: 3,
            barHeight: 3,
            cursorWidth: 2,
            cursorColor: "#6343e4",
            xhr: {
              cache: 'default',
              mode: 'no-cors',
              method: 'GET',
              credentials: 'same-origin',
              redirect: 'follow',
              referrer: 'client',
            }
          });
          this.wavesurfer.loadBlob(blob);
      }
    },
    async upload() {
      this.$q.loading.show({
              spinner: QSpinnerBars,
              spinnerColor: 'white',
            })

      const success = await Voice.upload(this.form)

      this.$q.loading.hide()

      if (success) {
        this.switchRecorderExpand()
      }
    },
    async logout() {
          console.log("EXIT")
          await User.logout()
          this.$router.go(0)
      }, 
  },
  mounted () {
    this.init()
    this.getAudio()
  },

  computed: {
    isPlaying() {
      if (!this.wavesurfer) return false;

      return this.wavesurfer.isPlaying();
    }
},
  
})
</script>

<style lang="scss" >
@import url('https://fonts.googleapis.com/css?family=DM+Sans:400,500,700&display=swap');

:root {
  font-family: 'DM-sans', sans-serif;
}

//Common Variables
$main-color: #1f2128;
$font-color: #fff;
$secondary-font-color: #59657c;
$purple: #6343e4;
$player-color: #323542;

* {
  box-sizing: border-box;
  outline: none;
}

html, body {
  width: 100%;
  height: 100vh;
  margin: 0;
}

body {
  background-color: #181a20;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  outline: none;
}

img { 
  width: 100%; 
  height: 100%;
}

.music-app {
  position: relative;
  background-color: $main-color;
  width: 320px;
  height: 620px;
  border-radius: 30px;
  box-shadow: 0px 0px 2px 0px rgba(40, 42, 53, 0.28);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
  @media screen and (max-width: 420px) {
    width: 100%;
    height: 100vh;
    border-radius: 0;
  }
}

.cover {
  position: relative;
    width: 100%;
    height: 160px;
    background-image: url("https://images.unsplash.com/photo-1546707012-c46675f12716?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2249&q=80");
    background-size: cover;
    background-position: center -40px;
    padding-top: 70px;
    background-repeat: no-repeat;
}

.artist {
  position: absolute;
  left: 50%;
  transform: translate(-50%,50%);
  bottom: 0;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-image: url("https://images.unsplash.com/photo-1474692295473-66ba4d54e0d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80");
  background-size: cover;
  border: 10px solid $main-color;
}

.cover-title {
  color: $font-color;
  text-align: center;
  
  p { margin: 0; }
}

.title {
  font-size: 34px;
  line-height: 32px;
}

.sub-title {
  font-size: 14px;
  line-height: 16px;
}

.btn {
  color: $font-color;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  
  &-search {
    position: absolute;
    right: 20px;
    top: 20px;
    background-color: $main-color;
    padding: 8px 10px;
    border-radius: 10px;
    color: $font-color;
    transition: all .2s ease-in;
    
    &:hover {
      background-color: lighten($main-color, 6%);
    }
  }
  
  &-all {
    color: $purple;
    margin-left: auto;
    font-size: 12px;
    font-weight: 500;
    transition: color .2s ease-in;
    
    &:hover {
      color: lighten($purple,10%);
    }
  }
  
  &-add {
    color: $font-color;
    margin-left: auto;
  }
  
  &-next {
    color: $font-color;
  }
  
  &-back {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='%23424665' stroke='%23424665' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' class='feather feather-skip-back'%3E%3Cdefs/%3E%3Cpath d='M19 20L9 12l10-8v16zM5 19V5'/%3E%3C/svg%3E");
  }
  
  &-repeat {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' class='feather feather-repeat' width='24' height='24' viewBox='0 0 24 24'%3E%3Cdefs/%3E%3Cpath d='M17 1l4 4-4 4'/%3E%3Cpath d='M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4'/%3E%3Cpath d='M21 13v2a4 4 0 01-4 4H3'/%3E%3C/svg%3E");
  }
  
  &-rewind, &-rewind-next {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='%23424665' stroke='%23424665' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' class='feather feather-rewind'%3E%3Cdefs/%3E%3Cpath d='M11 19l-9-7 9-7v14zM22 19l-9-7 9-7v14z'/%3E%3C/svg%3E");
  }
  
  &-rewind-next {
    transform: rotate(180deg);
  }
  
  &-play-next {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='%23424665' stroke='%23424665' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' class='feather feather-skip-back'%3E%3Cdefs/%3E%3Cpath d='M19 20L9 12l10-8v16zM5 19V5'/%3E%3C/svg%3E");
    transform: rotate(180deg);
  }
  
  &-list {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' class='feather feather-list'%3E%3Cdefs/%3E%3Cpath d='M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01'/%3E%3C/svg%3E");
  }
  
  &-volume-down {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23424665' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' class='feather feather-volume-x'%3E%3Cdefs/%3E%3Cpath d='M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6'/%3E%3C/svg%3E");
  }
  
  &-volume-up {
   background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%236343e4' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' class='feather feather-volume-2'%3E%3Cdefs/%3E%3Cpath d='M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07'/%3E%3C/svg%3E");
  }
}


.content {
  flex: 1;
  overflow: auto;
  height: calc(100% - 32px);
  
  &-header {
    padding: 0px 20px 6px 20px;
    display: flex;
    
    &:first-of-type { 
      padding: 30px 20px 0 20px; 
    }
  }
  
  &-title {
    color: $font-color;
    font-size: 16px;
    font-weight: 500;
  }
}

.playlist {
  padding: 0;
  list-style-type: none;
}

.list-item {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 10px 20px;
  border-bottom: 1px solid rgba(198, 178, 250,.1);
  // cursor: pointer;
  background-color: $main-color;
  transition: all .2s ease-in;
  overflow: auto;
  
  // &:hover {
  //   background-color: lighten($main-color,4%);
  // }
  
  &-image {
    border-radius: 10px;
    width: 32px;
    height: 32px;
    object-fit: cover;
    margin-right: 16px;
  }
}

.info-title,
.info-subtitle {
  color: $font-color;
}

.info-title {
  font-size: 12px;
  line-height: 18px;
  font-weight: 500;
}

.info-subtitle {
  font-size: 10px;
  color: $secondary-font-color;
}

.album-list {
  display: flex;
  align-items: flex-start;
}

.album-wrapper {
  width: 33.3%;
  text-align: center;
  
  .info-title,
  .info-subtitle {
    cursor: pointer;
    
    &:hover {
      opacity: .7;
    }
  }
}

.album-cover {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  transition: all .2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
  
  &:before {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: $main-color;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
}

.player {
  position: relative;
  width: 100%;
  height: 76px;
  bottom: 0;
  background-color: $player-color;
  padding: 16px 20px;
  margin-top: auto;
  
  &:hover {
    .btn-extend {
      top: -16px;
      transition: all .3s ease;
    }
  }
}

.player-top-content {
  display: flex;
  align-items: center;
}

.buttons-wrapper {
  margin-left: auto;
  display: flex;
  align-items: center;
  
  button:first-of-type {
    // margin-right: 24px;
  }
}

.proggress-part {
  display: flex;
  align-items: center;
  padding: 6px 0;
}

.time {
  display: inline-block;
  font-size: 8px;
  line-height: 12px;
  color: $font-color;
  
  &:first-of-type {
    color: $secondary-font-color;
  }
}

.proggres-bar {
  height: 2px;
  width: 100%;
  margin: 0 8px;
  background-color: $main-color;
  border-radius: 2px;
  overflow: hidden;
}

.progress {
  display: block;
  position: relative;
  width: 40%;
  height: 100%;
  background-color: $purple; 
  border-radius: 6px;
}

.btn-extend {
  position: absolute;
  left: 0;
  top: -12px;
  padding: 12px 0;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-color: $player-color;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' class='feather feather-chevron-up' width='' viewBox='0 0 24 24'%3E%3Cdefs/%3E%3Cpath d='M18 15l-6-6-6 6'/%3E%3C/svg%3E");
  transition: all .3s ease;
}

.btn-close, .btn-extend {
  width: 100%;
  background-repeat: no-repeat;
  background-size: 20px;
  background-position: center;
}

.player-screen {
  position: absolute;
  top: 0;
  transform: translatey(100%);
  z-index: 2;
  background-color: $main-color;
  height: 100%;
  width: 100%;
  padding: 20px;
   transition: all .4s ease;
  
  &.active {
    top: 0;
    transform: translatey(0);
     transition: all .4s ease;
  }
}

.btn-close {
  padding-top: 30px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='%23536383' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' class='feather feather-chevron-down' viewBox='0 0 24 24'%3E%3Cdefs/%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
}

.top-text {
  display: block;
  color: $font-color;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 30px;
}

.cover-wrapper {
  position: relative;
  border-radius: 50%;
  width: 100%;
  display: flex;
  justify-content: center;
  
  img {
    margin: 0 auto;
    object-fit: cover;
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
}

.cover-img {
  position: relative;
  z-index: 2;
}

.cover-shadow {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-46%);
  filter: blur(32px);
  width: 100%;
  height: 120px;
  z-index: 1;
}

.song-info {
  text-align: center;
  
  .song-title {
    color: $font-color;
    font-weight: 600;
  }
  
  .song-subtitle {
    color: $secondary-font-color;
    font-size: 12px;
  }
}

.player-screen {
  .proggress-part {
    margin: 0 auto;
    padding-top: 30px;
    max-width: 80%;
  }
  
  .proggres-bar {
    border-radius:6px;
    height: 4px;
    background-color: $player-color;
  }
}

.action-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
  
  .btn {
    width: 24px;
    height: 20px;
    
    &-repeat { margin-right: 16px; }
    &-list { margin-left: 16px; }
  }
}

.play-button {
  width: 40px;
  height: 40px;
  color: #fff;
  background-color: $purple;
  border-radius: 12px;
  padding: 4px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-play' fill='%23fff'%3E%3Cpath d='M5 3l14 9-14 9V3z'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: 0px 0px 5px 2px rgba(91,62,222,0.5);
}

.sound-bar {
  display: flex;
  align-items: center;
  margin-top: 24px;
  
  .btn {
    width: 16px;
    height: 16px;
  }
}

.volume-slider {
  width: 100%;
  -webkit-appearance: none;
  width: calc(100% - (70px));
  height: 2px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.314);
  outline: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
}

.volume {
  overflow: visible;
  cursor: pointer;
}

.volume .progress:after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: $purple;
  right: 0;
  top: 50%;
  transform: translatey(-50%);
}

@media screen and (max-width: 420px) {
  .cover-wrapper img {
    width: 150px;
    height: 150px;
  }
  
  .song-title {
    font-size: 30px;
    margin: 25px 0;
  }
  
  .player-screen .proggress-part {
    padding-top: 16px;
  }
  
  .action-bar {
    margin-top: 16px;
  }
  
  .player {
    // height: 100px;
  }
  
  .content {
    padding-bottom: 32px;
  }
  
}

.content-wrapper {
  height: 80vh;
  margin-top: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.recorder_wrapper {
    width: 100%;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.recorder {
    display: inline-block;
    text-align: center;
    width: 500px;
    max-width: 100%;
}

.record_btn {
    width: 100px;
    height: 100px;
    font-family: 'Material Icons';
    font-size: 48px;
    color: #e74c3c;
    background: none;
    border: 2px solid #e74c3c;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.15s linear;
}

.record_btn:hover {
    transition: 0.15s linear;
    transform: scale( 1.05 );
}

.record_btn:active {
    background: #f5f5f5;
}

.record_btn:after {
    content: '\E029';
}

.record_btn[disabled] {
    border: 2px solid #ccc;
}

.record_btn[disabled]:after {
    content: '\E02B';
    color: #ccc;
}

.record_btn[disabled]:hover {
    transition: 0.15s linear;
    transform: none;
}

.record_btn[disabled]:active {
    background: none;
}

.recording {
    animation: recording 2s infinite ease-in-out;
    position: relative;
}

.recording:before {
    content: '';
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0px;
    height: 0px;
    margin: 0px;
    border-radius: 50%;
    background: rgba( 0, 0, 0, 0.05 );
    animation: recording_before 2s infinite ease-in-out;
}

@keyframes recording {
    from {
        transform: scale( 1.1 );
    }

    50% {
        transform: none;
    }

    to {
        transform: scale( 1.1 );
    }
}

@keyframes recording_before {
    80% {
        width: 200px;
        height: 200px;
        margin: -100px;
        opacity: 0;
    }

    to {
        opacity: 0;
    }
}

.record_canvas {
    width: 60px;
    height: 100px;
    display: inline-block;
    
}

.txt_btn {
    color: #000;
    text-decoration: none;
    transition: 0.15s linear;
    animation: text_btn 0.3s ease-in-out;
}


</style>
