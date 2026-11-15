const text = `Someone has been secretly preparing
something special just for you...

And no, it's not your future husband.

Unfortunately, it's me. HAHAHA 😭💗

Ready to see what I've made for you?`;

let index = 0;

function typeText() {
    if (index < text.length) {
        document.getElementById("typing-text").textContent += text[index];
        index++;

        setTimeout(typeText, 45);
    }
}

window.onload = typeText;

function startSurprise() {
    const container = document.querySelector(".container");

    container.innerHTML = `
        <div class="heart">🎁</div>

        <h1>WAIT A MINUTE!</h1>

        <p>
            Sebelum lanjut...<br><br>

            Kamu yakin mau buka surprise ini?<br><br>

            Soalnya yang bikin agak nyebelin,
            tapi sayang banget sama kamu. 🤭
        </p>

        <button onclick="nextPage()">
            YES, I'M READY 💗
        </button>
    `;
}

function nextPage() {
    startChat();
}

/* =========================
   PAGE 2 - FAKE CHAT
========================= */

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

let chatBusy = false;

function startChat() {
    document.body.classList.add("chat-mode");

    const container = document.getElementById("main-container");

    container.outerHTML = `
        <div class="chat-wrapper" id="chat-wrapper">

            <div class="chat-header">

                <div class="chat-avatar">💗</div>

                <div class="chat-info">
                    <h3>Laili ♡</h3>
                    <span>online</span>
                </div>

            </div>

            <div class="chat-messages" id="chat-messages"></div>

            <div class="chat-options" id="chat-options"></div>

        </div>
    `;

    playChat();
}

async function addMessage(text, type = "received") {
    const chat = document.getElementById("chat-messages");

    const typing = document.createElement("div");
    typing.className = "typing-indicator";
    typing.textContent = "typing...";

    if (type === "received") {
        chat.appendChild(typing);
        chat.scrollTop = chat.scrollHeight;

        await sleep(900);

        typing.remove();
    }

    const message = document.createElement("div");

    message.className = `message ${type}`;
    message.textContent = text;

    chat.appendChild(message);
    chat.scrollTop = chat.scrollHeight;

    await sleep(650);
}

function showOptions(options) {
    const box = document.getElementById("chat-options");

    box.innerHTML = "";

    options.forEach(option => {
        const button = document.createElement("button");

        button.textContent = option.text;

        button.onclick = () => option.action();

        box.appendChild(button);
    });
}

async function playChat() {
    await addMessage("PINGKANNNNN 😭💗");

    await addMessage("Kamu sibuk nggak?");

    await addMessage("Eh, nggak penting sih. Dengerin aku dulu HAHAHA.");

    await addMessage("Kamu tahu nggak hari ini hari apa? 🤨");

    showOptions([
        {
            text: "Hari Sabtu? 😭",
            action: () => answerChat(1)
        },
        {
            text: "Hari ulang tahunku dong! 🎂",
            action: () => answerChat(2)
        },
        {
            text: "Hari kamu kangen aku? 🤭",
            action: () => answerChat(3)
        }
    ]);
}

async function answerChat(choice) {
    if (chatBusy) return;

    chatBusy = true;

    document.getElementById("chat-options").innerHTML = "";

    if (choice === 1) {
        await addMessage("Hari Sabtu? 😭", "sent");

        await addMessage("YA ALLAH PINGKAN 😭");

        await addMessage("Masa hari spesial kamu sendiri lupa sih HAHAHA.");
    }

    if (choice === 2) {
        await addMessage("Hari ulang tahunku dong! 🎂", "sent");

        await addMessage("NAHHH PINTER BANGET CEWEK SATU INI 😭💗");

        await addMessage("Aku kira kamu bakal jawab yang aneh-aneh.");
    }

    if (choice === 3) {
        await addMessage("Hari kamu kangen aku? 🤭", "sent");

        await addMessage("IH PEDE BANGET SIH KAMU 😭");

        await addMessage("Tapi... emang iya sih. Dikit doang ya 🤭");
    }

    await addMessage("Anyway...");

    await addMessage("HAPPY 21ST BIRTHDAY, PINGKAN! 🎂💗");

    await addMessage("Another year older, but still my favorite troublemaker.");

    await addMessage("Aku sebenernya punya sesuatu buat kamu...");

    await addMessage("Tapi nggak gratis dong. Harus usaha dulu 😌");

    showOptions([
        {
            text: "APAAA? KASIH SEKARANG 😭🎁",
            action: continueToGame
        },
        {
            text: "Ih, Laili nyebelin banget 😒",
            action: continueToGame
        }
    ]);

    chatBusy = false;
}

