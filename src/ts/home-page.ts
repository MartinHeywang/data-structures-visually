const body = document.body;

const hues = {
    "linked-list": 320,
    queue: 0,
    stack: 40,
    "hash-map": 80,
    "binary-search-tree": 120,
    heap: 320,
    "basic-graph-transversal": 0,
    hashing: 40,
    tries: 80,
    "advance-graphs": 120,
    "bit-manipulation": 0,
    "segment-tree": 40,
    "avl-tree": 80,
    "b-tree": 120,
};

const links = document.querySelectorAll(".structures-list a");
console.log(links);

links.forEach(a => {
    a.addEventListener("mouseover", () => {
        body.style.setProperty("--page-bgc", `hsl(${hues[a.id as keyof typeof hues] || 0}, 60%, 10%)`);
    });
    a.addEventListener("mouseleave", () => {
        body.style.removeProperty("--page-bgc");
    })
});

export {};
