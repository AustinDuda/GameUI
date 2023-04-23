
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: RobotoThin;
        src: url(/fonts/Roboto-Thin.woff);
    }

    @font-face {
        font-family: RobotoLight;
        src: url(/fonts/Roboto-Light.woff);
    }

    @font-face {
        font-family: Roboto;
        src: url(/fonts/Roboto-Regular.woff);
    }

    @font-face {
        font-family: RobotoBold;
        src: url(/fonts/Roboto-Bold.woff);
    }

    h1 {
        color: white;
        font-size: 3.2rem;
        text-align: center;
        margin-bottom: 1.2rem;
        font-family: RobotoBold;
    }

    h3 {
        color: white;
        font-size: 2rem;
        line-height: 2rem;
        margin-bottom: 1.2rem;
        text-transform: capitalize;
    }

    p {
        font-size: 1.4rem;
    }

    html {
        font-size: 62.5%;
    }

    body {
        color: #999999;
        font-size: 1.4rem;
        background: #1a2035;
        font-family: Roboto;
    }

`

export default GlobalStyle;