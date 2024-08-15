/**
 * API for sprigsy
 * this is provided because your project has sprigsy v2 enabeled 
 */
declare namespace sprigsy {
    /**
     * Retrieve a sprite key for the sprite name
     * @param name Sprite name
     */
    function spriteKeyFor(name: string): string
}