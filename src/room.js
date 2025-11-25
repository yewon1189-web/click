/*****************************************
 *  Pixel Cat Room — ontouch + ClickBattle
 *****************************************/

// ClickBattle 초기화
ClickBattle.init("yewon");

const room = document.getElementById("room");
const back = document.getElementById("back");

/* === 터치/클릭 중복 방지 === */
let lastTouchTime = 0;
function smartClick(handler) {
    return function (e) {
        const now = Date.now();
        if (e.type === "click" && now - lastTouchTime < 400) return;
        if (e.type === "touchstart") lastTouchTime = now;

        handler(e);
    };
}

/* === 보유 고양이 불러오기 === */
let owned = JSON.parse(localStorage.getItem("cats") || "[]");

/* === 고양이 스폰 === */
owned.forEach(emoji => {
    const c = document.createElement("div");
    c.className = "cat";
    c.textContent = emoji;

    c.style.left = Math.random() * 80 + "%";
    c.style.top = Math.random() * 80 + "%";

    room.appendChild(c);

    /* === 클릭(터치)하면 하트 + 기록 === */
    function handleTouch(e) {
        ClickBattle.recordClick(); // 클릭 기록

        // ★ 고양이 퐁! 애니메이션
        c.classList.add("room-cat-pop");
        setTimeout(() => c.classList.remove("room-cat-pop"), 180);

        // 하트 표시
        const rect = c.getBoundingClientRect();
        const parent = room.getBoundingClientRect();

        const h = document.createElement("div");
        h.className = "heart";
        h.textContent = "♥";

        h.style.left = (rect.left - parent.left + rect.width / 2) + "px";
        h.style.top = (rect.top - parent.top - 5) + "px";

        room.appendChild(h);
        setTimeout(() => h.remove(), 1000);
    }


    c.addEventListener("touchstart", smartClick(handleTouch));
    c.addEventListener("click", smartClick(handleTouch)); // PC 테스트용 (터치는 click 무시됨)

    /* === 고양이 랜덤 이동 (2~5초 간격) === */
    const speed = Math.random() * 3000 + 2000;
    setInterval(() => {
        c.style.left = Math.random() * 80 + "%";
        c.style.top = Math.random() * 80 + "%";
    }, speed);
});

/* === 뒤로가기 === */
function goBack() {
    location.href = "index.html";
}
back.addEventListener("touchstart", smartClick(goBack));
back.addEventListener("click", smartClick(goBack));
