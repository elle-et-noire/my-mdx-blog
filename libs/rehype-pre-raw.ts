import { visit } from 'unist-util-visit'

export const preProcess = () => (tree: import('hast').Root) => {
  visit(tree, (node) => {
    if (node?.type === 'element' && node?.tagName === 'pre') {
      const [codeEl] = node.children

      // @ts-ignore
      if (codeEl.tagName !== 'code') return
      // @ts-ignore
      node.raw = codeEl.children?.[0].value
    }
  })
}

export const postProcess = () => (tree: import('hast').Root) => {
  visit(tree, 'element', (node) => {
    if (node?.type === 'element' && node?.tagName === 'pre') {
      // @ts-ignore
      node.properties['raw'] = node.raw
      // console.log(node) here to see if you're getting the raw text
    }
  })
}
