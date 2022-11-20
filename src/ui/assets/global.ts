import { createGlobalStyle } from 'styled-components';
import { rootId } from '@ui/utils/constants';
import variables from './variables';

const GlobalStyle = createGlobalStyle`
  ${variables}
  #${rootId} {
    --shadow: 0px 0px .5px rgba(0, 0, 0, .08), 0px 2px 5px rgba(0, 0, 0, .15);
    font-family: "Inter", "PingFang SC", "PingFang", "Lantinghei SC", "HiraginoSansGB-W3", "Microsoft Yahei", "Helvetica Neue", Helvetica, Arial, sans-serif;
    * {
      box-sizing: border-box;
    }
  }
`;

export default GlobalStyle;
