import { buildProject } from '$lib/build/esbuild'

enum Capability {
	BuildToVite,
	ProjectDB
}

export default abstract class Provider {
	constructor() {}

	abstract capabilities(): Capability[]

	/**
	 * Builds HTML project
	 */
	async buildHTML(input: string): Promise<string> {
		throw new TypeError('BuildToVite capability is not available')
	}

	/**
	 * Build JS
	 */
	async buildJS(input: string): Promise<string> {
		return (await buildProject(input, true)).code
	}
}
