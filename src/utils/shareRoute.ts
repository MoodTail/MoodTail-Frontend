export type SharedRoute =
  | { type: "result"; shareToken: string }
  | { type: "collection"; shareToken: string };

// 백엔드가 크롤러(카카오톡 등 링크 미리보기)용으로 문서화해둔 OG 페이지 경로 규칙을 그대로 따릅니다.
// 실제 사람이 같은 링크를 클릭하면 이 SPA가 로드되므로, 여기서 pathname을 다시 파싱해
// 해당 공유 콘텐츠를 보여주는 화면으로 연결합니다.
export function parseSharedRoute(): SharedRoute | null {
  const { pathname } = window.location;

  const resultMatch = pathname.match(/^\/share\/results\/([^/]+)$/);
  if (resultMatch) return { type: "result", shareToken: resultMatch[1] };

  const collectionMatch = pathname.match(/^\/share\/collection\/([^/]+)$/);
  if (collectionMatch) return { type: "collection", shareToken: collectionMatch[1] };

  return null;
}
