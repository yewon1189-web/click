const listEl = document.getElementById("book-list");
const backBtn = document.getElementById("back");

/* 고양이 데이터 - main.js와 동일 구조 */
const cats = [

    /* Common */
    {
        emoji: "ฅ^•ﻌ•^ฅ",
        name: "상냥냥",
        rarity: "Common",
        rarityClass: "rarity-common"
    },
    {
        emoji: "( - ω - )",
        name: "피곤냥",
        rarity: "Common",
        rarityClass: "rarity-common"
    },

    /* Uncommon */
    {
        emoji: "(=ↀωↀ=)",
        name: "시크냥",
        rarity: "Uncommon",
        rarityClass: "rarity-uncommon"
    },
    {
        emoji: "(=°ω°=)",
        name: "놀랐냥",
        rarity: "Uncommon",
        rarityClass: "rarity-uncommon"
    },
    {
        emoji: "(=✧ω✧=)",
        name: "애교냥",
        rarity: "Uncommon",
        rarityClass: "rarity-uncommon"
    },

    /* Rare */
    {
        emoji: "ฅ(・ω・ฅ)",
        name: "활발냥",
        rarity: "Rare",
        rarityClass: "rarity-rare"
    },
    {
        emoji: "(=｀ω´=)",
        name: "까칠냥",
        rarity: "Rare",
        rarityClass: "rarity-rare"
    },

    /* Epic */
    {
        emoji: "(ﾉΦωΦ)ﾉ",
        name: "말썽냥",
        rarity: "Epic",
        rarityClass: "rarity-epic"
    },
    {
        emoji: "(=ΦωΦ=)",
        name: "유령냥",
        rarity: "Epic",
        rarityClass: "rarity-epic"
    },

    /* Legendary */
    {
        emoji: "U´ᴥ`U",
        name: "강냥이",
        rarity: "Legendary",
        rarityClass: "rarity-legendary"
    }
];

/* 🟡 정렬 우선순위 설정 */
const order = {
    "Common": 1,
    "Uncommon": 2,
    "Rare": 3,
    "Epic": 4,
    "Legendary": 5
};

/* 보유 고양이 */
let owned = new Set(JSON.parse(localStorage.getItem("cats") || "[]"));

/* ✨ 도감 정렬 적용해서 표시 */
cats
    .sort((a, b) => order[a.rarity] - order[b.rarity]) // ★ 등급 순 정렬
    .forEach(catData => {

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
