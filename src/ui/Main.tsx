import { useEffect, useState } from 'react';
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Input from './components/Input'
import CodeArea from './components/CodeArea';
import { Copy } from 'react-feather';

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
  const [css, setCSS] = useState(null)

  function nodeToCSS(name, css) {
    return `.${name} {
  ${Object.keys(css).map(k => `${k}: ${css[k]};`).join('\n  ')}
}`
  }

  async function handleSelectionChange () {
    const node = figma.currentPage.selection[0]
    setName(node.name)

    try {
      // @ts-expect-error
      const css = await node.getCSSAsync();
      setCSS(nodeToCSS(node.name, css))
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
        css &&
        <CodeArea>
          { css }
          <CopyToClipboard text={css||''} onCopy={handleCopied}>
            <IconButton>
              <Copy size={20}/>
            </IconButton>
          </CopyToClipboard>
        </CodeArea>
      }
    </Container>
  )
}

export default Main