async function continueToGame() {
    if (chatBusy) return;

    chatBusy = true;

    document.getElementById("chat-options").innerHTML = "";

    await addMessage("Yaudah deh, aku siap! 🎁", "sent");

    await addMessage("HAHAHA sabar dong, cantik 🤭");

    await addMessage("Let's see how good you are at games!");

    showOptions([
    {
        text: "START THE BIRTHDAY QUEST 🎮",
        action: startBirthdayQuest
    }
    ]);

    chatBusy = false;
}

/* =========================
   PAGE 3 - BIRTHDAY QUEST
========================= */

let gameScore = 0;
let gameTime = 30;
let gameTimer;
let heartSpawner;
let quizIndex = 0;
let quizScore = 0;

function startBirthdayQuest() {
    document.body.classList.remove("chat-mode");
    document.body.classList.add("game-mode");

    document.getElementById("chat-wrapper").outerHTML = `
        <div class="game-container" id="game-container">
            <h1>🎮 THE BIRTHDAY QUEST</h1>
            <p>Ready for a little challenge, Pingkan? 🤭</p>
            <div class="game-progress">LEVEL 1 / 3</div>
            <button onclick="startHeartGame()">LET'S PLAY 💗</button>
        </div>
    `;
}

/* GAME 1 - CATCH HEARTS */

function startHeartGame() {
    gameScore = 0;
    gameTime = 30;

    document.getElementById("game-container").innerHTML = `
        <h1>💗 Catch My Love</h1>
        <p>Catch 10 hearts before time runs out!</p>

        <div class="game-progress">LEVEL 1 / 3</div>

        <div class="game-stats">
            <span>💗 Score: <span id="heart-score">0</span>/10</span>
            <span>⏰ Time: <span id="heart-time">30</span>s</span>
        </div>

        <div class="game-area" id="game-area"></div>
    `;

    heartSpawner = setInterval(spawnHeart, 650);

    gameTimer = setInterval(() => {
        gameTime--;
        document.getElementById("heart-time").textContent = gameTime;

        if (gameTime <= 0) {
            clearInterval(gameTimer);
            clearInterval(heartSpawner);

            if (gameScore < 10) {
                document.getElementById("game-container").innerHTML = `
                    <h1>HAHAHA PINGKAN 😭</h1>
                    <p>Masa nangkep hati aku aja susah sih?</p>
                    <button onclick="startHeartGame()">TRY AGAIN 💗</button>
                `;
            }
        }
    }, 1000);
}

function spawnHeart() {
    const area = document.getElementById("game-area");

    if (!area) return;

    const heart = document.createElement("div");
    heart.className = "falling-heart";
    heart.textContent = "💗";

    heart.style.left = Math.random() * 85 + "%";

    heart.onclick = () => {
        heart.remove();
        gameScore++;

        document.getElementById("heart-score").textContent = gameScore;

        if (gameScore >= 10) {
            clearInterval(gameTimer);
            clearInterval(heartSpawner);

            document.getElementById("game-container").innerHTML = `
                <h1>LEVEL 1 COMPLETE! 🎉</h1>
                <p>Wahhh, jago juga kamu nangkep hati aku 🤭</p>
                <button onclick="startQuiz()">NEXT LEVEL →</button>
            `;
        }
    };

    area.appendChild(heart);

    setTimeout(() => heart.remove(), 3000);
}

/* GAME 2 - QUIZ */

const quizQuestions = [
    {
        question: "Siapa orang paling nyebelin tapi kamu sayang?",
        options: ["Laili", "Laili juga", "Ya Laili lah 😭"],
        correct: 2
    },
    {
        question: "Kalau Laili tiba-tiba hilang, kamu bakal?",
        options: [
            "Cariin sampai ketemu",
            "Santai aja",
            "Pura-pura nggak kangen"
        ],
        correct: 0
    },
    {
        question: "Apa kelemahan terbesar Laili?",
        options: [
            "Makanan",
            "Kamu 🤭",
            "Tidur"
        ],
        correct: 1
    },
    {
        question: "Kalau Laili ngambek, kamu harus?",
        options: [
            "Biarin aja",
            "Bujuk sampai senyum",
            "Ikutan ngambek"
        ],
        correct: 1
    },
    {
        question: "Seberapa spesial Pingkan buat Laili?",
        options: [
            "Biasa aja",
            "Lumayan",
            "Nggak bisa dihitung 💗"
        ],
        correct: 2
    }
];

function startQuiz() {
    quizIndex = 0;
    quizScore = 0;
    showQuestion();
}

