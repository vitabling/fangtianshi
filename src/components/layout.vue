<template>
  <div class="layout">
    <Header></Header>
      <router-view />
    <Footer></Footer>
  </div>
</template>
<script>
import header from "@/components/header.vue";
import footer from "@/components/footer.vue";

export default {
  components: {
    Header: header,
    Footer: footer
  }
};
</script>

<style lang="less">
.layout{
  height: 100%;
}
</style>
