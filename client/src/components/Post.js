const Post = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full mx-2 px-2">
        {" "}
        <h2 className="font-bold text-6xl my-4">
          Asus’ new OLED laptops run on the latest AI-capable chips
        </h2>{" "}
        <p className="text-slate-400 font-bold text-sm">
          <span className="mr-3 text-black">Akshay Saini</span>{" "}
          <span>28-12-2024 18:56</span>
        </p>
        <p className="text-xl my-2 leading-8">
          Asus has released two new laptop models: the Asus Vivobook S series
          and the Zenbook 14 OLED (UM3406). Along with offering OLED displays,
          the laptops run on some of the latest AMD and Intel processors.
        </p>
      </div>
      <div className="w-full">
        <img src="https://duet-cdn.vox-cdn.com/thumbor/0x0:716x494/640x427/filters:focal(358x247:359x248):format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/25382124/15d62808_a443_4763_9814_04f274be045f.png" />
      </div>
    </div>
  );
};
export default Post;
