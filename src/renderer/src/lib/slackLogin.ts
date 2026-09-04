// "Slack으로 로그인" 웹뷰가 Slack(외부)에서 우리 서버로 돌아왔는지 판정한다.
// 돌아온 순간에만 세션 확인(ssoCheckSession)을 돌리기 위한 트리거 — slack.com
// 안에서 여러 번 이동하는 동안은 확인해봐야 의미가 없다.
//
// 성공/실패 판정 자체는 여기서 하지 않는다. URL만으로는 못 하기 때문이다:
// Open WebUI(AI챗봇)는 OIDC 성공도 실패도 /auth 로 돌아오고(성공은 token 쿠키가
// 남고, 실패는 /auth?error=...), Mail Assistant도 실패하면 /login 으로 돌아온다.
// 실제 판정은 세션 확인이 하고, 이 함수는 "지금 확인해볼 만한가"만 답한다.
export const isBackFromSlack = (url: string, base: string): boolean => {
  try {
    return new URL(url).origin === new URL(base).origin
  } catch {
    return false
  }
}
