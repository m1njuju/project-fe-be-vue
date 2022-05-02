<template>
  <div id="app">
    <v-app>
      <!-- 상단 툴바 -->
            <AppToolbar />
      <transition name="view">
      <router-view />
      </transition>
            <!-- 푸터 영역 -->
            <v-footer color="info lighten-2" dark app>
                <div class="mx-auto">
                    <small>Copyright &copy; {{ new Date().getFullYear() }} 
                      송민주. m1njuju , Ltd. All Rights Reserved</small>
                </div>
            </v-footer>
    </v-app>
    
  </div>
</template>

<script>
import AppToolbar from './components/AppToolbar.vue'


export default {
  name:'App',
  components: {
    AppToolbar,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.view-enter-active, .view-leave-active {
  transition: opacity 0.5s;
}
.view-leave-active {
  position: absolute;
}
.view-enter, .view-leave-to {
  opacity: 0;
}
</style>
