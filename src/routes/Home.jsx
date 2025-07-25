import FlavorSection from '../sections/FlavorSection.jsx';
import HeroSection from '../sections/HeroSection';
import MessageSection from '../sections/MessageSection.jsx';


const Home = () => {
	return (
		<div id="container">
			<HeroSection />
			<MessageSection />
			<FlavorSection />
		</div>
	);
};

export default Home;
