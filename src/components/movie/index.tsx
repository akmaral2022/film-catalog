import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import movieStore from "../../store/movies";
import { MovieDetails } from "../../types/movie";
import "./style.css";
import { log } from "util";

export const MovieInfo = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetails | null>(null);

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }
    const fetchMovieDetails = async () => {
      const movieDetails = await movieStore.getMovieDetails(id);
      setMovie(movieDetails);
      console.log(movieDetails.description);

    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie">
      <h2>{movie.name || movie.alternativeName}</h2>
      <div>
        {movie.poster?.url ? (
          <img src={movie.poster.url} alt={movie.name} width="200px" />
        ) : (
          <div className="unavailable">
            <img width="40" height="40" src="https://img.icons8.com/ios-filled/50/FFFFFF/poster.png" alt="poster" />
          </div>
        )}
      </div>
      <div className="info">
        <p>{movie.description}</p>
        <p>Рейтинг IMDB: {movie.rating.imdb}</p>
        <p>Дата выхода: {movie.year}</p>
        <div className="genre">Жанры:
          {movie.genres.map((genre, index) => (
            <div key={index}> {genre.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
