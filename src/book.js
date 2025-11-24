const listEl = document.getElementById("book-list");
const backBtn = document.getElementById("back");

/* 고양이 데이터 - main.js와 동일 구조 */
const cats = [
    {
        emoji: "ฅ^•ﻌ•^ฅ",
        name: "상냥냥",
        rarity: "Common",
        rarityClass: "rarity-common"
    },
    {
        emoji: "(=ↀωↀ=)",
        name: "시크냥",
        rarity: "Uncommon",
        rarityClass: "rarity-uncommon"
    },
    {
        emoji: "ฅ(・ω・ฅ)",
        name: "활발냥",
        rarity: "Rare",
        rarityClass: "rarity-rare"
    },
    {
        emoji: "(=✧ω✧=)",
        name: "애교냥",
        rarity: "Epic",
        rarityClass: "rarity-epic"
    },
    {
        emoji: "(=｀ω´=)",
        name: "까칠냥",
        rarity: "Legendary",
        rarityClass: "rarity-legendary"
    }
];

/* 보유 고양이 */
let owned = new Set(JSON.parse(localStorage.getItem("cats") || "[]"));

cats.forEach(catData => {
    const card = document.createElement("div");
    const isOwned = owned.has(catData.emoji);

    card.className = "card" + (isOwned ? "" : " card-locked");

    const catEl = document.createElement("div");
    catEl.className = "card-cat";
    catEl.textContent = isOwned ? catData.emoji : "？";

    const nameEl = document.createElement("div");
    nameEl.className = "card-name";
    nameEl.textContent = isOwned ? catData.name : "???";

    const rarityEl = document.createElement("div");
    rarityEl.className = "card-rarity " + catData.rarityClass;
    rarityEl.textContent = `[${catData.rarity}]`;

    const statusEl = document.createElement("div");
    statusEl.className = "card-status";
    statusEl.textContent = isOwned ? "획득 완료" : "아직 못 만났어요";

    card.appendChild(catEl);
    card.appendChild(nameEl);
    card.appendChild(rarityEl);
    card.appendChild(statusEl);

    listEl.appendChild(card);
});

function goBack() {
    location.href = "index.html";
}
backBtn.ontouchstart = goBack;
backBtn.onclick = goBack;
