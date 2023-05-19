import { defineBuildConfig } from 'buildkarium'

export default defineBuildConfig({
   declaration: true,
   rollup: {
      inlineDependencies: true,
      resolve: {
         exportConditions: ['production', 'node'] as any,
      },
   },
   entries: [
      'src/cli',
      'src/cli-run',
      'src/index',
   ],
   externals: [
      'fsevents',
      // TODO: Fix rollup/unbuild issue
      'node:url',
      'node:buffer',
      'node:path',
      'node:child_process',
      'node:process',
      'node:path',
      'node:os',
   ],
})
