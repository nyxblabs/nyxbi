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
      'src/cli-wrapper',
      'src/index',
   ],
})
