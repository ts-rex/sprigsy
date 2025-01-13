<script lang="ts">
	import { onMount } from 'svelte'
	import { buildProject } from './build/esbuild'
	import checkBabel, { setupBabel } from './text-editor/babel'

	import { basicSetup, EditorView } from 'codemirror'

	import CodeMirror from 'svelte-codemirror-editor'
	import { env, typescriptExtensions } from './text-editor/extensions/typescript'
	let { code = $bindable() }: { code: string } = $props()
	let editor = $state<EditorView>();
	let value = $state<string>(
`/// <reference types="lib.sprig.d.ts" />
async function game(api: sprig.FullSprigAPI): void {
  // Code here
}`)

	const extensions = [basicSetup, ...typescriptExtensions]

	onMount(async () => {
		// @ts-expect-error: @babel/types uses process.env without `?.` (ironic that babel is only implemented to warn against using `?.` )
		window.process = { env: {} }
		// @ts-expect-error
		window.env = env

		await setupBabel()
	})
</script>

<!-- <div bind:this={editorContainer} class="editor-container"></div> -->
<CodeMirror on:ready={(e) => editor = e.detail} on:change={(e) => {
	console.log(e)
}} bind:value {extensions}  class="editor-container" />

<style lang="postcss">
	:global(.editor-container) {
		@apply h-screen w-full;
	}
</style>
