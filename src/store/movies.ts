import { makeAutoObservable } from "mobx";
import { Movie, MovieDetails } from "../types/movie";
import axios from "axios";

class MovieStore {
  catalog: Movie[] = [];
  page = 1;
  totalPages = 0;
  genres: string[] = [];
  releaseYears: number[] = [];
  ratingRange: [number, number] = [1, 10];
  apiKey = "S0N1GH5-AEBMHYR-QET5QPS-FYMPQHZ";

  constructor() {
    makeAutoObservable(this);
  }

  fetchMovies = async (page: number) => {
    try {
      let params: Record<string, any> = {
        limit: 50,
        page: page,
      };

      if (this.genres.length > 0) {
        params['genres.name'] = this.genres.join(',');
      }

      if (this.releaseYears.length === 2) {
        params['year'] = `${this.releaseYears[0]}-${this.releaseYears[1]}`;
      }

      if (this.ratingRange[0] !== 0 || this.ratingRange[1] !== 10) {
        params['rating.imdb'] = `${this.ratingRange[0]}-${this.ratingRange[1]}`
      }

      const response = await axios.get<{ docs: Movie[]; total: number }>(
        "https://api.kinopoisk.dev/v1.4/movie",
        {
          headers: {
            "X-API-KEY": this.apiKey,
          },
          params: params,
        }
      );

      if (response.data && response.data.docs) {
        this.catalog = response.data.docs;
        this.totalPages = Math.ceil(response.data.total / 50);
      } else {
        console.error("Error fetching movies:", response.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  setPage = (page: number) => {
    this.page = page;
  };

  setGenres = (genres: string[]) => {
    this.genres = genres;
  };

  setReleaseYears = (years: number[]) => {
    this.releaseYears = years;
  };

  setRatingRange = (range: [number, number]) => {
    this.ratingRange = range
  }

  getMovieDetails = async (id: string): Promise<MovieDetails> => {
    try {
      const response = await axios.get<MovieDetails>(`https://api.kinopoisk.dev/v1.4/movie/${id}`,
        {
          headers: {
            'X-API-KEY': this.apiKey
          }
        }
      );
      return response.data;
    } catch (e) {
      console.error(e);
      throw new Error('Error fetching movie details');
    }
  };
}

export default new MovieStore();