function showQuestion() {
    const q = quizQuestions[quizIndex];

    let html = `
        <h1>🧠 How Well Do You Know Me?</h1>
        <div class="game-progress">
            LEVEL 2 / 3 — QUESTION ${quizIndex + 1}/5
        </div>
        <p>${q.question}</p>
    `;

    q.options.forEach((option, index) => {
        html += `
            <button class="quiz-option"
                onclick="answerQuiz(${index})">
                ${option}
            </button>
        `;
    });

    document.getElementById("game-container").innerHTML = html;
}

function answerQuiz(answer) {
    const q = quizQuestions[quizIndex];

    if (answer === q.correct) {
        quizScore++;
    } else {
        alert("SALAHHH 😭 Tapi gapapa, kamu tetap lucu kok.");
    }

    quizIndex++;

    if (quizIndex < quizQuestions.length) {
        showQuestion();
    } else {
        document.getElementById("game-container").innerHTML = `
            <h1>QUIZ COMPLETE! 🎉</h1>
            <p>Your score: ${quizScore}/5</p>
            <p>Not bad, Pingkan! 🤭</p>
            <button onclick="startSecretCode()">FINAL LEVEL 🔐</button>
        `;
    }
}

/* GAME 3 - SECRET CODE */

function startSecretCode() {
    document.getElementById("game-container").innerHTML = `
        <h1>🔐 Unlock My Secret</h1>

        <div class="game-progress">LEVEL 3 / 3</div>

        <p>
            Hint: The day and month a very special girl was born. 🎂
        </p>

        <br>

        <input
            type="text"
            id="secret-code"
            class="secret-input"
            maxlength="4"
            placeholder="••••"
        >

        <br>

        <button onclick="checkSecretCode()">UNLOCK 💗</button>
    `;
}

function checkSecretCode() {
    const code = document.getElementById("secret-code").value;

    if (code === "2111") {
        showAchievement();
    } else {
        alert("WRONG CODE 😭 Masa ulang tahun sendiri lupa sih?");
    }
}

/* ACHIEVEMENT */

function showAchievement() {
    document.getElementById("game-container").innerHTML = `
        <div class="achievement">🏆</div>

        <h1>MISSION COMPLETE!</h1>

        <p>
            Congratulations, Pingkan! 🎉<br><br>
            You've officially unlocked<br>
            THE BIRTHDAY SURPRISE! 🎁
        </p>

        <button onclick="startGiftPage()">
            OPEN MY GIFTS →
        </button>
    `;
}

/* ==================================
   PAGE 4 - FIVE LITTLE SURPRISES
================================== */

let openedGifts = new Set();

const gifts = [
    {
        id: 1,
        emoji: "🎀",
        title: "Things I Adore About You",

        message: `Five things I adore about you, Pingkan ♡

1. The way you make ordinary conversations feel special.

2. Your random little reactions that somehow always make me smile.

3. How you can be annoying and adorable at the same time.

4. The way you make people feel comfortable just by being yourself.

5. And lastly... the fact that you're YOU.

Don't change too much, okay?
I kinda like this version of you. 🤭💗`
    },

    {
        id: 2,
        emoji: "💌",
        title: "Open When You're Sad",

        message: `Hey, pretty girl...

Kalau suatu hari kamu lagi capek, sedih, atau ngerasa semuanya terlalu berat, I hope you remember this.

You don't always have to be strong.

Nggak apa-apa kalau kamu mau nangis.
Nggak apa-apa kalau kamu butuh waktu sendiri.

But please, don't ever think you're alone.

Even on days when you don't feel like yourself, you're still someone worth loving and appreciating.

And if the world gets a little too loud, you can always come bother me.

I'll pretend to be annoyed, but you know I won't mind. 🤍`
    },

    {
        id: 3,
        emoji: "🤭",
        title: "Our Silly Little Moments",

        message: `Dear Pingkan,

Aku nggak tahu gimana caranya kita bisa ngobrol dari hal penting sampai hal paling random sedunia HAHAHA.

Kadang saling goda.
Kadang ngambek.
Kadang cemburu nggak jelas.
Kadang cuma ketawa karena hal receh.

But somehow, those little moments became some of my favorite memories.

And honestly?

Kalau disuruh milih teman buat diajak ngobrol random sampai lupa waktu...

I think I'd still choose you.

Tapi jangan geer dulu ya. 😌💗`
    },

    {
        id: 4,
        emoji: "🌷",
        title: "Wishes for Your Future",

        message: `Happy 21st birthday, Pingkan 🌷

I hope this new chapter of your life treats you gently.

Semoga semua hal baik yang kamu tunggu pelan-pelan datang menghampiri kamu.

Semoga langkah kamu selalu dipermudah, impian kamu satu per satu tercapai, dan hati kamu selalu punya alasan buat bahagia.

I hope you find success in everything you work hard for.

And most importantly...

I hope you never lose that beautiful little spark that makes you who you are.

You deserve so many beautiful things in this life. 🤍`
    },

    {
        id: 5,
        emoji: "🔐",
        title: "A Secret I Never Told You",

        message: `Okay, Pingkan...

This one is a little different.

Aku mungkin sering bercanda, godain kamu, atau pura-pura nyebelin.

But there's something I genuinely want you to know.

I'm really grateful that life allowed me to meet you.

I don't know what the future holds for either of us.

Maybe we'll get busier.
Maybe life will take us to different places.

But I hope that no matter how much things change, we'll always have a little space for each other.

Because somewhere along the way...

You became someone I genuinely care about.

And I'm glad it's you.

Happy birthday, my favorite troublemaker.

With love,
Laili ♡`
    }
];

