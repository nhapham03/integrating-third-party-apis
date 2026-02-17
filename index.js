async function fetchData() {
  const pokemonName = document
    .getElementById("pokemonName")
    .value.toLowerCase()
    .trim();
  const imgElement = document.getElementById("pokemonSprite");
  const imgElement2 = document.getElementById("pokemonSpriteShiny");

  // 1. Check for empty input
  if (!pokemonName) {
    alert("Please enter a Pokémon name.");
    return;
  }

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
    );

    // 2. Handle 404 or other HTTP errors
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Pokémon not found. Check your spelling!");
      }
      throw new Error("Something went wrong with the API.");
    }

    const data = await response.json();

    // 3. Validate Sprite existence
    const normalSprite = data.sprites.front_default;
    const shinySprite = data.sprites.front_shiny;

    if (normalSprite) {
      imgElement.src = normalSprite;
      imgElement.style.display = "block";
    } else {
      imgElement.style.display = "none"; // Hide if missing
    }

    if (shinySprite) {
      imgElement2.src = shinySprite;
      imgElement2.style.display = "block";
    } else {
      imgElement2.style.display = "none";
    }

    // Show containers only on success
    document.getElementById("normalContainer").classList.add("active");
    document.getElementById("shinyContainer").classList.add("active");
  } catch (error) {
    // 4. User-friendly error handling
    console.error("Error:", error.message);
    alert(error.message);

    // Reset display on error
    imgElement.style.display = "none";
    imgElement2.style.display = "none";
  }
}
