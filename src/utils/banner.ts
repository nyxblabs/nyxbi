import { execSync } from 'node:child_process'
import clear from 'clear'
import color from '@nyxb/picocolors'
import { consolji } from 'consolji'

const { bold, gray } = color

export function showBanner(_clear = false) {
   if (_clear)
      clear()

   const globalVersion = getGlobalVersion()
   consolji.log(gray(`Nyxbi ${bold(globalVersion)}`))
}

function getGlobalVersion() {
   try {
      const version = execSync('nyxbi -v').toString().trim()
      return version
   }
   catch (error) {
      console.error('Failed to get global version')
   }
   return ''
}
