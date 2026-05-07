fetch("./top.json")
    .then(response => response.json())
    .then(data => {
        console.log("Loaded:", data);
    })
    .catch(error => {
        console.error("JSON Load Error:", error);
    });
