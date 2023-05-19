import { promises as fsp } from 'node:fs'
import { dirname, resolve } from 'nyxpath'
import { consolji } from 'consolji'
import { hash } from 'nyxhash'
import { rmRecursive } from './fs'

export interface ProjectManifest {
   _hash: string | null
   project: {
      rootDir: string
   }
   versions: {
      [key: string]: string
   }
   [key: string]: any
}

export async function cleanupProjectDirs(rootDir: string, dirsToClean: string[]) {
   consolji.info('Cleaning up generated files and caches...')

   await rmRecursive(dirsToClean.map(dir => resolve(rootDir, dir)))
}

export function versionToGitIdentifier(version: string) {
   const id = /\.([0-9a-f]{7,8})$/.exec(version)
   if (id?.[1])
      return id[1]

   return `v${version}`
}

export function resolveProjectManifest(project: any): ProjectManifest {
   const manifest: ProjectManifest = {
      _hash: null,
      project: {
         rootDir: project.options.rootDir,
      },
      versions: {
         ...project._versions,
      },
      ...project._extraFields,
   }
   manifest._hash = hash(manifest)
   return manifest
}

export async function writeProjectManifest(project: any): Promise<ProjectManifest> {
   const manifest = resolveProjectManifest(project)
   const manifestPath = resolve(project.options.buildDir, 'project.json')
   await fsp.mkdir(dirname(manifestPath), { recursive: true })
   await fsp.writeFile(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8')
   return manifest
}

export async function loadProjectManifest(buildDir: string): Promise<ProjectManifest | null> {
   const manifestPath = resolve(buildDir, 'project.json')
   const manifest: ProjectManifest | null = await fsp.readFile(manifestPath, 'utf-8')
      .then(data => JSON.parse(data) as ProjectManifest)
      .catch(() => null)
   return manifest
}
