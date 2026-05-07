const container = document.getElementById("worldContainer");
const searchBox = document.getElementById("searchBox");

let worldsData = [];

fetch("./worlds.json")
    .then(res => res.json())
    .then(data => {

        worldsData = data;

        renderWorlds(data);
    });

function renderWorlds(data){

    container.innerHTML = "";

    data.forEach(world => {

        const tagsHTML = world.tags
            .map(tag => `<span class="tag">${tag}</span>`)
            .join("");

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <img src="${world.image}">
            <div class="card-content">
                <h2>${world.name}</h2>
                <p>${world.description}</p>

                <div class="tags">
                    ${tagsHTML}
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

/* タグ検索 */

searchBox.addEventListener("input", () => {

    const value =
        searchBox.value.toLowerCase();

    const filtered =
        worldsData.filter(world => {

            return world.tags.some(tag =>
                tag.toLowerCase().includes(value)
            );
        });

    renderWorlds(filtered);
});
