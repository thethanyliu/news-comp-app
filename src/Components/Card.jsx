const Card = (props) => {
  return (
    <div className="transition ease-in-out delay-120 flex flex-col bg-[#d4d4dd] rounded-md drop-shadow-2xl max-w-[450px] hover:scale-105 lg:mx-8 xl:mx-20 py-10 md:py-20">
      <div className="flex justify-center text-md">
        {props.text}
      </div>
      <div className="flex justify-center text-4xl font-semibold text-[#6e65e9]">
        {props.num}
      </div>
      <div>
        <h1 className="text-center text-xl text-gray-800 font-semibold pt-3">
          {props.desc}
        </h1>
      </div>
    </div>
  );
};

export default Card;
