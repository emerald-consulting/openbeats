import { useState, useEffect } from "react";
import axios from "axios";

export default function Settings(props) {
  const BASE_URL = "localhost:8000/api";
  const [bio, setBio] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [genre, setGenre] = useState("");
  const [age, setAge] = useState("");
  const id = "abcd";

  const onBioChange = (e) => setBio(e.target.value);
  const onFirstNameChange = (e) => setFirstName(e.target.value);
  const onLastNameChange = (e) => setLastName(e.target.value);
  const onAgeChange = (e) => setAge(e.target.value);
  const onGenreChange = (e) => setGenre(e.target.value);

  const baseURL =
    process.env.NODE_ENV == "development"
      ? "http://localhost:8000"
      : [production_backend_url];

  useEffect(() => {
    axios
      .get(baseURL + "/users/id/" + id)
      .then(function (response) {
        if (response.data.user_metadata.age) {
          setage(response.data.age);
        }
        if (response.data.user_metadata.genre) {
          setgenre(response.data.user_metadata.genre);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  /*axios.get("localhost:8000/users/id/abcd").then(function (response) {
      if (response.data.user_metadata.age) {
        setage(response.data.age);
      }
      if (response.data.user_metadata.genre) {
        setgenre(response.data.user_metadata.genre);
      }
      if (responce.data.user_metadata.bio) {
        setbio(responce.data.user_metadata.bio);
      }
      if (response.data.user_metadata.age) {
        setgenre(response.data.user_metadata.age);
      }
      setFirstName(response.data.given_name);
      setLastName(response.data.family_name);
    });*/

  const onSubmit = (e) => {
    e.preventDefault();
    if (lastName) {
      axios
        .post(`${BASE_URL}/users/lastName/${lastName}`)
        .then(function (response) {
          console.log(response);
        });
    }
    if (firstName) {
      axios
        .post(`${BASE_URL}/users/lastName/${firstName}`)
        .then(function (response) {
          console.log(response);
        });
    }

    if (genre) {
      axios
        .patch("http://localhost:8000/users/" + id + "/genre/" + genre)
        .then(function (response) {
          console.log(response);
        });
    }
    if (age) {
      axios
        .patch("http://localhost:8000/users/" + id + "/age/" + age)
        .then(function (response) {
          console.log(response);
        });
    }
    if (bio) {
      axios
        .patch("http://localhost:8000/users/" + id + "/bio/" + bio)
        .then(function (response) {
          // handle success
          console.log(response);
        });
    }
  };

  return (
    <div>
      <form>
        <div>
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Profile
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <div className="mt-1">
            <textarea
              onChange={onBioChange}
              rows={3}
              className="shadow-sm focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              value={bio}
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Brief description for your profile. URLs are hyperlinked.
          </p>
        </div>
        <div className="col-span-12 sm:col-span-6">
          <label className="block text-sm font-medium text-gray-700">
            First name
          </label>
          <input
            onChange={onFirstNameChange}
            type="text"
            value={firstName}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
          />
        </div>
        <div className="col-span-12 sm:col-span-6">
          <label
            htmlFor="last-name"
            className="block text-sm font-medium text-gray-700"
          >
            Last name
          </label>
          <input
            onChange={onLastNameChange}
            type="text"
            name="last-name"
            id="last-name"
            value={lastName}
            autoComplete="family-name"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
          />
        </div>

        <div className="col-span-12">
          <label className="block text-sm font-medium text-gray-700">
            Genre
          </label>
          <input
            onChange={onGenreChange}
            value={genre}
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
          />
        </div>

        <div className="col-span-12">
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            onChange={onAgeChange}
            value={age}
            type="number"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
          />
        </div>
      </form>
      <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
        <button
          type="button"
          className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          type="submit"
          className="ml-5 bg-sky-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
        >
          Save
        </button>
      </div>
    </div>
  );
}
