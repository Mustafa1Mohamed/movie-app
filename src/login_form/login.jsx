import { useState } from "react";
import { useHistory } from "react-router-dom";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        emailErr: "",
        passErr: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory();

    const handleHidePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleForm = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === "email") {
            setEmail(value);
            value.length === 0
                ? setErrors({ ...errors, emailErr: "Email is required" })
                : value.length < 10
                    ? setErrors({ ...errors, emailErr: "Email is invalid" })
                    : setErrors({ ...errors, emailErr: "" });
        } else if (name === "password") {
            setPassword(value);
            value.length === 0
                ? setErrors({ ...errors, passErr: "Password is required" })
                : value.length < 8
                    ? setErrors({ ...errors, passErr: "Password must be at least 8 characters" })
                    : setErrors({ ...errors, passErr: "" });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email) {
            setErrors((prev) => ({ ...prev, emailErr: "Email is required" }));
            return;
        }
        if (!password) {
            setErrors((prev) => ({ ...prev, passErr: "Password is required" }));
            return;
        }
        if (errors.emailErr || errors.passErr) {
            return;
        }
        let users=JSON.parse(localStorage.getItem("users"))||[];
        let user=users.find((user) => user.email === email && user.password === password)
        if (!user) {
            setErrors((prev) => ({ ...prev, emailErr: "User not found" }));
            alert("User not found");
            return;
        }
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.dispatchEvent(new Event("userChange"));
        history.push("/");
    };

    return (
        <div className="container my-5">
            <h1 className="mb-4 fw-bold text-danger">Login</h1>
            <form className="text-start" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={email}
                        name="email"
                        onChange={handleForm}
                        style={{
                            border: errors.emailErr
                                ? "1px solid red"
                                : "1px solid #ced4da",
                        }}
                    />
                    <p className="text-danger">{errors.emailErr}</p>
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>

                <div className="mb-3 position-relative">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Password
                    </label>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            id="exampleInputPassword1"
                            value={password}
                            name="password"
                            onChange={handleForm}
                            style={{
                                border: errors.passErr
                                    ? "1px solid red"
                                    : "1px solid #ced4da",
                            }}
                        />
                        <span
                            className="input-group-text"
                            style={{ cursor: "pointer" }}
                            onClick={handleHidePassword}
                        >
                            <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                        </span>
                    </div>
                    <p className="text-danger">{errors.passErr}</p>
                </div>

                <button
                    type="submit"
                    className={
                        "btn btn-primary" +
                        (errors.emailErr || errors.passErr ? " disabled" : "")
                    }
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default LoginForm;
