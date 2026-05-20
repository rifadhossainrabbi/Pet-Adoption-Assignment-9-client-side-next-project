import Banner from '@/components/Banner';
import FeaturedPets from '@/components/FeaturedPets';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <FeaturedPets />
      <Footer />
    </>
  );
}