/* START GIFT PAGE */

function startGiftPage() {
    document.body.classList.remove("game-mode");
    document.body.classList.add("gift-mode");

    const gameContainer =
        document.getElementById("game-container");

    gameContainer.outerHTML = `
        <div class="gift-container" id="gift-container">

            <h1>🎁 Five Little Surprises</h1>

            <p>
                Just for you, Pingkan ♡<br><br>

                You've completed the birthday quest!<br>
                But your adventure isn't over yet.

                <br><br>

                I prepared five little gifts for you.<br>
                Open them one by one, okay? 🤭
            </p>

            <div class="gift-progress" id="gift-progress">
                0 / 5 Gifts Opened
            </div>

            <div class="gift-grid" id="gift-grid"></div>

            <div id="gift-next"></div>

        </div>
    `;

    openedGifts = new Set();

    renderGifts();
}

/* DISPLAY GIFTS */

function renderGifts() {
    const grid = document.getElementById("gift-grid");

    grid.innerHTML = "";

    gifts.forEach(gift => {
        const isOpened = openedGifts.has(gift.id);

        const isLocked =
            gift.id === 5 &&
            openedGifts.size < 4 &&
            !isOpened;

        const card = document.createElement("div");

        card.className = `
            gift-card
            ${isOpened ? "opened" : ""}
            ${isLocked ? "locked" : ""}
        `;

        card.innerHTML = `
            <div class="gift-card-inner">

                <div class="gift-front">
                    <div class="gift-emoji">
                        ${isLocked ? "🔒" : gift.emoji}
                    </div>

                    <div class="gift-title">
                        Gift ${gift.id}
                    </div>
                </div>

                <div class="gift-back">
                    <div class="gift-emoji">💗</div>

                    <div class="gift-title">
                        ${gift.title}
                    </div>
                </div>

            </div>
        `;

        card.onclick = () => openGift(gift.id);

        grid.appendChild(card);
    });

    updateGiftProgress();
}

/* OPEN GIFT */

function openGift(id) {
    if (id === 5 && openedGifts.size < 4) {
        alert(
            "EITSSS PINGKAN 😭\n\n" +
            "Mau buka yang paling spesial duluan?\n" +
            "Sabar dong, cantik!\n\n" +
            "Buka empat hadiah lainnya dulu ya 🤭"
        );

        return;
    }

    const gift = gifts.find(item => item.id === id);

    openedGifts.add(id);

    renderGifts();

    showGiftModal(gift);

    if (openedGifts.size === 5) {
        unlockNextPage();
    }
}

/* SHOW MESSAGE MODAL */

function showGiftModal(gift) {
    const modal = document.createElement("div");

    modal.className = "gift-modal";
    modal.id = "gift-modal";

    modal.innerHTML = `
        <div class="gift-modal-content">

            <div class="gift-emoji">
                ${gift.emoji}
            </div>

            <h2>${gift.title}</h2>

            <p>${gift.message}</p>

            <button onclick="closeGiftModal()">
                CLOSE WITH LOVE ♡
            </button>

        </div>
    `;

    document.body.appendChild(modal);
}

/* CLOSE MODAL */

function closeGiftModal() {
    const modal = document.getElementById("gift-modal");

    if (modal) {
        modal.remove();
    }
}

/* UPDATE PROGRESS */

function updateGiftProgress() {
    const progress =
        document.getElementById("gift-progress");

    progress.textContent =
        `${openedGifts.size} / 5 Gifts Opened`;
}

/* UNLOCK NEXT PAGE */

