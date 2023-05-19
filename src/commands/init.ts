import { downloadTemplate, startShell } from 'gitize'
import { relative } from 'nyxpath'
import { consolji } from 'consolji'
import { defineNyxbCommand } from './index'

const rpath = (p: string) => relative(process.cwd(), p)

const DEFAULT_REGISTRY = 'https://raw.githubusercontent.com/nyxblabs/starter/templates/templates'

export default defineNyxbCommand({
   meta: {
      name: 'init',
      usage: 'npx nyxbi init|create [--template,-t] [--force] [--offline] [--prefer-offline] [--shell] [dir]',
      description: 'Initialize a fresh project',
   },
   async invoke(args) {
      // Clone template
      const template = args.template || args.t || 'nextjs'

      if (typeof template === 'boolean') {
         consolji.error('Please specify a template!')
         process.exit(1)
      }

      let t

      try {
         t = await downloadTemplate(template, {
            dir: args._[0] as string,
            force: args.force,
            offline: args.offline,
            preferOffline: args['prefer-offline'],
            registry: process.env.NYXI_INIT_REGISTRY || DEFAULT_REGISTRY,
         })
      }
      catch (err) {
         if (process.env.DEBUG)
            throw err

         consolji.error((err as Error).toString())
         process.exit(1)
      }

      // Show next steps
      const relativeDist = rpath(t.dir)

      const nextSteps = [
         !args.shell && relativeDist.length > 1 && `\`cd ${relativeDist}\``,
         'Install dependencies with `nyxi`',
         'Start development server with `nyxr dev`',
      ].filter(Boolean)

      consolji.log(`✨ Nyxb project is created with \`${t.name}\` template. Next steps:`)
      for (const step of nextSteps)
         consolji.log(` › ${step}`)

      if (args.shell)
         startShell(t.dir)
   },
})
