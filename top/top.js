/* =========================
   top.json 読み込み
========================= */

fetch("./top.json")

    .then(response => response.json())

    .then(data => {

        console.log(
            "TOP PAGE LOADED",
            data
        );

        document.title =
            data.siteName || "VRC Manager";
    })

    .catch(error => {

        console.error(
            "TOP JSON ERROR:",
            error
        );
    });

/* =========================
   ボタンアニメーション
========================= */

const buttons =
    document.querySelectorAll(".menu-button");

buttons.forEach(button => {

    button.addEventListener("mouseenter", () => {

        button.animate(
            [
                {
                    transform:"translateY(0px)"
                },
                {
                    transform:"translateY(-4px)"
                }
            ],
            {
                duration:180,
                fill:"forwards"
            }
        );
    });

    button.addEventListener("mouseleave", () => {

        button.animate(
            [
                {
                    transform:"translateY(-4px)"
                },
                {
                    transform:"translateY(0px)"
                }
            ],
            {
                duration:180,
                fill:"forwards"
            }
        );
    });
});
