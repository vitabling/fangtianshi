<template>
  <div class="buycar_page">
    <div class="product">
      <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item style="color:#F26C00;">购物车</el-breadcrumb-item>
      </el-breadcrumb> -->
      <div class="buycar_contain">
        <div class="buycar_contain_head">
          <div class="head_left">我的购物车</div>
          <div class="head_right">
            <span>单价</span>
            <span>数量</span>
            <span>小计</span>
            <span>操作</span>
          </div>
        </div>
        <div class="buycar_contain_content" v-if="buycarList.length > 0">
          <!-- <div class="content_item" v-for="(item,index) in buycarList" :key="index">
            <div class="content_item_left">
              <input type="checkbox" :checked="item.checked" @click="singleSelect(item, index)" />
              <span class="checkbox_pic"></span>
              <router-link :to="{name:'productdetail',query:{goods_id:item.goods_id}}" class="item_left_img">
                <img :src="item.goods_pic[0]" />
              </router-link>
              <div class="item_left_detail">
                <div class="content_item_detail_title">{{item.title}}</div>
                <div class="content_item_detail_bottom">
                  <span class="detail_bottom_left">规格：{{item.attributes}}   款式：{{item.style}}</span>
                </div>
              </div>
            </div>
            <div class="content_item_right">
              <div class="item_right_price">￥{{item.preferential_price}}</div>
              <div class="item_right_num">
                <el-input-number style="width:150px!important;" v-model="item.num" @change="handleChange(item.num,item.car_id)" :min="1" :max="1000" label="描述文字"></el-input-number>
              </div>
              <div class="item_right_price_all">￥{{item.preferential_price * item.num}}</div>
              <div class="item_right_edit">
                <span @click="addCollection(item.goods_id)">移入收藏夹</span>
                <span @click="delGood(item.car_id)">删除</span>
              </div>
            </div>
          </div> -->
          <Item v-for="(item,index) in buycarList" :key="index" :good="item" ></Item>
          <!-- <div class="content_item_box" v-for="(item,index) in buycarList2" :key="index">
            <div class="content_item2" >
              <div class="content_item_left">
                <span class="xiajia">已下架</span>
                <img  class="item_left_img" :src="item.goods_pic[0]" />
                <div class="item_left_detail">
                  <div class="content_item_detail_title">{{item.title}}</div>
                  <div class="content_item_detail_bottom">
                    <span class="detail_bottom_left">规格：{{item.attributes}}   款式：{{item.style}}</span>
                  </div>
                </div>
              </div>
              <div class="content_item_right">
                <div class="item_right_price">￥{{item.preferential_price}}</div>
                <div class="item_right_num">{{item.num}}</div>
                <div class="item_right_price_all">￥{{item.preferential_price * item.num}}</div>
                <div class="item_right_edit">
                  <span @click="addCollection(item.goods_id)">移入收藏夹</span>
                  <span @click="delGood(item.car_id)">删除</span>
                </div>
              </div>
            </div>
          </div> -->
          
          <!-- <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            background
            layout="prev, pager, next"
            :total="total">
          </el-pagination> -->
          <div class="content_bottom">
            <div class="content_bottom_list">
              <div class="bottom_list_left">
                <div @click="allSelect">
                  <input type="checkbox"  :checked="isAllSelected"/>
                  <span class="checkbox_pic"></span>
                  <span class="bottom_list_left_span">全选</span>
                </div>
                <div>
                  <span class="bottom_list_left_span">已选({{selectNum}})件</span>
                  <span class="bottom_list_left_span" @click="delGood(car_id)">批量删除</span>
                </div>
                
                <!-- <span>清除失效商品</span> -->
              </div>
              <div class="bottom_list_right">应付总额<span>{{sumprice}}元</span></div>
            </div>
            <button class="content_bottom_submit" @click="goOrdersuer()">结算</button>
          </div>
        </div>
        <div class="buycar_contain_content" v-else>
          <!-- <img class="no_card_img" src="../../assets/images/kongzhuangtai/product.png"/> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>

// 调用接口示例
import { carList } from "@/request/user"; // 导入我们的api接口
import { mapState, mapActions } from "vuex";
import Item from './item.vue';

