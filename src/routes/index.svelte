<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	const hello = writable(false);
	const randomFact = writable(false);
	const specificFact = writable(false);

	onMount(async () => {
		const {default:ApolloClient, gql, ...rest} = await import('apollo-boost');

		const HELLO = gql`
			{
				hello
			}
		`;

		const RANDOM_CAT_FACT = gql`
			{
				randomFact {
					_id
					text
				}
			}
		`;

		const SPECIFIC_CAT_FACT = gql`
			query Cat($factID: String!) {
				specificFact(factID: $factID) {
					_id
					text
				}
			}
		`;

		const client = new ApolloClient({
			uri: '.netlify/functions/graphql',
		});

		const r1 =	await client.query({
    	query: HELLO,
  	});
		
		hello.set(r1.data.hello);
		console.log(r1);

		const r2 =	await client.query({
    	query: RANDOM_CAT_FACT,
		});
		
		randomFact.set(r2.data.randomFact);
		console.log(r2);

		const r3 =	await client.query({
			query: SPECIFIC_CAT_FACT,
			variables: { factID: '591f9894d369931519ce358f' }
		});
		
		specificFact.set(r3.data.specificFact);
		console.log(r3);

	});

</script>

<style>
	

	h1 {
		text-align: left;
		font-size: 1rem;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 4rem 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	p {
		margin: 1em auto;
	}
</style>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<h1>Sapper, Svelte, Netlify, GraphQL</h1>

<h2>Hello</h2>
{#if $hello}
<p>{$hello}</p>
{:else}
<p>No hello for you...</p>
{/if}

<h2>Random Cat Fact</h2>
{#if $randomFact}
<p>{$randomFact.text}</p>
<p>id: {$randomFact._id}</p>
{:else}
<p>No random fact for you...</p>
{/if}

<h2>Specific Cat Fact</h2>
{#if $specificFact}
<p>{$specificFact.text}</p>
<p>id: {$specificFact._id}</p>
{:else}
<p>No specific fact for you...</p>
{/if}