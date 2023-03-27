import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import InfoForm from "./Pages/InfoForm";
import MainDisplay from "./Pages/MainDisplay";

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
