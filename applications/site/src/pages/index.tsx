import { Box } from '../components/three';

const IndexPage = () => (
  <>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <Box position={[-1.2, 0, 0]} />
    <Box position={[1.2, 0, 0]} />
  </>
);

export default IndexPage;
