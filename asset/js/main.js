
document.addEventListener('DOMContentLoaded', () => {

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
        services配下共通モーダル
        ===================== */
    const triggerElements = document.querySelectorAll('.js-modal');
    const modalElement = document.querySelector('.c-modal');
    const closeButton = document.getElementById('modal-close-btn');

    let modalTitle = '循環器治療の主要領域を網羅した、包括的ライブイベントの実現';
    let modalSubTitle = '豊橋ライブデモンストレーションコース';
    let imgPath = '../../../asset/img/about/strengths1.png';
    let title1 = '成果';
    let text1 = '... (省略) ...';
    let title2 = '取り組み';
    let text2 = '... (省略) ...';

    const openModal = () => {

        modalElement.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        if (!modalElement) return;

        modalElement.style.display = 'none';
        document.body.style.overflow = '';
    };


    triggerElements.forEach(trigger => {
        trigger.addEventListener('click', (event) => {

            openModal();

        });
    });

    if (closeButton) {
        closeButton.addEventListener('click', () => {
            closeModal();
        });
    }



});


