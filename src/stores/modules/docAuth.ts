import { defineStore } from "pinia";
import type { Auth } from "@/api/interface";
import { getEnv } from "@/utils";
/**
 * token状态管理
 * 管理应用级别的token状态，如token、token过期时间等
 */
export const useDocAuthStore = defineStore(
  "doc-auth-store",
  () => {
    const authParams = ref<Auth.ResAuthParamsForm | null>(null);

    const setAuthParams = (params: Auth.ResAuthParamsForm) => {
      authParams.value = params;
    };

    const $reset = () => {
      authParams.value = null;
    };

    return {
      authParams,
      setAuthParams,
      $reset
    };
  },
  {
    // 持久化配置
    persist: {
      key: "auth-store",
      storage: getEnv() === "development" ? localStorage : sessionStorage
    }
  }
);
