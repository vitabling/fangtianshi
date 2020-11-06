<template>
  <div class="login">
    <input type="text" v-model="username"/>
    <input type="password" v-model="password" />
    <button @click="login">登录</button>
  </div>
</template>

<script>
// 调用接口示例
import { loginPassword } from "@/request/api"; // 导入我们的api接口

import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      username: 18657142502,
      password: 1,
    };
  },
  computed: {
    ...mapState({
      token: state => state.user.token
    })
  },
  mounted() {},
  methods: {
    ...mapMutations("user", {
      addToken: "addToken"
    }),
    ...mapActions("user", {
      aysncAddToken: "aysncAddToken"
    }),
    // 提交登录
    login() {
      loginPassword({ username: this.username, password: this.password })
        .then(res => {
          // 获取数据成功后利用action将请求得到的数组异步提交更新state
          // this.getList(res.data.categoryList);
          this.aysncAddToken(res.data.token)
          console.log("res",res, this.$store.state.user.token);
        })
        .catch(err => {
          console.log("error:", err);
        });
    }
  }
};
</script>

<style scoped lang="less">
</style>
