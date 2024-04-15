import { useEffect, useState } from "react";
import PostContainer from "./PostContainer";
const Body = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    const data = await fetch("http://localhost:4000/post");
    const json = await data.json();
    // console.log(json);
    setPosts(json);
  };

  return (
    <div className="mt-10 mx-10">
      <PostContainer data={posts} />
    </div>
  );
};

export default Body;
