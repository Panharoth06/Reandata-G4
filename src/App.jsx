import { useState } from "react";
import { useEffect } from "react";
import { Button } from "flowbite-react";
import "./App.css";
import About from "./pages/About";
import Navbar from "./components/NavbarComponent";
import Footer from "./components/Footer";
import NavbarComponent from "./components/NavbarComponent";
import HelpAndSupport from "./pages/HelpAndSupport";
import Line from "./pages/Line";
import BarChart from "./pages/BarChart";
import Histogram from "./pages/Histogram";
import Pie from "./pages/Pie";
import ScatterPlot from "./pages/Scatterplot";
import BubbleChart from "./pages/BubbleChart";
import AreaChart from "./pages/AreaChart";
import Doughnut from "./pages/Doughtnut";
import CollumChart from "./pages/ColunmChart";
import SpiderChart from "./pages/SpiderChart";
import Stacked from "./pages/Stacked";
import Gauges from "./pages/Gauges";

function App() {
  const [count, setCount] = useState(0);
  // useEffect(() => {
  //   const handleWheel = (event) => {
  //     if (event.ctrlKey) return; // Allow zooming with Ctrl + Scroll

  //     event.preventDefault();
  //     window.scrollBy({
  //       top: event.deltaY > 0 ? 300 : -300, // Faster scrolling
  //       behavior: "smooth",
  //     });
  //   };

  //   window.addEventListener("wheel", handleWheel, { passive: false });

  //   return () => window.removeEventListener("wheel", handleWheel);
  // }, []);

  return (
    <>
      <NavbarComponent />
      <main className="pt[60px]">
        <h1 className="text-5xl text-blue-400 text-center py-4 uppercase rounded-lg h-screen"></h1>
        <HelpAndSupport />
        <Line />
        <BarChart />
        <Histogram />
        <Pie />
        <ScatterPlot />
        <BubbleChart />
        <AreaChart />
        <Doughnut />
        <SpiderChart />
      </main>
      <CollumChart />
      <Stacked />
      <Gauges/>
      <Footer />
    </>
  );
}

export default App;
