<script lang="ts">
	import { onMount } from 'svelte';
	import * as monaco from 'monaco-editor';
	import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
	import {} from 'sprig/web';
	import { constrainedEditor } from 'constrained-editor-plugin';
	import { parse } from '@babel/parser';

	let editorContainer: HTMLDivElement;
	let editor: import('monaco-editor').editor.IStandaloneCodeEditor;
	// const monaco = await import ('monaco-editor')
	// Initial code inside the function
	function debounce<A, T = void>(func: (this: T, ...args: A[]) => any, timeout = 300) {
		let timer: number;
		return function (this: T, ...args: A[]) {
			clearTimeout(timer);
			timer = setTimeout(() => {
				func.apply(this, args);
			}, timeout);
		};
	}
	let code = `console.log('Hello sprig!');`;
	onMount(async () => {
		globalThis.process = {};
		globalThis.process.env = {};
		const { recursive } = await import('babel-walk');
		await addGlobalTypes();
		setupEditor();
		self.MonacoEnvironment = {
			getWorker: function (_: any, label: string) {
				return new tsWorker();
			}
		};

		async function addGlobalTypes() {
			const sprigTypeDef = (await import('./editorcontext/sprig.d.ts?raw')).default;
			monaco.languages.typescript.typescriptDefaults.addExtraLib(
				sprigTypeDef,
				'context/sprig.d.ts'
			);
			const globalTypeDef = (await import('./editorcontext/global.d.ts?raw')).default;
			monaco.languages.typescript.typescriptDefaults.addExtraLib(
				globalTypeDef,
				'global.d.ts'
			);

			// IMPLEMENT ONCE v2 IS DONE!
			// const sprigsyTypeDef = (await import('./editorcontext/sprigsy.d.ts?raw')).default;
			// monaco.languages.typescript.typescriptDefaults.addExtraLib(
			// 	sprigsyTypeDef,
			// 	'context/sprigsy.d.ts'
			// );
		}
		const disallowedIdentifiers = ['window', 'globalThis'];
		type ASTState = {
			disallowedWarnings: { identifier: string; loc: [number, number, number, number] }[];
		};
		const ASTWalker = recursive<ASTState>({
			Identifier(node, state, c) {
				console;
				if (disallowedIdentifiers.includes(node.name)) {
					state.disallowedWarnings.push({
						identifier: node.name,
						loc: [
							node.loc?.start?.line!,
							node.loc?.start?.column!,
							node.loc?.end?.line!,
							node.loc?.end?.column!
						]
					});
				}
			}
		});
		const checkBabel = debounce(() => {
			console.log('checking for uhh');
			const ast = parse(editor.getValue(), {
				plugins: ['typescript']
			});
			const state: ASTState = { disallowedWarnings: [] };
			ASTWalker(ast, state);
			console.log(state);
			state.disallowedWarnings.forEach((v) => {
				monaco.editor.setModelMarkers(editor.getModel()!, editor.getId(), [
					{
						message: `'${v.identifier}' is not allowed.`,
						severity: monaco.MarkerSeverity.Error,
						startLineNumber: v.loc[0],
						startColumn: v.loc[1]+1,
						endLineNumber: v.loc[2],
						endColumn: v.loc[3]+1
					}
				]);
			});
		});

		function setupEditor() {
			editor = monaco.editor.create(editorContainer, {
				value:
`function game(api: sprig.FullSprigAPI): void {
	${code}
}`,
				language: 'typescript',
				automaticLayout: true,
				scrollBeyondLastLine: false,
				theme: 'vs-dark'
			});

			const model = editor.getModel()!;
			const constrainedInstance = constrainedEditor(monaco);
			constrainedInstance.initializeIn(editor);
			constrainedInstance.addRestrictionsTo(model, [
				{
					range: [2, 1, 2, code.length + 2], // Range of Function definition
					allowMultiline: true,
					label: 'funcDefinition'
				}
			]);
			editor.onDidChangeModelContent((event) => {
				console.log(event.changes);
				console.log(model.getValueInEditableRanges());
				checkBabel();
			});
		}
		return () => {
			if (editor) {
				editor.dispose();
			}
		};
	});
</script>

<div bind:this={editorContainer} class="editor-container"></div>

<style>
	.editor-container {
		height: 100vh;
		width: 100%;
	}
</style>
