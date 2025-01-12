/**
 * API for sprigsy
 * this is provided because your project has sprigsy v2 enabeled
 */
declare namespace sprigsy {
	export interface FullSprigsyAPI {
		/**
		 * Retrieve a sprite key for the sprite name
		 * @param name Sprite name
		 */
		spriteKeyFor(name: string): string;
	}
}
