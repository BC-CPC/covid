import Document, { Html, Head, NextScript, Main } from 'next/document'

const GA_TRACKING_ID = 'UA-115151315-1'

export default class PageDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <script
                      async
                      src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                    />

                    <script
                      dangerouslySetInnerHTML={{
                          __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag() {dataLayer.push(arguments);}

                            gtag('js', new Date());
                            
                            gtag('config', '${GA_TRACKING_ID}')
                          `
                      }} />
                </Head>

                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}