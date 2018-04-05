// these sizes are arbitrary and you can set them to whatever you wish
import {css} from 'styled-components'

export function screenMin(min) {
    const emSize = min / 16.0;
    return (...args) => css`
    @media only screen and (min-width: ${emSize}em) {
      ${css(...args)}
    }
  `;
};

export function screenMax(max) {
    const emSize = max / 16.0;
    return (...args) => css`
    @media only screen and (max-width: ${emSize}em) {
      ${css(...args)}
    }
  `;
};



import { injectGlobal } from 'styled-components';
injectGlobal`
  body {
    margin: 0;
  }
`;