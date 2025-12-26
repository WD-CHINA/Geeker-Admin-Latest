import { DrawPlugin } from "./DrawPlugin";
import { IDrawPluginInitOption } from "./types";

/**
 * 录像回放接口
 */
declare namespace RecordPlayer {
  /**
   * 创建录像回放实例
   *
   * @example
   *
   * ```
   * RecordPlayer.getInstance({
   *  whiteboardParams: {
   *      urlArr: [
   *          'https://app.yunxin.163.com/webdemo/whiteboard/assets/replay/161047310-206967194175233-1604651017329-0.gz',
   *          'https://app.yunxin.163.com/webdemo/whiteboard/assets/replay/161055521-206967194175233-1604651017329-0.gz'
   *      ],
   *      container: document.getElementById('whiteboard'),
   *  }
   * }).then(({player, params, drawPlugin}) => {
   *      player.bindControlContainer(document.getElementById('toolbar'))
   *      console.log(`起始时间为: ${params.beginTimeStamp}`)
   *      console.log(`结束时间为: ${params.endTimeStamp}`)
   *      console.log(`观众uid为: ${params.viewerArr}`)
   *
   *      //如果教学阶段设置了字体，回放时也要设置字体
   *      drawPlugin.setFontFamily({
   *          fontFamily: 'Helvetica',
   *          fontFace: [
   *              {
   *                  url: '/assets/font/Helvetica.ttf',
   *                  format: 'truetype'
   *              },
   *                  url: '/assets/font/Helvetica.woff',
   *                  format: 'woff'
   *              },
   *          ]
   *      })
   * })
   * ```
   */
  function getInstance(option: {
    /**
     * 白板录像文件
     * SDK会根据文件的名称读取uid, cid, 以及录像回放的时间戳。文件的名称应该直接使用云信服务器抄送的文件URL
     *
     * @param container: 回放时白板的容器
     */
    whiteboardParams: {
      /**
       * 白板录像gz文件URL
       */
      urlArr: Array<string>;
      /**
       * 白板容器
       */
      container: HTMLDivElement;
      /**
       * 如果在教学阶段设置了初始化参数，在录像回放阶段也需要保持一致
       */
      drawPluginParams?: IDrawPluginInitOption;
    };
    /**
     * 视频录像文件
     * SDK会根据文件的名称读取uid, cid, 以及录像回放的时间戳。文件的名称应该直接使用云信服务器抄送的文件URL
     *
     * 开发者可以使用SDK一起播放白板和视频，也可以只播放白板，然后在应用层播放视频，根据sdk抛出的进度调整视频的播放进度
     */
    videoParams?: Array<{
      /**
       * 视频文件URL
       */
      url: string;
      /**
       * 视频文件容器
       */
      container: HTMLDivElement;
    }>;
  }): Promise<{
    player: RecordPlayerInstance;
    params: {
      /**
       * 录像文件的开始时间戳
       */
      beginTimeStamp: number;
      /**
       * 录像文件的结束时间戳
       */
      endTimeStamp: number;
      /**
       * 录像文件持续时间
       */
      duration: number;
      /**
       * 课堂中记录了record的所有账户的uid。开发者可以使用这些uid来切换视角。默认视角为第一个录像文件的视角
       */
      viewerArr: string[];
    };
    drawPlugin: DrawPlugin;
  }>;
}

export interface RecordPlayerInstance {
  /**
   * 绑定播放控制条容器。如果用户想要自己渲染播放控制条，则不需要调用此函数
   *
   * @param container 播放控制器的容器。容器应该为长方形容器，比如(800 * 32)。
   *
   * @example
   * ```
   * player.bindControlContainer(document.getElementById('toolbar'))
   * ```
   */
  bindControlContainer(container: HTMLDivElement): void;

  /**
   * 设置回放播放速度。speed为大于0.1，小于100的数值
   *
   * @example
   * ```
   * player.setPlaySpeed(2)
   * ```
   */
  setPlaySpeed(speed: number): void;