export default {
  name: "buyCar",
  data() {
    return {
      moveLeftValue: 0,
      // num: 1, //计数器
      buycarList: [],//购物车商品列表
      buycarList2: [],
      loginToken:"",
      sumprice:0,
      car_id:"",
      currentPage: 1,
      pageSize: 10,
      total: 0,
      selectNum:0, //已选数量
      // isAllSelected:false,
    };
  },
  components: {
    Item
  },
  created() {
    this.$store.state.adminheadernum = "0";
  },
  mounted() {
    // var bh = window.innerHeight;
    // $("body").css("height", bh);
    // this.loginToken = JSON.parse(sessionStorage.getItem("loginToken"));
    this.getData();
    this.getData2();
    
  },
  watch:{
    newValue(val){
      // console.log("sumprice:"+val);
    },
    checkedGoodIds(val){
      this.sumprice = 0;
      val.forEach(element => {
        this.sumprice += element
      });
      console.log(this.sumprice);
    },
    checkedGoodNum(val){
      this.selectNum = val.length;
    }
  },
  computed:{
    newValue(){
      return this.sumprice
    },
    // 是否全选
    isAllSelected(){
      console.log(this.buycarList);
      return this.buycarList.every((el) => {
        return el.checked;
        console.log(el.checked)
      })
    },
    // 选中商品的id
    checkedGoodIds(){
      let filterArr = this.buycarList.filter((el) => {
        return el.checked;
      });
      return filterArr.map((el) => {
        if(el.checked){
          return el.preferential_price  * el.num;
        }
      })
    },
    // 选中商品的数量
    checkedGoodNum(){
      let filterArr = this.buycarList.filter((el) => {
        return el.checked;
      });
      return filterArr.map((el) => {
        if(el.checked){
          return el.num;
        }
      })
    }
  },
  methods: {
    // 获取数据
    getData(){
      let params = {
        // token: '101ddd17e2331d48fcf5c6df03276aff',
        page:1,
        page_size:10,
      }
      carList(params)
        .then(res => {
          // 获取数据成功后利用action将请求得到的数组异步提交更新state
          // this.getList(res.data.categoryList);
          console.log(res)
          this.buycarList = res.data.goods_info;//购物车商品列表
        })
        .catch(err => {
          console.log("error:", err);
        });
      // $.ajax({
      //   type: "post",
      //   url: commonURL("/?pc.user.carList"),
      //   data: {
      //     apiType: "pc.user.carList",
      //     token: this.loginToken,
      //     page:this.currentPage,
      //     page_size:this.pageSize,
      //   },
      //   success: res => {
      //     if(res.code == -2){
      //       alert(res.msg);
      //     }else{
      //       console.log(res);
      //       this.buycarList = res.data.goods_info;
      //       this.total = res.count;
      //       this.buycarList.forEach(element => {
      //         element.preferential_price = element.preferential_price / 100;
      //         element.checked = false;
      //         element.goods_pic = element.goods_pic.split(",");
      //       });
      //     }
      //   }
      // });
    },
    getData2(){
      // $.ajax({
      //   type: "post",
      //   url: commonURL("/?pc.user.carList"),
      //   data: {
      //     apiType: "pc.user.carList",
      //     token: this.loginToken,
      //     page:this.currentPage,
      //     page_size:this.pageSize,
      //     modify_status:0
      //   },
      //   success: res => {
      //     if(res.code == -2){
      //       alert(res.msg);
      //     }else{
      //       console.log(res);
      //       this.buycarList2 = res.data.goods_info;
      //       this.total = res.count;
      //       this.buycarList2.forEach(element => {
      //         element.preferential_price = element.preferential_price / 100;
      //         element.checked = false;
      //         element.goods_pic = element.goods_pic.split(",");
      //       });
      //     }
      //   }
      // });
    },

    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      console.log("handleCurrentChange", this.currentPage);
      this.getData();
    },
    delGood(carId){
      // $.ajax({
      //   type: "post",
      //   url: commonURL("/?pc.user.delCar"),
      //   data: {
      //     apiType: "pc.user.delCar",
      //     token: this.loginToken,
      //     car_id:carId
      //   },
      //   success: res => {
      //     if(res.code == -2){
      //       alert(res.msg);
      //     }else{
      //       alert(res.msg);            
      //       this.getData();    
      //     }      
      //   }
      // });
    },
    singleSelect(selectItem,index){
      selectItem.checked = !selectItem.checked;
      this.buycarList.splice(index,1,selectItem);
      if(selectItem.checked == false){
        this.sumprice = this.sumprice - selectItem.num * selectItem.preferential_price;
      }else{
        this.sumprice = this.sumprice + selectItem.num * selectItem.preferential_price;
      }
      console.log(selectItem.car_id,'test');
      if(this.car_id == ''){
        this.car_id = selectItem.car_id;
      }else{
        this.car_id = this.car_id  + ','+ selectItem.car_id;
      }
      console.log(this.car_id);
    },
    allSelect(){
      let checked = true;
      // this.isAllSelected = !this.isAllSelected;
      //全选
      if(this.isAllSelected){
        checked = false;
        this.sumprice = 0;
        console.log(this.isAllSelected)
      }else{
        this.sumprice = 0;
        this.buycarList.forEach(element => {
          this.sumprice += element.num * element.preferential_price;
        });
      }
      this.buycarList.forEach(element => {
        if(this.car_id == ''){
          this.car_id += element.car_id;
        }else{
          this.car_id = this.car_id  + ','+ element.car_id;
        }
        console.log(this.car_id);
      });
      this.buycarList = this.buycarList.map(item => {
        item.checked = checked;
        return item;
      });
      
    },
    handleChange(itemNum,carId) {
      console.log('sumprice:',this.sumprice);
      // $.ajax({
      //   type: "post",
      //   url: commonURL("/?pc.User.number"),
      //   data: {
      //     apiType: "pc.User.number",
      //     token: this.loginToken,
      //     car_id: carId,
      //     num:  itemNum
      //   },
      //   success: res => {
      //     if(res.code == -2){
      //       alert(res.msg);
      //     }else{
      //       console.log('sumprice end:',this.sumprice);
      //     }
      //   }
      // });
    },
    addCollection(goodsId) {
      // $.ajax({
      //   type: "post",
      //   url: commonURL("/?pc.user.doCollection"),
      //   data: {
      //     apiType: "pc.user.doCollection",
      //     token: this.loginToken,
      //     goods_id: goodsId
      //   },
      //   success: res => {
      //     if(res.code == -2){
      //       alert(res.msg);
      //     }else{
      //       console.log(res);
      //       alert(res.msg);
      //       this.getData();
      //     }
      //   }
      // });
    },
    goOrdersuer(){
      if(this.selectNum == 0){
        alert('请选择商品')
      }else{
        this.$router.push({name:'orderSure',query:{car_id:this.car_id}}); 
      }
    }
  }
};
</script>
<style scoped>
.buycar_page{
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
}
.product {
  width: 1200px;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  flex: 1;
}
.el-breadcrumb {
  padding-bottom: 17px;
}

