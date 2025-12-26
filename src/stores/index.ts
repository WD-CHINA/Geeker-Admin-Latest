import { useUserStore } from "./modules/user";
import { useLoadingStore } from "./modules/loading";
import { useKeepAliveStore } from "./modules/keepAlive";
import { useGlobalStore } from "./modules/global";
import { useDictStore } from "./modules/dict";
import { useTabsStore } from "./modules/tabs";
import { useAuthStore } from "./modules/auth";
import { useQueryStore } from "./modules/query";
import { useDocAuthStore } from "./modules/docAuth";
export const useStores = () => {
  return {
    globalStore: useGlobalStore(),
    loadingStore: useLoadingStore(),
    authStore: useAuthStore(),
    userStore: useUserStore(),
    dictStore: useDictStore(),
    tabsStore: useTabsStore(),
    keepAliveStore: useKeepAliveStore(),
    queryStore: useQueryStore(),
    docAuthStore: useDocAuthStore()
  };
};
