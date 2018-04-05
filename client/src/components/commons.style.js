import styled from "styled-components";

import {Link as ReactLink} from "react-router-dom";
import muiThemeable from 'material-ui/styles/muiThemeable';


export const Link = muiThemeable()(styled(ReactLink)`
  color: ${props => props.muiTheme.palette.primary1Color};
  text-decoration: none;
`);
