// #!/usr/bin/env node
/**
 * Generate additional configuration files when used for packaging. The file can be configured with some global variables, so that it can be changed directly externally without repackaging
 */
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";

export const versionJson = "version.json";
export const OUTPUT_DIR = "./";
/**
 * Get user root directory
 * @param dir file path
 */
export function getRootPath(...dir: string[]) {
  return path.resolve(process.cwd(), ...dir);
}

export const runBuild = async (buildName: string, version: string, lastBuildTime: string, branch: string, commitId: string) => {
  try {
    const config = {
      name: buildName,
      version: version,
      lastBuildTime,
      branch,
      commitId
    };
    // Ensure that the variable will not be modified
    fs.mkdirp(getRootPath(OUTPUT_DIR));
    fs.writeFileSync(getRootPath(`${OUTPUT_DIR}/${versionJson}`), `${JSON.stringify(config)}`);
    console.log(chalk.cyan(`✨ [${buildName}]`) + ` - 版本号构建成功:`);
    console.log(chalk.gray(OUTPUT_DIR + chalk.green(versionJson)) + "\n");
    console.log(chalk.gray(`git branch: ${branch}, git commit id: ${commitId}`));
  } catch (error) {
    console.log(chalk.red("编译出错:\n" + error));
    process.exit(1);
  }
};
