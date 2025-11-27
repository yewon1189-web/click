/*******************************
 *   CLICKING CAT MAIN SCRIPT
 *******************************/

// 변수들
let fur = 0;

const cat = document.getElementById("cat");
const furEl = document.getElementById("fur");
const gacha = document.getElementById("gacha");
const roomBtn = document.getElementById("room-btn");
const bookBtn = document.getElementById("book-btn");
const bubble = document.getElementById("bubble");

/* === 뽑기 팝업 === */
const popup = document.getElementById("gacha-popup");
const popupCat = document.getElementById("popup-cat");
const popupRarity = document.getElementById("popup-rarity");
const popupName = document.getElementById("popup-name");
const popupClose = document.getElementById("popup-close");
const popupToBook = document.getElementById("popup-to-book");
const popupContent = document.querySelector(".popup-content");

/* === 고양이 데이터 === */
const cats = [
    /* COMMON */
    {
        emoji: "ฅ^•ﻌ•^ฅ",
        name: "상냥냥",
        rate: 30,
        rarity: "Common",
        rarityClass: "rarity-common",
        firstLine: "나를 쓰다듬으라옹",
        line: "냐옹~",
        tutorialLines: [
            "안녕! 반갑다냥!",
            "이 게임은 날 쓰다듬고 나온",
            "털을 모아서",
            "여러 종류의 고양이 친구들을",
            "모으는 게임이다냥!",
            "빨리 날 쓰다듬어 주라냥!"
        ]
    },
    {
        emoji: "( - ω - )",
        name: "피곤냥",
        rate: 12,
        rarity: "Common",
        rarityClass: "rarity-common",
        line: "하암…"
    },

    /* UNCOMMON */
    {
        emoji: "(=ↀωↀ=)",
        name: "시크냥",
        rate: 20,
        rarity: "Uncommon",
        rarityClass: "rarity-uncommon",
        line: "야옹"
    },
    {
        emoji: "(=°ω°=)",
        name: "놀랐냥",
        rate: 10,
        rarity: "Uncommon",
        rarityClass: "rarity-uncommon",
        line: "므아!!!"
    },
    {
        emoji: "(=✧ω✧=)",
        name: "애교냥",
        rate: 2,
        rarity: "Uncommon",
        rarityClass: "rarity-uncommon",
        line: "먀앙"
    },

    /* RARE */
    {
        emoji: "ฅ(・ω・ฅ)",
        name: "활발냥",
        rate: 10,
        rarity: "Rare",
        rarityClass: "rarity-rare",
        line: "먉악"
    },
    {
        emoji: "(=｀ω´=)",
        name: "까칠냥",
        rate: 1,
        rarity: "Rare",
        rarityClass: "rarity-rare",
        line: "캬악!!"
    },

    /* EPIC */
    {
        emoji: "(ﾉΦωΦ)ﾉ",
        name: "말썽냥",
        rate: 4,
        rarity: "Epic",
        rarityClass: "rarity-epic",
        line: "미야앍!!!"
    },
    {
        emoji: "(=ΦωΦ=)",
        name: "유령냥",
        rate: 6,
        rarity: "Epic",
        rarityClass: "rarity-epic",
        line: "보였냥…?"
    },

    /* LEGENDARY */
    {
        emoji: "U´ᴥ`U",
        name: "강냥이",
        rate: 5,
        rarity: "Legendary",
        rarityClass: "rarity-legendary",
        line: "멍! …아니 냥!"
    }
];

/* === 현재 대표 고양이 === */
let mainCat = localStorage.getItem("mainCat") || "ฅ^•ﻌ•^ฅ";
cat.textContent = mainCat;

/* === 보유 고양이 === */
let owned = new Set(JSON.parse(localStorage.getItem("cats") || "[]"));

/* === 말풍선 === */
function showDialogue(text) {
    bubble.textContent = text;
    bubble.style.display = "block";
    bubble.style.opacity = 1;

    setTimeout(() => {
        bubble.style.opacity = 0;
        setTimeout(() => bubble.style.display = "none", 300);
    }, 2000);
}

