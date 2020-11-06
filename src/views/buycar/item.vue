<template>
  <div class="item">
    <div class="left">
      <!-- <input type="checkbox" :checked="good.checked" @click="singleSelect(good, index)" /> -->
      <span class="checkbox_pic"></span>
      <router-link class="left_img" :to="{name:'productdetail',query:{goods_id:good.goods_id}}">
        <img :src="good.goods_pic" />
      </router-link>
      <div class="detail">
        <div class="title">{{good.title}}</div>
        <div class="bottom">
          <span>规格：{{good.attributes}}   款式：{{good.style}}</span>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="price">￥{{good.preferential_price}}</div>
      <div class="num">
        <!-- <el-input-number style="width:150px!important;" v-model="good.num" @change="handleChange(good.num,good.car_id)" :min="1" :max="1000" label="描述文字"></el-input-number> -->
      </div>
      <div class="all">￥{{good.preferential_price * good.num}}</div>
      <div class="edit">
        <span @click="addCollection(good.goods_id)">移入收藏夹</span>
        <span @click="delGood(good.car_id)">删除</span>
      </div>
    </div>
    
  </div>
</template>
<script>
import { delCar } from "@/request/user"; // 导入我们的api接口
export default {
  props: {
    good: Object
  },
  data() {
    return {
      data: "productdetail"
    };
  },
  created() {
    console.log("props", this.good);
  },
  methods: {
    //加入收藏
    addCollection() {},
    //删除商品
    delGood(id) {
      let params = {
        car_id: id
      };
      delCar({car_id:id})
        .then(res => {
          // 获取数据成功后利用action将请求得到的数组异步提交更新state
          // this.getList(res.data.categoryList);
          console.log(res);
          // this.buycarList = res.data.goods_info; //购物车商品列表
        })
        .catch(err => {
          console.log("error:", err);
        });
    },
    //单选商品
    singleSelect() {}
  }
};
</script>
<style lang="less" scoped>
.item {
  .left {
    display: flex;
    justify-content: left;
    align-items: center;
    margin-left: 20px;
    position: relative;
    flex: 1;

    .left_img {
      width: 98px;
      height: 98px;
      /* padding: 30px 0; */
      margin: 0 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .detail {
      display: flex;
      flex-direction: column;
      .title {
        text-align: left;
        margin-bottom: 20px;
        font-size: 16px;
        color: #000;
      }
      .bottom {
        text-align: left;
        color: #666666;
        font-size: 14px;
      }
    }
  }
  .right {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    margin-left: 50px;
    margin-right: 60px;

    .price {
      font-size: 14px;
      color: #000;
    }

    .all {
      color: #f26c00;
      font-size: 14px;
      font-weight: bold;
    }

    .edit {
      display: flex;
      flex-direction: column;
      span {
        text-align: left;
        color: #666666;
        font-size: 12px;
        margin: 5px 0;
      }
    }
  }
}
</style>

