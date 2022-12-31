import HashLoader from "react-spinners/HashLoader";

function LoadingScreen() {
    return <div className="bg-[#3f5172] fixed flex w-screen h-screen justify-center items-center z-20"> 
        <HashLoader color={"#fff"} size={50}/>
    </div>

}

export default LoadingScreen;