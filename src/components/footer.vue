<template>
    <div class="footer">
		<div class="footer_head">
				<!-- <img class="itemimg1" src="../../assets/images/footer/tuihuan.png"/>
				<img class="itemimg2" src="../../assets/images/footer/mian.png"/>
				<img class="itemimg3" src="../../assets/images/footer/zhengpin.png"/> -->
				<img class="itemimg1">
				<img class="itemimg2">
				<img class="itemimg3">
		</div>
		<div class="footer_bottom">
			<div class="footer_bottom_left">
				<div class="footer_bottom_left_top">
					<!-- <router-link :to="{name:'aboutus'}" class="footer_bottom_left_top_item">关于我们</router-link> -->
					<div class="footer_bottom_left_top_item">关于我们</div>
					<div class="footer_bottom_left_top_item">帮助中心</div>
					<div class="footer_bottom_left_top_item">售后服务</div>
					<div class="footer_bottom_left_top_item">配送与验收</div>
					<div class="footer_bottom_left_top_item">商务合作</div>
					<div class="footer_bottom_left_top_item">企业采购</div>
					<div class="footer_bottom_left_top_item">开放平台</div>
					<div class="footer_bottom_left_top_item">搜索推荐</div>
					<div class="footer_bottom_left_top_item">友情链接</div>
				</div>
				<div class="footer_bottom_left_bottom">
					公司版权所有 2018-2019    经营许可证：JY15963248885665   单用途商业预付卡备案证：3352246AAC52233
				</div>
			</div>
			<div class="footer_bottom_right">
				<!-- <img src="../../assets/images/footer/police.png"/> -->
        <img src="" alt="">
			</div>
		</div>
	</div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="less">
.footer {
  box-sizing: border-box;
  background: #f26c00;
  width: 100%;
  /* height: 190pt; */
  /* height: 380px; */
  /* margin-top: 10px; */
  min-height: 280px;
  line-height: 22px;
  color: #fff;
  font-size: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 45px;
}
.wrapper {
  width: 62.5%;
  margin: auto;
}
.footer_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 150px;
  width: 70%;
  padding: 0 5%;
  border-bottom: 1px solid #e6e6e6;
}
.itemimg1 {
  width: 252px;
  height: 64px;
}
.itemimg2 {
  height: 64px;
  width: 201px;
}
.itemimg3 {
  height: 64px;
  width: 190px;
}
.footer_bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;

  .footer_bottom_left {
    display: flex;
    flex-direction: column;

    .footer_bottom_left_top {
      display: flex;
      align-items: center;
      .footer_bottom_left_top_item {
        padding: 1px 18px;
        border-right: 1px solid #fff;
        font-size: 14px;
        color: #ffffff;
        height: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        &:last-child {
          border-right: none;
        }
      }
    }
    .footer_bottom_left_bottom {
      margin-top: 7px;
      color: #ffffff;
      font-size: 14px;
    }
  }
  .footer_bottom_right {
    margin-left: 18px;
    img {
      width: 37px;
      height: 43px;
    }
  }
}
</style>