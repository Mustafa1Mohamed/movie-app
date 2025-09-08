import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { ImHeartBroken } from "react-icons/im";
import { toggleFav } from "../Store/actions/FavAction";

export default function FavMovies() {
    const favorites = useSelector((state) => state.FavReducers.favorites);
    const dispatch = useDispatch();
    if (favorites.length === 0) {
        return (
            <div className="container text-center mt-5">
                <h2 >No favorite movies yet <ImHeartBroken color="red"/></h2>
                <Link to="/" className="btn btn-danger mt-3">
                    Back to Movies
                </Link>
            </div>
        );
    }
    return (
        <div className="container my-5">
            <h1 className="mb-4 fw-bold text-danger">Favorite Movies</h1>
            <div className="row g-4">
                {favorites.map((movie) => (
                    <div className="col-md-3 col-sm-6" key={movie.id}>
                        <div className="card bg-dark text-light shadow-lg h-100 border-0">
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                className="card-img-top"
                                alt={movie.title}
                                style={{ borderTopLeftRadius: "0.75rem", borderTopRightRadius: "0.75rem" }}
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title fw-bold">{movie.title}</h5>
                                <p className="card-text text-truncate">{movie.overview}</p>

                                <div className="mt-auto d-flex justify-content-between align-items-center">
                                    <Link to={`/movie/${movie.id}`} className="btn btn-sm btn-danger">
                                        Details
                                    </Link>
                                    <button className="btn btn-sm btn-outline-danger">
                                        <FaTrash onClick={() => dispatch(toggleFav(movie))} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
