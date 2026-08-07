export interface OauthCallbackParams {
  provider: "kakao" | "google";
  code: string;
  state: string;
}

export const parseOauthCallback = (): OauthCallbackParams | null => {
  const { pathname, search } = window.location;
  const params = new URLSearchParams(search);
  const code = params.get("code");
  const state = params.get("state");

  if (!code || !state) return null;

  if (pathname === "/oauth/kakao/callback") {
    return { provider: "kakao", code, state };
  }
  if (pathname === "/oauth/google/callback") {
    return { provider: "google", code, state };
  }
  return null;
};
