import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, FRONTEND_URL } from "../env";
import UserData from "../components/UserData";

export default function Settings() {
  const [userData, setUserData] = useState({});

  const patchUserData = (dataName, value) =>
    axios
      .patch(`${BASE_URL}users/${userData.userId}/${dataName}/${value}`)
      .catch((e) => console.log(e));

      const patchPicture = (url) =>
      axios
        .patch(`${BASE_URL}users/${userData.userId}/picture`, {'picture': url})
        .catch((e) => console.log(e));

  const onSetFileUrl = async (e) => {
    const fileUploadForm = new FormData();
    fileUploadForm.append("file", e.target.files[0]);
    axios
      .post(BASE_URL + "files/upload", fileUploadForm, {})
      .then(function (response) {
        setUserData(prevState => ({...prevState, picture: response.data.fileId}))
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(FRONTEND_URL + "api/auth/me")
      .then((res) => res.data.sub.split("|")[1])
      .then((id) =>
        axios.get(BASE_URL + "users/" + id).then((res) => {
          const user = new UserData(id, res.data);
          setUserData(user);
        })
      );
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (userData.lastName) patchUserData("lastName", userData.lastName);
    if (userData.firstName) patchUserData("firstName", userData.firstName);
    if (userData.genre) patchUserData("genre", userData.genre);
    if (userData.age) patchUserData("age", userData.age);
    if (userData.bio) patchUserData("bio", userData.bio);
    if (userData.picture) patchPicture(userData.picture);
  };

  return (
    <div>
      <form>
        <h2 className="text-lg leading-6 font-medium text-gray-900">Profile</h2>
        <label className="block text-sm font-medium text-gray-700">
          Profile Picture
        </label>
        <input type="file" name="file" onChange={onSetFileUrl} />
        <p className="mt-1 text-sm text-gray-500">
          This information will be displayed publicly so be careful what you
          share.
        </p>

        <label className="block text-sm font-medium text-gray-700">Bio</label>
        <textarea
          onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
          className="mt-1 shadow-sm focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
          value={userData.bio || ""}
        />
        <p className="mt-2 text-sm text-gray-500">
          Brief description for your profile. URLs are hyperlinked.
        </p>

        <label className="block text-sm font-medium text-gray-700">
          First name
        </label>
        <input
          onChange={(e) =>
            setUserData({ ...userData, firstName: e.target.value })
          }
          type="text"
          value={userData.firstName || ""}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
        />
        <label
          htmlFor="last-name"
          className="block text-sm font-medium text-gray-700"
        >
          Last name
        </label>
        <input
          onChange={(e) =>
            setUserData({ ...userData, lastName: e.target.value })
          }
          type="text"
          value={userData.lastName || ""}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
        />

        <label className="block text-sm font-medium text-gray-700">Genre</label>
        <input
          onChange={(e) => setUserData({ ...userData, genre: e.target.value })}
          value={userData.genre || ""}
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
        />

        <label className="block text-sm font-medium text-gray-700">Age</label>
        <input
          onChange={(e) => setUserData({ ...userData, age: e.target.value })}
          value={userData.age || ""}
          type="number"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
        />
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
