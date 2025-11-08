//============================================
//ハンバーガーメニュー開閉
//============================================

const menuBtn = document.querySelector('.js-header-nav__btn');
const header = document.querySelector('.js-header');
const links = document.querySelectorAll('.js-header-nav__list a');

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

            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });//探し出したセクションまでスクロールする
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
        duration: 2.2,     // 1往復にかかる時間（波のテンポ）
    }
);



// 左下へ見切れる
const tl1 = gsap.timeline({
    scrollTrigger: {
        trigger: ".js-whale",
        start: "bottom center", // トップエリア30%で開始
        toggleActions: "play none none reverse",
        scrub: 4,

    }
});
tl1.to(".js-whale", {
    x: "-65vw",      // ゆったり左下へ
    y: "50vh",
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




// クジラロゴ（右下）クリックでスムーススクロール
const whaleLogo = document.querySelector('.js-whale2');

whaleLogo.addEventListener('click', (e) => {
    e.preventDefault(); // ページの即リロードを防ぐ

    window.scrollTo({
        top: 0,
        behavior: 'smooth' // スムーズにスクロール！
    });
});
