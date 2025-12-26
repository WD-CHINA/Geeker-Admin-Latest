<script setup lang="ts">
import type { DrawPlugin } from "@/types/DrawPlugin";
import type { WhiteBoardSDKInstance } from "@/types/WhiteBoardSDK";
import type { ToolCollectionInstance } from "@/types/ToolCollection";
import { useI18n } from "vue-i18n";
import { useStores } from "@/stores";
import { AuthApi } from "@/api/auth";
import type { Auth } from "@/api/interface";
import type { IContainerOption } from "@/types/types";
import { ElMessage, ElMessageBox } from "element-plus";
const showToolCollection = ref(true);
const { globalStore, docAuthStore, queryStore } = useStores();
const { t } = useI18n();
defineOptions({
  name: "PreviewIndex"
});
const whiteboardSDK = shallowRef<WhiteBoardSDKInstance>(null!);
const toolCollection = shallowRef<ToolCollectionInstance>(null!);
const drawPluginin = shallowRef<DrawPlugin>(null!);
const currentTool = ref<string>("mouse");
onMounted(() => {
  globalStore.language = "zh";
  getAuthParams();
});

onUnmounted(() => {
  whiteboardSDK.value?.destroy();
});
const getAuthParams = () => {
  if (queryStore.query.token) {
    AuthApi.getDocInfo({
      deviceInfo: queryStore.query.deviceInfo,
      resourceId: queryStore.query.resourceId
    }).then(res => {
      if (res.status === 0) {
        ElMessageBox.confirm(t("login.auth.encoding"), t("text.tip"), {
          confirmButtonText: t("text.quit"),
          cancelButtonText: t("text.retry"),
          showClose: false,
          closeOnClickModal: false,
          closeOnPressEscape: false,
          type: "warning"
        })
          .then(err => {
            if (err === "confirm") {
              console.log("confirm");
              window?.iSport?.back();
            }
          })
          .catch(err => {
            if (err === "cancel") {
              console.log("cancel");
              location.reload();
            } else {
              console.log("reload");
              window?.iSport?.back();
            }
          });
      } else {
        initWhiteboard(res);
      }
    });
  } else {
    ElMessage.error(t("login.auth.params"));
  }
};
const getAuthInfo = () => {
  return Promise.resolve({
    nonce: docAuthStore.authParams?.nonce as string,
    channelDestroyTime: docAuthStore.authParams?.channelDestroyTime as number,
    checksum: docAuthStore.authParams?.checkSum as string,
    curTime: docAuthStore.authParams?.curTime as number
  });
};
const initWhiteboard = (whiteboardInfo: Auth.ResDocInfo) => {
  const container = document.getElementById("whiteboard") as HTMLDivElement;
  if (!container) {
    ElMessage.error(t("preview.error"));
    return;
  }
  whiteboardSDK.value = window.WhiteBoardSDK.getInstance({
    appKey: docAuthStore.authParams?.appKey as string,
    uid: whiteboardInfo.uid,
    container: container,
    platform: "web",
    record: false,
    debug: false,
    getAuthInfo,
    drawPluginParams: {
      appConfig: {
        nosAntiLeech: true
      },
      cacheUploadDocs: true
    }
  });
  if (whiteboardSDK.value) {
    joinRoom({
      whiteboardSDK: whiteboardSDK.value,
      container: container,
      whiteboardInfo: whiteboardInfo
    });
  }
};

const joinRoom = (opt: { whiteboardSDK: WhiteBoardSDKInstance; container: HTMLDivElement; whiteboardInfo: Auth.ResDocInfo }) => {
  const { whiteboardSDK, container, whiteboardInfo } = opt;
  const homeOption = {
    channel: whiteboardInfo.roomId,
    persistent: false
  };
  whiteboardSDK
    .joinRoom(homeOption, {
      ondisconnected: () => {
        ElMessage.error(t("preview.room.error"));
      }
    })
    .then((drawPlugin: DrawPlugin) => {
      drawPluginin.value = drawPlugin;
      drawPlugin.setTool(currentTool.value);
      drawPlugin.fitToContent(true);
      drawPlugin.enableCameraTransform(false);
      drawPlugin.enableDraw(true);
      drawPlugin.setAppConfig({
        previewMode: "fitDoc"
      });
      toolCollection.value = window.ToolCollection.getInstance({
        container: container,
        handler: drawPlugin,
        options: {
          platform: "web"
        }
      });
      //显示工具栏
      toolCollection.value.show();
      toolCollection.value.setContainerOptions([]);
      const getBoardInfos = drawPlugin.getBoardInfos();
      console.log("getBoardInfos", getBoardInfos, "**********");
      const boardDisplayNames = getBoardInfos.boardDisplayNames;
      const index = boardDisplayNames.findIndex(item => item === whiteboardInfo.name);
      console.log("index", index, "**********");
      if (index !== -1) {
        drawPlugin.deleteBoard(getBoardInfos.boardNames[index] as string);
      }
      if (whiteboardInfo.name.includes(".pptx")) {
        drawPlugin.addTransDoc({
          docName: whiteboardInfo.name,
          pageCount: whiteboardInfo.pageCount,
          width: whiteboardInfo.width,
          height: whiteboardInfo.height,
          url: `${whiteboardInfo.url}index.json`
        });
      } else {
        console.log("${whiteboardInfo.url}", whiteboardInfo.url);
        drawPlugin.addDoc({
          docName: whiteboardInfo.name,
          params: {
            template: `${whiteboardInfo.url}{index}.jpg`,
            width: whiteboardInfo.width,
            height: whiteboardInfo.height,
            offset: 1,
            pageCount: whiteboardInfo.pageCount
          }
        });
      }
      toolCollection.value?.setItemDefaultSize(getSize());

      /**
       * 根据目前是否是动态文档，切换页面工具栏的状态，可以为：
       * 1. 第一页，上一页，下一页，最后一页
       * 2. 上一页，上一动画，下一动画，下一页（动态文档)
       */

      drawPlugin.on("event:appState:change", (name: string, value: string) => {
        if (name === "page") {
          //drawPlugin.clear()
          console.log("页面变化", value);
        }
        if (name === "currTool") {
          currentTool.value = value;
        }
        if (name === "board") {
          if (drawPlugin.hasTransDoc()) {
            setTools(true);
          } else if (!drawPlugin.hasTransDoc()) {
            setTools(false);
          }
        }
      });
    })
    .catch((err: Error) => {
      console.error(err);
    });
};

