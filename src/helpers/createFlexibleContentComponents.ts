import fs from "fs"

import Banner from "../FlexibleContent/Banner.txt"
import CallToAction from "../FlexibleContent/CallToAction.txt"
import Carousel from "../FlexibleContent/Carousel.txt"
import DataTable from "../FlexibleContent/DataTable.txt"
import Faq from "../FlexibleContent/Faq.txt"
import FeatureLinks from "../FlexibleContent/FeatureLinks.txt"
import Form from "../FlexibleContent/Form.txt"
import Gallery from "../FlexibleContent/Gallery.txt"
import Hero from "../FlexibleContent/Hero.txt"
import LatestArticles from "../FlexibleContent/LatestArticles.txt"
import LinkBoxes from "../FlexibleContent/LinkBoxes.txt"
import List from "../FlexibleContent/List.txt"
import Location from "../FlexibleContent/Location.txt"
import Logos from "../FlexibleContent/Logos.txt"
import NavBlock from "../FlexibleContent/NavBlock.txt"
import SupportTiers from "../FlexibleContent/SupportTiers.txt"
import TextArea from "../FlexibleContent/TextArea.txt"
import TextBlock from "../FlexibleContent/TextBlock.txt"
import TextImage from "../FlexibleContent/TextImage.txt"
import Videos from "../FlexibleContent/Videos.txt"

interface FlexibleContentComponents {
  [key: string]: string
}

const createFlexibleContentComponents = (components: string[]) => {
  const allComponents: FlexibleContentComponents = {
    Banner,
    CallToAction,
    Carousel,
    DataTable,
    Faq,
    FeatureLinks,
    Form,
    Gallery,
    Hero,
    LatestArticles,
    LinkBoxes,
    List,
    Location,
    Logos,
    NavBlock,
    SupportTiers,
    TextArea,
    TextBlock,
    TextImage,
    Videos,
  }

  return components.map(component => {
    const componentCode = allComponents[component] || ""
    return fs.writeFile(
      `${process.cwd()}/template/src/components/FlexibleContent/${component}.tsx`,
      componentCode,
      err => {
        if (err) return console.log(err)
        return console.log(`${component}.tsx successfully created`)
      }
    )
  })
}

export default createFlexibleContentComponents