  /**
   * 设置以谁的视角来观看录像。默认视角为录像文件中第一个动作的发出者。RecordPlayer.getInstance的then回调中，会返回这次会话的所有参与者列表。开发者可以根据此信息渲染可以选择的视角列表
   *
   * @param viewer 教学阶段的uid {@link WhiteBoardSDKInstance.getUid}
   *
   * @example
   * ```
   * player.setViewer('9012313')
   * ```
   */
  setViewer(viewer: string): void;

  /**
   * 用户可以设置录像回放的时间范围。设置开始时间后，每次seekTo时，会以用户设置的时间戳为基准。
   * 设置完成后，player会抛出tick和durationChange事件，开发者可以监听这些事件来调整播放控制UI组件。如果使用录像回放模块提供的播放控制UI组件，则开发者无须调整。
   *
   * 常见的使用场景为：在一次教学中，有白板和音视频录像文件。两者的起始时间不同。为了方便业务逻辑控制，可以使用下面的函数将白板的录像回放起始时间对齐音视频起始时间。
   *
   * 注意单位都是毫秒时间戳
   *
   * @example
   * ```
   * const startTimeOfRtc = await getStartTimeOfRtcRoom()
   * player.setTimeRange(startTimeOfRtc)
   * ```
   */
  setTimeRange(startTime: number | undefined, endTime: number | undefined): void;

  /**
   * 播放录像
   */
  play(): void;

  /**
   * 暂停播放
   */
  pause(): void;

  /**
   * 跳转至指定的时间戳。单位为毫秒时间戳
   * @param time 以播放起始时间为参考的相对偏移时间。
   *
   * @example
   * 跳转到播放进度第1s
   * ```
   * seekTo(1000)
   * ```
   */
  seekTo(time: number): void;

  /**
   * 停止播放并销毁
   */
  destroy(): void;

  /**
   * 录像的track的可见性变化。
   *
   * 如果除了白板，还传入了1至多个视频文件，则录像的整体时间跨度和单个录像文件的时间跨度不同。用户可以使用该回调函数设置视频的可见性。
   * 当视频可见时，显示视频容器。不可见时，则隐藏视频容器。
   *
   * option.fileSuffix为录像文件的后缀。视频一般为mp4, 白板的录像文件后缀为gz
   *
   * @example
   * ```
   * player.on('visibleChange', (type, option) => {
   *  if (option.type === 'mp4' && type === 'show') {
   *      option.container.style.display = 'block'
   *  } else if (option.type === 'mp4' && type === 'hide') {
   *      option.container.style.display = 'none'
   *  }
   * })
   * ```
   */
  on(eventName: "visibleChange", callback: (type: "show" | "hide", option: { fileSuffix: string; container: HTMLDivElement }) => void): void;

  /**
   * 调用play函数，或者用户点击播放UI组件的播放按钮时(内部会调用play函数)触发。
   */
  on(eventName: "play", callback: () => void): void;

  /**
   * 调用pause函数，或者用户点击播放UI组件的暂停按钮时(内部会调用pause函数)触发。
   */
  on(eventName: "pause", callback: () => void): void;

  /**
   * 播放完成时触发
   */
  on(eventName: "finished", callback: () => void): void;

  /**
   * 播放进度变化时触发此函数。用户可以根据该事件将sdk内部录像播放，与sdk外部录像对齐
   *
   * 回调函数中的时间为毫秒级真实时间戳。
   *
   * 比如如果录像文件URL解析的时间戳为: 1630399731390。播放进度为2分钟，则回调函数中的时间戳为: 1630399851390
   */
  on(eventName: "tick", callback: (timestamp: number) => void): void;

  /**
   * setTimeRange后触发。用户如果自定义了播放器控制UI，则可以使用该回调函数调整播放器的时间跨度。参数为毫秒级的时间跨度
   */
  on(eventName: "durationChange", callback: (duration: number) => void): void;
}

export default RecordPlayer;
