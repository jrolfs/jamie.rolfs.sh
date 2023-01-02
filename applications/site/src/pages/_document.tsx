import { Head, Html, Main, NextScript } from 'next/document';

import { configuration } from '../configuration';

const Document = () => (
  <Html>
    <Head>
      <link href="/favicon/apple.png" rel="apple-touch-icon" sizes="180x180" />
      <link
        href="/favicon/32x32.png"
        rel="icon"
        sizes="32x32"
        type="image/png"
      />
      <link
        href="/favicon/16x16.png"
        rel="icon"
        sizes="16x16"
        type="image/png"
      />
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
