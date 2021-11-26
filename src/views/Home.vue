<template>
  <div class="home">
    <!-- App.vue -->
    <el-container>
      <el-aside width="15vw">
        <v-card
            height="15vh"
            outlined
        >

          <v-list-item three-line>
            <v-avatar size="150">
              <img
                  :src="require('/src/assets/logo.png')"
                  alt="simple-dns"
              >
            </v-avatar>
            <v-list-item-content>
              <!--              <div class="text-overline mb-4">-->
              <!--                TE AMO-->
              <!--              </div>-->
              <v-list-item-title class="text-h5 mb-1">
                <div>Simple</div>
                <div>DNS</div>
              </v-list-item-title>

              <v-list-item-subtitle>轻量级DNS</v-list-item-subtitle>
            </v-list-item-content>


          </v-list-item>

        </v-card>
        <v-card
            class="mx-auto"
            max-width="500"
            min-height="85vh"
        >
          <v-list>
            <v-list-item-group v-model="model">
              <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
                  @click="$router.push({path:'/home/'+item.link})"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>

      </el-aside>
      <el-container>
        <el-header style="height: 70px;display: flex;flex-direction: row-reverse" >
          <v-avatar width="300" height="70 " tile="false">
            <img
                :src="require('/src/assets/logo2.png')"
                alt="simple-dns"
            >
          </v-avatar>
        </el-header>
        <el-main>

          <transition :name="transitionName" style="width: 100%;height: 100%">
            <router-view/>
          </transition>
        </el-main>
        <el-footer style="display: flex;flex-direction: row;justify-content: center;align-items: center;">
          <a href="http://www.github.com" target="_blank" style="line-height: 60px;margin-right: 50px">simple-dns</a>
          <div style="color: #333333;line-height: 60px">Copy Right @ dollarkiller</div>
        </el-footer>
      </el-container>
    </el-container>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data: () => ({
    transitionName: '',

    items: [
      {
        icon: 'mdi-inbox',
        text: 'DNS',
        link: 'dns'
      },
      {
        icon: 'mdi-star',
        text: 'DDNS',
        link: 'ddns'
      },
      // {
      //   icon: 'mdi-send',
      //   text: 'Send',
      //   link: ''
      // },
      {
        icon: 'mdi-cog-outline',
        text: '设置',
        link: 'setting'
      },
    ],
    model: 1,
  }),

  watch: {//使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = 'slide-left';
      } else {
        this.transitionName = 'slide-right';
      }
    }
  }
}
</script>

<style scoped>
.home {
  width: 100vw;
  height: 100vh;
  display: flex;
}

.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.view {
  width: 100%;
  position: absolute;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 250ms;
  position: absolute;
}

.slide-right-enter {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}

.slide-left-enter {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}
</style>
