# 나스 Claude Code 세션 슈퍼바이저

나스에서 Remote Control으로 상시 실행 중인 Claude Code 세션들이 네트워크 순단·재부팅·프로세스
크래시로 끊겼을 때, 사람이 손대지 않아도 **같은 대화를 이어서** 자동으로 다시 붙게 해주는
Docker 컨테이너.

## 동작 원리

- `claude agents --json`으로 이 호스트에서 살아있는 세션 목록을 확인한다.
- 죽어있는 세션은 `claude --resume <session-id> --bg`로 백그라운드에서 다시 붙인다 — 대화
  이력은 Anthropic 서버에 보관돼 있어서 그대로 이어진다.
- 5분마다 이 확인을 반복한다(`launch-session.sh`는 이미 살아있으면 아무것도 안 하므로 매번
  그냥 다시 불러도 안전하다).
- `docker-compose.yml`의 `restart: unless-stopped`가 가장 바깥쪽 안전망 — 컨테이너 자체가
  죽어도(OOM, 나스 재부팅) Docker가 다시 띄우고, 다시 뜬 컨테이너가 위 과정을 처음부터 한다.

## 처음 설치할 때

1. `claude-sessions.conf.example`을 `claude-sessions.conf`로 복사하고, 관리할 프로젝트마다
   한 줄씩 채운다. `session_uuid`는 `uuidgen`으로 한 번 뽑으면 끝 — 이후 절대 바꾸지 않는다
   (파일 안 설명 참고).
2. `docker-compose.yml`의 볼륨 경로(특히 `/volume1/docker` 왼쪽)를 실제 나스 경로에 맞게 수정.
3. `docker compose up -d --build`로 띄운다.
4. **최초 로그인은 자동화가 안 된다** — OAuth 방식이라 사람이 한 번은 직접 해야 함:
   ```
   docker compose exec claude-supervisor claude login
   ```
   브라우저 인증(또는 device code) 절차를 따라간다. 이 로그인 정보는 `claude_home` 볼륨에
   저장되므로, 이후 컨테이너가 몇 번을 재시작해도 다시 로그인할 필요는 없다 — 나스 자체를
   완전히 밀거나 그 볼륨을 지우지 않는 한.
5. 로그는 `./logs/<name>.log`(세션별)와 `./logs/supervisor.log`(전체 흐름)에서 확인.

## 검증 방법 (배포 후 한 번은 직접 해볼 것)

이 슈퍼바이저는 실제 Remote Control 연결을 가진 환경에서 만든 게 아니라, `claude --help`와
`claude agents --json` 출력을 직접 확인해서 설계한 것이다. 특히 **`--remote-control` 플래그와
`--bg`(백그라운드) 플래그를 같이 쓰는 조합은 실제 나스 환경에서 한 번 검증이 필요하다**
(`launch-session.sh`의 첫 실행 분기). 배포 후:

1. 테스트용 세션 하나를 등록해서 정상적으로 뜨는지 확인.
2. 그 세션의 대화창에서 뭔가 하나 시켜서 대화 이력을 만든다.
3. `docker compose exec claude-supervisor claude agents --json`으로 pid를 찾아 `kill`.
4. 5분(또는 `CHECK_INTERVAL`을 짧게 바꿔서 테스트) 안에 재기동되는지, `claude attach <id>`로
   들어갔을 때 3번 이전 대화 이력이 그대로 남아있는지 확인.
5. 문제가 있으면 `launch-session.sh`의 두 `claude` 호출부(첫 실행/재개)를 그 결과에 맞게 조정.

## 알려진 한계 (설계로 없앨 수 없는 것)

- **재연결 유효 시간 ~4시간**: 세션이 끊긴 뒤 4시간을 넘기면 재연결 기록 자체가 만료돼서,
  그 다음엔 대화 이력 없이 새 세션이 시작된다. 기본 5분 주기 헬스체크는 이 창을 놓치지 않기
  위한 것이지만, 나스가 4시간 넘게 통째로 다운되면 그 세션들의 이력은 어차피 못 살린다.
- **레이트리밋**: 세션이 많을수록(5시간/7일 창) 한꺼번에 재연결이 몰리면 걸릴 수 있다.
  `STAGGER_SECONDS`로 간격을 벌리는 정도로만 완화 가능.
- **최초 로그인은 항상 수동**: API 키는 Remote Control에서 지원하지 않는다.
