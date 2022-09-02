import { useContext } from "react";
import { TodoContext } from "../context/todoContext";

export const useTodoContext = () => {
    return useContext(TodoContext);
};