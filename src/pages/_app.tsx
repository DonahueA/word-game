import { type AppType } from "next/dist/shared/lib/utils";

import "../styles/globals.css";
import { Space_Mono } from '@next/font/google'

const space_mono= Space_Mono({weight: '400'});
const MyApp: AppType = ({ Component, pageProps }) => {
      return <><style jsx global>{`
      html {
        font-family: ${space_mono.style.fontFamily};
      }
    `}</style><Component {...pageProps}  />
    </>;
};

export default MyApp;
