import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-slate-300 m-[3rem] p-10  rounded-2xl flex justify-center ">
      <div className="flex flex-col justify-center">
        <h1 className="font-bold text-center my-3 text-xl">About My Blog</h1>
        <h3 className="my-3">
          This Blog App has been created by{" "}
          <Link to="https://linkedin.com/in/rahulkumarpahwa">
            <b className="underline"> Rahul Kumar</b>
          </Link>{" "}
          as a part of learning <b> Full Stack development using MERN</b> and
          designed using the <b>TailwindCSS</b>.
        </h3>

        <h2 className="my-3 font-bold">This App has following features :</h2>
        <ul className="list-disc ">
          <li>User can create a new post.</li>
          <li>User can edit the post after verifying the user.</li>
          <li>User can view the post.</li>
          <li>User can Register, Login and Logout.</li>
          <li>User can upload pictures to post.</li>
          <li>User can go to About page to know more about the app.</li>
        </ul>
        <h2 className="my-3 font-bold">Technologies used :</h2>
        <ul className="list-disc">
          <li>React.js</li>
          <li>React Context</li>
          <li>Node.js</li>
          <li>Express</li>
          <li>Mongoose</li>
          <li>Multer</li>
          <li>Bycrypt</li>
          <li>JWT</li>
          <li>Parcel</li>
          <li>Fetch()</li>
          <li>JavaScript</li>
          <li>JSX</li>
          <li>TailwindCSS</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
