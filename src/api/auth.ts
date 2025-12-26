// import authMenuList from '@/assets/json/authMenuList.json'
// import authButtonList from '@/assets/json/authButtonList.json'
import http from "@/utils/request";
import type { MenuOptions } from "@/api/system/menu";
import authMenuList from "@/assets/json/authMenuList.json";
import authButtonList from "@/assets/json/authButtonList.json";
import type { Auth } from "@/api/interface";

export interface ReqLoginForm {
  username: string;
  password: string;
}
export interface ResLogin {
  access_token: string;
}
export interface ResAuthButtons {
  [key: string]: string[];
}

/**
 * @name 登录模块
 */
// 用户登录
export const AuthApi = {
  login: (params: ReqLoginForm) => {
    return http.post<ResLogin>(`/login`, params, { loading: false }); // 正常
  },
  // 获取菜单列表
  getAuthMenuList: (): MenuOptions[] => {
    return authMenuList.data;
  },

  // 获取按钮权限
  getAuthButtonList: () => {
    return authButtonList.data;
  },

  // 用户退出登录
  logout: () => {
    return http.post(`/logout`);
  },
  /**
   * 授权参数接口
   * @returns 授权参数
   */
  authParamsApi: () => {
    return http.get<Auth.ResAuthParamsForm>("/cms/doc/authParams");
  },
  /**
   * 获取文档信息
   * @param data 文档信息请求参数
   * @returns 文档信息
   */
  getDocInfo: (data: Auth.ReqDocInfoForm) => {
    return http.get<Auth.ResDocInfo>("/cms/doc/wy-info", data);
  }
};
