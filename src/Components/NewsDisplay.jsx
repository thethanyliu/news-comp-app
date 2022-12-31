const NewsDisplay = (props) => {
  return (
    <a href={props.url} target="_blank">
      <div className="transition ease-in-out delay-100 hover:scale-105 flex flex-col my-5 rounded-md drop-shadow-lg">
        <div className="justify-center pb-3">
          <img
            src={props.image}
            alt={props.title + " image"}
            className="rounded-md"
            width="1000"
            height="400"
          />
        </div>
        <div className="pb-1">
          <span className="font-semibold">Title: </span>
          {props.title}
        </div>
        <div>
          <span className="font-semibold">Description: </span>
          {props.description}...
        </div>
      </div>
    </a>
  );
};

export default NewsDisplay;
