<template>
  <div class="index">
    <el-container>
      <!-- 顶栏 -->
      <el-header>
        <div class="search">
          <el-input
            placeholder="搜索"
            v-model="input"
            prefix-icon="el-icon-search"
            clearable
            size="small"
            @keyup.enter="songSearch"
          >
          </el-input>
        </div>
        <div class="login">
          <span v-if="isLogin">
            <img :src="grayPic" alt="已登录" />
          </span>
          <span v-else>
            <img :src="grayPic" alt="暂未登录" />
            <p>暂未登录</p>
          </span>
        </div>
      </el-header>

      <el-container>
        <!-- 侧栏 -->
        <el-aside style="width: 180px">
          <el-menu
            default-active="/discovery"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :router="true"
          >
            <el-menu-item index="/discovery">
              <i class="el-icon-menu"></i>
              <template #title>发现音乐</template>
            </el-menu-item>

            <el-menu-item index="/video">
              <i class="el-icon-video-play"></i>
              <template #title>视频</template>
            </el-menu-item>

            <el-menu-item index="/pfm">
              <i class="el-icon-mobile"></i>
              <template #title>私人FM</template>
            </el-menu-item>

            <el-menu-item index="/favourite">
              <i class="el-icon-star-on"></i>
              <template #title>我喜欢的音乐</template>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <!-- 主体区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>

        <!-- 底部播放栏 -->
      </el-container>
      <el-footer>
        <div class="play">
          <audio :src="songUrl" controls="controls"></audio>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import siteLogo from "@/assets/ncm.png";
import grayPic from "@/assets/user.png";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      input: "",
      fits: ["fill", "contain", "cover", "none", "scale-down"],
      siteLogo,
      grayPic,
      isLogin: false,
      songUrl: "",
      songList: [],
    };
  },
  methods: {
    async songSearch() {
      // 获取歌曲ID
      const response = await axios.get(`http://localhost:3000/search?keywords=${this.input}`);
      const songId = response.data.result.songs[0].id;
      console.log(`${songId}`);

      // 通过ID获取歌曲URL
      const rep = await axios.get(`http://localhost:3000/song/url?id=${songId}`);
      this.songUrl = rep.data.data[0].url;
      console.log(rep);
    },
  },
});
</script>

<style scoped lang="scss">
.index {
  height: 100%;
  .el-container {
    height: 100%;
    .el-header {
      position: relative;
      height: 60px;
      background-color: #233;
      .search {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 200px;
        transform: translate(-50%, -50%);
      }
      .login {
        position: absolute;
        top: 50%;
        left: 60%;
        transform: translateY(-50%);
        width: 200px;
        line-height: 100%;
        // background-color: blue;
        span {
          display: inline-block;
          width: 40px;
          height: 40px;
          border-radius: 20px;
          background-color: rgb(70, 97, 97);
          img {
            width: 40px;
            height: 40px;
          }
          p {
            position: absolute;
            left: 50px;
            top: 50%;
            color: #fff;
            transform: translateY(-50%);
          }
        }
      }
    }
    .el-container {
      height: 100%;
      .el-aside {
        height: 100%;
        // background-color: #545c64;
        .el-menu {
          height: 100%;
        }
        .el-menu-item {
          margin-top: 30px;
        }
      }
      .el-main {
        height: 100%;
        background-color: rgb(217, 237, 240);
      }
    }

    .el-footer {
      height: 60px;
      background-color: #f1f3f4;
      .play {
        // background-color: #f1f3f4;
        text-align: center;
        audio {
          width: 80%;
          text-decoration: none;
        }
      }
    }
  }
}
</style>