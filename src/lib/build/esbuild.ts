import { transform, initialize } from 'esbuild-wasm'

await initialize({
	wasmURL: (await import('esbuild-wasm/esbuild.wasm?url')).default
})

export async function buildProject(code: string, vanilla: boolean) {
	let template = ''
	if (vanilla) {
		template += `async function game(api) {
${code}
}
console.log("Made with Sprigsy")
game({ addSprite, addText, afterInput, bitmap, clearInterval, clearText, clearTile, clearTimeout, color, getAll, getFirst, getGrid, getTile, height, map, onInput, playTune, setBackground, setInterval, setLegend, setMap, setPushables, setSolids, setTimeout, tilesWith, tune, width })
`
	} else {
		throw new Error('not implemented')
	}

	return await transform(template, {
		loader: 'ts'
	})
}
