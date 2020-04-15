<style>
  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :global(body) {
    font-family: "Public Sans", sans-serif;
    font-weight: 500;
    overflow-y: scroll;
    letter-spacing: 0.01rem;
    color: #161616;
  }

  main {
    position: relative;
    max-width: 36rem;
    padding: 1rem;
    margin: 0 auto;
  }
</style>

<main>
  <slot />
</main>
