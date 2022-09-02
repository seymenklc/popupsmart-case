import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useForm } from "../hooks/useForm";

export default function UserInput() {
    const { login } = useContext(UserContext);
    const { values, onChange, onSubmit } = useForm(setUser, { displayName: '' });

    function setUser() {
        if (values.displayName.length) {
            login(values.displayName);
        }
    }

    return (
        <form onSubmit={onSubmit} className='user-input'>
            <label>Display Name</label>
            <input
                type="text"
                name='displayName'
                placeholder="John Doe"
                onChange={onChange}
                value={values.displayName}
            />
            <button>Login</button>
        </form>
    );
}