import { cyan, magenta } from '@nyxb/picocolors'
import consolji from 'consolji'
import type { NyxbCommandMeta } from '../commands'

export function showHelp(meta?: Partial<NyxbCommandMeta>) {
   const sections: string[] = []

   if (meta) {
      if (meta.usage)
         sections.push(`${magenta('> ')}Usage: ${cyan(meta.usage)}`)

      if (meta.description)
         sections.push(magenta('⋮ ') + meta.description)
   }

   sections.push(`Use ${cyan('npx nyxbi [command] --help')} to see help for each command`)

   consolji.log(`${sections.join('\n\n')}\n`)
}
