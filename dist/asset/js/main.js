
document.addEventListener('DOMContentLoaded', () => {
    const element = document.querySelector('body');

    /*  =====================
        言語別ページ切り替え処理
        ===================== */
    const select = document.getElementById('header-nav-select');
    const body = document.body;

    select.addEventListener('change', () => {
        const path = window.location.pathname;
        const fileName = path.substring(path.lastIndexOf('/') + 1);
        const targetUrl = body.dataset.page + '/' + fileName;
        window.location.href = targetUrl;
    });


    /*  =====================
        共通フェードイン処理(.js-fadein)
        ===================== */
    const fadeEl = document.querySelectorAll('.js-fadein');

    const checkFade = () => {
        const windowBottom = window.scrollY + (window.innerHeight / 1.5);

        fadeEl.forEach(el => {
            const elTop = el.getBoundingClientRect().top + window.scrollY;
            if (windowBottom > elTop) {
                el.classList.add('active');
            }
        });
    };
    checkFade();

    let ticking = false;
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                checkFade();
                ticking = false;
            });
            ticking = true;
        }
    }
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onScroll);

    /*  =====================
     スライダー処理
     ===================== */
    if (element.classList.contains('page-top')) {

        const paginationContainer =
            document.querySelector(".top-hero-swiper-controlsPagination");

        // バー生成(指定可能)
        const TOTAL_SLIDES = 6;
        let items = [];

        for (let i = 0; i < TOTAL_SLIDES; i++) {
            const bar = document.createElement("div");
            bar.className =
                "top-hero-swiper-controlsPaginationItem inactive";
            paginationContainer.appendChild(bar);
            items.push(bar);
        }

        const swiper = new Swiper(".top-hero-swiper", {
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            wrapperClass: "top-hero-swiper-wrapper",
            slideClass: "top-hero-swiper-wrapperSlide",
        });

        /* アクティブバーを更新する関数 */
        function updatePagination() {
            const index = swiper.realIndex % TOTAL_SLIDES;

            items.forEach((bar, i) => {
                if (i === index) {
                    bar.classList.remove("inactive");
                    bar.classList.add("active");
                } else {
                    bar.classList.remove("active");
                    bar.classList.add("inactive");
                }
            });
        }


        /* Swiper イベント */
        swiper.on("slideChange", updatePagination);

        /* 初回反映 */
        updatePagination();

        /* 再生停止ボタン */
        const togglePlay = document.getElementById("toggle-play");

        // 初期状態
        togglePlay.classList.add("is-play");
        swiper.autoplay.start();

        togglePlay.addEventListener("click", () => {
            if (togglePlay.classList.contains("is-play")) {
                // 再生 → 停止
                togglePlay.classList.remove("is-play");
                togglePlay.classList.add("is-paused");
                swiper.autoplay.stop();
            } else {
                // 停止 → 再生
                togglePlay.classList.remove("is-paused");
                togglePlay.classList.add("is-play");
                swiper.autoplay.start();
            }
        });

        items.forEach((bar, index) => {
            bar.addEventListener("click", () => {
                swiper.slideToLoop(index);

                if (!isPlaying) {
                    swiper.autoplay.start();
                    togglePlay.classList.remove("is-paused");
                    isPlaying = true;
                }
            });
        });
    }

    /*  =====================
        services配下共通モーダル
        ===================== */

    //モーダルコンテンツ配列
    const modalData = [
        {
            id: 1,
            title: "循環器治療の主要領域を網羅した、包括的ライブイベントの実現",
            subtitle: "豊橋ライブデモンストレーションコース",
            img: "../../../asset/img/about/strengths1.png",
            list: [
                "2025年の開催では、5日間・6配信ルーム・100を超えるプログラムを実施",
                "参加者数2,447名（前年比＋399名）／有料参加者前年比150％増",
                "学術イベントの持続的成長モデルとして定着",
                "多様なステークホルダーが共に価値を創出するイベントの新たな形を提示"
            ],
            text1: "2011年の初開催以来、豊橋ライブは日本の循環器治療分野における代表的なライブデモンストレーションとして発展。虚血・EVT・SHD・不整脈・薬物治療など、多岐にわたる分野を横断的に学べるプログラム構成を設計し、 臨床・教育・産業が交差する場として進化を続けてきました。",
            text2: "テクロスは、企画立案から運営・配信設計・広報戦略までを包括的にサポート。 自社メディアやSNSを活用したオンラインプロモーションを展開し、 有料会員層の拡大と新規参加者の獲得を推進しました。 また、早割制度の導入やオンデマンド配信設計により、 利便性と満足度の両面で最適化を図りました。"
        },
        {
            id: 2,
            title: "別プロジェクトタイトル",
            subtitle: "別サブタイトル",
            img: "../../../asset/img/about/strengths2.png",
            list: ["内容A", "内容B"],
            text1: "別説明",
            text2: "別説明2"
        }

    ];

    // ---- モーダル本体のDOM ----
    const triggerElements = document.querySelectorAll('.js-modal');
    const modalElement = document.querySelector('.c-modal');
    const modalCase = document.querySelector('.c-modal-case');

    // ---- モーダル内部のDOM ----
    const modalTitle = document.querySelector(".c-modal-case-title");
    const modalSubtitle = document.querySelector(".c-modal-case-subtitle");
    const modalImg = document.querySelector(".c-modal-img-src");
    const modalList = document.querySelector(".modal-case-list");
    const modalTxt1 = document.querySelector(".modal-case-text-1");
    const modalTxt2 = document.querySelector(".modal-case-text-2");
    const closeButton = document.getElementById('modal-close-btn');

    const openModal = () => {
        modalElement.classList.add('show');
        modalCase.classList.add('show');
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        if (!modalElement) return;

        modalElement.classList.remove('show');
        modalCase.classList.remove('show');
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    };

    // ---- モーダルにデータ反映 ----
    const setModalContent = (id) => {
        const data = modalData.find(item => item.id == id);
        if (!data) return;

        modalTitle.textContent = data.title;
        modalSubtitle.textContent = data.subtitle;
        modalImg.src = data.img;
        modalList.innerHTML = data.list.map(item => `<li>${item}</li>`).join("");
        modalTxt1.textContent = data.text1;
        modalTxt2.textContent = data.text2;
    };

    // ---- モーダルの内容リセット ----
    const resetModalContent = () => {
        modalTitle.textContent = "";
        modalSubtitle.textContent = "";
        modalImg.src = "";
        modalList.innerHTML = "";
        modalTxt1.textContent = "";
        modalTxt2.textContent = "";
    };

    let ModalId = 0;
    triggerElements.forEach(trigger => {
        trigger.addEventListener('click', (event) => {
            ModalId = event.currentTarget.dataset.modal;
            setModalContent(ModalId);
            openModal();

        });
    });

    if (closeButton) {
        closeButton.addEventListener('click', () => {
            closeModal();
            resetModalContent();
        });
    }

    /*  =====================
          会社概要img透過処理
        ===================== */
    if (element.classList.contains('page-about')) {
        const heroImg = document.querySelector(".about-hero-content-sticky-img");
        const triggerText = document.querySelector(".about-hero-content-textTrigger");

        let triggerTextBottom = 0;

        // 各座標取得関数
        const updateContent = () => {
            triggerTextBottom = triggerText.getBoundingClientRect().bottom + window.scrollY;
        };
        // 初期化（画像読み込み後）
        window.addEventListener("load", updateContent);
        // 幅変更時変更対策
        window.addEventListener("resize", updateContent);

        // スクロール判定
        window.addEventListener("scroll", () => {
            const viewporttop = window.scrollY;
            const viewportBottom = window.scrollY + window.innerHeight;

            // triggerTextの高さ以下になったらabout-hero-imgにopacity付与
            heroImg.classList.toggle("_opacity", viewporttop >= triggerTextBottom);

        });
    }

    /*  =====================
          イベントページ
        ===================== */
    if (element.classList.contains('page-event')) {
        function scrollExplanation() {
            const scroll = window.scrollY + window.innerHeight;
            const target = document.querySelector(".c-explanation-content");
            const overlay = document.querySelector(".c-explanation-bg-overlay");
            if (scroll > target.offsetTop) {
                overlay.classList.add('_active');
            }
            else {
                overlay.classList.remove('_active');
            }
        }
        scrollExplanation();

        window.addEventListener('scroll', function () {
            scrollExplanation();
        });
    }
});


