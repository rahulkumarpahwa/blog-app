import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const Edit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [files, setFiles] = useState();
  const [content, setContent] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    const data = await fetch(`http://localhost:4000/post/${id}`);
    const json = await data.json();
    // console.log(json);
    setTitle(json.title);
    setSummary(json.summary);
    setContent(json.content);
  };

  const updatePost = async (e) => {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files);
    data.set("id", id);

    if (title === "" || summary === "" || content === "") {
      e.preventDefault();
    } else {
      console.log(files);
      const response = await fetch(`http://localhost:4000/post`, {
        method: "PUT",
        body: data,
        credentials: "include",
      });

      if (response.ok) {
        // alert("Post created Successfully");
        setRedirect(true);
      } else {
        alert("Something get wrong. Try again!");
      }
    }
  };

  // console.log(id);

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <div>
      <form className="flex flex-col mx-20" onSubmit={updatePost}>
        <input
          type="title"
          className="border-2 my-2 mt-8 rounded-sm border-slate-400 p-1"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="summary"
          className="border-2 my-2 rounded-sm border-slate-400 p-1"
          placeholder="Summary"
          value={summary}
          onChange={(e) => {
            setSummary(e.target.value);
          }}
        />
        <input
          type="file"
          className="border-2 my-2 rounded-sm p-1 border-slate-400"
          onChange={(e) => {
            setFiles(e.target.files[0]);
          }}
        />
        <ReactQuill
          theme="snow"
          className="border my-2 border-slate-400 rounded-sm"
          value={content}
          modules={modules}
          formats={formats}
          onChange={(newValue) => setContent(newValue)}
          placeholder="Start Writing Here!"
        />
        <button className="border-2 my-2 bg-gray-400 text-center font-bold text-white hover:bg-black  rounded-lg px-2 py-1">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default Edit;
