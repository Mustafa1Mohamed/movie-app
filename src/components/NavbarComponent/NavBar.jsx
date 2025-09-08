import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { LanguageContext } from "../../context/langContext.jsx";
import "./NavBar.css";

export default function NavBar() {
    const { lang, setLang } = useContext(LanguageContext);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
    const favorites = useSelector((state) => state.FavReducers.favorites) || [];
    const [search, setSearch] = useState("");
    const history = useHistory();

    useEffect(() => {
        const handleStorageChange = () => {
            setUser(JSON.parse(localStorage.getItem("currentUser")));
        };
        window.addEventListener("userChange", handleStorageChange);
        return () => window.removeEventListener("userChange", handleStorageChange);
    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (search.trim() !== "") {
            history.push(`/?query=${encodeURIComponent(search)}`);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        window.dispatchEvent(new Event("userChange"));
        history.push("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
            <div className="container-fluid">
                {/* Brand */}
                <div className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-3">
                    <span>{lang === "ar" ? " أفلام" : " Movies"}</span>
                    <span>{lang === "ar" ? "المفضلة" : "Favourites"}</span>
                </div>

                {/* Search */}
                <form className="d-flex ms-lg-3 mt-3 mt-lg-0" onSubmit={handleSearchSubmit}>
                    <input
                        className="form-control me-2 rounded-pill px-3"
                        type="search"
                        placeholder={lang === "ar" ? "ابحث عن الأفلام..." : "Search movies..."}
                        aria-label="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="btn btn-outline-danger rounded-pill px-4 fw-semibold" type="submit">
                        {lang === "ar" ? "بحث" : "Search"}
                    </button>
                </form>

                {/* Toggler */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto gap-3 align-items-center">
                        <li className="nav-item">
                            <NavLink exact to="/" className="nav-link fw-semibold" activeClassName="active">
                                {lang === "ar" ? "الرئيسية" : "Home"}
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to={user ? "/favourites" : "/login"}
                                className="nav-link fw-semibold d-flex align-items-center gap-2"
                                activeClassName={user ? "active" : ""}
                            >
                                {lang === "ar" ? "المفضلة" : "Favourites"}
                                {favorites.length > 0 && (
                                    <span className="badge rounded-pill">{favorites.length}</span>
                                )}
                            </NavLink>
                        </li>

                        {!user ? (
                            <>
                                <li className="nav-item">
                                    <NavLink className="btn btn-outline-danger px-3 fw-semibold" to="/register">
                                        {lang === "ar" ? "إنشاء حساب" : "Sign Up"}
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="btn btn-outline-danger px-3 fw-semibold" to="/login">
                                        {lang === "ar" ? "تسجيل الدخول" : "Sign In"}
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <button
                                    className="btn btn-outline-light px-3 fw-semibold"
                                    onClick={handleLogout}
                                >
                                    {lang === "ar" ? "تسجيل الخروج" : "Logout"}
                                </button>
                            </li>
                        )}

                        {/* Lang Toggle */}
                        <li className="nav-item">
                            <button
                                className="btn btn-outline-light px-3 fw-semibold"
                                onClick={() => setLang(lang === "en" ? "ar" : "en")}
                            >
                                {lang === "ar" ? "English" : "عربي"}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
