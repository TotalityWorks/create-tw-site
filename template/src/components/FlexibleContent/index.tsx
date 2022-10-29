import React, { lazy } from "react"

  import { FlexibleContentModules } from "../../interfaces"

  const Banner = lazy(() => import("./Banner"))
const Hero = lazy(() => import("./Hero"))
const Location = lazy(() => import("./Location"))

  interface Props {
    components?: any
    data?: {
      title?: string
      uri?: string
      slug?: string
    }
  }

  const allComponents: FlexibleContentComponents = {
    Banner,
Hero,
Location,

  }

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
  
  export default FlexibleContent