import { AppProps as NextAppProps } from 'next/app';

import { Layout } from './Layout';
import { Title } from './Title';

export interface AppProps extends NextAppProps {}

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Title />
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
);

export { App };
