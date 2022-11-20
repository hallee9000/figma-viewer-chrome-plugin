import { css } from 'styled-components'
import { rootId } from '@ui/utils/constants'

export default css`
  body[data-preferred-theme="light"] {
    #${rootId} {
      --text: #000;
      --text-secondary: rgba(0, 0, 0, 0.5);
      --text-tertiary: rgba(0, 0, 0, 0.3);
      --bg: #FFF;
      --bg-hover: #EEE;
      --bg-field: #f5f5f5;
      --border: #e6e6e6;
      --input-border: #BBB;
      --button-text: #FFF;
      --primary: #0d99ff;
    }
  }
  body[data-preferred-theme="dark"] {
    #${rootId} {
      --text: #FFF;
      --text-secondary: rgba(255, 255, 255, 0.7);
      --text-tertiary: rgba(255, 255, 255, 0.4);
      --bg: #2c2c2c;
      --bg-hover: #3C3C3C;
      --bg-field: #383838;
      --border: #444444;
      --input-border: #5f5f5f;
      --button-text: #FFF;
      --primary: #0d99ff;
    }
  }
`
