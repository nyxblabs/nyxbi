import { existsSync, promises as fsp } from 'node:fs'
import { dirname, resolve } from 'nyxpath'
import { consolji } from 'consolji'
import { templates } from '../utils/templates'
import { defineNyxbCommand } from './index'

export default defineNyxbCommand({
   meta: {
      name: 'add',
      usage: `npx nyxbi add [--cwd] [--force] ${Object.keys(templates).join('|')} <name> <fileType>`,
      description: 'Create a new template file.',
   },
   async invoke(args) {
      const _cwd = resolve(args.cwd || '.')

      const template = args._[0]
      const name = args._[1]
      const fileType = args._[2] // Neues Argument

      // Validate template name
      if (!templates[template]) {
         consolji.error(`Template ${template} is not supported. Possible values: ${Object.keys(templates).join(', ')}`)
         process.exit(1)
      }

      // Validate options
      if (!name || !fileType) {
         consolji.error('name or fileType argument is missing!')
         process.exit(1)
      }

      // Resolve template
      const res = templates[template]({ name, args, fileType }) // fileType hinzugefügt

      // Resolve full path to generated file
      const path = resolve(_cwd, res.path)

      // Ensure not overriding user code
      if (!args.force && existsSync(path)) {
         consolji.error(`File exists: ${path} . Use --force to override or use a different name.`)
         process.exit(1)
      }

      // Ensure parent directory exists
      const parentDir = dirname(path)
      if (!existsSync(parentDir)) {
         consolji.info('Creating directory', parentDir)
         if (template === 'page')
            consolji.info('This enables nextjs page functionality!')

         await fsp.mkdir(parentDir, { recursive: true })
      }

      // Write file
      await fsp.writeFile(path, `${res.contents.trim()}\n`)
      // Confirm file creation
      consolji.log(`✅ File ${name}.${fileType} was successfully created at ${path}`)
   },
})
