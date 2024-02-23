import styled from 'styled-components';

const CodeArea = styled.code`
  position: relative;
  max-height: 240px;
  padding: 8px 16px;
  border-radius: 8px;
  color: var(--text);
  background-color: var(--bg-field);
  border: 1px solid transparent;
  line-height: 16px;
  font-size: 12px;
  outline: none;
  font-family: Roboto Mono,Monaco,Courier New,monospace;
  font-weight: 400;
  white-space: pre;
  overflow: auto;
`

export default CodeArea
