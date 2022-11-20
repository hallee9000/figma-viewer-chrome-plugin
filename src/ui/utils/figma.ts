export function listenToFigma (callback) {
  figma.on('selectionchange', () => {
    const sel: any = figma.currentPage.selection[0]
    if (sel && sel.fillStyleId) {
      const style = figma.getStyleById(sel.fillStyleId)
      callback(style)
    }
  })
}
