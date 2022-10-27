#!/usr/bin/env node
import inquirer from "inquirer"

const flexibleContentComponents: string[] = [
  "Banner",
  "CallToAction",
  "Carousel",
  "DataTable",
  "Faq",
  "FeatureLinks",
  "Form",
  "Gallery",
  "Hero",
  "LatestArticles",
  "LinkBoxes",
  "List",
  "Location",
  "Logos",
  "NavBlock",
  "SupportTiers",
  "TextArea",
  "TextImage",
  "Videos",
]

type FlexibleContentComponents = typeof flexibleContentComponents[number]

interface CliResults {
  siteName: string
  components: FlexibleContentComponents[]
}

const cli = async () => {
  const defaultOptions = {
    siteName: "my-tw-site",
    components: flexibleContentComponents,
  }

  const cliResults = defaultOptions

  const promptSiteName = async (): Promise<string> => {
    const { siteName } = await inquirer.prompt<Pick<CliResults, "siteName">>({
      name: "siteName",
      type: "input",
      message: "What will your website be called?",
      default: defaultOptions.siteName,
      // validate: validateSiteName,
      transformer: (input: string) => {
        return input.trim()
      },
    })

    return siteName
  }

  const promptComponents = async (): Promise<FlexibleContentComponents[]> => {
    const { components } = await inquirer.prompt<
      Pick<CliResults, "components">
    >({
      name: "components",
      type: "checkbox",
      message: "Which flexible content components would you like to use?",
      choices: flexibleContentComponents.map(fccomponent => ({
        name: fccomponent,
        checked: false,
      })),
    })

    return components
  }

  cliResults.siteName = await promptSiteName()
  cliResults.components = await promptComponents()

  // eslint-disable-next-line no-console
  console.log(cliResults)
}

cli()
