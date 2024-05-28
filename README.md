# 아키텍처 구조

```
모듈 사용구조는 아래의 형태를 따라간다
- 외부에서 api주소를 이용해 사용시
    - client -> interface -> controller -> application -> domain -> infra
- 내부에서 모듈기능 사용시
    - 다른모듈 -> interface -> service -> domain -> infra
```

## 1. application (service의 역할을 한다)

```
- 동작되어야 하는 기능들별 정리된 디렉토리로 interface의 controller에서 호출하여 사용한다
- 하위구조는 아래와 같다
    L command
    L query
    L event
```

### command

```
- CRUD중 Read를 제외한 Create, Update, Delete를 수행하는 기능을 정의한다
- DTO의 경우 기능별 관리의 용이성을 위해 Conteroller가 아닌 apllication에 위치한다
- 하위디렉토리의 명칭은 동작되는 용도에 맞게 아래의 머릿말을 붙여 사용한다
    - 신규생성: create-
    - 수정: modify-
    - 삭제: delete-
- 하위구조는 아래와 같다
    L create-user
        L create-user.handler.ts
        L create-user.dto.ts
    L modify-user
        L modify-user.handler.ts
        L modify-user.dto.ts
    L delete-board
        L delete-user.handler.ts
        L delete-user.dto.ts
```

### query

```
- CRUD중 Read를 수행하는 기능을 정의한다
- 하위디렉토리의 명칭은 동작되는 용도에 맞게 아래의 머릿말을 붙여 사용한다
    - 목록 다건조회: find-{}-list
    - 목록 단건조회: find-
    - 검색: search-
- 하위구조는 아래와 같다
    L find-user-list
        L find-user-list.handler.ts
        L find-user-list.ro.ts
    L find-board
        L find-user.handler.ts
        L find-user.ro.ts
```

### event

```
이벤트핸들러를 관리하기 위한 용도로 사용
사이드 이펙트의 도메인을 관리하기 위한 비동기 이벤트 트리거 handler, event 객체
```

---

## 2. domain

```
- 기능을 구현하는데 필요한 비즈니스 로직을 정의하는 용도로 사용한다
- 하위디렉토리의 명칭은 동작되는 용도에 맞게 아래의 머릿말을 붙여 사용한다
    - {}.ts
- DDD의 핵심

```

---

## 3. infrastructure

```
- 외부기능을 연동하는데 사용한다 (ex: db, api, file, message queue, etc) 
- 사용하는 기능별로 디렉토리를 구성한다
- db기준 디렉토리 구성
    - db
        - user
            L entity
            L mapper
            L repositories
```

## 4. interface (controller의 역할을 한다)

```
- 외부에서 들어오는 요청처리를 위한 Rest Api를 구현하기 위해 사용된다
- 하위구조는 아래와 같다
    L controller
        L {}-controller.ts
    L external(다른 도메인에서 참조 도메인을 사용할 경우)
        L {}-external.service.ts
        L i.{}-external.service.ts
```