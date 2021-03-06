import Document, { Html, Head, NextScript, Main } from 'next/document'

const GA_TRACKING_ID = 'UA-115151315-2'

export default class PageDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                      <script
                        dangerouslySetInnerHTML={{
                            __html: `
                              (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                                })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
                                
                              ga('create', '${GA_TRACKING_ID}', 'auto');
                              ga('send', 'pageview');
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