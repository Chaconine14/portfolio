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


//GSAPアニメーション
// gsap.to(".p-logo", {


//     y: () => window.innerHeight,
//     scrollTrigger: {
//         toggleActions: "play none none reverse",
//         trigger: "body", // アニメーションが始まるトリガーとなる要素
//         start: "top top", //→ trigger要素の中心が画面下部に来たら開始  
//         end: "bottom bottom", // → trigger要素の下端が画面下端に来たら終了
//         scrub: true, // スクロール量に合わせてアニメーション
//         pin: true, // 要素を固定
//         markers: true,

//     },
// });



// gsap.to(".p-logo", {
//     x: "80vw",
//     y: "100vh",
//     scrollTrigger: {
//         trigger: "l-main__bg",
//         start: "top top",
//         end: "bottom bottom",
//         scrub: true,
//         markers: true,

//     }
// });
