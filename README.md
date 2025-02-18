# ToDo App (React.js + Ant Design)

이 프로젝트는 할 일(ToDo) 앱을 구현한 것으로, 사용자는 할 일을 추가하고, 완료 여부를 체크하며, 삭제할 수 있는 기능을 제공합니다. 또한, 할 일 목록은 진행 중, 완료된 일, 삭제된 일로 구분되어 관리됩니다.
백엔드 프로젝트(Todo api)에 연동하여 실행해야합니다.

todo-api : https://github.com/KimSooHa/todo-api

<br/>

## 💡 기능


- 할 일 추가: 사용자가 할 일을 입력하고 추가할 수 있습니다.
- 진행 중, 완료된 일, 삭제된 일 관리: 할 일을 진행 중, 완료된 일, 삭제된 일로 구분하여 표시합니다.
- 할 일 수정: 기존의 할 일을 수정할 수 있습니다.
- 할 일 완료 여부 변경: 완료된 일로 표시하거나 완료 취소가 가능합니다.
- 할 일 삭제 여부 변경: 삭제된 일로 표시하거나 다시 복구할 수 있습니다.
- 자동 갱신: 매시간 자동으로 할 일 목록을 새로 불러옵니다.

<br/>

## 🛠️ 사용 기술

- React.js (v18): UI 구성 및 상태 관리
- Ant Design (v4): UI 컴포넌트 라이브러리
- Axios: API 요청
- JSON: 데이터를 주고받는 형식
- CSS: 스타일링      
  
<br/>

## 🚀 실행 방법

1. 환경 설정
	•	Node.js 및 npm (또는 yarn)이 설치되어 있어야 합니다.

2. 클론 및 설치

```shell
    git clone https://github.com/your-repo/to-do-app.git
    cd todo-app
    npm install
```

3. 실행
```shell
    npm start
```
- 앱은 http://localhost:3000에서 실행됩니다.    

<br/>

> 백엔드 실행 방법은 [GitHub](https://github.com/KimSooHa/todo-api)의 README.md를 참고해주세요.

<br/>


## 🧩 주력으로 사용한 컴포넌트 설명

1. List (Ant Design)

List 컴포넌트는 할 일 목록을 렌더링하는 데 사용됩니다. 목록 항목에 대한 CRUD 작업을 처리하기에 매우 직관적이고, actions 프로퍼티를 사용하여 버튼을 추가할 수 있어 편리하게 수정/삭제 기능을 구현할 수 있었습니다.

2. Checkbox (Ant Design)

Checkbox 컴포넌트를 사용하여 할 일의 완료 여부를 표시하고, 이를 클릭하여 완료 상태를 변경할 수 있도록 구현했습니다. 사용자가 완료된 항목을 시각적으로 구별할 수 있게 해줍니다.

3. Input 및 Button (Ant Design)

Input 컴포넌트를 사용하여 사용자가 할 일을 입력할 수 있게 했습니다. Button은 할 일을 추가하는 기능을 처리합니다. 이들 컴포넌트는 매우 간단하지만 효과적으로 상호작용을 지원합니다.

4. message (Ant Design)

사용자 상호작용에 대한 피드백을 제공하기 위해 message 컴포넌트를 사용했습니다. 예를 들어, 할 일이 수정되었을 때 "수정되었습니다”라는 메시지가 나타납니다.

<br/>

## 📝 API 명세
<br/>

API Endpoints:  
  
1. GET /api/todos
- 설명: 할 일 목록을 가져옵니다.
- 응답: 할 일 목록

2. POST /api/todos

- 설명: 새 할 일을 추가합니다.
- 요청: { task: string }
- 응답: 추가된 할 일

3. PUT /api/todos/{id}/completeYn

- 설명: 할 일의 완료 여부를 변경합니다.
- 요청: { ynType: "Y" | "N" }
- 응답: 완료 여부가 변경된 할 일

4. PUT /api/todos/{id}/deleteYn
- 설명: 할 일의 삭제 여부를 변경합니다.
- 요청: { ynType: "Y" | "N" }
- 응답: 삭제 여부가 변경된 할 일
     
<br/>

## 🔧 추가된 기능
- 할 일 완료 시 자동 삭제: 완료된 일은 3일 후 자동으로 삭제되는 기능을 추가했습니다. 해당 날짜를 기준으로 삭제 여부를 확인할 수 있습니다.