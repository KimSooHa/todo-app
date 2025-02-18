import React, { useEffect, useState } from "react";
import { List, Input, Button, Checkbox, message } from "antd";
import api from "../api"; // axios 대신 api 임포트

const TodoList = () => {
  const [todos, setTodos] = useState([]); // 진행중
  const [completedTodos, setCompletedTodos] = useState([]); // 완료
  const [deletedTodos, setDeletedTodos] = useState([]); // 삭제됨
  const [task, setTask] = useState("");

  // 할 일 목록 불러오기
  const fetchTodos = async () => {
    try {
      const [todosRes, completedRes, deletedRes] = await Promise.all([
        api.get("/api/todos"),
        api.get("/api/todos/completed"),
        api.get("/api/todos/deleted"),
      ]);

      setTodos(todosRes.data);
      setCompletedTodos(completedRes.data);
      setDeletedTodos(deletedRes.data);
    } catch (error) {
      message.error("할 일을 불러오지 못했습니다.");
    }
  };

  useEffect(() => {
    fetchTodos();
    const interval = setInterval(() => {
        fetchTodos();
    }, 60 * 60 * 1000); // 1시간마다 실행(60분 * 60초 * 1000ms)

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
  }, []);


  // 할 일 추가
  const addTodo = () => {
    if (!task) return message.warning("할 일을 입력해주세요.");

    api.post("/api/todos", { task })
      .then(response => {
        fetchTodos(); // 추가 후 전체 목록 새로 불러오기
        setTask("");
      })
      .catch(() => message.error("추가 실패"));
  };

  // 완료 여부 변경
  const toggleComplete = (id, completeYn) => {
    api.put(`/api/todos/${id}/completeYn?ynType=${completeYn ? "N" : "Y"}`)
      .then(() => {
        fetchTodos(); // 완료/미완료 상태 변경 후 목록 갱신
      })
      .catch(() => message.error("변경 실패"));
  };

  // 삭제 여부 변경
  const toggleDelete = (id, deleteYn) => {
    api.put(`/api/todos/${id}/deleteYn?ynType=${deleteYn ? "N" : "Y"}`)
      .then(() => {
        fetchTodos(); // 삭제 후 목록 갱신
      })
      .catch(() => message.error("삭제 실패"));
  };

  
  // 할일 수정
  const [editingId, setEditingId] = useState(null);
  const [editTask, setEditTask] = useState("");
  
  const updateTodo = (id) => {
    api.put(`/api/todos/${id}`, { task: editTask })
      .then(() => {
        fetchTodos(); // 수정 후 목록 갱신
        setEditingId(null);
        message.success("수정되었습니다.");
      })
      .catch(() => message.error("수정 실패"));
  };

  const toKST = (utcDate) => {
    const date = new Date(utcDate);
    return new Date(date.getTime() + 9 * 60 * 60 * 1000); // UTC → KST (9시간 추가)
  };

  const calculateRemainingDays = (date) => {
    const now = new Date();
    const targetDate = toKST(date); // UTC → KST 변환
    targetDate.setDate(targetDate.getDate() + 3);
  
    const diff = Math.floor((targetDate - now) / (1000 * 60 * 60 * 24)); // 남은 일수 계산    
    return diff > 0 ? `${diff}일 후 삭제` : "오늘 삭제";
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h2>📝 할 일 목록</h2>
      <Input 
        placeholder="할 일을 입력하세요" 
        value={task} 
        onChange={(e) => setTask(e.target.value)} 
        onPressEnter={(e) => {
            e.preventDefault(); // 기본 동작 방지 (중복 실행 방지)
            addTodo();
          }}
      />
      <Button type="primary" onClick={addTodo} className="Todo-btn" style={{ marginTop: "10px", marginBottom: "40px" }}>
        추가하기
      </Button>
      
      <h3>📌 진행 중</h3>
      <List
        dataSource={todos}
        renderItem={(todo) => (
            <List.Item
                actions={[
                editingId === todo.id ? (
                    <Button type="text" onClick={() => updateTodo(todo.id)}>저장</Button>
                ) : (
                    <Button type="text" onClick={() => { setEditingId(todo.id); setEditTask(todo.task); }}>수정</Button>
                ),
                <Button type="text" danger onClick={() => toggleDelete(todo.id, todo.deleteYn)}>삭제</Button>
                ]}
            >
            <Checkbox 
              checked={todo.completeYn} 
              onChange={() => toggleComplete(todo.id, todo.completeYn)}
            />
            {editingId === todo.id ? (
              <Input
                value={editTask}
                onChange={(e) => setEditTask(e.target.value)}
                onPressEnter={() => updateTodo(todo.id)}
                style={{ width: "60%" }}
              />
            ) : (
                <span>
                {todo.task}
              </span>
            )}
          </List.Item>
        )}
      />

      {/* 완료된 할 일 */}
      <h3>✅ 완료된 일</h3>
      <List
        dataSource={completedTodos}
        renderItem={(todo) => (
          <List.Item>
            <span style={{ marginLeft: "10px", color: "gray" }}>
                {calculateRemainingDays(todo.completedDate)}
            </span>
            <span style={{ textDecoration: "line-through" }}>{todo.task}</span>
            <Button type="text" onClick={() => toggleComplete(todo.id, todo.completeYn)}>
                🔁
            </Button>
          </List.Item>
        )}
      />

      {/* 삭제된 할 일 */}
      <h3>🗑️ 삭제된 일</h3>
      <List
        dataSource={deletedTodos}
        renderItem={(todo) => (
          <List.Item>
            <span style={{ marginLeft: "10px", color: "gray" }}>
                {calculateRemainingDays(todo.deletedDate)}
            </span>
            <span>{todo.task}</span>
            <Button type="text" danger onClick={() => toggleDelete(todo.id, todo.deleteYn)}>
                🔁
            </Button>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TodoList;