function unlockNextPage() {
    const next = document.getElementById("gift-next");

    next.innerHTML = `
        <div style="margin-top:30px;">

            <h2 style="color:#d96f9c;">
                ALL GIFTS UNLOCKED! 🎉
            </h2>

            <p>
                You thought that was everything?<br><br>

                Oh, sweetheart...<br>
                We're not done yet. 🤭
            </p>

            <button onclick="nextUniversePage()">
                ENTER OUR LITTLE UNIVERSE 🌌
            </button>

        </div>
    `;
}

/* PAGE 5 PLACEHOLDER */

function nextUniversePage() {
    startUniverse();
}

/* ==================================
   PAGE 5 - OUR LITTLE UNIVERSE
================================== */

let visitedStars = new Set();

const universeMemories = [
    {
        id: 1,
        icon: "⭐",
        title: "The Beginning",

        message: `Every friendship has a beginning.

And somehow, ours became a little story of its own.

Aku nggak pernah nyangka kalau seseorang yang awalnya cuma aku kenal biasa aja, lama-lama bisa jadi seseorang yang begitu berarti.

I'm glad our paths crossed, Pingkan.

Because meeting you was one of those little surprises life gave me. 🤍`
    },

    {
        id: 2,
        icon: "💫",
        title: "Little Happiness",

        message: `You know what?

Sometimes happiness isn't about big things.

Kadang cuma dari chat random, bercanda nggak jelas, atau saling ganggu tanpa alasan.

And somehow, you make those ordinary moments feel a little more special.

Thank you for being one of my little reasons to smile. 💗`
    },

    {
        id: 3,
        icon: "🌷",
        title: "Things I Appreciate",

        message: `Ada banyak hal kecil tentang kamu yang mungkin nggak kamu sadari.

The way you listen.
The way you care.
The way you stay.

Aku mungkin nggak selalu bilang, tapi aku benar-benar menghargai semua itu.

Thank you for being you, Pingkan. 🌷`
    },

    {
        id: 4,
        icon: "🌙",
        title: "Even on Difficult Days",

        message: `Hey, Pingkan...

I know not every day is easy.

Ada hari di mana kamu mungkin capek, sedih, atau cuma pengen diam.

But I hope you remember that you don't have to face everything alone.

Kalau kamu butuh teman cerita, aku ada.

Kalau kamu cuma mau ditemenin tanpa banyak bicara, itu juga nggak apa-apa.

You deserve kindness, even on your hardest days. 🤍`
    },

    {
        id: 5,
        icon: "💗",
        title: "Our Little Promise",

        message: `I don't know what tomorrow will bring.

Mungkin nanti kita makin sibuk dengan kehidupan masing-masing.

But I hope we'll never become strangers.

Semoga kita tetap bisa saling cerita, saling goda, dan ketawa karena hal-hal random.

No matter where life takes us, I hope this friendship stays special.

Promise? 🤍`
    },

    {
        id: 6,
        icon: "✨",
        title: "The Brightest Star",

        message: `Out of billions of stars in this universe...

Somehow, you became one of my favorites.

Bukan karena kamu harus selalu sempurna.

Bukan karena kamu harus selalu ceria.

But simply because you're you.

And if I could wish upon a star tonight...

I'd wish for you to always find happiness, even in the smallest things.

Happy birthday, my little star.

Keep shining, Pingkan. ✨

— Laili ♡`
    }
];

/* START UNIVERSE */

function startUniverse() {
    document.body.classList.remove("gift-mode");
    document.body.classList.add("universe-mode");

    const giftContainer =
        document.getElementById("gift-container");

    giftContainer.outerHTML = `
        <div class="universe-container" id="universe-container">

            <h1>🌌 Our Little Universe</h1>

            <p>
                Welcome to our little universe, Pingkan ♡
                <br><br>
                Every star holds a little piece of something
                I want you to know.
                <br><br>
                Tap the stars and discover them all. ✨
            </p>

            <div class="universe-progress" id="universe-progress">
                0 / 6 Stars Discovered
            </div>

            <div class="universe-scene" id="universe-scene">

                <div class="universe-planet"></div>

            </div>

            <div id="universe-next"></div>

        </div>
    `;

    visitedStars = new Set();

    renderUniverseStars();
}

/* RENDER STARS */

function renderUniverseStars() {
    const scene = document.getElementById("universe-scene");

    scene.querySelectorAll(".memory-star").forEach(star => {
        star.remove();
    });

    universeMemories.forEach(memory => {
        const isVisited = visitedStars.has(memory.id);

        const isLocked =
            memory.id === 6 &&
            visitedStars.size < 5 &&
            !isVisited;

        const star = document.createElement("button");

        star.className = `
            memory-star
            ${isVisited ? "visited" : ""}
            ${isLocked ? "locked" : ""}
        `;

        star.textContent = isLocked ? "🔒" : memory.icon;

        star.title = memory.title;

        star.onclick = () => openUniverseStar(memory.id);

        scene.appendChild(star);
    });

    updateUniverseProgress();
}

