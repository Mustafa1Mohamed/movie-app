import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        axios
            .get(
                `https://api.themoviedb.org/3/movie/${id}?api_key=29cf44b93ca83bf48d9356395476f7ad&append_to_response=credits,videos`
            )
            .then((response) => setMovie(response.data))
            .catch((err) => console.log(err));
    }, [id]);

    if (!movie) return <h2 className="text-center mt-5">Loading...</h2>;

    return (
        <div className="container mt-5">
            <div className="row g-4">
          
                <div className="col-md-4">
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.title}
                        className="img-fluid rounded shadow"
                    />
                </div>

      
                <div className="col-md-8 ">
                    <h2 className="fw-bold">{movie.title}</h2>
                    
                    <p className="lead">{movie.overview}</p>

                    <div className="mb-3">
                        <strong>Genres: </strong>
                        {movie.genres.map((g) => (
                            <span key={g.id} className="badge bg-primary me-2">
                                {g.name}
                            </span>
                        ))}
                    </div>

                    <div className="mb-3">
                        <strong>Cast: </strong>
                        {movie.credits.cast.slice(0, 5).map((actor) => (
                            <span key={actor.id} className="badge bg-secondary me-2">
                                {actor.name}
                            </span>
                        ))}
                    </div>

                    <a
                        href={`https://www.themoviedb.org/movie/${movie.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-danger mt-3"
                    >
                        View on TMDB
                    </a>
                </div>
            </div>

      
            {movie.videos.results.length > 0 && (
                <div className="my-5">
                    <h3 className="fw-bold mb-3">Trailer</h3>
                    <div className="ratio ratio-16x9">
                        <iframe
                            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
                            title="Movie Trailer"
                            allowFullScreen
                            
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
}
