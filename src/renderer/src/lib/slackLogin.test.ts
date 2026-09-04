// isBackFromSlack 자체 점검 — 프레임워크 없이 assert 만 쓴다.
// 실행: npx esbuild --bundle --platform=node --format=cjs \
//         src/renderer/src/lib/slackLogin.test.ts | node
import assert from 'assert'
import { isBackFromSlack } from './slackLogin'

const MAIL = 'http://192.168.0.210:5080'
const NAS = 'http://192.168.0.210:3099'

// Slack 쪽에 있는 동안 = 아직 확인할 필요 없음
assert.equal(isBackFromSlack('https://slack.com/openid/connect/authorize?client_id=1', MAIL), false)
assert.equal(isBackFromSlack('https://app.slack.com/client/T1/C1', NAS), false)

// 우리 서버로 돌아옴 = 세션을 확인해볼 시점
assert.equal(isBackFromSlack(`${MAIL}/auth/slack/callback?code=x&state=y`, MAIL), true)
assert.equal(isBackFromSlack(`${MAIL}/`, MAIL), true)
assert.equal(isBackFromSlack(`${MAIL}/login`, MAIL), true) // 실패해도 트리거는 됨(판정은 세션이)
assert.equal(isBackFromSlack(`${NAS}/auth`, NAS), true)
assert.equal(isBackFromSlack(`${NAS}/auth?error=Account+not+found`, NAS), true)

// 포트만 다른 이웃 서비스는 다른 origin — 단계가 섞이지 않아야 한다
assert.equal(isBackFromSlack(`${NAS}/auth`, MAIL), false)
assert.equal(isBackFromSlack(`${MAIL}/`, NAS), false)

// base 뒤 슬래시가 있어도 동일 판정 / 잘못된 입력은 false
assert.equal(isBackFromSlack(`${MAIL}/`, `${MAIL}/`), true)
assert.equal(isBackFromSlack('', MAIL), false)
assert.equal(isBackFromSlack('about:blank', MAIL), false)
assert.equal(isBackFromSlack(`${MAIL}/`, ''), false)

console.log('slackLogin self-check ok')
