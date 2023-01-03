import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import NewsDisplayExample from "./NewsDisplayExample";
import LoadingScreen from "./LoadingScreen";
import Card from "./Card"
import { options } from "./Options";

const InfoForm = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [sourceOne, setSourceOne] = useState("");
  const [sourceTwo, setSourceTwo] = useState("");
  const [missingValues, setMissingValues] = useState(0);
  const [exampleContentOne, setExampleContentOne] = useState([]);
  const [exampleContentTwo, setExampleContentTwo] = useState([]);
  const [textLengthDesc, setTextLengthDesc] = useState(0);

  useEffect(() => {
    window.sessionStorage.setItem("topic", JSON.stringify(topic));
    window.sessionStorage.setItem("S1", JSON.stringify(sourceOne));
    window.sessionStorage.setItem("S2", JSON.stringify(sourceTwo));
  }, [topic, sourceOne, sourceTwo]);

  const getData = async () => {
    try {
      const dataOne = await axios
        .get(
          `https://newsapi.org/v2/everything?q=midterms&domains=cnn.com&language=en&sortBy=popularity&apiKey=${import.meta.env.VITE_API_KEY}`
        )
        .then((firstResponse) => {
          setExampleContentOne(firstResponse.data.articles);
        });
      const dataTwo = await axios
        .get(
          `https://newsapi.org/v2/everything?q=midterms&domains=foxnews.com&language=en&sortBy=popularity&apiKey=${import.meta.env.VITE_API_KEY}`
        )
        .then((secondResponse) => {
          setExampleContentTwo(secondResponse.data.articles);
        });
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  const setDescLength = () => {
    if (window.innerWidth > 1440) {
      setTextLengthDesc(150);
    } else if (window.innerWidth > 768) {
      setTextLengthDesc(100);
    } else {
      setTextLengthDesc(50)
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setDescLength();
  }, [window.innerWidth]);

  const titleChangeHandler = (e) => {
    setTopic(e.target.value);
    setMissingValues(0);
  };

  const handleChangeS1 = (e) => {
    setSourceOne(e.target.value);
    setMissingValues(0);
  };

  const handleChangeS2 = (e) => {
    setSourceTwo(e.target.value);
    setMissingValues(0);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      topic.trim().length !== 0 &&
      sourceOne.trim().length !== 0 &&
      sourceTwo.trim().length !== 0
    ) {
      navigate("/sources");
      return;
    }
    setMissingValues(1);
  };

  return (
    <>
      {loading ? (
        <div className="flex flex-col text-xl">
          <div className="bg-[#2B3A55] grid md:grid-cols-2 w-full px-0 md:px-20 lg:px-36 xl:px-48 pt-20 lg:pt-24 pb-16 rounded-lg">
            <div className="items-start my-auto hidden md:flex md:pl-8">
              <span className="font-bold text-slate-100 text-4xl lg:text-5xl">
                Comparing Media Sources Made Simple
              </span>
            </div>
            <div className="transition ease-in-out delay-100 hover:bg-[#82a7bb] bg-[#eb8383] shadow-lg px-5 mx-5 md:mx-10 py-8 md:my-auto rounded-md">
              <form onSubmit={submitHandler} className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <label className="text-sm uppercase pb-1 text-slate-100">
                    Search Topic
                  </label>
                  <input
                    type="text"
                    value={topic}
                    placeholder="eg: US Politics"
                    onChange={titleChangeHandler}
                    className="pb-1 pl-1 w-full border border-black rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm uppercase text-slate-100">
                    Select A News Source
                  </label>
                  <select
                    className="border border-black rounded-md"
                    value={sourceOne}
                    onChange={handleChangeS1}
                  >
                    <option disabled={true} value="">
                      <span className="text-gray-500">Select</span>
                    </option>
                    {options
                      .filter((element) => element.value !== sourceTwo)
                      .map((element) => (
                        <option value={element.value}>{element.label}</option>
                      ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm uppercase text-slate-100">
                    Select Another Source
                  </label>
                  <select
                    className="border border-black rounded-md"
                    value={sourceTwo}
                    onChange={handleChangeS2}
                  >
                    <option disabled={true} value="">
                      <span className="text-gray-500">Select</span>
                    </option>
                    {options
                      .filter((element) => element.value !== sourceOne)
                      .map((element) => (
                        <option value={element.value}>{element.label}</option>
                      ))}
                  </select>
                </div>
                <div>
                  <button
                    type="submit"
                    className="transition ease-in-out delay-100 hover:scale-105 uppercase tracking-wider mt-2 px-5 py-2 justify-center items-center border text-slate-100 border-slate-600"
                  >
                    View Results
                  </button>
                </div>
              </form>
              <div
                className={missingValues === 1 ? "pt-2 text-red-600" : "hidden"}
              >
                Please Fill All Out All Fields.
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 py-10 px-5 md:px-24 lg:px-56 xl:px-80 gap-5 mt-5">
            <Card text="Choose from" num="10+" desc="Sources" />
            <Card text="Instantly view" num="100+" desc="Articles" />
          </div>
          <div className="px-5 md:px-20 lg:px-36 text-3xl font-semibold pt-10">
            Example Topic: Midterm Elections
          </div>
          <div className="grid grid-cols-2 px-5 md:px-20 lg:px-36">
            <div className="pr-3 md:pr-5">
              {exampleContentOne
                .slice(0, Math.min(3, exampleContentOne.length))
                .map((article) => (
                  <NewsDisplayExample
                    image={article.urlToImage}
                    title={article.title}
                    source={article.source.name}
                    url={article.url}
                    description={article.description.substring(0, textLengthDesc)}
                  />
                ))}
            </div>
            <div className="pl-3 md:pl-5">
              {exampleContentTwo
                .slice(0, Math.min(3, exampleContentTwo.length))
                .map((article) => (
                  <NewsDisplayExample
                    image={article.urlToImage}
                    title={article.title}
                    source={article.source.name}
                    url={article.url}
                    description={article.description.substring(0, textLengthDesc)}
                  />
                ))}
            </div>
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default InfoForm;
