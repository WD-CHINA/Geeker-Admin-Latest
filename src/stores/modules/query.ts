import { defineStore } from "pinia";
import type { Auth } from "@/api/interface";
import { getEnv } from "@/utils";

/**
 * token状态管理
 * 管理应用级别的token状态，如token、token过期时间等
 */
export const useQueryStore = defineStore(
  "query-store",
  () => {
    const query = ref<Auth.ReqQueryForm>({
      token: "",
      deviceInfo: "",
      resourceId: ""
    });
    const setQuery = (params: Auth.ReqQueryForm) => {
      query.value = params;
    };
    const $reset = () => {
      query.value = {
        token: "",
        deviceInfo: "",
        resourceId: ""
      };
    };
    return {
      query,
      setQuery,
      $reset
    };
  },
  {
    // 持久化配置
    persist: {
      key: "query-store",
      storage: getEnv() === "development" ? localStorage : sessionStorage
    }
  }
);
