import { javascript } from '@codemirror/lang-javascript'
import { autocompletion } from '@codemirror/autocomplete'
import Tooltip from '../Tooltip.svelte'
import { mount, unmount } from 'svelte'
import {
  createDefaultMapFromCDN,
  createSystem,
  createVirtualTypeScriptEnvironment
} from '@typescript/vfs'
import ts from 'typescript'
import { tsFacet, tsLinter, tsHover, tsAutocomplete, tsSync } from '@valtown/codemirror-ts'

import sprigDeclarations from '$lib/text-editor/context/sprig.d.ts?raw'

const fsMap = await createDefaultMapFromCDN({ target: ts.ScriptTarget.ES2022 }, '5.7.3', true, ts)
fsMap.set('lib.sprig.d.ts', sprigDeclarations)
const system = createSystem(fsMap)
const compilerOpts = {}
const env = createVirtualTypeScriptEnvironment(system, ['lib.sprig.d.ts'], ts, compilerOpts)

console.log(fsMap.entries().toArray())
const path = 'index.ts'

export const typescriptExtensions = [
  javascript({
    jsx: false,
    typescript: true
  }),
  tsFacet.of({ env, path }),
  tsSync(),
  tsLinter(),
  autocompletion({
    override: [tsAutocomplete()],
    
  }),
  tsHover({
    renderTooltip: (info) => {
      console.log("rendering tooltip")
      let tooltip: Tooltip;
      const div = document.createElement('div')
      return {
        dom: div,
        mount() {
          tooltip = mount(Tooltip, {
            target: div,
            intro: true,
            props: {
              info
            }
          })
        },
        destroy() {
          unmount(tooltip, { outro: true })
        }
      }
    }
  })
]

export {
  env
}
