import Banner from '../../Components/Banner/Banner';
import Products from '../../Components/Products/Products';
import Contact from '../../Components/Contact/Contact';

const Home = () => {
  return (
    <div className="bg-stone-50">
      <Banner></Banner>
      <Products></Products>
      <Contact></Contact>
    </div>
  );
};

export default Home;