/* OPEN STAR */

function openUniverseStar(id) {
    if (id === 6 && visitedStars.size < 5) {
        alert(
            "EITSSS PINGKAN 😭\n\n" +
            "Bintang paling spesial belum boleh dibuka!\n" +
            "Cari lima bintang lainnya dulu ya, cantik 🤭"
        );

        return;
    }

    const memory = universeMemories.find(item => item.id === id);

    visitedStars.add(id);

    renderUniverseStars();

    showUniverseModal(memory);

    if (visitedStars.size === 6) {
        unlockUniverseEnding();
    }
}

/* SHOW STAR MESSAGE */

function showUniverseModal(memory) {
    const modal = document.createElement("div");

    modal.className = "universe-modal";
    modal.id = "universe-modal";

    modal.innerHTML = `
        <div class="universe-modal-content">

            <div style="font-size:55px;margin-bottom:15px;">
                ${memory.icon}
            </div>

            <h2>${memory.title}</h2>

            <p>${memory.message}</p>

            <button onclick="closeUniverseModal()">
                KEEP THIS MEMORY ♡
            </button>

        </div>
    `;

    document.body.appendChild(modal);
}

/* CLOSE MODAL */

function closeUniverseModal() {
    const modal = document.getElementById("universe-modal");

    if (modal) {
        modal.remove();
    }
}

/* UPDATE PROGRESS */

function updateUniverseProgress() {
    document.getElementById("universe-progress").textContent =
        `${visitedStars.size} / 6 Stars Discovered`;
}

/* UNLOCK ENDING */

function unlockUniverseEnding() {
    document.getElementById("universe-next").innerHTML = `
        <div style="padding:20px 0 35px;">

            <h2 style="color:#ffc1e9;">
                YOU FOUND EVERY STAR! ✨
            </h2>

            <p>
                But wait...
                <br><br>
                There's one more magical moment
                waiting for you.
            </p>

            <button onclick="nextBirthdayCakePage()">
                MAKE A BIRTHDAY WISH 🎂
            </button>

        </div>
    `;
}

/* PAGE 6 PLACEHOLDER */

function nextBirthdayCakePage() {
    startBirthdayCake();
}

/* ==================================
   PAGE 6 - BIRTHDAY CAKE
================================== */

let candlesBlown = false;

function startBirthdayCake() {

    document.body.classList.remove("universe-mode");
    document.body.classList.add("cake-mode");

    const universeContainer =
        document.getElementById("universe-container");

    universeContainer.outerHTML = `
        <div class="cake-container" id="cake-container">

            <h1>🎂 Happy 21st Birthday, Pingkan!</h1>

            <p>
                21 November 2026 ♡
                <br><br>
                A little cake for a very special girl.
                <br>
                But first... make a wish! ✨
            </p>

            <div class="cake-scene">

                <div class="cake-plate"></div>

                <div class="cake-bottom"></div>

                <div class="cake-top"></div>

                <div class="cake-frosting"></div>

                <div class="candles" id="candles">

                    <div class="candle">
                        2
                        <div class="flame"></div>
                    </div>

                    <div class="candle">
                        1
                        <div class="flame"></div>
                    </div>

                </div>

                <div class="cake-decoration">
                    💗 🌷 💗
                </div>

            </div>

            <div class="cake-options" id="cake-options">

                <button onclick="showCakePrank()">
                    I'M READY TO MAKE A WISH 🕯️
                </button>

            </div>

            <div id="cake-ending"></div>

        </div>
    `;

    candlesBlown = false;
}

/* BIRTHDAY PRANK */

function showCakePrank() {

    const options = document.getElementById("cake-options");

    options.innerHTML = `
        <h2 style="color:#d96f9c;">
            WAIT A MINUTE! 🤨
        </h2>

        <p>
            Kamu udah bikin permohonan belum?
            <br>
            Jangan bohong ya, aku tahu loh 🤭
        </p>

        <button onclick="blowCandles(1)">
            YES, I DID! 💗
        </button>

        <button onclick="blowCandles(2)">
            NO, I WAS THINKING ABOUT LAILI 😭
        </button>
    `;
}

/* BLOW CANDLES */

