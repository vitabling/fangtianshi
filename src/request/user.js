// api.js用来统一管理接口

// user.js是需要用户token的
import { tokenpost } from './http'
// 购物车列表

export const carList = carlist_params => tokenpost('pc.user.carList', carlist_params);

//删除购物车元素
export const delCarItem = delCar_params => tokenpost('pc.user.delCar', delCar_params);
