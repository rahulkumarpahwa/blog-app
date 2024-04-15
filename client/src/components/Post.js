import { format } from "date-fns";

const Post = ({ item }) => {
  return (
    <div className="flex justify-center items-center my-4">
      {/* {console.log(item)} */}
      <div className="w-full mx-2 px-2">
        <h2 className="font-bold text-6xl my-4">{item.title}</h2>
        <p className="text-slate-400 font-bold text-sm">
          <span className="mr-3 text-black">
            {item.user.length != 0
              ? item.user[0].username.toUpperCase()
              : "Default".toUpperCase()}
          </span>{" "}
          <span>{format(new Date(item.createdAt), "d, MMM, yyyy HH:mm")}</span>
        </p>
        <p className="text-xl my-2 leading-8">{item.summary}</p>
      </div>
      <div className="w-full">
        <img src={"http://localhost:4000/" + item.image} />
      </div>
    </div>
  );
};
export default Post;