function blowCandles(choice) {

    if (candlesBlown) return;

    candlesBlown = true;

    const options = document.getElementById("cake-options");

    if (choice === 2) {
        options.innerHTML = `
            <p>
                HAHAHA KETAHUANNN! 😭
                <br><br>
                Segitu kangennya sama aku?
                <br>
                Yaudah, aku anggap itu pujian 🤭
            </p>
        `;
    } else {
        options.innerHTML = `
            <p>
                Good girl, Pingkan! 💗
                <br>
                Semoga permohonan kamu terkabul ya.
            </p>
        `;
    }

    document.getElementById("candles").classList.add("blown");

    setTimeout(() => {
        launchBirthdayConfetti();
        showCakeEnding();
    }, 1200);
}

/* CONFETTI */

function launchBirthdayConfetti() {

    const colors = [
        "#ff7eb6",
        "#c99cff",
        "#ffd166",
        "#ffffff",
        "#ff9f9f"
    ];

    for (let i = 0; i < 120; i++) {

        const confetti = document.createElement("div");

        confetti.className = "birthday-confetti";

        confetti.style.left = Math.random() * 100 + "vw";

        confetti.style.background =
            colors[Math.floor(Math.random() * colors.length)];

        confetti.style.animationDuration =
            (3 + Math.random() * 3) + "s";

        confetti.style.animationDelay =
            (Math.random() * 2) + "s";

        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 8500);
    }
}

/* BIRTHDAY ENDING */

function showCakeEnding() {

    document.getElementById("cake-ending").innerHTML = `
        <div class="celebration-message">

            <h2>🎉 HAPPY BIRTHDAY, PINGKAN! 🎉</h2>

            <p>
                May your 21st year be filled with
                happiness, love, success,
                and beautiful little surprises.
                <br><br>
                Semoga semua doa baik kamu
                satu per satu menjadi kenyataan.
                <br><br>
                You deserve all the beautiful things
                this world has to offer. 🤍
            </p>

            <button onclick="nextBirthdayLetterPage()">
                ONE LAST THING FOR YOU 💌
            </button>

        </div>
    `;
}

/* PAGE 7 PLACEHOLDER */

function nextBirthdayLetterPage() {
    startBirthdayLetter();
}

/* ==================================
   PAGE 7 - BIRTHDAY LETTER
================================== */

let letterOpened = false;

const birthdayLetter = `Dear Pingkan,

Happy 21st birthday, pretty girl! ♡

First of all, congratulations on surviving another year of being the most annoying yet adorable human being I know. HAHAHA.

Aku sebenarnya nggak tahu harus mulai dari mana, karena ada banyak hal yang pengen aku bilang ke kamu.

But I guess I'll start with something simple.

Thank you.

Thank you for being part of my life.
Thank you for all the random conversations.
Thank you for every little laugh.
And thank you for being someone I can be myself around.

You know, Pingkan...

Aku nggak pernah nyangka kalau seseorang yang awalnya cuma teman biasa bisa jadi salah satu orang yang begitu berarti buat aku.

Kadang kita ketawa bareng.
Kadang saling goda sampai salah satu salting.
Kadang ngambek karena hal kecil.
Kadang juga ada salah paham yang bikin kita jadi canggung.

But even after all that, I'm glad we're still here.

Aku tahu aku nggak selalu jadi teman yang sempurna. Kadang aku terlalu diam, kadang susah menjelaskan apa yang aku rasakan, dan mungkin tanpa sadar pernah bikin kamu sedih.

But please know that I genuinely care about you.

Aku berharap di usia kamu yang ke-21 ini, kamu bisa menemukan lebih banyak alasan buat tersenyum.

Semoga semua impian yang selama ini kamu simpan pelan-pelan bisa terwujud.

Semoga kamu selalu dikelilingi orang-orang yang tulus menyayangi kamu.

And whenever life feels a little too heavy, I hope you remember that you don't have to carry everything alone.

You deserve happiness.
You deserve kindness.
You deserve to be appreciated.
And you deserve to be loved for exactly who you are.

One more thing...

I hope that no matter how busy life gets, we'll never forget the little friendship we've built.

Even if we don't talk every single day, I hope we'll always find our way back to our random conversations and silly jokes.

Because honestly?

Life would be a little less fun without you annoying me. 🤭

So please keep being your weird, beautiful, funny, and sometimes ridiculously annoying self.

And don't forget...

You're getting older, but that doesn't mean you're allowed to stop being cute. 😌

Happy birthday once again, Pingkan.

I'm really glad you were born.

And I'm even more grateful that somehow, life let me meet you.

With love,
Laili ♡`;

/* START LETTER PAGE */

