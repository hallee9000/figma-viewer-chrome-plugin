import { useEffect, useState } from 'react';
import Input from './components/Input'
import { CopyToClipboard } from 'react-copy-to-clipboard';

function Main () {
  const [name, setName] = useState(null)

  function handleSelectionChange () {
    const node = figma.currentPage.selection[0]
    setName(node.name)
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
    <div className="main">
      <CopyToClipboard text={name||''} onCopy={handleCopied}>
        <Input readOnly value={name||'Select a layer'}/>
      </CopyToClipboard>
    </div>
  )
}

export default Main
