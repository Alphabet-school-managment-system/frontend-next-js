import { Index as AboutUs } from "@/app/(home)/aboutPage";
import { Index as Features } from "@/app/(home)/featuresPage";
import { Index as Home } from "@/app/(home)/homePage";

export const Index = () => {
  return (
    <div className="max-w-7xl mx-auto !custom-scrollbar" id="home">
      <Home />
      <AboutUs />
      <Features />
    </div>
  );
};