/**
 * 需要的工具
 */
const setTools = (hasTransDoc: boolean) => {
  let baseOptions = [
    {
      position: "left",
      marginLeft: getSize() / 2,
      items: [
        {
          tool: "mouse",
          hint: t("toolbar.mouse")
        },
        {
          tool: "select",
          hint: t("toolbar.select")
        },
        {
          tool: "pen",
          hint: t("toolbar.pen")
        },
        {
          tool: "shapeSelect",
          hint: t("toolbar.shapeSelect")
        },
        {
          tool: "element-eraser",
          hint: t("toolbar.elementEraser")
        },
        {
          tool: "clear",
          hint: t("toolbar.clear")
        },
        {
          tool: "undo",
          hint: t("toolbar.undo")
        },
        {
          tool: "redo",
          hint: t("toolbar.redo")
        }
      ]
    },
    {
      position: "topRight",
      items: []
    },
    {
      position: "bottomRight",
      items: []
    }
  ] as Array<IContainerOption>;
  if (hasTransDoc) {
    baseOptions.push({
      position: "bottomLeft",
      marginLeft: document.body.clientWidth / 2 - (getSize() * 15) / 2 + 10,
      marginBottom: getSize() / 2,
      items: [
        {
          tool: "fitToContentDoc"
        },
        {
          tool: "zoomOut",
          hint: t("toolbar.zoomOut")
        },
        {
          tool: "zoomLevel"
        },
        {
          tool: "zoomIn",
          hint: t("toolbar.zoomIn")
        },
        {
          tool: "custom-space",
          hint: "",
          clickCb() {
            return "custom-space";
          }
        },
        {
          tool: "firstPage",
          hint: t("toolbar.firstPage")
        },
        {
          tool: "prevPage",
          hint: t("toolbar.prevPage")
        },
        {
          tool: "prevAnim",
          hint: t("toolbar.prevAnim")
        },
        {
          tool: "pageInfo"
        },
        {
          tool: "nextAnim",
          hint: t("toolbar.nextAnim")
        },
        {
          tool: "nextPage",
          hint: t("toolbar.nextPage")
        },
        {
          tool: "lastPage",
          hint: t("toolbar.lastPage")
        },
        {
          tool: "preview",
          hint: t("toolbar.preview"),
          previewSliderPosition: "right"
        }
      ]
    });
  } else {
    baseOptions.push({
      position: "bottomLeft",
      marginLeft: document.body.clientWidth / 2 - (getSize() * 13) / 2 + 10,
      marginBottom: getSize() / 2,
      items: [
        {
          tool: "fitToContentDoc"
        },
        {
          tool: "zoomOut",
          hint: t("toolbar.zoomOut")
        },
        {
          tool: "zoomLevel"
        },
        {
          tool: "zoomIn",
          hint: t("toolbar.zoomIn")
        },
        {
          tool: "custom-space",
          hint: "",
          clickCb() {
            return "custom-space";
          }
        },
        {
          tool: "firstPage",
          hint: t("toolbar.firstPage")
        },
        {
          tool: "prevPage",
          hint: t("toolbar.prevPage")
        },
        {
          tool: "pageInfo"
        },
        {
          tool: "nextPage",
          hint: t("toolbar.nextPage")
        },
        {
          tool: "lastPage",
          hint: t("toolbar.lastPage")
        },
        {
          tool: "preview",
          hint: t("toolbar.preview"),
          previewSliderPosition: "right"
        }
      ]
    });
  }
  toolCollection.value?.setContainerOptions(baseOptions);
};
const handleClick = () => {
  if (currentTool.value !== "mouse") {
    return;
  }
  // 清除预览容器映射（如果存在）
  if ((drawPluginin.value as any).previewFactory?.previewContainerMap) {
    (drawPluginin.value as any).previewFactory.previewContainerMap.clear();
  }
  if (showToolCollection.value) {
    toolCollection.value?.hide();
    showToolCollection.value = false;
  } else {
    toolCollection.value?.show();
    showToolCollection.value = true;
  }
};
const getSize = () => {
  return 64 * (window.screen.width / 1920);
};
</script>
<template>
  <div id="whiteboard" @click="handleClick"></div>
</template>
<style scoped>
#whiteboard {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: #f5f5f7;
}
</style>
