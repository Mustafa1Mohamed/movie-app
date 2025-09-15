import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { FaHeart, FaRegHeart, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleFav } from "../Store/actions/FavAction";
import { getMovies as getMoviesAction } from '../Store/actions/GetMoviesAction'
import { useContext } from "react";
import { LanguageContext } from "../context/langContext.jsx";
import "./home.css";

export default function Home() {
    // Get the current language from context
    const { lang } = useContext(LanguageContext);
    console.log("Current language:", lang);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 220;

    const dispatch = useDispatch();
    const movies = useSelector((state) => state.moviesReducer.movies);
    const favorites = useSelector((state) => state.FavReducers.favorites);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("query") || "";
    useEffect(() => {
        dispatch(getMoviesAction(searchQuery, currentPage, lang));
    }, [dispatch, searchQuery, currentPage, lang]);

    return (
        <>
                <div className="btn-danger btn border" dir={lang === "ar" ? "rtl" : "ltr"}>
                    <h3>{lang === "ar" ? "أفضل الأفلام التي يمكنك العثور عليها هنا" : "The Best Movies You Can Find Are Here"}</h3>
                </div>

            <div dir={lang === "ar" ? "ltr" : "rtl"} className="Container d-flex flex-wrap justify-content-center mt-5">
                {movies.map((movie) => (
                    <div
                        className="card d-flex flex-column bg-dark text-light shadow myMovie"
                        style={{ width: "18rem", margin: "10px" }}
                        key={movie.id}
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            className="card-img-top"
                            alt={movie.title}
                        />
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">{movie.title}</h5>
                            <p
                                className="card-text flex-grow-1"
                                style={{ maxHeight: "100px", overflow: "hidden",color:"black"}}
                            >
                                {movie.overview}
                            </p>

                            <div className="mt-auto d-flex justify-content-between align-items-center">
                                <Link to={`/movie/${movie.id}`} className="btn btn-outline-danger">
                                    {lang === "ar" ? "تفاصيل الفيلم" : "Movie Details"}
                                </Link>
                                <span
                                    style={{ cursor: "pointer", fontSize: "1.5rem" }}
                                    onClick={() => dispatch(toggleFav(movie))}
                                >
                                    {favorites.find((fav) => fav.id === movie.id) ? (
                                        <FaHeart color="red" />
                                    ) : (
                                        <FaRegHeart color="black" />
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Pagination */}
                <div className="container m-5">
                    <div className="text-center">
                        <span
                            className="p-2 leftArrow"
                            style={{
                                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                                border: "1px solid black",
                                borderRadius: "20%",
                                padding: "5px",
                            }}
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        >
                            <FaArrowLeft color="black" />
                        </span>

                        <span className="mx-3">
                            {currentPage}/{totalPages}
                        </span>

                        <span
                            className="p-2 rightArrow"
                            style={{
                                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                                border: "1px solid black",
                                borderRadius: "20%",
                                padding: "5px",
                            }}
                            onClick={() =>
                                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                            }
                        >
                            <FaArrowRight color="black" />
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
