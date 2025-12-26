<script setup lang="ts">
import { ElMessage } from "element-plus";
defineOptions({
  name: "BoardAuth"
});
import { useStores } from "@/stores";
import { AuthApi } from "@/api/auth";
import { useI18n } from "vue-i18n";
import type { Auth } from "@/api/interface";
import { useRoute, useRouter } from "vue-router";
const { globalStore, queryStore, docAuthStore } = useStores();
const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const loading = ref(false);
onMounted(() => {
  globalStore.language = "zh";
  getAuthParams();
});
const checkAuthParams = () => {
  //检测 token、deviceInfo、resourceId是否存在
  if (!route.query.token || !route.query.deviceInfo || !route.query.resourceId) {
    return false;
  }
  return true;
};
const getAuthParams = async () => {
  loading.value = true;

  if (checkAuthParams()) {
    queryStore.setQuery(route.query as unknown as Auth.ReqQueryForm);
    AuthApi.authParamsApi()
      .then(res => {
        docAuthStore.setAuthParams(res);
        router.replace("/preview");
      })
      .catch(() => {
        docAuthStore.$reset();
        queryStore.$reset();
      })
      .finally(() => {
        loading.value = false;
      });
  } else {
    ElMessage.error(t("login.auth.params"));
    docAuthStore.$reset();
    queryStore.$reset();
    loading.value = false;
  }
};
</script>
<template>
  <div v-loading="loading" class="auth" element-loading-text=""></div>
</template>
<style lang="scss" scoped>
.auth {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}
</style>
