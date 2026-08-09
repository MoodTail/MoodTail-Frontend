interface KakaoShareOptions {
  title: string
  description: string
  imageUrl?: string
  webUrl: string
  buttonTitle?: string
}

function getKakaoSdk() {
  const javascriptKey = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY?.trim()
  if (!javascriptKey) {
    throw new Error('VITE_KAKAO_JAVASCRIPT_KEY가 설정되지 않았습니다.')
  }

  const kakao = window.Kakao
  if (!kakao) {
    throw new Error('Kakao JavaScript SDK를 불러오지 못했습니다.')
  }

  if (!kakao.isInitialized()) {
    kakao.init(javascriptKey)
  }

  return kakao
}

export function shareToKakao({
  title,
  description,
  imageUrl,
  webUrl,
  buttonTitle = '자세히 보기',
}: KakaoShareOptions) {
  const kakao = getKakaoSdk()
  const absoluteWebUrl = new URL(webUrl, window.location.origin).href
  const link = { webUrl: absoluteWebUrl, mobileWebUrl: absoluteWebUrl }
  const absoluteImageUrl = imageUrl
    ? new URL(imageUrl, window.location.origin).href
    : undefined

  kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title,
      description,
      ...(absoluteImageUrl ? { imageUrl: absoluteImageUrl } : {}),
      link,
    },
    buttons: [{ title: buttonTitle, link }],
  })
}

export type { KakaoShareOptions }
