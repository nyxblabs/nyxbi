import type { Argv } from 'mri'

const _rDefault = (r: any) => r.default || r

export const commands = {
   usage: () => import('./usage').then(_rDefault),
   init: () => import('./init').then(_rDefault),
   create: () => import('./init').then(_rDefault),
   add: () => import('./add').then(_rDefault),
   new: () => import('./add').then(_rDefault),
}

export type Command = keyof typeof commands

export interface NyxbCommandMeta {
   name: string
   usage: string
   description: string
   [key: string]: any
}

export type CLIInvokeResult = void | 'error' | 'wait'

export interface NyxbCommand {
   invoke(args: Argv, options?: Record<string, any>): Promise<CLIInvokeResult> | CLIInvokeResult
   meta: NyxbCommandMeta
}

export function defineNyxbCommand(command: NyxbCommand): NyxbCommand {
   return command
}
