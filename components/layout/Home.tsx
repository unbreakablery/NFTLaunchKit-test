import Header from './Header';
import Footer from './Footer';
import {
  Container
} from '@chakra-ui/react'

type HomeProps = {
  children: any;
}

const Home = ({ children }: HomeProps) => {
  return (
    <>
      <Header />
      <div id="home">
        <Container mt={20} py={10} maxW='container.xl'>
          {children}
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Home;
