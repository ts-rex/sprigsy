<script>
	import CodeEditor from '$lib/CodeEditor.svelte'
	import Tab from '$lib/components/Tab.svelte'
	let tab = 'code'
	let code = ''
	function keypress() {
		debugger;
	}
</script>

<div class="flex h-full! w-full select-none flex-col bg-base-100">
	<nav class="flex flex-row">
		<Tab bind:tab>
			{#snippet _settings()}<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
					/>
				</svg>
			{/snippet}
			{#snippet _code()}Code{/snippet}
			{#snippet _test()}Test{/snippet}
			{#snippet _tunes()}Tunes{/snippet}
			{#snippet _sprites()}Sprites{/snippet}
			{#snippet _maps()}Maps{/snippet}
		</Tab>
		<div class="flex grow items-center justify-end">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
				/>
			</svg>
		</div>
	</nav>
	{#if tab === 'code'}
		<CodeEditor bind:code />
	{:else if ['tunes', 'sprites', 'maps'].includes(tab)}
		Not implemented
	{:else if tab === 'settings'}
		(Settings tab)
	{:else if tab === 'test'}
		This will have the game screen
	{/if}
</div>

<svelte:window on:keypress={keypress}></svelte:window>