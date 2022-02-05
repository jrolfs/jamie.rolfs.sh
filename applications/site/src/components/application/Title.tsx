import Head from 'next/head';

export interface TitleProps {
  page?: string;
}

const Title = ({ page }: TitleProps) => (
  <Head>
    <title>{`jamie.rolfs.sh${page ? ` → ${page}` : ''}`}</title>
  </Head>
);

export { Title };
