<script context="module">
	import _ from 'lodash/fp'
  /**
	 * @type {import('@sveltejs/kit').Load}
   * { page, fetch, session, stuff } = props
   * { host, path, params, query } = page
	 */
	export async function load({ page, fetch }) {
		const url = `/${page.params.slug}.json`;
		const res = await fetch(url);

		if (res.ok) {
      const data = await res.json()
			return {
				props: _.pick(['title', 'content'], data)
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<!-- Default Props -->
<script>
  import SvelteMarkdown from 'svelte-markdown'
	export let title
  export let content
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<SvelteMarkdown source={content} />
