jsDesign.showUI(__html__, { width: 220, height: 400 })

function hex2rgb(hex) {
  return {
    r: (Number('0x' + hex[1] + hex[2]) | 0) / 255,
    g: (Number('0x' + hex[3] + hex[4]) | 0) / 255,
    b: (Number('0x' + hex[5] + hex[6]) | 0) / 255
  }
}

let markId = null

//监听从 插件ui 发过来的信息
jsDesign.ui.onmessage = message => {
  if (message.type === 'selectColor') {
    for (const node of jsDesign.currentPage.selection) {
      const color = hex2rgb(message.color)

      if (message.block === 'fill') {
        try {
          const oldFills = JSON.parse(JSON.stringify(node.fills))
          if (oldFills[0]) {
            oldFills[0].color = color
            node.fills = oldFills
          }
        } catch (error) {
          console.log(error)
        }
      }

      if (message.block === 'stroke') {
        try {
          const oldStrokes = JSON.parse(JSON.stringify(node.strokes))
          if (oldStrokes[0]) {
            oldStrokes[0].color = color
            node.strokes = oldStrokes
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
}
