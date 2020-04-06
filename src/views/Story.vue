<template>
    <div>
        <h2>Test</h2>
        {{id}}
        <h4>Id should be above</h4>
    </div>
</template>

<script>
  export default {
    name: "Story",
    props: {
      id: Number,
    }
  }
</script>

<style scoped>

</style>
