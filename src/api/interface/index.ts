export namespace Auth {
  export interface ReqQueryForm {
    token: string;
    deviceInfo: string;
    resourceId: string;
  }
  export interface ResAuthParamsForm {
    appKey: string;
    nonce: string;
    curTime: number;
    checkSum: string;
    channelDestroyTime?: number;
  }
  export interface ReqDocInfoForm {
    deviceInfo: string;
    resourceId: string;
  }
  export interface ResDocInfo {
    name: string;
    roomId: string;
    uid: number;
    docId: string;
    docName: string;
    pageCount: number;
    width: number;
    height: number;
    url: string;
    /**
     * 0: 转码中
     * 1: 转码成功
     */
    status: number;
  }
}
