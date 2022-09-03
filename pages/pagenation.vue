<script setup lang="ts">
const { data: pokemons } = await useFetch('https://pokeapi.co/api/v2/pokemon/')
const onClick = async () => {
  const { data } = await useFetch(pokemons.value.next)
  watchEffect(() => {
    pokemons.value = data.value
  })
}
</script>

<template>
	<div>
		<ul v-for="pokemon in pokemons.results">
			<li>{{ pokemon.name }}</li>
		</ul>
		<p>{{ pokemons.next }}</p>
		<div @click="onClick">Next</div>
	</div>
</template>