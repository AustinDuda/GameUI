
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
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
        margin-bottom: 0.8rem;
    }

    html {
        font-size: 62.5%;
    }

    body {
        overflow: hidden;
        color: #999999;
        font-size: 1.4rem;
        background: #1a2035;
        font-family: Roboto;
    }

`

export default GlobalStyle;