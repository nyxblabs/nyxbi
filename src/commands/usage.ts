import { purple } from '@nyxb/picocolors'
import consolji from 'consolji'
import { showHelp } from '../utils/help'
import { commands, defineNyxbCommand } from './index'

export default defineNyxbCommand({
   meta: {
      name: 'help',
      usage: 'nyxbi help',
      description: 'Show help',
   },
   invoke(_args) {
      const sections: string[] = []

      sections.push(`Usage: ${purple(`npx nyxbi ${Object.keys(commands).join('|')} [args]`)}`)

      consolji.log(`${sections.join('\n\n')}\n`)

      // Reuse the same wording as in `-h` commands
      showHelp({})
   },
})
