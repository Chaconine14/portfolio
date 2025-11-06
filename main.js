const menuBtn = document.querySelector('.p-header__btn');
const header = document.querySelector('.l-header');
const links = document.querySelectorAll('.p-header__nav a');

// メニュー開閉共通処理
function toggleMenu() {
    header.classList.toggle('is-open');
    header.classList.toggle('is-close');
    menuBtn.classList.toggle('is-open');
    menuBtn.classList.toggle('is-close');
    document.body.classList.toggle('no-scroll');
}

// ハンバーガーで開閉
menuBtn.addEventListener('click', toggleMenu);

// メニューリンククリック時の動作
links.forEach(link => {
    link.addEventListener('click', event => {

        if (window.innerWidth <= 1024) {
            toggleMenu(); // メニューを閉じる

            const hrefValue = link.getAttribute('href');// クリックされたリンクのhrefを取る
            const targetSection = document.querySelector(hrefValue);// hrefで指定されたセクションを探す

            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });//探し出したセクションまでスクロールする
        }
    });
});

//画面サイズがPCになったら、サイドメニューを閉じる
window.addEventListener('resize', () => {
    if (window.innerWidth >= 1025 && header.classList.contains('is-open')) {
        toggleMenu();
    }
});



//============================================
//GSAPアニメーション
//============================================
gsap.registerPlugin(ScrollTrigger);


// クジラのロゴをゆらゆら揺らすアニメーション
gsap.fromTo(
    ".js-whale, .js-whale2",
    {
        y: 0,
        rotation: -20,       // 傾ける角度（時計回り＝左端が下がる）
        ease: "sine.inOut",// 滑らかな上下動
        repeat: -1,        // 永遠に繰り返す
        yoyo: true,        // 行ったり来たりを繰り返す
    },
    {
        y: -50,
        rotation: 10,
        ease: "sine.inOut",
        repeat: -1,        // 永遠に繰り返す
        yoyo: true,
        duration: 1.8,     // 1往復にかかる時間（波のテンポ）
    }
);



// 左下へ見切れる
const tl1 = gsap.timeline({
    scrollTrigger: {
        trigger: ".js-whale",
        start: "bottom center", // トップエリア30%で開始
        toggleActions: "play none none reverse",
        // scrub: true,

    }
});
tl1.to(".js-whale", {
    x: "-60vw",      // ゆったり左下へ
    y: "100vh",
    duration: 4,     // ゆっくり泳ぐ速度
    ease: "sine.inOut",
});



// 右下でフェードインして停止（揺れは継続）
const tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: ".js-skills",
        start: "top top",
        toggleActions: "play none none reverse",
    }
});
tl2.fromTo(
    ".js-whale2",
    {
        x: "1vw",   // ← 画面の右の外からスタート
        opacity: 0,
    },
    {
        x: "0",       // ← 元の位置（右下）に戻る
        opacity: 1,   // ← ふわっと表示
        duration: 0.5,
        ease: "power2.out", // ← やわらかくフェードイン    
    }
);



