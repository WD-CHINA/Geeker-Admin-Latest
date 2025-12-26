import compressing from "compressing";
import type { PluginOption } from "vite";
export const compressDirToZip = (buildName: string): PluginOption => {
  const makeZip = () => {
    compressing.zip
      .compressDir(`./${buildName}`, `${buildName}.zip`)
      .then(() => {
        console.log(`✅ Compressing>>>>>>>> 压缩${buildName} ==> ${buildName}.zip已完成 ✅`);
      })
      .catch(err => {
        console.log(`压缩失败 ${err}`);
      });
  };
  return {
    name: "vite-plugin-make-zip",
    apply: "build",
    closeBundle() {
      makeZip();
    }
  };
};
