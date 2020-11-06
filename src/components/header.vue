<template>
  <div class="header">
    <!-- 头部导航 -->
    <div class="head_menu">
      <div class="head_menu_fixed">所有商品</div>
      <div class="dropdown_box">
        <div class="item" v-for="(item,index) in categoryList" :key="index">
          <div class="head">
            <img class="pic"  />
            <span @click="dpSelect(item.id, item.name)" class="text" >{{item.name}}</span>
          </div>
          <div class="content">
            <span class="item" v-for="(pitem,index) in item.son" :key="'p'+index" @click="dpSelect2(item.id, item.name,pitem.id,pitem.name)">{{pitem.name}}</span>
          </div>
        </div>
      </div>
      <!-- <ul class="head_menu_ul" @select="selectItems" :default-active="headerselected" active-text-color="#ffd04b"> -->
      <ul class="head_menu_ul"  active-text-color="#ffd04b">
        <!-- <li index="0" @click="select(0)" :class="parentId == null ? 'head_menu_ul_li_active': ''"> -->
        <li index="0" @click="select(0)" >
          <span slot="title">首页</span>
        </li>
        <!-- <li v-for="(item,index) in categoryList" :key="index" :index="index+1+''" :class="parentId == item.id ? 'head_menu_ul_li_active': ''" @click="select(item.id,index+1,item.name)"> -->
        <li v-for="(item,index) in categoryList" :key="index" :index="index+1+''"  @click="select(item.id,index+1,item.name)">
          <span slot="title">{{item.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// 调用接口示例
import { indexData } from "@/request/api"; // 导入我们的api接口

import { mapState, mapActions } from "vuex";
export default {
  name: "Header",
  props: {
  },
  data() {
    return {
      
    };
  },
  created() {
    this.onLoad();
  },
  computed: {
    ...mapState({
      //categoryList
      categoryList: state => state.common.categoryList
    })
  },
  mounted() {},
  methods: {
    ...mapActions("common", {
      getList: "aysncaddcategoryList"
    }),
    // 获取数据
    onLoad() {
      indexData()
        .then(res => {
          // 获取数据成功后利用action将请求得到的数组异步提交更新state
          this.getList(res.data.categoryList);
        })
        .catch(err => {
          console.log("error:", err);
        });
    },

    dpSelect(itemId, itemName) {
      this.$emit("dpSelectbox", { itemId, itemName });
      this.$router.push({
        name: "zhuangxiu",
        query: { id: itemId, name: itemName }
      });
      this.parentId = itemId;
    },
    dpSelect2(itemId, itemName, catId, pname) {
      this.$emit("dpSelectbox2", { itemId, itemName, catId, pname });
      this.$router.push({
        name: "zhuangxiu",
        query: { id: itemId, name: itemName, catId: catId, pname: pname }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
// 头部导航
.head_menu {
  display: flex;
  width: 1200px;
  margin: 0 auto;
  position: relative;

  .dropdown_box {
    display: none;
    width: 180px;
    height: 380px;
    background: #ffffff;
    position: absolute;
    top: 30px;
    left: 0;
    z-index: 99;
    transition: 0.5s;
    box-shadow: 0px 0px 10px 0px rgba(116, 116, 116, 0.26);
    // &:hover {
    //   display: block;
    // }

    .item {
      width: 180px;
      padding: 0 10px;
      /* margin: 10px 0; */
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      border-bottom: 1px solid #e1e1e1;
      height: 94px;
      &:last-child {
        border-bottom: none;
      }
      &:hover {
        background: #fff9ef;
      }

      .head {
        text-align: left;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .pic {
          width: 20px;
          height: 20px;
        }

        .text {
          font-size: 18px;
          font-family: "MicrosoftYaHei";
          color: #000000;
          margin-left: 10px;
          &hover {
            color: #f26c00;
          }
        }
      }

      .content {
        text-align: left;
        padding-bottom: 20px;
        width: 160px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        .item {
          color: #666666;
          font-family: "MicrosoftYaHei";
          font-size: 14px;
          margin: 5px;
          &:hover {
            cursor: pointer;
            color: #f26c00;
          }
        }
      }
    }
  }
  .head_menu_fixed {
    background: linear-gradient(to left, #f26c00, #ffbd56);
    background: -webkit-gradient(
      linear,
      right top,
      left top,
      from(#f26c00),
      to(#ffbd56)
    );
    height: 30px;
    width: 180px;
    line-height: 30px;
    font-family: "MicrosoftYaHei";
    color: #ffffff;
    font-size: 18px;
    &:hover+.dropdown_box{
      display: block;
    }
  }

  .head_menu_ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #000000;
    font-size: 18px;
    flex: 1;
    li {
      flex: 1;
      text-align: center;
      cursor: pointer;
      /* padding-left: 20px; */
    }

    .head_menu_ul_li_active {
      color: #f26c00;
    }
  }
}
</style>
