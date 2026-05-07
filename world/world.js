const container =
    document.getElementById("worldContainer");

const searchBox =
    document.getElementById("searchBox");

let worldsData = [];

/* =========================
   JSON読み込み
========================= */

fetch("./worlds.json")

    .then(response => response.json())

    .then(data => {

        worldsData = data;

        renderWorlds(worldsData);
    })

    .catch(error => {

        console.error(
            "JSON LOAD ERROR:",
            error
        );

        container.innerHTML = `
            <p style="
                color:red;
                padding:20px;
            ">
                Failed to load worlds.json
            </p>
        `;
    });

/* =========================
   カード生成
========================= */

function renderWorlds(data){

    container.innerHTML = "";

    if(data.length === 0){

        container.innerHTML = `
            <p style="
                opacity:0.7;
                padding:20px;
            ">
                No worlds found.
            </p>
        `;

        return;
    }

    data.forEach(world => {

        /* タグ生成 */

        const tagsHTML =
            world.tags
                .map(tag => {

                    return `
                        <span class="tag">
                            #${tag}
                        </span>
                    `;
                })
                .join("");

        /* カード生成 */

        const card =
            document.createElement("div");

        card.className = "card";

        card.innerHTML = `

            <div class="card-header">

                <a
                    href="${world.url}"
                    target="_blank"
                    class="url-button"
                >
                    URL
                </a>

                <h2>
                    ${world.name}
                </h2>

            </div>

            <img
                src="${world.image}"
                alt="${world.name}"
                loading="lazy"
            >

            <div class="card-footer">

                ${tagsHTML}

            </div>
        `;

        container.appendChild(card);
    });
}

/* =========================
   検索
========================= */

searchBox.addEventListener("input", () => {

    const value =
        searchBox.value
            .toLowerCase()
            .trim();

    if(value === ""){

        renderWorlds(worldsData);

        return;
    }

    const filtered =
        worldsData.filter(world => {

            /* 名前検索 */

            const nameMatch =
                world.name
                    .toLowerCase()
                    .includes(value);

            /* タグ検索 */

            const tagMatch =
                world.tags.some(tag =>

                    tag
                        .toLowerCase()
                        .includes(value)
                );

            return (
                nameMatch ||
                tagMatch
            );
        });

    renderWorlds(filtered);
});

/* =========================
   ESCで検索解除
========================= */

document.addEventListener("keydown", e => {

    if(e.key === "Escape"){

        searchBox.value = "";

        renderWorlds(worldsData);
    }
});
