export interface Movie {
  id: number;
  name: string;
  enName: string;
  alternativeName: string;
  year: number;
  poster: {
    url: string;
  };
  rating: {
    kp: number,
    imdb: number,
    tmdb: number,
    filmCritics: number,
    russianFilmCritics: number,
    await: number,
  }
  genres: { name: string }[]
}

export interface MovieDetails {
  id: number;
  name: string;
  enName: string;
  alternativeName: string;
  year: number;
  description: string,
  poster: {
    url: string;
  };
  rating: {
    kp: number,
    imdb: number,
    tmdb: number,
    filmCritics: number,
    russianFilmCritics: number,
    await: number,
  }
  genres: { name: string }[]
}