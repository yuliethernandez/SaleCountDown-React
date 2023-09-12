import "./App.css";
import NavigationBar from "./components/NavigationBar";
import HeroSection from "./components/HeroSection";
import SalesBanner from "./components/SalesBanner";

function App() {
  return (
    <>
      <SalesBanner />
      <NavigationBar />
      <HeroSection />
    </>
  );
}

export default App;
