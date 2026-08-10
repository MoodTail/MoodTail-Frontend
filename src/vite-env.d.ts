/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_WEB_BASE_URL: string;
  readonly VITE_KAKAO_JAVASCRIPT_KEY?: string;
}

interface KakaoShareLink {
  webUrl: string;
  mobileWebUrl: string;
}

interface KakaoSdk {
  init: (javascriptKey: string) => void;
  isInitialized: () => boolean;
  Share: {
    sendDefault: (settings: {
      objectType: "feed";
      content: {
        title: string;
        description: string;
        imageUrl?: string;
        link: KakaoShareLink;
      };
      buttons: Array<{
        title: string;
        link: KakaoShareLink;
      }>;
    }) => void;
  };
}

interface Window {
  Kakao?: KakaoSdk;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
