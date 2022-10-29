import fs from "fs"

const createFlexibleContentIndex = (components: string[]) => {
  const imports = `import React, { lazy } from "react"\n
import { FlexibleContentComponents } from "../../interfaces"\n
${components
  .map(component => {
    return `const ${component} = lazy(() => import("./${component}"))\n`
  })
  .join("")}`

  const typing = `
interface Props {
  components?: any
  data?: {
    title?: string
    uri?: string
    slug?: string
  }
}\n`

  const allComponentsSection = `
const allComponents: FlexibleContentComponents = {
  ${components
    .map(component => {
      return `${component},\n`
    })
    .join("")}
}\n`

  const FlexibleContentComponent = `
const FlexibleContent: React.FC<Props> = props => {
  const { components, data } = props

  if (!!components) {
    return components
      .filter((component: any) => !!component)
      .map((component: any, index: any) => {
        const { fieldGroupName } = component
        if (!fieldGroupName) {
          return null
        }

        const type: keyof FlexibleContentComponents = fieldGroupName
          .split("_")
          .slice(-1)[0]

        const Component = allComponents[type]

        return (
          Component && (
            <div key={index}>
              <Component {...component} {...data} />
            </div>
          )
        )
      })
  }
}

export default FlexibleContent`

  const flexibleContentIndexFileContent = `${imports}${typing}${allComponentsSection}${FlexibleContentComponent}`

  return fs.writeFile(
    `${process.cwd()}/template/src/components/FlexibleContent/index.tsx`,
    flexibleContentIndexFileContent,
    () => console.log(`FlexibleContent/index.tsx successfully created`)
  )
}

export default createFlexibleContentIndex
