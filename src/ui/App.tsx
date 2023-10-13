import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Header from './components/Header'
import Main from './Main'
import { rootId } from './utils/constants'

const Container = styled.div`
  position: fixed;
  width: ${({minimized}) => minimized ? '64px' : '240px'};
  height: ${({minimized}) => minimized ? '36px' : 'auto'};
  overflow: hidden;
  font-size: 12px;
  color: var(--text);
  background-color: var(--bg);
  border-radius: 8px;
  box-shadow: var(--shadow);
  z-index: 1000;
  .main {
    padding: 8px 12px;
    input {
      width: 100%;
      cursor: pointer;
    }
  }
`

function App () {
  const header = useRef(null)
  const initialPosition = JSON.parse(localStorage.getItem(`${rootId}:position`))
  const [isDragging, setIsDragging] = useState(false)
  const [shiftPosition, setShiftPosition] = useState([0, 0])
  const [position, setPosition] = useState(initialPosition||[window.innerWidth - 505, 72])
  const [minimized, setMinimized] = useState(false)

  function handleDragStart (e) {
    let shiftX = e.clientX - header.current.getBoundingClientRect().left;
    let shiftY = e.clientY - header.current.getBoundingClientRect().top;
    setShiftPosition([shiftX, shiftY])
    setIsDragging(true)
  }

  function handleDragEnd (e) {
    localStorage.setItem(`${rootId}:position`, JSON.stringify(position))
    setIsDragging(false)
  }

  function handleToggleSize () {
    setMinimized(!minimized)
  }

  useEffect(() => {
    function moving (e) {
      if (isDragging) {
        setPosition([e.pageX-shiftPosition[0], e.pageY-shiftPosition[1]])
      }
    }
    window.addEventListener('mousemove', moving)
    return () => {
      window.removeEventListener('mousemove', moving)
    }
  }, [isDragging, shiftPosition])

  return (
    <Container
      minimized={minimized}
      style={{
        left: position[0],
        top: position[1]
      }}
    >
      <Header
        ref={header}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        minimized={minimized}
        onToggleSize={handleToggleSize}
      />
      <Main/>
    </Container>
  )
}

export default App
