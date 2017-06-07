# TODO List

## 제품 컨셉
- 이름: 루키 / Rookie the Newbie / ルーキーさん
- 국적: 일본. 영어, 한국어, 중국어를 할 수는 있음.
- 업무: 회사의 데이터 관리. 일 시작한지 1년 된 초짜사원.
- 상세 컨셉:
  - 데이터 관리 사원 Rookie-san
  - 성격: 에너지 넘치는 성격. 느낌표 과다사용.
  - 말투: 깍듯한 경어. 가끔 중요한 일을 하고 있다는 자부심도 표현
    - '하하, 저 잘하죠?'
    - '도저히 모르겠습니다..'
    - '죄송합니다. 다음에 더 잘하겠습니다.'


## 사용자 동선
- 다중언어를 지원할 것인가? 한다면 어느 milestone까지?
  - 사용자의 주사용 언어를 어떻게 판단할 것인가
    * 구글 번역 API를 사용해서 `detect-language`, `English text`를 확보한다. 
    > 번역 API 는 일단은 사용하지 않는다. 
    >
- Help 자체를 구성RS 방식을 사용한다. (기본은 영어)
  1. [command 목록 조회 기능](#command-list)
  2. command 사용 샘플 (영상?)
  3. GA 계정 조회/수정 기능 
    * `ChatId` - `gaAccountId` 를 표시 
    * 재 로그인 기능 
- Help message 구성 방법
  -  라인 페이지에 게시물을 올리고 Bot에  `@help` 메시지가 오면 랜딩 시킨다. 
- 봇과의 최초 interaction은?
  1. Greeting message
  2. undefined 스티커 또는 메시지 > 로그인 해주세요.
- Domain: `metadata.co.kr` 
  
# command list
- @help: 도움말 출력
- @lang: 언어설정
  - 1: 영어
  - 2: 일본어
  - 3: 한국어
- @add : 데이터소스 등록
  - 이미 소스가 추가되어있는 경우 관련정보 출력
- @init: 데이터소스 초기화
- @report: 현재까지 몇개의 쿼리 요청을 수행하고 실패했는지를 표시

# output Type

- image type (default)
- rating feature 



# The next steps

## Help 페이지 만들기 

- help 는 항상 바뀔 수 있다. 
- 가장 기본적인 도움말은 하드코딩을 넣는다.
- 블로그를 만들고, 그 블로그의 API 나 RSS 를 활용해서 공지/도움말 게시판으로 사용하는 것이 좋잖을까 싶음. 


## > csv download is needed?
