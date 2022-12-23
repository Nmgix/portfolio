import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang='ru'>
      <Head>
        <link rel='preload' href='/fonts/Inter/Inter-Regular.woff2' as='font' crossOrigin='' type='font/woff2' />
        <link rel='preload' href='/fonts/Inter/Inter-Regular.woff' as='font' crossOrigin='' type='font/woff' />
        <link rel='preload' href='/fonts/Inter/Inter-Bold.woff2' as='font' crossOrigin='' type='font/woff2' />
        <link rel='preload' href='/fonts/Inter/Inter-Bold.woff' as='font' crossOrigin='' type='font/woff' />
        <link rel='preload' href='/fonts/Inter/Inter-Black.woff2' as='font' crossOrigin='' type='font/woff2' />
        <link rel='preload' href='/fonts/Inter/Inter-Black.woff' as='font' crossOrigin='' type='font/woff' />
        <link rel='preload' href='/fonts/Inter/Inter-ExtraBold.woff2' as='font' crossOrigin='' type='font/woff2' />
        <link rel='preload' href='/fonts/Inter/Inter-ExtraBold.woff' as='font' crossOrigin='' type='font/woff' />
        <link rel='preload' href='/fonts/Inter/Inter-ExtraLight.woff2' as='font' crossOrigin='' type='font/woff2' />
        <link rel='preload' href='/fonts/Inter/Inter-ExtraLight.woff' as='font' crossOrigin='' type='font/woff' />
        <link rel='preload' href='/fonts/Inter/Inter-Light.woff2' as='font' crossOrigin='' type='font/woff2' />
        <link rel='preload' href='/fonts/Inter/Inter-Light.woff' as='font' crossOrigin='' type='font/woff' />
        <link rel='preload' href='/fonts/Inter/Inter-Medium.woff2' as='font' crossOrigin='' type='font/woff2' />
        <link rel='preload' href='/fonts/Inter/Inter-Medium.woff' as='font' crossOrigin='' type='font/woff' />
        <link rel='preload' href='/fonts/Inter/Inter-SemiBold.woff2' as='font' crossOrigin='' type='font/woff2' />
        <link rel='preload' href='/fonts/Inter/Inter-SemiBold.woff' as='font' crossOrigin='' type='font/woff' />
        <link rel='preload' href='/fonts/Inter/Inter-Thin.woff2' as='font' crossOrigin='' type='font/woff2' />
        <link rel='preload' href='/fonts/Inter/Inter-Thin.woff' as='font' crossOrigin='' type='font/woff' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