.recommend {
  width: 1200px;
  height: 400px;
  margin: auto;
  box-shadow: 0.1px 0.1px 0.1px 0.1px gray;
  margin-bottom: 40px;
}
.recohead {
  width: 100%;
  height: 44px;
  border-bottom: 1px solid red;
  margin-bottom: 32px;
}
.recotitle {
  width: 125px;
  height: 44px;
  background: rgba(191, 47, 23, 1);
  padding: 13px 35px 15px 35px;
}
.recotitle p {
  width: 60px;
  height: 14px;
  font-size: 14px;
  font-family: 'MicrosoftYaHei';
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.recosection {
  height: 280px;
  width: 100%;
  display: flex;
}
.move {
  overflow: hidden;
  display: flex;
  width: 100%;
  height: 280px;
  position: relative;
  top: 0;
  left: 0;
}
.recosection_inner {
  overflow: hidden;
  display: flex;
  height: 280px;
  position: absolute;
  top: 0;
  left: 0;
}
.el-icon-arrow-left {
  width: 16px;
  height: 20px;
  float: left;
  /* padding-top: 135px; */
  margin-top: 135px;
  margin-right: 30px;
  margin-left: 33px;
}
.el-icon-arrow-right {
  width: 16px;
  height: 20px;
  float: right;
  /* padding-top: 135px; */
  margin-top: 135px;
  margin-left: 30px;
  margin-right: 37px;
}
.productcard {
  width: 210px;
  height: 210px;
  margin-right: 54px;
}
.productcard img {
  width: 100%;
  height: 100%;
  display: block;
}
.recosection_inner:last-child {
  margin-right: none;
}

.recosection_inner:last-child img {
  margin-right: none;
}

.cardid {
  height: 70px;
  display: block;
  padding: 16px 40px 12px 40px;
}
.cardid.active{
    background-color: rgba(191, 47, 23, 1);
}
.cardid p {
  width: 128px;
  height: 16px;
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  color: rgba(1, 1, 1, 1);
  margin-bottom: 10px;
}
.cardid.active p{
      width: 128px;
  height: 16px;
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  color: rgba(1, 1, 1, 1);
  margin-bottom: 10px;
    color: rgba(255, 255, 255, 1);
}
.cardid span {
  width: 62px;
  height: 11px;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(191, 47, 23, 1);
  line-height: 1px;
}
.cardid del {
  width: 58px;
  height: 9px;
  font-size: 12px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  text-decoration: line-through;
  color: rgba(153, 153, 153, 1);
  line-height: 1px;
}
/* 购物车部分 */
.buycar_contain{
  width: 100%;
  background: #fff;
  border: 1px solid #E6E6E6;
}
.buycar_contain_head{
  display: flex;
  align-items: center;
  height:44px;
  background: #F2F2F2;
  color: #999999;
  font-size: 14px;
  border-bottom: 1px solid #F26C00;
  background: #FFFFFF;
}
.head_left{
  background: #F26C00;
  color: #fff;
  font-family: 'MicrosoftYaHei';
  font-size: 14px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 125px;
}
.head_right{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 457px;
  margin-right: 105px;
}
.content_item{
  background: #F9F9F9;
  margin: 20px 30px;
  padding: 30px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content_item2{
  background: #EDEDED;
  margin: 20px 30px;
  padding: 30px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.xiajia{
  font-size: 13px;
  color: #666666;
}
.content_item2 .content_item_detail_title, .content_item2 .content_item_detail_bottom, .content_item2  .item_right_price,.content_item2 .item_right_price_all, .content_item2 .item_right_num{
  color: #CCCCCC;
}
/* .content_item_box{
  position: relative;
} */
.cover_item{
  background: #EDEDED;
  position: absolute;
  width: 96%;
  height: 158px;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  opacity: 0.6;
}
.content_item_left{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  position: relative;
  flex: 1;
  justify-content: left;
}
.item_left_img{
  width: 98px;
  height: 98px;
  /* padding: 30px 0; */
  margin: 0 20px;
}
.item_left_img img{
  width: 100%;
  height: 100%;
}
.item_left_detail{
  display: flex;
  flex-direction: column;
}
.content_item_detail_title{
  text-align: left;
  margin-bottom: 20px;
  font-size: 16px;
  color: #000;
}
.content_item_detail_bottom{
  text-align: left;
  color: #666666;
  font-size: 14px;
}
.content_item_right{
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  margin-left: 50px;
  margin-right: 60px;
}
.item_right_price{
  font-size: 14px;
  color: #000;
}
.item_right_price_all{
  color: #F26C00;
  font-size: 14px;
  font-weight: bold;
}
.item_right_edit{
  display: flex;
  flex-direction: column;
}
.item_right_edit span{
  text-align: left;
  color: #666666;
  font-size: 12px;
  margin: 5px 0;
}
.content_bottom{
  background: #F2F2F2;
  display: flex;
  height: 70px;
  align-items: center;
  margin-top: 30px;
}
.content_bottom_submit{
  width: 140px;
  background: #F26C00;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border: none;
  font-size: 18px;
}
.content_bottom_list{
  flex: 1;
  display: flex;
  justify-content: space-between;
  margin: 0 30px;
  font-size: 16px;
  color: #000;
}
.bottom_list_left{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 400px;
  position: relative;
}
.bottom_list_left_span{
  margin-left: 25px;
}
.bottom_list_right{

}
.bottom_list_right span{
  font-size: 18px;
  font-weight: bold;
  color: #F26C00;
  margin-left: 10px;
}

input[type="checkbox"]{
  width: 18px;
  height: 18px;
  position: absolute;
  z-index: 3;
  opacity: 0;
  left: -10px;
  top: 40px;
}

input[type="checkbox"] + .checkbox_pic{
  width: 14px;
  height: 14px;
  background-size: cover;
  margin-right: 23px;
  position: absolute;
  left: -10px;
  top: 40px;
  z-index: 2;
  /* background-image: url("../../assets/images/buynow/check_noselect.png"); */
}
input[type="checkbox"]:checked + .checkbox_pic{
  width: 14px;
  height: 14px;
  background-size: cover;
  position: absolute;
  left: -10px;
  top: 40px;
  z-index: 2;
  /* left: -23px; */
  /* background-image: url("../../assets/images/buynow/check_select.png"); */
}
.bottom_list_left input[type="checkbox"]{
    left: 0px;
    top: 6px;
}
.bottom_list_left input[type="checkbox"] + .checkbox_pic{
    left: 0px;
    top: 6px;
}
.bottom_list_left input[type="checkbox"]:checked + .checkbox_pic{
    left: 0px;
    top: 6px;
}
.no_card_img{
  width: 247px;
  height: 210px;
  margin: 150px;
}
</style>