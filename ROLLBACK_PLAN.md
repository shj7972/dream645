# dream645 롤백 계획 (2026-09-01 광고 배치 기준)

## 배포 정보
- 커밋: 03f775d (애드센스 광고 배치 + title 중복 수정)
- 이전 안정 커밋: 8d5584c (인게이지먼트 고도화)
- 배포: GitHub push → Netlify 자동 (netlify.toml, Next.js)

## 롤백 방법
1. git revert 03f775d && git push (권장)
2. git reset --hard 8d5584c && git push --force (긴급)
3. Netlify 대시보드 → Deploys → 8d5584c 시점 "Publish deploy"

## 롤백 판단 기준
- 페이지 500 오류 / 광고가 레이아웃 깨뜨림 / LCP 5초+ 지속
- 애드센스 정책 위반 통지 수신 시 즉시 롤백 후 원인 분석

## 검증 명령
- dream 상세: 광고 <ins> 3개, title 중복 없음
- 메인/카테고리/블로그: 광고 1개씩
- sitemap 1,235 URL 유지

## 애드센스 슬롯
- 사용 슬롯 ID: 7981263686 (운세담과 동일한 pub 계정 ca-pub-2947913248390883)
- ⚠️ 애드센스 콘솔에서 dream645 전용 디스플레이 단위 생성 후 슬롯 ID 교체 권장
  (현재는 기존 승인된 단위 재사용 — 콘솔에서 단위별 수익 구분 안 됨)
