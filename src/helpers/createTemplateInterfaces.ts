import fs from "fs"

const createTemplateInterfaces = (components: string[]) => {
  const imports = `import React from "react"
import { PageProps } from "gatsby"
import { IGatsbyImageData } from "gatsby-plugin-image"\n
${components
  .map(component => {
    return `import { ${component}Props } from "./components/FlexibleContent/${component}"\n`
  })
  .join("")}`

  const typing = `
interface ArticleItem {
  title: string
  excerpt: string
  uri: string
  categories: { nodes: any }
  thumbnail: {
    node: { localFile: IGatsbyImageData; altText: string }
  }
  archiveThumbnail: {
    node: { localFile: IGatsbyImageData; altText: string }
  }
}

interface FlexibleContentProps extends PageProps {
  title?: string
  slug?: string
}

interface TemplatePageProps extends PageProps {
  data: {
    page: {
      title?: string
      uri?: string
      slug?: string
      template?: any
    }
  }
}\n`

  const componentsTyping = `
interface FlexibleContentComponents {
${components
  .map(component => {
    return `  ${component}: React.FC<${component}Props>\n`
  })
  .join("")}
}\n`

  const fileExports = `
export {
  ArticleItem,
  FlexibleContentProps,
  FlexibleContentComponents,
  TemplatePageProps,
}
`

  const templateInterfaces = `${imports}${typing}${componentsTyping}${fileExports}`

  return fs.writeFile(
    `${process.cwd()}/template/src/interfaces.ts`,
    templateInterfaces,
    () => console.log(`src/interfaces.tsx successfully created`)
  )
}

export default createTemplateInterfaces
