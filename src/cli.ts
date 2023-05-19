import mri from 'mri'
import { red } from '@nyxb/picocolors'
import type { ConsoljiReporter } from 'consolji'
import { consolji } from 'consolji'
import { commands } from './commands'

async function _main() {
   const _argv = (process.env.__CLI_ARGV__ ? JSON.parse(process.env.__CLI_ARGV__) : process.argv).slice(2)
   const args = mri(_argv, {
      boolean: [
         'no-clear',
      ],
   })
   const command = args._.shift() || 'usage'

   if (!(command in commands)) {
      consolji.log(`\n${red(`Invalid command ${command}`)}`)

      await commands.usage().then(r => r.invoke())
      process.exit(1)
   }
}

// Wrap all console logs with consolji for better DX
consolji.wrapAll()

// Filter out unwanted logs
// TODO: Use better API from consolji for intercepting logs
function wrapReporter(reporter: ConsoljiReporter) {
   return ({
      log(logObj, ctx) {
         if (!logObj.args || !logObj.args.length)
            return
         const msg = logObj.args[0]
         if (typeof msg === 'string' && !process.env.DEBUG) {
            // Suppress warning about native Node.js fetch
            if (msg.includes('ExperimentalWarning: The Fetch API is an experimental feature'))
               return

            // TODO: resolve upstream in Vite
            // Hide sourcemap warnings related to node_modules
            if (msg.startsWith('Sourcemap') && msg.includes('node_modules'))
               return
         }
         return reporter.log(logObj, ctx)
      },
   }) satisfies ConsoljiReporter
}

consolji.options.reporters = consolji.options.reporters.map(wrapReporter)

process.on('unhandledRejection', err => consolji.error('[unhandledRejection]', err))
process.on('uncaughtException', err => consolji.error('[uncaughtException]', err))

export function main() {
   _main()
      .then((result) => {
         // @ts-expect-error is fine
         if (result === 'error')
            process.exit(1)
         // @ts-expect-error is fine
         else if (result !== 'wait')
            process.exit()
      })
      .catch((error) => {
         consolji.error(error)
         process.exit(1)
      })
}
