import { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import NewsDisplay from "../Components/NewsDisplay";
import LoadingScreen from "../Components/LoadingScreen";
import { options } from "../Components/Options";

const MainDisplay = () => {
  const [loading, setLoading] = useState(false);
  const [loadedContentOne, setLoadedContentOne] = useState([]);
  const [loadedContentTwo, setLoadedContentTwo] = useState([]);
  const [sortByOne, setSortByOne] = useState("popularity");
  const [sortByTwo, setSortByTwo] = useState("popularity");
  const [sources, setSources] = useState({ source1: "", source2: "" });
  const [textLengthDesc, setTextLengthDesc] = useState(0);

  const [pageNumber, setPageNumber] = useState(0);
  const perPage = 15;
  const visited = perPage * pageNumber;

  let topic;
  let sourceOneSite;
  let sourceTwoSite;

  const getWebsite = (s) => {
    return options[options.findIndex((item) => item.value === s)].website;
  };

  const displayContent = (content) => {
    return content
      .slice(visited, visited + perPage)
      .map((article) => (
        <NewsDisplay
          image={article.urlToImage}
          title={article.title}
          source={article.source.name}
          url={article.url}
          description={article.description.substring(0, textLengthDesc)}
        />
      ));
  };

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
    window.scrollTo(0, 0);
  };

  const handleSortByS1 = (e) => {
    setSortByOne(e.target.value);
  };

  const handleSortByS2 = (e) => {
    setSortByTwo(e.target.value);
  };

  const getData = async () => {
    setLoading(false);
    try {
      const dataOne = await axios.get(
        `https://newsapi.org/v2/everything?q=${topic}&domains=${sourceOneSite}&language=en&sortBy=${sortByOne}&apiKey=${
          import.meta.env.VITE_API_KEY
        }`
      );
      if (!dataOne.status === "ok") {
        throw new Error(dataOne.message);
      }
      setLoadedContentOne(dataOne.data.articles);
    } catch (err) {
      console.error(err.message);
    }
    try {
      const dataTwo = await axios.get(
        `https://newsapi.org/v2/everything?q=${topic}&domains=${sourceTwoSite}&language=en&sortBy=${sortByTwo}&apiKey=${
          import.meta.env.VITE_API_KEY
        }`
      );
      if (!dataTwo.status === "ok") {
        throw new Error(dataTwo.message);
      }
      setLoadedContentTwo(dataTwo.data.articles);

      setLoading(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  const setDescLength = () => {
    if (window.innerWidth > 1440) {
      setTextLengthDesc(150);
    } else if (window.innerWidth > 768) {
      setTextLengthDesc(100);
    } else {
      setTextLengthDesc(50);
    }
  };

  useEffect(() => {
    topic = window.sessionStorage.getItem("topic");
    sourceOneSite = window.sessionStorage.getItem("S1");
    sourceTwoSite = window.sessionStorage.getItem("S2");
    if (topic && sourceOneSite && sourceTwoSite) {
      setSources({
        source1: JSON.parse(sourceOneSite),
        source2: JSON.parse(sourceTwoSite),
      });
      topic = JSON.parse(topic);
      sourceOneSite = getWebsite(JSON.parse(sourceOneSite));
      sourceTwoSite = getWebsite(JSON.parse(sourceTwoSite));
    }
  }, [sortByOne, sortByTwo]);

  useEffect(() => {
    getData();
  }, [sortByOne, sortByTwo]);

  useEffect(() => {
    setDescLength();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex flex-col pt-20">
          <div className="grid grid-cols-2 pt-10 pb-5 px-2 md:px-12 xl:px-32">
            <div className="pr-3 md:pr-5">
              <div className="text-3xl font-bold text-slate-900">
                {sources.source1}
              </div>
              <div className="pt-5">
                <label className="text-lg text-stone-900 pr-2">Sort By</label>
                <select
                  className="border border-black rounded-md"
                  value={sortByOne}
                  onChange={handleSortByS1}
                >
                  <option value="popularity">Popularity</option>
                  <option value="relevancy">Relevancy</option>
                  <option value="publishedAt">Date Published</option>
                </select>
              </div>
              {displayContent(loadedContentOne)}
            </div>

            <div className="pl-3 md:pl-5">
              <div className="text-3xl font-bold text-slate-900">
                {sources.source2}
              </div>
              <div className="pt-5">
                <label className="text-lg text-stone-900 pr-2">Sort By</label>
                <select
                  className="border border-black rounded-md"
                  value={sortByTwo}
                  onChange={handleSortByS2}
                >
                  <option value="popularity">Popularity</option>
                  <option value="relevancy">Relevancy</option>
                  <option value="publishedAt">Date Published</option>
                </select>
              </div>
              {displayContent(loadedContentTwo)}
            </div>
          </div>
          <ReactPaginate
            className="h-[40px] flex justify-center"
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            pageCount={Math.ceil(
              Math.max(loadedContentOne.length, loadedContentTwo.length) /
                perPage
            )}
            marginPagesDisplayed={0}
            previousLabel="<"
            renderOnZeroPageCount={null}
            pageLinkClassName="transition ease-in-out delay-0 hover:bg-[#9e2eff] cursor-pointer border border-black rounded-sm p-[8px] m-[5px]"
            activeLinkClassName="bg-[#9e2eff]"
            breakLinkClassName="flex"
            previousLinkClassName="transition ease-in-out delay-0 hover:bg-[#9e2eff] cursor-pointer border border-black rounded-[2px] p-[8px] m-[5px]"
            nextLinkClassName="transition ease-in-out delay-0 hover:bg-[#9e2eff] cursor-pointer border border-black rounded-sm p-[8px] m-[5px]"
          />
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default MainDisplay;
