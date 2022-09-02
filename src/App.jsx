// hooks
import { useUserContext } from "./hooks/useUserContext";
import { useThemeContext } from "./hooks/useThemeContext";
// components
import Todos from "./components/Todos";
import Header from "./components/Header";
import UserInput from "./components/UserInput";

export default function App() {
  const { user } = useUserContext();
  const { theme } = useThemeContext();

  return (
    <div className='app' id={theme}>
      <Header title='Todo App' />
      {!user && <UserInput />}
      <Todos />
    </div>
  );
}