/* === 타자기 효과 === */
function typeWriter(text) {
    return new Promise(resolve => {
        bubble.textContent = "";
        bubble.style.display = "block";
        bubble.style.opacity = 1;

        let i = 0;

        function typing() {
            if (i < text.length) {
                bubble.textContent += text[i];
                i++;
                setTimeout(typing, 45);
            } else {
                setTimeout(() => {
                    bubble.style.opacity = 0;
                    setTimeout(() => {
                        bubble.style.display = "none";
                        resolve();
                    }, 400);
                }, 900);
            }
        }

        typing();
    });
}

/* === 첫 등장 멘트 === */
function showFirstGreeting() {
    const firstData = cats.find(c => c.emoji === mainCat) || cats[0];
    showDialogue(firstData.firstLine ?? firstData.line);
}

/* === 튜토리얼 === */
let tutorialShown = localStorage.getItem("tutorialShown") === "true";

if (!tutorialShown && mainCat === "ฅ^•ﻌ•^ฅ") {

    const overlay = document.getElementById("tutorial-overlay");
    const catInfo = cats.find(c => c.emoji === "ฅ^•ﻌ•^ฅ");
    const lines = catInfo.tutorialLines;

    overlay.style.display = "block";
    cat.classList.add("tutorial-highlight");
    bubble.classList.add("tutorial-top");

    async function runTutorial() {
        for (let line of lines) {
            await typeWriter(line);
        }

        overlay.style.display = "none";
        cat.classList.remove("tutorial-highlight");
        bubble.classList.remove("tutorial-top");

        localStorage.setItem("tutorialShown", "true");
        showFirstGreeting();
    }

    setTimeout(runTutorial, 500);
} else {
    showFirstGreeting();
}

/* === 가챠 버튼 상태 === */
function updateGachaButton() {
    if (fur >= 50) gacha.classList.add("active");
    else gacha.classList.remove("active");
}

/* === 곡선 털 드랍 === */
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

/* === 스마트 클릭 === */
let lastTouchTime = 0;
function smartClick(handler) {
    return function (e) {
        const now = Date.now();
        if (e.type === "click" && now - lastTouchTime < 400) return;
        if (e.type === "touchstart") lastTouchTime = now;

        handler(e);
    };
}

/***********************
 *     메인 고양이 클릭
 ***********************/
function handleCatTouch(e) {
    cat.classList.add("cat-pop");
    setTimeout(() => cat.classList.remove("cat-pop"), 180);

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

/***********************
 *  팝업 버튼 (수정됨)
 ***********************/
function closePopup(e) {
    e.stopPropagation();
    popup.style.display = "none";
}
popupClose.addEventListener("click", closePopup);
popupClose.addEventListener("touchstart", closePopup);

function goToBook(e) {
    e.stopPropagation();
    location.href = "book.html";
}
popupToBook.addEventListener("click", goToBook);
popupToBook.addEventListener("touchstart", goToBook);

/* 팝업 내용 클릭 차단 */
popupContent.addEventListener("click", e => e.stopPropagation());
popupContent.addEventListener("touchstart", e => e.stopPropagation());

/***********************
 *         뽑기
 ***********************/
function handleGacha() {

    if (fur < 50) return alert("☁️ 털이 부족하다옹!");

    fur -= 50;
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

    showDialogue(isFirst ? (result.firstLine ?? result.line) : result.line);

    showGachaPopup(result, isFirst);
}

function showGachaPopup(catData, isFirst) {
    popupCat.textContent = catData.emoji;
    popupName.textContent = catData.name;

    popupRarity.className = "popup-rarity " + catData.rarityClass;
    popupRarity.textContent = isFirst
        ? `🌟New🌟 [${catData.rarity}]`
        : `[${catData.rarity}]`;

    if (isFirst) {
        popupToBook.style.display = "block";
        popupClose.style.display = "none";
    } else {
        popupToBook.style.display = "none";
        popupClose.style.display = "block";
    }

    popup.style.display = "flex";
}

gacha.addEventListener("touchstart", smartClick(handleGacha));
gacha.addEventListener("click", smartClick(handleGacha));

/***********************
 *  이동 / 도감 버튼
 ***********************/
roomBtn.addEventListener("touchstart", smartClick(() => location.href = "room.html"));
roomBtn.addEventListener("click", smartClick(() => location.href = "room.html"));

bookBtn.addEventListener("touchstart", smartClick(() => location.href = "book.html"));
bookBtn.addEventListener("click", smartClick(() => location.href = "book.html"));

updateGachaButton();
