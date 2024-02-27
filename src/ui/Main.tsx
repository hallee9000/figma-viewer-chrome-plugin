import { useEffect, useState } from 'react';
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Input from './components/Input'
import CodeArea from './components/CodeArea';
import { Copy } from 'react-feather';
import { FrameBox } from './components/FrameBox'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const IconButton = styled.button`
  position: absolute;
  right: 8px;
  top: 8px;
  padding: 4px;
  border-radius: 4px;
  color: var(--text-secondary);
  background-color: var(--bg-field);
  cursor: pointer;
  &:hover {
    color: var(--text);
    background-color: var(--bg-hover);
  }
`

function Main () {
  const [name, setName] = useState(null)
  const [cssString, setCssString] = useState(null)
  const [cssDeclaration, setCssDeclaration] = useState(null)

  function nodeToCSSString(name, css) {
    return `.${name} {
  ${Object.keys(css).map(k => `${k}: ${css[k]};`).join('\n  ')}
}`
  }
  function nodeToCSSDeclaration(css) {
    // Guard: no css
    if (!css) return null
    // Create a new CSSStyleDeclaration
    const c = new CSSStyleSheet()
    c.insertRule(`i{${Object.entries(css).map(([k,v]) => `${k}:${v};`).join('')}}`)
    // @ts-expect-error
    return c.cssRules?.[0]?.style!
  }

  async function handleSelectionChange () {
    const node = figma.currentPage.selection[0]
    setName(node.name)

    try {
      // @ts-expect-error
      const css = await node.getCSSAsync();
      setCssString(nodeToCSSString(node.name, css))
      setCssDeclaration(nodeToCSSDeclaration(css))
    }
    catch(e) {
      console.error(e);
    }
  }

  function handleCopied () {
    // you can use figma object directly, no message posting
    figma.notify('Copied')
  }

  // Listen to event selectionchange
  // figma.on('selectionchange') is not working anyway so I listen click event on canvas
  useEffect(() => {
    const canvas = document.querySelector("#fullscreen-root canvas")
    canvas.addEventListener('click', handleSelectionChange)
    return () => {
      canvas.removeEventListener('click', handleSelectionChange)
    }
  }, [])

  return (
    <Container className="main">
      <CopyToClipboard text={name||''} onCopy={handleCopied}>
        <Input readOnly value={name||'Select a layer'}/>
      </CopyToClipboard>
      {
        cssString &&
        <CodeArea>
          { cssString }
          <CopyToClipboard text={cssString||''} onCopy={handleCopied}>
            <IconButton>
              <Copy size={20}/>
            </IconButton>
          </CopyToClipboard>
        </CodeArea>
      }
      {
        cssDeclaration &&
        <CodeArea>
          <FrameBox data={cssDeclaration}/>
        </CodeArea>
      }
    </Container>
  )
}

export default Main