function startBirthdayLetter() {

    document.body.classList.remove("cake-mode");
    document.body.classList.add("letter-mode");

    const cakeContainer =
        document.getElementById("cake-container");

    cakeContainer.outerHTML = `
        <div class="letter-container" id="letter-container">

            <h1>💌 Things I Never Told You</h1>

            <p>
                One last little surprise, Pingkan.
                <br><br>
                This one comes straight from my heart. ♡
            </p>

            <div class="envelope-scene" id="envelope-scene"
                 onclick="openBirthdayLetter()">

                <div class="envelope">

                    <div class="envelope-paper">
                        For Pingkan ♡
                    </div>

                    <div class="envelope-flap"></div>

                </div>

            </div>

            <p id="letter-instruction">
                Tap the envelope to open your letter 💗
            </p>

            <div class="letter-content" id="letter-content">

                <h2>To My Favorite Human ♡</h2>

                <div class="letter-text" id="letter-text"></div>

                <button class="secret-letter-button"
                        id="secret-letter-button"
                        onclick="showSecretLetterMessage()">
                    PSSST... ONE MORE SECRET 🤭
                </button>

                <div class="secret-letter-message"
                     id="secret-letter-message"></div>

                <div class="final-birthday-ending"
                     id="final-birthday-ending"></div>

            </div>

        </div>
    `;

    letterOpened = false;
}

/* OPEN ENVELOPE */

function openBirthdayLetter() {

    if (letterOpened) return;

    letterOpened = true;

    document.getElementById("envelope-scene")
        .classList.add("open");

    document.getElementById("letter-instruction").textContent =
        "A little letter, written just for you. ♡";

    setTimeout(() => {

        document.getElementById("letter-content")
            .classList.add("show");

        typeBirthdayLetter();

    }, 1300);
}

/* TYPE LETTER */

async function typeBirthdayLetter() {

    const textElement = document.getElementById("letter-text");

    textElement.textContent = "";

    for (let i = 0; i < birthdayLetter.length; i++) {

        textElement.textContent += birthdayLetter[i];

        if (i % 8 === 0) {
            await sleep(15);
        }
    }

    document.getElementById("secret-letter-button")
        .classList.add("show");
}

/* SECRET MESSAGE */

function showSecretLetterMessage() {

    const secret = document.getElementById("secret-letter-message");

    secret.innerHTML = `
        <h2>🤭 Okay, One Last Confession...</h2>

        <p>
            Kalau suatu hari kamu nanya,
            "Kenapa sih kamu betah temenan sama aku?"
            <br><br>

            Jawabannya sederhana.
            <br><br>

            Because even when you're annoying,
            you're still one of my favorite people.
            <br><br>

            And if I had to choose a best friend
            all over again...
            <br><br>

            I'd still choose you.
            <br><br>

            Tapi jangan geer dulu ya,
            nanti kamu makin susah diatur. 😭💗
        </p>

        <button onclick="showFinalBirthdayEnding()">
            OKAY, I'M SALTING NOW 😭
        </button>
    `;

    secret.classList.add("show");

    document.getElementById("secret-letter-button").style.display = "none";
}

/* FINAL ENDING */

function showFinalBirthdayEnding() {

    const ending = document.getElementById("final-birthday-ending");

    ending.innerHTML = `
        <h2>🎀 THE END... OR IS IT?</h2>

        <p>
            Congratulations, Pingkan!
            <br><br>

            You've officially completed
            your little birthday adventure.
            <br><br>

            I hope this made you smile,
            even just a little.
            <br><br>

            Thank you for existing.
            <br>
            Thank you for being you.
            <br><br>

            And thank you for being
            part of my little world.
            <br><br>

            Happy 21st Birthday, Pingkan! 🎂💗
            <br><br>

            With lots of love,
            <br>
            Laili ♡
        </p>

        <button onclick="restartBirthdaySurprise()">
            EXPERIENCE IT AGAIN ↻
        </button>
    `;

    ending.classList.add("show");
    
    launchBirthdayConfetti();

    ending.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

/* RESTART WEBSITE */

function restartBirthdaySurprise() {
    window.location.reload();
}

/* FLOATING HEARTS */

function createFloatingHeart() {
    const heart = document.createElement("div");

    heart.className = "floating-heart";

    const hearts = ["💗", "💕", "🤍", "💖", "✨"];

    heart.textContent =
        hearts[Math.floor(Math.random() * hearts.length)];

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize =
        (12 + Math.random() * 15) + "px";

    heart.style.animationDuration =
        (5 + Math.random() * 5) + "s";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 11000);
}

setInterval(createFloatingHeart, 900);

