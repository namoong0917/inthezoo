import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

// 로그인한 사용자가 보게 되는 컴포넌트

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  // Firebase에 유저 정보 요청, 유저가 로그인 되어있으면 Firebase가 유저 정보를 준다.
  // 그렇지 않다면 null
  const user = auth.currentUser;
  if (user === null) {
    // user가 ull인지 아닌지 확인, null이면 로그인 페이지로 보냄
    return <Navigate to="/login" />;
  }

  return children;
}
