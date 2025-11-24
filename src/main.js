// ClickBattle 초기화
ClickBattle.init("YEWON");

let fur = 0;

const cat = document.getElementById("cat");
const furEl = document.getElementById("fur");
const gacha = document.getElementById("gacha");
const roomBtn = document.getElementById("room-btn");
const bookBtn = document.getElementById("book-btn");
const bubble = document.getElementById("bubble");

/* === 뽑기 팝업 요소 === */
const popup = document.getElementById("gacha-popup");
const popupCat = document.getElementById("popup-cat");
const popupRarity = document.getElementById("popup-rarity");
const popupName = document.getElementById("popup-name");
const popupClose = document.getElementById("popup-close");

/* === 고양이 데이터 === */
const cats = [
    {
        emoji: "ฅ^•ﻌ•^ฅ",
        name: "상냥냥",
        rate: 50,
        rarity: "Common",
        rarityClass: "rarity-common",
        firstLine: "나를 쓰다듬으라옹",
        line: "냐옹~"
    },
    {
        emoji: "(=ↀωↀ=)",
        name: "시크냥",
        rate: 30,
        rarity: "Uncommon",
        rarityClass: "rarity-uncommon",
        line: "야옹"
    },
    {
        emoji: "ฅ(・ω・ฅ)",   // ★ 변경된 활발냥
        name: "활발냥",
        rate: 15,
        rarity: "Rare",
        rarityClass: "rarity-rare",
        line: "먉악"
    },
    {
        emoji: "(=✧ω✧=)",
        name: "애교냥",
        rate: 4,
        rarity: "Epic",
        rarityClass: "rarity-epic",
        line: "먀앙"
    },
    {
        emoji: "(=｀ω´=)",
        name: "까칠냥",
        rate: 1,
        rarity: "Legendary",
        rarityClass: "rarity-legendary",
        line: "캬악!!"
    }
];

/* 대표 고양이 */
let mainCat = localStorage.getItem("mainCat") || "ฅ^•ﻌ•^ฅ";
cat.textContent = mainCat;

/* 보유 고양이 Set */
let owned = new Set(JSON.parse(localStorage.getItem("cats") || "[]"));

/* 말풍선 */
function showDialogue(text) {
    bubble.textContent = text;
    bubble.style.display = "block";
    bubble.style.opacity = 1;

    setTimeout(() => {
        bubble.style.opacity = 0;
        setTimeout(() => bubble.style.display = "none", 500);
    }, 2500);
}

/* 첫 멘트 */
const firstData = cats.find(c => c.emoji === mainCat) || cats[0];
showDialogue(firstData.firstLine ?? firstData.line);

/* 뽑기 버튼 활성화 */
function updateGachaButton() {
    if (fur >= 100) gacha.classList.add("active");
    else gacha.classList.remove("active");
}

/* 곡선으로 날아가는 털 */
function spawnCurvedFur(startX, startY) {
    const puff = document.createElement("div");
    puff.className = "fur-puff";
    puff.textContent = "☁️";
    puff.style.left = startX + "px";
    puff.style.top = startY + "px";
    document.body.appendChild(puff);

    const ctrlX = startX + (Math.random() * 60 - 30);
    const ctrlY = startY - 80 - Math.random() * 40;
    const endX = startX + (Math.random() * 80 - 40);
    const endY = startY - 140 - Math.random() * 40;

    let t = 0;
    const duration = 400;
    const startTime = performance.now();

    function animate(now) {
        const elapsed = now - startTime;
        t = Math.min(elapsed / duration, 1);

        const x = (1 - t) ** 2 * startX + 2 * (1 - t) * t * ctrlX + t ** 2 * endX;
        const y = (1 - t) ** 2 * startY + 2 * (1 - t) * t * ctrlY + t ** 2 * endY;

        puff.style.left = x + "px";
        puff.style.top = y + "px";
        puff.style.opacity = String(1 - t);

        if (t < 1) requestAnimationFrame(animate);
        else puff.remove();
    }

    requestAnimationFrame(animate);
}

/* 스마트 터치/클릭 방지 */
let lastTouchTime = 0;
function smartClick(handler) {
    return function (e) {
        const now = Date.now();

        if (e.type === "click" && now - lastTouchTime < 400) return;
        if (e.type === "touchstart") lastTouchTime = now;

        handler(e);
    };
}

/* 고양이 클릭 */
function handleCatTouch(e) {
    // 퐁! 팝 애니메이션
    cat.classList.add("cat-pop");
    setTimeout(() => cat.classList.remove("cat-pop"), 180);

    ClickBattle.recordClick();

    const touch = e.touches ? e.touches[0] : e;
    const x = touch.clientX;
    const y = touch.clientY;

    fur++;
    furEl.textContent = `☁️ : ${fur}개`;
    updateGachaButton();

    spawnCurvedFur(x, y);
}

cat.addEventListener("touchstart", smartClick(handleCatTouch));
cat.addEventListener("click", smartClick(handleCatTouch));

/* 팝업 */
popupClose.onclick = popupClose.ontouchstart = () => {
    popup.style.display = "none";
};

function showGachaPopup(catData, isFirst) {
    popupCat.textContent = catData.emoji;
    popupName.textContent = catData.name;

    popupRarity.className = "popup-rarity " + catData.rarityClass;
    popupRarity.textContent = isFirst
        ? `🌟New🌟 [${catData.rarity}]`
        : `[${catData.rarity}]`;

    popup.style.display = "flex";
}

/* === 뽑기 === */
function handleGacha() {
    if (fur < 100) return alert("☁️ 털이 부족하다옹!");

    ClickBattle.recordClick();

    fur -= 100;
    furEl.textContent = `☁️ : ${fur}개`;
    updateGachaButton();

    let rand = Math.random() * 100;
    let sum = 0;
    let result = cats[0];

    for (const c of cats) {
        sum += c.rate;
        if (rand < sum) {
            result = c;
            break;
        }
    }

    const isFirst = !owned.has(result.emoji);
    owned.add(result.emoji);
    localStorage.setItem("cats", JSON.stringify([...owned]));

    mainCat = result.emoji;
    localStorage.setItem("mainCat", mainCat);
    cat.textContent = mainCat;

    const dialogue = isFirst ? (result.firstLine ?? result.line) : result.line;
    showDialogue(dialogue);

    showGachaPopup(result, isFirst);
}

gacha.addEventListener("touchstart", smartClick(handleGacha));
gacha.addEventListener("click", smartClick(handleGacha));

/* 방 이동 */
roomBtn.addEventListener("touchstart", smartClick(() => location.href = "room.html"));
roomBtn.addEventListener("click", smartClick(() => location.href = "room.html"));

/* 도감 이동 */
bookBtn.addEventListener("touchstart", smartClick(() => location.href = "book.html"));
bookBtn.addEventListener("click", smartClick(() => location.href = "book.html"));

updateGachaButton();
