// isPrivateHost 자체 점검. 의존성 없이 돌아간다:
//   node src/main/utils/private-host.test.mjs
//
// 이 판정이 틀리면 두 방향으로 사고가 난다:
//   - 공개 호스트를 private 으로 잘못 보면 → 업데이트/슬랙 로그인 MITM 가능
//   - LAN 호스트를 public 으로 잘못 보면 → 자체서명 NAS 접속이 끊긴다
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

// index.ts 는 electron 을 import 하므로 통째로 못 불러온다. 함수 본문만 떼어낸다.
const src = readFileSync(new URL('./index.ts', import.meta.url), 'utf-8')
const body = src.slice(
  src.indexOf('export const isPrivateHost'),
  src.indexOf('export const isPrivateUrl')
)
const isPrivateHost = eval(
  `(${body.replace('export const isPrivateHost = ', '').replace(/: string|: boolean/g, '').trim().replace(/\n$/, '')})`
)

const PRIVATE = [
  '192.168.0.210', '10.0.0.5', '172.16.0.1', '172.31.255.254',
  '127.0.0.1', 'localhost', 'nas', 'synology.local', '169.254.1.1',
  'fd00::1', 'fe80::1', '::1'
]
const PUBLIC = [
  'github.com', 'objects.githubusercontent.com', 'slack.com',
  'w1735528368-mo2137373.slack.com', 'api.anthropic.com',
  '8.8.8.8', '1.1.1.1',
  '172.15.0.1', '172.32.0.1',   // 172.16-31 바깥 = 공인 대역
  '192.169.0.1',                // 192.168 이 아님
  '11.0.0.1'                    // 10.x 가 아님
]

for (const h of PRIVATE) assert.equal(isPrivateHost(h), true, `${h} 는 private 이어야 함`)
for (const h of PUBLIC) assert.equal(isPrivateHost(h), false, `${h} 는 public 이어야 함`)

console.log(`ok — private ${PRIVATE.length}건, public ${PUBLIC.length}건 통과`)
