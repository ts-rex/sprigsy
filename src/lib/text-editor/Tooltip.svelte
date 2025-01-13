<script lang=ts>
	import type { HoverInfo } from "@valtown/codemirror-ts"

    let { info }: { info: HoverInfo } = $props();
    console.log(info)
</script>