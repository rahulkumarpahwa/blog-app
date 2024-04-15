import { Link } from "react-router-dom";
import Post from "./Post";
const PostContainer = ({ data }) => {
  return (
    <div>
      {data.length != 0 &&
        data.map((item) => (
          <Link key={item._id} to={`/post/${item._id}`}>
            <Post item={item} />
          </Link>
        ))}
    </div>
  );
};

export default PostContainer;
