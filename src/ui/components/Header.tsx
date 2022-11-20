import { ForwardedRef, forwardRef } from 'react'
import styled from 'styled-components'
import logo from '@ui/assets/logo.svg'
import { Maximize2, Minimize2 } from 'react-feather';

const Container = styled.header`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: ${({minimized}) => minimized ? '8px' : '8px 12px'};
  border-bottom: 1px solid var(--border);
  cursor: grab;
  >img {
    width: 20px;
    height: 20px;
    border-radius: 4px;
  }
  >span {
    display: ${({minimized}) => minimized ? 'none' : 'block'};
    flex: 1;
    font-weight: 500;
  }
  >.action {
    padding: 2px;
    border-radius: 4px;
    color: var(--text-secondary);
    cursor: pointer;
    &:hover {
      color: var(--text);
      background-color: var(--bg-hover);
    }
  }
`

interface Props {
  onMouseDown: (e: MouseEvent) => void;
  onMouseUp: (e: MouseEvent) => void;
  minimized: boolean;
  onToggleSize: () => void;
}

const Header = forwardRef(function ({
  onMouseDown,
  onMouseUp,
  minimized,
  onToggleSize
}: Props, ref: ForwardedRef<HTMLElement>) {
  return (
    <Container
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      minimized={minimized}
      ref={ref}
    >
      <img src={logo}/>
      <span>Figma viewer plugin</span>
      <div className="action" onClick={onToggleSize}>
        {
          minimized ?
          <Maximize2 size={16}/> :
          <Minimize2 size={16}/>
        }
      </div>
    </Container>
  )
})

export default Header
