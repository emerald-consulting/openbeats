import { useState, useEffect } from "react";
import axios from "axios";
import TextArea from "../components/TextArea";
import Card from "../components/Card";

const baseURL = "http://localhost:8000/posts/";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [isTextAreaShown, setTextAreaShown] = useState(false);

  const handleTextArea = (e) => {
    e.preventDefault();
    setTextAreaShown(true); 
  };

  useEffect(() => {
    axios.get(`${baseURL}`).then((r) => setPosts([...r.data]));
  }, [setPosts]);

  return (
    <>
      <div>
        <div className="md:pl-64 flex flex-col flex-1">
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Feed</h1>
                <br />
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  onClick={handleTextArea}
                >
                  New Post
                </button>
                <br />
                {isTextAreaShown && <TextArea />}
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                <div className="py-4">
                  {/* Correct order */}
                  {posts.reverse().map((post) => (
                    <Card key={post.id.toString()} {...post} />
                  ))}
                </div>
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
