/**
 * Pinia 相关类型定义
 */

import type { Store } from "pinia";
import type { DrawPlugin } from "./DrawPlugin";
import type { WhiteBoardSDKInstance } from "./WhiteBoardSDK";
import type { ToolCollectionInstance } from "./ToolCollection";

// 全局Store类型
export interface GlobalStore extends Store {
  // State
  loading: boolean;
  loadingText: string;
  error: string | null;
  errorType: "error" | "warning" | "info";
  appReady: boolean;
  isOnline: boolean;
  user: {
    id: string;
    name: string;
    avatar: string;
    role: "admin" | "user" | "guest";
  };
  systemInfo: {
    version: string;
    buildTime: string;
    environment: "development" | "production" | "test";
  };

  // Actions
  setLoading: (isLoading: boolean, text?: string) => void;
  setError: (errorMessage: string | null, type?: "error" | "warning" | "info") => void;
  clearError: () => void;
  setAppReady: (ready: boolean) => void;
  setOnlineStatus: (online: boolean) => void;
  setUser: (userInfo: Partial<GlobalStore["user"]>) => void;
  setSystemInfo: (info: Partial<GlobalStore["systemInfo"]>) => void;
  showMessage: (message: string, type?: "error" | "warning" | "info", duration?: number) => void;
  showSuccess: (message: string, duration?: number) => void;
  showWarning: (message: string, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
  initializeApp: () => Promise<void>;
  resetState: () => void;

  // Getters
  isLoggedIn: boolean;
  isAdmin: boolean;
  hasError: boolean;
}

// 白板Store类型
export interface WhiteboardStore extends Store {
  // State
  whiteboardSDK: WhiteBoardSDKInstance | null;
  drawPlugin: DrawPlugin | null;
  toolCollection: ToolCollectionInstance | null;
  isConnected: boolean;
  isSynchronizing: boolean;
  connectionError: string | null;
  currentUser: {
    uid: number;
    channelId: string;
    nickname: string;
  };
  roomInfo: {
    channel: string;
    persistent: boolean;
    channelDestroyTime: number;
  };
  whiteboardState: {
    currentBoard: string;
    currentPage: number;
    totalPages: number;
    zoomFactor: number;
    currentTool: string;
    hasTransDoc: boolean;
  };
  toolbarState: {
    isVisible: boolean;
    position: "left" | "right" | "top" | "bottom";
    size: number;
  };

  // Actions
  setWhiteboardSDK: (sdk: WhiteBoardSDKInstance | null) => void;
  setDrawPlugin: (plugin: DrawPlugin | null) => void;
  setToolCollection: (collection: ToolCollectionInstance | null) => void;
  setConnectionStatus: (connected: boolean, synchronizing?: boolean, error?: string | null) => void;
  setRoomInfo: (info: WhiteboardStore["roomInfo"]) => void;
  setUserNickname: (nickname: string) => void;
  setToolbarVisibility: (visible: boolean) => void;
  setToolbarPosition: (position: WhiteboardStore["toolbarState"]["position"]) => void;
  setToolbarSize: (size: number) => void;
  resetState: () => void;
  destroy: () => void;

  // Getters
  isReady: boolean;
  canDraw: boolean;
  connectionStatus: "connected" | "disconnected" | "synchronizing" | "error";
}

// 设置Store类型
export interface SettingsStore extends Store {
  // State
  theme: "light" | "dark" | "auto";
  primaryColor: string;
  language: "zh-CN" | "en-US";
  whiteboardSettings: {
    defaultTool: "select" | "pen" | "text" | "laser";
    defaultColors: {
      pen: string;
      shape: string;
      link: string;
    };
    defaultWidths: {
      pen: number;
      shape: number;
      link: number;
    };
    toolbar: {
      position: "left" | "right" | "top" | "bottom";
      size: number;
      showHints: boolean;
      autoHide: boolean;
    };
    viewport: {
      autoFit: boolean;
      showGrid: boolean;
      gridType: "dot" | "line";
    };
    recording: {
      enabled: boolean;
      quality: "low" | "medium" | "high";
      includeAudio: boolean;
    };
  };
  appSettings: {
    debug: boolean;
    autoSave: boolean;
    saveInterval: number;
    maxHistory: number;
    shortcuts: {
      enabled: boolean;
      showHints: boolean;
    };
    notifications: {
      enabled: boolean;
      sound: boolean;
      desktop: boolean;
    };
  };

  // Actions
  setTheme: (theme: SettingsStore["theme"]) => void;
  setPrimaryColor: (color: string) => void;
  setLanguage: (lang: SettingsStore["language"]) => void;
  updateWhiteboardSettings: (settings: Partial<SettingsStore["whiteboardSettings"]>) => void;
  updateAppSettings: (settings: Partial<SettingsStore["appSettings"]>) => void;
  resetSettings: () => void;
  initializeSettings: () => void;

  // Getters
  isDarkMode: boolean;
  currentTheme: "light" | "dark";
}

// Store组合类型
export interface StoreComposition {
  global: GlobalStore;
  whiteboard: WhiteboardStore;
  settings: SettingsStore;
}

// 持久化配置类型
export interface PersistConfig {
  key: string;
  storage: Storage;
  paths?: string[];
  beforeRestore?: (context: any) => void;
  afterRestore?: (context: any) => void;
  serializer?: {
    serialize: (state: any) => string;
    deserialize: (state: string) => any;
  };
}

// 扩展Window接口，添加全局Store访问
declare global {
  interface Window {
    $stores?: StoreComposition;
    $i18n?: any;
  }
}

export {};
