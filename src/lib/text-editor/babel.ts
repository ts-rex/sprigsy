import { debounce } from '@std/async'
import { parse } from '@babel/parser'

let traverse: typeof import("@babel/traverse")['default']

export async function setupBabel() {
    traverse = (await import("@babel/traverse")).default
}

const disallowedIdentifiers = ['window', 'globalThis']
type ASTState = {
    disallowedWarnings: { identifier: string; loc: [number, number, number, number] }[]
    errors: { reason: string; loc: [number, number, number, number] }[]
}

export default debounce((code: string) => {
    let ast
    try {
        ast = parse(code, {
            plugins: ['typescript']
        })
    } catch {
        return
    }
    const state: ASTState = { disallowedWarnings: [], errors: [] }
    traverse(ast, {
        MemberExpression: {
            enter: (path, state) => {
                if (path.node.optional) {
                    state.errors.push({
                        reason:
                            'optional chaining (?.) will work in the editor but it will not work on the sprig console',
                        loc: [
                            path.node.loc?.start.line!,
                            path.node.loc?.start.column!,
                            path.node.loc?.end.line!,
                            path.node.loc?.end.column!
                        ]
                    })
                }
            }
        },
        Identifier: {
            enter: (path, state) => {
                if (disallowedIdentifiers.includes(path.node.name)) {
                    state.disallowedWarnings.push({
                        identifier: path.node.name,
                        loc: [
                            path.node.loc?.start?.line!,
                            path.node.loc?.start?.column!,
                            path.node.loc?.end?.line!,
                            path.node.loc?.end?.column!
                        ]
                    })
                }
            }
        },
    }, undefined, state)
    state.disallowedWarnings.forEach((v) => {
        monaco.editor.setModelMarkers(editor.getModel()!, editor.getId(), [
            {
                message: `'${v.identifier}' is not allowed.`,
                severity: monaco.MarkerSeverity.Error,
                startLineNumber: v.loc[0],
                startColumn: v.loc[1] + 1,
                endLineNumber: v.loc[2],
                endColumn: v.loc[3] + 1
            }
        ])
    })
}, 300)
