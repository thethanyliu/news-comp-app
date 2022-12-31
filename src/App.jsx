import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import InfoForm from "./Components/InfoForm";
import MainDisplay from "./Components/MainDisplay";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<InfoForm />} />
        <Route path="/sources" element={<MainDisplay />} />
      </Routes>
    </Layout>
  );
}

export default App;
