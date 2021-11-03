<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
   * { page, fetch, session, stuff } = props
   * { host, path, params, query } = page
	 */
	export async function load({ page, fetch }) {
		const url = `/pages.json`;
		const res = await fetch(url);
		if (res.ok) return { props: { pages: await res.json() } }
		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>
<!-- Default Props -->
<script>
	export let pages
</script>

<ul>
	{#each pages as {id, title}}
		<li><a href="/{id}">{title}</a></li>
	{/each}
</ul>
