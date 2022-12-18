import { Head, Html, Main, NextScript } from 'next/document';

import { configuration } from '../configuration';

const Document = () => (
  <Html>
    <Head>
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `window.configuration = ${JSON.stringify(configuration)}`,
        }}
        id="configuration"
      />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
