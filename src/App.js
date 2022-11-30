import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const onFetchMovies = () => {
    setLoading(true);
    axios
      .get("https://localhost:7108/api/movies")
      .then(response => {
        setMovies(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    onFetchMovies();
  }, []);

  return (
    <div className="bg-dark app">
      <div className="d-flex container gap-4 py-4">
        {loading && <div className="text-white">Cargando...</div>}
        {movies &&
          !loading &&
          movies?.length > 0 &&
          movies?.map(movie => (
            <div className="card w-25" key={movie.id}>
              <img src={movie.imagePath} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{movie.name}</h5>
                <p className="card-text">
                  Valoracion:{" "}
                  <span className="fw-normal">
                    {movie.valoration}
                    <span>⭐</span>
                  </span>
                </p>
                <div className="d-flex w-100 align-items-end flex-column">
                  <a
                    className="btn btn-danger"
                    href={`https://localhost:7108/api/movies/${movie.id}/pdf/download`}
                    target="_blank"
                  >
                    Descargar PDF
                  </a>
                  <a
                    className="btn btn-success mt-2"
                    href={`https://localhost:7108/api/movies/${movie.id}/excel/download`}
                    target="_blank"
                  >
                    Descargar EXCEL
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
