import styled from 'styled-components';

const Input = styled.input`
  height: 32px;
  padding: 8px 16px;
  border-radius: 8px;
  color: var(--text);
  background-color: var(--bg-field);
  border: 1px solid transparent;
  line-height: 16px;
  font-size: 12px;
  outline: none;
  &:focus {
    border-color: var(--primary);
    outline: 1px solid var(--primary);
  }
`

export default Input
