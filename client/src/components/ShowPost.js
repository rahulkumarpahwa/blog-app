import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import UserContext from "../../utils/UserContext";

const ShowPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  const { userInfo } = useContext(UserContext);
  // console.log(id);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    const data = await fetch(`http://localhost:4000/post/${id}`);
    const json = await data.json();
    console.log(json);
    setPost(json);
  };

  if (!post) return "";
  return (
    <div className="my-8 relative">
      {userInfo === post.user[0].username && (
        <Link
          to={`/edit/${id}`}
          className="absolute top-[-20] right-10 my-2 bg-gray-400 text-center font-bold text-white hover:bg-black rounded-lg px-2 py-1"
        >
          <i className="fa-solid fa-pen-to-square"></i> Edit This Post
        </Link>
      )}

      <div className="flex items-center flex-col ">
        <h2 className="font-bold text-4xl my-6 mx-4 text-center">
          {post.title}
        </h2>
        <p className="text-slate-400  mb-6  font-bold text-sm">
          <span className="mr-3 text-black">
            {post.user.length != 0
              ? post.user[0].username.toUpperCase()
              : "Default".toUpperCase()}
          </span>{" "}
          <span>{format(new Date(post.createdAt), "d, MMM, yyyy HH:mm")}</span>
        </p>
        <img className="" src={"http://localhost:4000/" + post.image} />

        <p className="text-3xl my-6 mx-4 leading-8">{post.summary}</p>
        <p
          className="text-xl my-4 mx-4 leading-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></p>
      </div>
    </div>
  );
};

export default ShowPost;
