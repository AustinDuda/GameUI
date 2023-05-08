
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    h1 {
        color: white;
        font-size: 4.2rem;
        text-align: center;
        line-height: 4.8rem;
        margin-bottom: 1.2rem;
        font-family: Staatliches;
    }

    h2 {
        color: white;
        font-size: 3rem;
        text-align: center;
        line-height: 3.2rem;
        margin-bottom: 1.2rem;
        font-family: Staatliches;
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