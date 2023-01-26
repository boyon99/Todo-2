### 배포페이지  https://todo-list-pied-iota.vercel.app/

<br/>

### ❗ 필수

- [X] 할 일 목록(List)이 출력돼야 합니다.
- [X] 할 일 항목(Item)을 새롭게 추가할 수 있어야 합니다.
- [X] 할 일 항목을 수정할 수 있어야 합니다.
- [X] 할 일 항목을 삭제할 수 있어야 합니다.
- [X] jQuery, React, Vue 등 JS 라이브러리와 프레임워크는 사용하지 않아야 합니다.
- [X] 실제 서비스로 배포하고 접근 가능한 링크를 추가해야 합니다.

### ❔ 선택

- [X] 할 일 항목의 순서를 바꿀 수 있도록 만들어보세요.([SortableJS](http://sortablejs.github.io/Sortable/))
- [X] 할 일을 완료하지 않은 항목과 완료한 항목을 분류해서 출력해보세요.
- [X] 할 일을 완료한 항목을 한 번에 삭제할 수 있도록 만들어보세요.
- [X] 할 일 항목의 최신 수정일을 표시해보세요.
- [X] 할 일 목록이 출력되기 전에 로딩 애니메이션이 보이도록 만들어보세요.
- [X] 기타 동작이 완료되기 전에 로딩 애니메이션이 보이도록 만들어보세요.
- [X] 차별화가 가능하도록 프로젝트를 최대한 예쁘게 만들어보세요.
- [X] 할 일과 관련된 기타 기능도 고려해보세요.


<br/>

## 상세설명
#### 할 일 항목을 추가 및 삭제, 조회할 수 있다. 생성일과 수정일을 표시한다. 

<img width="500" alt="스크린샷 2023-01-26 오후 8 22 50" src="https://user-images.githubusercontent.com/64579380/214824135-dff5c6ea-4687-418b-9334-7fccd2e8e7ba.png">

#### 자유롭게 텍스트를 수정할 수 있고, 원하는 리스트에 마우스오버 시 수정하기 버튼이 나타난다.

<img width="500" alt="스크린샷 2023-01-26 오후 8 25 59" src="https://user-images.githubusercontent.com/64579380/214824471-176d198d-826d-4e12-9cf3-7a82397f9007.png">

#### 순서변경이 가능하다.

<img width="500" alt="스크린샷 2023-01-26 오후 8 25 59" src="https://user-images.githubusercontent.com/64579380/214824471-176d198d-826d-4e12-9cf3-7a82397f9007.png">
<img width="500" alt="스크린샷 2023-01-26 오후 8 27 22" src="https://user-images.githubusercontent.com/64579380/214824644-de47b6bf-9ee0-4434-af92-f663914c0c34.png">

#### 완료한 항목과 완료하지 않은 항목을 분류하여 출력한다.
<img width="500" alt="스크린샷 2023-01-26 오후 8 28 57" src="https://user-images.githubusercontent.com/64579380/214824898-5952dd92-790b-4ccb-b668-51c4e4ca51a2.png">
<img width="500" alt="스크린샷 2023-01-26 오후 8 29 02" src="https://user-images.githubusercontent.com/64579380/214824901-306fdfbd-3a6e-466a-95cb-1968e403766a.png">

#### 로딩 애니메이션이 출력된다.
<img width="500" alt="스크린샷 2023-01-26 오후 8 30 06" src="https://user-images.githubusercontent.com/64579380/214825129-533628d9-0e76-4e3d-8acf-025bc98ff16d.png">

#### 기타기능 - 중요 리스트를 설정할 수 있다.
<img width="500" alt="스크린샷 2023-01-26 오후 8 32 02" src="https://user-images.githubusercontent.com/64579380/214825391-6857c754-f99a-41b7-997e-149553eca3a1.png">



## API 사용법

요청 주소(Endpoint)

```curl
https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos
```

모든 API 요청(Request) `headers`에 아래 정보가 꼭 포함돼야 합니다!  
`username`은 `KDT4_ParkYoungWoong`와 같이 본명을 포함해야 합니다!  
확인할 수 없는 사용자의 DB 정보는 임의로 삭제될 수 있습니다!

API 사용 예시:

```js
async function createTodo() {
  const res = await fetch('https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'apikey': 'FcKdtJs202301',
      'username': 'KDT4_ParkYoungWoong'
    },
    body: JSON.stringify({
      title: '아침 먹기!'
    })
  })
  const json = await res.json()
  console.log(json)

  return json
}
```

### 목록 조회

전체 할 일 목록을 조회합니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos
  \ -X 'GET'
```

요청 데이터 타입 및 예시:

- 없음

응답 데이터 타입 및 예시:

```ts
type ResponseValue = Todo[] // 할 일 목록

interface Todo {
  id: string // 할 일 ID
  order: number // 할 일 순서
  title: string // 할 일 제목
  done: boolean // 할 일 완료 여부
  createdAt: string // 할 일 생성일
  updatedAt: string // 할 일 수정일
}
```

```json
[
  {
    "id": "mnIwaAPIAE1ayQmqekiR",
    "order": 0,
    "title": "JS 공부하기",
    "done": false,
    "createdAt": "2021-10-28T05:18:51.868Z",
    "updatedAt": "2021-10-28T05:18:51.868Z"
  },
  {
    "id": "tMzPImGoWtRdJ6yyVv2y",
    "order": 1,
    "title": "과제 PullRequest(PR) 생성",
    "done": true,
    "createdAt": "2021-10-28T04:16:53.980Z",
    "updatedAt": "2021-10-28T09:40:17.955Z"
  },
  {
    "id": "Rq8BebKihCgteHHhMIRS",
    "order": 2,
    "title": "API 스터디",
    "done": false,
    "createdAt": "2021-10-28T04:17:02.510Z",
    "updatedAt": "2021-10-28T04:17:02.510Z"
  }
]
```

### 목록 순서 변경

할 일 목록의 순서를 변경합니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/reorder
  \ -X 'PUT'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
  todoIds: string[] // 새롭게 정렬할 할 일 ID 목록 (필수!)
}
```

```json
{
  "todoIds": [
    "mnIwaAPIAE1ayQmqekiR",
    "tMzPImGoWtRdJ6yyVv2y",
    "GHrvr3LaPx1g7y2sNuaC",
    "Rq8BebKihCgteHHhMIRS"
  ]
}
```

응답 데이터 타입 및 예시:

```ts
type ResponseValue = true // 순서 변경 여부
```

### 항목 추가

할 일 항목을 새롭게 추가합니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos
  \ -X 'POST'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
  title: string // 할 일 제목 (필수!)
  order?: number // 할 일 순서
}
```

```json
{
  "title": "KDT 과정 설계 미팅",
  "order": 2
}
```

응답 데이터 타입 및 예시:

```ts
interface ResponseValue {
  id: string
  order: number
  title: string
  done: boolean
  createdAt: string
  updatedAt: string
}
```

```json
{
  "id": "7P8dOM4voAv8a8cfoeKZ",
  "order": 0,
  "title": "KDT 과정 설계 미팅",
  "done": false,
  "createdAt": "2021-10-29T07:20:02.749Z",
  "updatedAt": "2021-10-29T07:20:02.749Z"
}
```

### 항목 수정

특정 할 일 항목을 수정합니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/:todoId
  \ -X 'PUT'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
  title: string // 할 일 제목 (필수!)
  done: boolean // 할 일 완료 여부 (필수!)
  order?: number // 할 일 순서
}
```

```json
{
  "title": "Bootstrap 스타일 추가",
  "done": false,
  "order": 2
}
```

응답 데이터 타입 및 예시:

```json
{
  "id": "7P8dOM4voAv8a8cfoeKZ",
  "title": "Bootstrap 스타일 추가",
  "done": false,
  "order": 2,
  "createdAt": "2021-10-29T07:20:02.749Z",
  "updatedAt": "2021-10-29T07:20:02.749Z"
}
```

### 항목 삭제

특정 할 일 항목을 삭제합니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/:todoId
  \ -X 'DELETE'
```

요청 데이터 타입 및 예시:

- 없음

응답 데이터 타입 및 예시:

```ts
type ResponseValue = true
```
