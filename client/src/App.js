import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [dataGenre1, setDataGenre1] = useState([]);
  const [dataGenre2, setDataGenre2] = useState([]);
  const [dataGenre3, setDataGenre3] = useState([]);
  const [dataGenre4, setDataGenre4] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    director: "",
    img: "",
    genre: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5002/movies/");
        const response1 = await fetch(
          "http://localhost:5002/movies/genre/drama"
        );
        const response2 = await fetch(
          "http://localhost:5002/movies/genre/scifi"
        );
        const response3 = await fetch(
          "http://localhost:5002/movies/genre/action"
        );
        const response4 = await fetch(
          "http://localhost:5002/movies/genre/crime"
        );

        if (!response1.ok && !response.ok && !response2.ok) {
          return console.log(`HTTP error! Status: ${response.status}`);
        }
        const fetchedData1 = await response1.json();
        const fetchedData2 = await response2.json();
        const fetchedData3 = await response3.json();
        const fetchedData4 = await response4.json();

        const fetchedData = await response.json();

        setData(fetchedData);
        setDataGenre1(fetchedData1);
        setDataGenre2(fetchedData2);
        setDataGenre3(fetchedData3);
        setDataGenre4(fetchedData4);
      } catch (error) {
        console.error("Fetch error:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddMovie = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5002/movies/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.log(`HTTP error! Status: ${response.status}`);
        return;
      }

      const newMovie = await response.json();

      setData((prevData) => [...prevData, newMovie]);

      switch (formData.genre) {
        case "drama":
          setDataGenre1((prevData) => [...prevData, newMovie]);
          break;
        case "scifi":
          setDataGenre2((prevData) => [...prevData, newMovie]);
          break;
        case "action":
          setDataGenre3((prevData) => [...prevData, newMovie]);
          break;
        case "crime":
          setDataGenre4((prevData) => [...prevData, newMovie]);
          break;
        default:
          break;
      }

      setFormData({ name: "", director: "", img: "", genre: "" });
    } catch (error) {
      console.error("Add movie error:", error.message);
    }
  };

  const handleDeleteMovie = async (id) => {
    try {
      const response = await fetch(`http://localhost:5002/movies/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.log(`HTTP error! Status: ${response.status}`);
        return;
      }

      const updatedData = data.filter((movie) => movie._id !== id);
      setData(updatedData);

      const updatedDataGenre1 = dataGenre1.filter((movie) => movie._id !== id);
      setDataGenre1(updatedDataGenre1);

      const updatedDataGenre2 = dataGenre2.filter((movie) => movie._id !== id);
      setDataGenre2(updatedDataGenre2);

      const updatedDataGenre3 = dataGenre3.filter((movie) => movie._id !== id);
      setDataGenre3(updatedDataGenre3);

      const updatedDataGenre4 = dataGenre4.filter((movie) => movie._id !== id);
      setDataGenre4(updatedDataGenre4);
    } catch (error) {
      console.error("Delete movie error:", error.message);
    }
  };

  return (
    <div className="flex flex-wrap justify-center bg-slate-900 text-slate-300">
      <div className="w-full mb-4">
        <h1 className="text-6xl font-extrabold text-center">MOVIE SERVER</h1>
      </div>
      <div className="w-full text-center mb-4">
        <a href="#addMovie" className="text-blue-500 underline">
          Add Movie Shortcut
        </a>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/4 p-4  border-r-2 border-white">
        <div className="text-3xl font-bold underline mb-4">Genre: Drama</div>
        {data !== null &&
          dataGenre1.map((item, index) => (
            <div key={index} className="mb-4 p-2 border-double border-8">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg">Name: {item.name}</div>
                  <div className="text-lg">Director: {item.director}</div>
                </div>
                <button
                  onClick={() => handleDeleteMovie(item._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md text-lg"
                >
                  Delete
                </button>
              </div>
              <img src={item.img} alt={item.name} className="w-full h-auto" />
            </div>
          ))}
      </div>
      <div className="w-full md:w-1/2 lg:w-1/4 p-4 border-l-2 border-r-2 border-white">
        <div className="text-3xl font-bold underline mb-4">Genre: SciFi</div>
        {data !== null &&
          dataGenre2.map((item, index) => (
            <div key={index} className="mb-4 p-2 border-double border-8">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg">Name: {item.name}</div>
                  <div className="text-lg">Director: {item.director}</div>
                </div>
                <button
                  onClick={() => handleDeleteMovie(item._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md text-lg"
                >
                  Delete
                </button>
              </div>
              <img src={item.img} alt={item.name} className="w-full h-auto" />
            </div>
          ))}
      </div>
      <div className="w-full md:w-1/2 lg:w-1/4 p-4 border-l-2 border-r-2 border-white">
        <div className="text-3xl font-bold underline mb-4">Genre: Action</div>
        {data !== null &&
          dataGenre3.map((item, index) => (
            <div key={index} className="mb-4 p-2 border-double border-8">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg">Name: {item.name}</div>
                  <div className="text-lg">Director: {item.director}</div>
                </div>
                <button
                  onClick={() => handleDeleteMovie(item._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md text-lg"
                >
                  Delete
                </button>
              </div>
              <img src={item.img} alt={item.name} className="w-full h-auto" />
            </div>
          ))}
      </div>
      <div className="w-full md:w-1/2 lg:w-1/4 p-4 border-l-2  border-white">
        <div className="text-3xl font-bold underline mb-4">Genre: Crime</div>
        {data !== null &&
          dataGenre4.map((item, index) => (
            <div key={index} className="mb-4 p-2 border-double border-8">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg">Name: {item.name}</div>
                  <div className="text-lg">Director: {item.director}</div>
                </div>
                <button
                  onClick={() => handleDeleteMovie(item._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md text-lg"
                >
                  Delete
                </button>
              </div>
              <img src={item.img} alt={item.name} className="w-full h-auto" />
            </div>
          ))}
      </div>

      <div className="w-1/2 p-4">
        <div className="text-3xl font-bold underline mb-4 " id="addMovie">
          Add Movie
        </div>
        <form
          onSubmit={handleAddMovie}
          className="my-10 bg-gray-800 min-h-max px-2 rounded-lg"
        >
          <label className="my-2 text-xl block">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="bg-gray-600 my-2 px-3 py-2 border rounded w-full text-white"
            />
          </label>
          <label className="text-xl block">
            Director:
            <input
              type="text"
              name="director"
              value={formData.director}
              onChange={handleInputChange}
              className="bg-gray-600 my-2 px-3 py-2 border rounded w-full text-white"
            />
          </label>
          <label className="text-xl block">
            Image URL:
            <input
              type="text"
              name="img"
              value={formData.img}
              onChange={handleInputChange}
              className="bg-gray-600 my-2 px-3 py-2 border rounded w-full text-white"
            />
          </label>
          <label className="text-xl block">
            Genre:
            <select
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
              className="bg-gray-600 my-2 px-3 py-2 border rounded w-full text-white"
            >
              <option value="drama">Drama</option>
              <option value="scifi">Sci-Fi</option>
              <option value="action">Action</option>
              <option value="crime">Crime</option>
            </select>
          </label>
          <button
            type="submit"
            className="my-6 text-2xl font-bold py-1 mb-2 self-center mx-auto flex justify-center border-2 border-solid px-4 hover:border-double rounded-lg bg-cyan-900 hover:bg-cyan-800 text-slate-300 "
          >
            Add Movie
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
