import AdoptionProcess from "@/components/AdoptionProcess";
import Banner from "@/components/Banner";
import FeaturedPets from "@/components/FeaturedPets";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PetCareTips from "@/components/PetCareTips";
import SaveLife from "@/components/SaveLife";
import WhyAdoptPage from "@/components/WhyAdoptPage";



export default function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <FeaturedPets />
      <SaveLife />
      <WhyAdoptPage />
      <PetCareTips />
      <AdoptionProcess />
      <Footer />
    </>
  );
}
