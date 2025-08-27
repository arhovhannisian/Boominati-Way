import "./index.css"
import Header from "./Components/Header/header.jsx";
import Footer from "./Components/Footer/footer.jsx";
import React from "react";
import Pages from "./Pages/pages.jsx";
function App() {
    const token = localStorage.getItem("token");
  return (
    <>
                {
                    token && <Header/>
                }
                <Pages/>
        
            <Footer />
    </>


  )
}

export default App
