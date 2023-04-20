
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: Aladin;
        src: url(/fonts/Aladin-Regular.woff);
    }

    @font-face {
        font-family: MerriweatherLight;
        src: url(/fonts/Merriweather-Light.woff);
    }

    @font-face {
        font-family: MerriweatherBold;
        src: url(/fonts/Merriweather-Bold.woff);
    }

    h1 {
        color: white;
        font-size: 3.2rem;
        text-align: center;
        font-family: MerriweatherBold;
    }

    p {
        color: white;
        font-size: 1.6rem;
    }

    html {
        font-size: 62.5%;
    }

    body {
        font-size: 1.6rem;
        font-family: MerriweatherLight;
    }

`

export default GlobalStyle;