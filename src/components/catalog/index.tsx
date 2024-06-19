import { useEffect, useState } from "react";
import "./style.css";
import { Movie } from "../../types/movie";
import { Checkbox, DatePicker, Form, Slider } from "antd";
import movieStore from "../../store/movies";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

export const Catalog = observer(() => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedYears, setSelectedYear] = useState<number[]>([])
  const [selectedRating, setSelectedRating] = useState<[number, number]>([0, 10])
  const { RangePicker } = DatePicker;

  useEffect(() => {
    movieStore.fetchMovies(movieStore.page);
  }, [movieStore.page,
  movieStore.genres,
  movieStore.releaseYears,
  movieStore.ratingRange]);

  const handlePrevPage = () => {
    if (movieStore.page > 1) {
      movieStore.setPage(movieStore.page - 1);
    }
  };

  const handleNextPage = () => {
    if (movieStore.page < movieStore.totalPages) {
      movieStore.setPage(movieStore.page + 1);
    }
  };

  const handleGenreChange = (genre: string, checked: boolean) => {
    const updatedGenres = checked
      ? [...selectedGenres, genre]
      : selectedGenres.filter(g => g !== genre);

    setSelectedGenres(updatedGenres);
    movieStore.setGenres(updatedGenres);
    console.log(updatedGenres);
  };

  const handleYearChange = (dates: any, datesString: [string, string]) => {
    if (datesString[0] && datesString[1]) {
      const years = [parseInt(datesString[0]), parseInt(datesString[1])];
      setSelectedYear(years);
      movieStore.setReleaseYears(selectedYears);
    } else {
      setSelectedYear([]);
      movieStore.setReleaseYears([]);
    }
  }

  const handleRatingChange = (range: number[]) => {
    setSelectedRating([range[0], range[1]]);
    movieStore.setRatingRange([range[0], range[1]]);
  };

  const genres = [
    'аниме', 'биографический', 'боевик', 'вестерн', 'военный', 'детектив', 'детский',
    'документальный', 'драма', 'исторический', 'кинокомикс', 'комедия', 'концерт',
    'короткометражный', 'криминал', 'мелодрама', 'мистика', 'музыка', 'мультфильм',
    'мюзикл', 'научный', 'нуар', 'приключения', 'реалити-шоу', 'семейный', 'спорт',
    'ток-шоу', 'триллер', 'ужасы', 'фантастика', 'фэнтези'
  ];

  return (
    <div className="catalog">
      <h1>Все фильмы</h1>
      <div className="filters">
        <RangePicker
          picker="year"
          onChange={handleYearChange}
        />
        <div className="rating-range">
          <p>Определите рейтинг ↓</p>
          <Slider
            range
            min={0}
            max={10}
            step={0.1}
            defaultValue={[0, 10]}
            onChange={handleRatingChange}
          />
        </div>
        <Form>
          <div className="select-genre">
            {genres.map(genre => (
              <div className="genre-item" key={genre}>
                <Form.Item>
                  <Checkbox
                    checked={selectedGenres.includes(genre)}
                    onChange={(e) => handleGenreChange(genre, e.target.checked)}
                  >
                    {genre}
                  </Checkbox>
                </Form.Item>
              </div>
            ))}
          </div>
        </Form>
      </div>
      <ul>
        {movieStore.catalog.map((movie: Movie) => (
          <li key={movie.id}>
            <Link to={`movie-info/${movie.id}`}>
              <div className="movie-card">
                {movie.poster?.url ? (
                  <div className="poster">
                    <img width='200px' src={movie.poster.url} alt={movie.name} />
                  </div>
                ) : (
                  <div className="unavailable">
                    <img width="40" height="40" src="https://img.icons8.com/ios-filled/50/FFFFFF/poster.png" alt="poster" />
                  </div>
                )}
                <div className="movie-desc">
                  <h2>{movie.name ? movie.name : movie.alternativeName}</h2>
                  <div className="rating">
                    <p>Год выпуска: {movie.year}</p>
                    <p>Рейтинг IMDB: {movie.rating.imdb}</p>
                    <p>Оценка критиков РФ: {movie.rating.russianFilmCritics}</p>
                    <div className="genre">Жанр:
                      {movie.genres && movie.genres.map((genre: { name: string }, index: number) => (
                        <div key={index}> {genre.name}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={movieStore.page === 1}>
          Previous
        </button>
        <span>{movieStore.page} из {movieStore.totalPages}</span>
        <button onClick={handleNextPage} disabled={movieStore.page === movieStore.totalPages}>
          Next
        </button>
      </div>
    </div>
  );
});
