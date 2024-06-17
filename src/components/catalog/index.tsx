import axios from "axios";
import { useEffect, useState } from "react";
import "./style.css";

interface Movie {
  id: number;
  name: string;
  year: number;
  poster: {
    url: string;
  };
}

export const Catalog = () => {
  const [catalog, setCatalog] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const apiKey = 'S0N1GH5-AEBMHYR-QET5QPS-FYMPQHZ';

  const fetchMovies = async (page: number) => {
    try {
      const response = await axios.get('https://api.kinopoisk.dev/v1.4/movie', {
        headers: {
          'X-API-KEY': apiKey
        },
        params: {
          limit: 50,
          page: page
        }
      });

      if (response.data && response.data.docs) {
        setCatalog(response.data.docs);
        setTotalPages(Math.ceil(response.data.total / 50));
        console.log(response.data);
      } else {
        console.error('Error fetching movies:', response.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="catalog">
      <h1>Movies</h1>
      <ul>
        {catalog.map((movie: Movie) => (
          <li key={movie.id}>
            <h2>{movie.name ? movie.name : 'unavailable'}</h2>
            <p>{movie.year}</p>
            {movie.poster?.url ? (
              <div className="poster">
                <img width='200px' src={movie.poster.url} alt={movie.name} />
              </div>
            ) : (
              <div className="unavailable">
                <img width="40" height="40" src="https://img.icons8.com/ios-filled/50/FFFFFF/poster.png" alt="poster" />
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
        <span>{page} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};
