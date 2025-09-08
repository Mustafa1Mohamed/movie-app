import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Register() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [errors, setErrors] = useState({
        nameErr: "",
        usernameErr: "",
        emailErr: "",
        passErr: "",
        confirmPassErr: "",
    });

    const history = useHistory();

    const handleForm = (e) => {
        const { name, value } = e.target;

        if (name === "name") {
            setName(value);
            value.length === 0
                ? setErrors({ ...errors, nameErr: "Name is required" })
                : value.length < 3
                    ? setErrors({ ...errors, nameErr: "Name must be at least 3 characters" })
                    : setErrors({ ...errors, nameErr: "" });
        } else if (name === "username") {
            setUsername(value);
            value.length === 0
                ? setErrors({ ...errors, usernameErr: "Username is required" })
                : value.length < 3
                    ? setErrors({ ...errors, usernameErr: "Username must be at least 3 characters" })
                    : setErrors({ ...errors, usernameErr: "" });
        } else if (name === "email") {
            setEmail(value);
            value.length === 0
                ? setErrors({ ...errors, emailErr: "Email is required" })
                : !/\S+@\S+\.\S+/.test(value)
                    ? setErrors({ ...errors, emailErr: "Email is invalid" })
                    : setErrors({ ...errors, emailErr: "" });
        } else if (name === "password") {
            setPassword(value);
            value.length === 0
                ? setErrors({ ...errors, passErr: "Password is required" })
                : value.length < 8
                    ? setErrors({ ...errors, passErr: "Password must be at least 8 characters" })
                    : setErrors({ ...errors, passErr: "" });
        } else if (name === "confirmPassword") {
            setConfirmPassword(value);
            value !== password
                ? setErrors({ ...errors, confirmPassErr: "Passwords do not match" })
                : setErrors({ ...errors, confirmPassErr: "" });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Final validation before saving
        if (!name) {
            setErrors((prev) => ({ ...prev, nameErr: "Name is required" }));
            return;
        }
        if (!username) {
            setErrors((prev) => ({ ...prev, usernameErr: "Username is required" }));
            return;
        }
        if (!email) {
            setErrors((prev) => ({ ...prev, emailErr: "Email is required" }));
            return;
        }
        if (!password) {
            setErrors((prev) => ({ ...prev, passErr: "Password is required" }));
            return;
        }
        if (!confirmPassword) {
            setErrors((prev) => ({ ...prev, confirmPassErr: "Confirm password is required" }));
            return;
        }
        if (password !== confirmPassword) {
            setErrors((prev) => ({ ...prev, confirmPassErr: "Passwords do not match" }));
            return;
        }
        const newUser = { name, username, email, password };
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let existEmail = users.find((user) => user.email === email);
        let existUsername = users.find((user) => user.username === username);
        if (existUsername) {
            setErrors((prev) => ({ ...prev, usernameErr: "Username already exists" }));
            return;
        }
        if (existEmail) {
            setErrors((prev) => ({ ...prev, emailErr: "Email already exists" }));
            return;
        }
        users.push(newUser);
        localStorage.setItem("users",JSON.stringify(users));
        history.push("/login");
    };

    return (
        <div className="container my-5">
            <h1 className="text-center fw-bold text-danger">Register</h1>
            <form className="text-start" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        name="name"
                        onChange={handleForm}
                        style={{ border: errors.nameErr ? "1px solid red" : "1px solid #ced4da" }}
                    />
                    <p className="text-danger">{errors.nameErr}</p>
                </div>

                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        name="username"
                        onChange={handleForm}
                        style={{ border: errors.usernameErr ? "1px solid red" : "1px solid #ced4da" }}
                    />
                    <p className="text-danger">{errors.usernameErr}</p>
                </div>

                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        name="email"
                        onChange={handleForm}
                        style={{ border: errors.emailErr ? "1px solid red" : "1px solid #ced4da" }}
                    />
                    <p className="text-danger">{errors.emailErr}</p>
                </div>

                <div className="mb-3 position-relative">
                    <label className="form-label">Password</label>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            value={password}
                            name="password"
                            onChange={handleForm}
                            style={{ border: errors.passErr ? "1px solid red" : "1px solid #ced4da" }}
                        />
                        <span
                            className="input-group-text"
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                        </span>
                    </div>
                    <p className="text-danger">{errors.passErr}</p>
                </div>

                <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        value={confirmPassword}
                        name="confirmPassword"
                        onChange={handleForm}
                        style={{ border: errors.confirmPassErr ? "1px solid red" : "1px solid #ced4da" }}
                    />
                    <p className="text-danger">{errors.confirmPassErr}</p>
                </div>

                <button
                    type="submit"
                    className={
                        "btn btn-primary" +
                        (errors.nameErr ||
                            errors.usernameErr ||
                            errors.emailErr ||
                            errors.passErr ||
                            errors.confirmPassErr
                            ? " disabled"
                            : "")
                    }
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
