interface TemplateOptions {
   name: string
   args: Record<string, any>
   fileType: string
}

interface Template {
   (options: TemplateOptions): { path: string; contents: string }
}

const api: Template = ({ name, fileType }) => ({
   path: `server/api/${name}.${fileType}`,
   contents: `
export default (event) => {
  return 'Hello ${name}'
}
`,
})

const component: Template = ({ name, fileType }) => {
   let contents: string
   switch (fileType) {
            case 'js':
            case 'jsx':
               contents = `
export default function ${name}() {
  return (
    <>
      Component: ${name}
    </>
  )
}
      `
               break
            case 'ts':
            case 'tsx':
               contents = `
export const ${name}: React.FC = () => (
  <>
    Component: ${name}
  </>
)
      `
               break
            default:
               throw new Error(`Unsupported fileType: ${fileType}`)
   }

   return {
      path: `app/components/${name}.${fileType}`,
      contents,
   }
}

const page: Template = ({ name, fileType }) => {
   let contents: string
   switch (fileType) {
            case 'js':
            case 'jsx':
               contents = `
export default function ${name}() {
  return (
    <>
      Page: ${name}
    </>
  )
}
      `
               break
            case 'ts':
            case 'tsx':
               contents = `
export const ${name}: React.FC = () => (
  <>
    Page: ${name}
  </>
)
      `
               break
            default:
               throw new Error(`Unsupported fileType: ${fileType}`)
   }

   return {
      path: `app/pages/${name}.${fileType}`,
      contents,
   }
}

const layout: Template = ({ name, fileType }) => {
   let contents: string
   switch (fileType) {
            case 'js':
            case 'jsx':
               contents = `
export default function ${name}(props) {
  return (
    <>
      Layout: ${name}
      {props.children}
    </>
  )
}
      `
               break
            case 'ts':
            case 'tsx':
               contents = `
export const ${name}: React.FC<React.PropsWithChildren<{}>> = ({children}) => (
  <>
    Layout: ${name}
    {children}
  </>
)
      `
               break
            default:
               throw new Error(`Unsupported fileType: ${fileType}`)
   }

   return {
      path: `app/layouts/${name}.${fileType}`,
      contents,
   }
}

export const templates = {
   api,
   component,
   page,
   layout,
} as Record<string, Template>
