(function () {
    const initDreamApp = () => {
        console.log('Dream script starting...');
        const dreamGrid = document.getElementById('dream-grid');
        const searchInput = document.getElementById('search-input');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const modal = document.getElementById('dream-modal');
        const modalBody = document.getElementById('modal-body');
        const closeBtn = document.querySelector('.close-btn');
        const favBtn = document.getElementById('modal-fav-btn');
        const shareBtn = document.getElementById('modal-share-btn');

        let allDreams = [];
        let favorites = JSON.parse(localStorage.getItem('dream_favorites') || '[]');
        let currentFilter = 'all';
        let currentDream = null;

        // Fetch dreams from API
        async function fetchDreams() {
            try {
                const response = await fetch('/api/dreams');
                allDreams = await response.json();
                renderDreams(allDreams);
            } catch (error) {
                console.error('Error fetching dreams:', error);
                dreamGrid.innerHTML = '<p class="error">데이터를 불러오는 데 실패했습니다.</p>';
            }
        }

        function renderDreams(dreams) {
            dreamGrid.innerHTML = '';
            if (dreams.length === 0) {
                dreamGrid.innerHTML = '<p class="no-results">검색 결과가 없습니다.</p>';
                return;
            }

            dreams.forEach((dream, index) => {
                const isFav = favorites.includes(dream.id);
                const card = document.createElement('div');
                card.className = `dream-card ${isFav ? 'is-fav' : ''}`;
                card.style.animationDelay = `${(index % 10) * 0.1}s`;

                const typeLabel = {
                    'good': '길몽',
                    'bad': '흉몽',
                    'baby': '태몽'
                }[dream.type] || '미분류';

                card.innerHTML = `
                <div class="fav-star">${isFav ? '★' : '☆'}</div>
                <span class="dream-type type-${dream.type}">${typeLabel}</span>
                <h3>${dream.title}</h3>
                <p class="dream-summary">${dream.summary}</p>
                <div class="lucky-numbers">
                    ${dream.lucky_numbers.map(num => `<span class="number-circle">${num}</span>`).join('')}
                </div>
            `;

                card.addEventListener('click', () => openModal(dream));
                dreamGrid.appendChild(card);
            });
        }

        function openModal(dream) {
            currentDream = dream;
            const typeLabel = {
                'good': '길몽',
                'bad': '흉몽',
                'baby': '태몽'
            }[dream.type] || '미분류';

            const isFav = favorites.includes(dream.id);
            favBtn.innerHTML = isFav ? '★ 저장됨' : '☆ 저장하기';
            favBtn.classList.toggle('active', isFav);

            // --- SEO & Metadata Updates ---
            const keyword = dream.title.replace(/ 꿈z$/, ''); // Remove trailing " 꿈"
            const cleanKeyword = keyword.replace(/ 꿈$/, '');
            const pageTitle = `${dream.title} - 무료 꿈해몽과 로또 추천 번호 | 운세담`;
            const metaDesc = `${cleanKeyword} 꿈의 숨겨진 의미와 행운의 숫자를 분석해 드립니다. ${typeLabel}인 이 꿈을 통해 당신의 재물운과 미래를 점쳐보세요.`;

            document.title = pageTitle;
            const metaDescTag = document.querySelector('meta[name="description"]');
            if (metaDescTag) metaDescTag.content = metaDesc;

            // --- Dynamic Intro ---
            const introHtml = `
            <div class="intro-section rich-text">
                많은 분들이 <span class="text-highlight">${cleanKeyword}</span> 꿈을 꾸고 그 의미를 궁금해합니다. 
                이 꿈은 상황에 따라 다양한 해석이 가능하지만, 당신이 꾼 <strong>${dream.title}</strong>은 특히 
                <span class="text-highlight">${typeLabel}</span>으로 분류됩니다. 
                구체적인 해몽과 행운의 숫자를 아래에서 확인해 보세요.
            </div>
        `;

            // --- Static Content (Hardcoded) ---
            const staticContentHtml = `
            <div class="static-content-box rich-text">
                <h3>💡 꿈해몽 더 잘 활용하는 법</h3>
                <p>꿈은 무의식의 반영입니다. 단순히 길몽과 흉몽을 나누기보다, 꿈이 전하는 심리적 메시지에 귀 기울여 보세요. 
                특히 <strong>오전에는 꿈 이야기를 하지 않는 것</strong>이 좋습니다. 좋은 꿈은 기운이 빠져나가고, 나쁜 꿈은 말이 씨가 될 수 있기 때문입니다.</p>
                <p>로또 번호는 재미로만 즐기세요. 맹신하기보다 긍정적인 에너지로 하루를 시작하는 도구로 활용하는 것이 현명합니다. 
                행운은 준비된 자에게 찾아온다는 사실을 잊지 마세요.</p>
            </div>
        `;

            // --- FAQ Section ---
            const faqHtml = `
            <div class="faq-section">
                <h3>자주 묻는 질문 (FAQ)</h3>
                <div class="faq-item">
                    <div class="faq-question">Q: 꿈해몽은 과학적인가요? <span class="faq-icon"></span></div>
                    <div class="faq-answer">A: 꿈해몽은 심리학적 상징과 전통적인 민속 신앙이 결합된 해석입니다. 과학적 증명보다는 심리적 위안과 재미로 접근하는 것이 좋습니다.</div>
                </div>
                <div class="faq-item">
                    <div class="faq-question">Q: 흉몽을 꾸면 어떻게 해야 하나요? <span class="faq-icon"></span></div>
                    <div class="faq-answer">A: 흉몽은 오히려 액땜이 될 수 있습니다. 너무 걱정하지 말고 평소보다 말과 행동을 조심하며 차분하게 하루를 보내세요.</div>
                </div>
                <div class="faq-item">
                    <div class="faq-question">Q: 이 번호로 정말 당첨될 수 있나요? <span class="faq-icon"></span></div>
                    <div class="faq-answer">A: 제공되는 번호는 재미로 생성된 행운의 숫자입니다. 당첨을 보장하지 않으므로 가벼운 마음으로 참고만 해주세요.</div>
                </div>
            </div>
        `;

            // Dynamic Share Button Text
            let shareText = '🔗 공유하기';
            if (dream.type === 'good') {
                shareText = '🍀 친구에게 행운 나눠주기 (복채는 무료!)';
            } else if (dream.type === 'bad') {
                shareText = '🧿 친구에게 공유해서 액땜하기';
            } else if (dream.type === 'baby') {
                shareText = '👶 예쁜 태몽 공유하기';
            }
            shareBtn.innerHTML = shareText;

            // Suggested Dreams Logic (Simple recommendation based on "stimulating" keywords)
            const keywords = ['피', '귀신', '돈', '쫓기', '떨어지는', '죽는', '불'];
            const otherDreams = allDreams
                .filter(d => d.id !== dream.id && keywords.some(k => d.title.includes(k) || d.summary.includes(k)))
                .sort(() => 0.5 - Math.random())
                .slice(0, 3);

            // Fallback if not enough stimulating dreams
            if (otherDreams.length < 3) {
                const others = allDreams
                    .filter(d => d.id !== dream.id && !otherDreams.includes(d))
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3 - otherDreams.length);
                otherDreams.push(...others);
            }

            const otherDreamsHtml = otherDreams.map(d => {
                const typeEmoji = d.type === 'good' ? '🍀' : (d.type === 'bad' ? '🧿' : '👶');
                return `
                <div class="other-dream-card">
                    <div class="other-dream-emoji">${typeEmoji}</div>
                    <div class="other-dream-info">
                        <h4>${d.title}</h4>
                    </div>
                </div>
             `;
            }).join('');


            modalBody.innerHTML = `
            ${introHtml}
            <div class="modal-image-container">
                <img src="/cat_${dream.type}.png" alt="${typeLabel}" class="modal-cat-image">
            </div>
            <span class="dream-type type-${dream.type}">${typeLabel}</span>
            <h2>${dream.title}</h2>
            <p class="rich-text">${dream.summary}</p>
            <div class="detail-content rich-text" style="margin: 1.5rem 0; line-height: 1.8; color: #444;">
                <h3 style="margin-bottom: 10px; font-size: 1.2rem; color: #5a4b81;">🔮 상세 해몽</h3>
                <p>${dream.detail}</p>
            </div>
            <div class="action-tip-box rich-text">
                <h4>행동 팁</h4>
                <p>${dream.action_tip}</p>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between;">
                <h4>행운의 번호</h4>
                <button id="copy-btn" class="copy-btn">번호 복사하기</button>
            </div>
            <div class="lucky-numbers" style="margin-top: 1rem;">
                ${dream.lucky_numbers.map(num => `<span class="number-circle" style="width:45px; height:45px; font-size:1.1rem;">${num}</span>`).join('')}
            </div>

            ${staticContentHtml}
            ${faqHtml}

            <div class="other-dreams-section">
                <h3>다른 사람들은 이런 꿈도 꿨어요</h3>
                <div class="other-dreams-list">
                    ${otherDreamsHtml}
                </div>
            </div>
        `;

            // Attach event listeners
            document.getElementById('copy-btn').addEventListener('click', () => copyNumbers(dream.lucky_numbers));

            // FAQ Accordion Listeners
            const faqItems = modalBody.querySelectorAll('.faq-item');
            faqItems.forEach(item => {
                item.querySelector('.faq-question').addEventListener('click', () => {
                    // Toggle current item
                    item.classList.toggle('active');
                });
            });

            const otherCards = modalBody.querySelectorAll('.other-dream-card');
            otherDreams.forEach((d, i) => {
                otherCards[i].addEventListener('click', () => openModal(d));
            });

            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        function copyNumbers(numbers) {
            const text = numbers.join(', ');
            navigator.clipboard.writeText(text).then(() => {
                showToast('클립보드에 복사되었습니다. 1등 기원합니다!');
            }).catch(err => {
                console.error('Copy failed', err);
                showToast('복사에 실패했습니다.');
            });
        }

        function showToast(message) {
            const toast = document.createElement('div');
            toast.className = 'toast-popup';
            toast.innerHTML = `<span>🍀</span> ${message}`;
            document.body.appendChild(toast);

            // Trigger reflow
            void toast.offsetWidth;

            toast.classList.add('show');

            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(toast);
                }, 300);
            }, 3000);
        }

        function toggleFavorite() {
            if (!currentDream) return;
            const index = favorites.indexOf(currentDream.id);
            if (index > -1) {
                favorites.splice(index, 1);
            } else {
                favorites.push(currentDream.id);
            }
            localStorage.setItem('dream_favorites', JSON.stringify(favorites));

            const isFav = favorites.includes(currentDream.id);
            favBtn.innerHTML = isFav ? '★ 저장됨' : '☆ 저장하기';
            favBtn.classList.toggle('active', isFav);
            handleSearchAndFilter();
        }

        async function shareDream() {
            if (!currentDream) return;
            const shareData = {
                title: `신비의 기록 - ${currentDream.title}`,
                text: `${currentDream.title}\n\n${currentDream.summary}\n\n행동 팁: ${currentDream.action_tip}`,
                url: window.location.href
            };

            try {
                if (navigator.share) {
                    await navigator.share(shareData);
                } else {
                    await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
                    // Use custom toast instead of alert
                    showToast('해몽 내용이 클립보드에 복사되었습니다.');
                }
            } catch (err) {
                console.error('Error sharing:', err);
            }
        }

        function closeModal() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            currentDream = null;
        }

        // Filter and Search Logic
        function handleSearchAndFilter() {
            const query = searchInput.value.toLowerCase();
            const filtered = allDreams.filter(dream => {
                const matchesQuery = dream.title.toLowerCase().includes(query) ||
                    dream.summary.toLowerCase().includes(query);
                const matchesFilter = currentFilter === 'all' ||
                    (currentFilter === 'fav' ? favorites.includes(dream.id) : dream.type === currentFilter);
                return matchesQuery && matchesFilter;
            });
            renderDreams(filtered);
        }

        searchInput.addEventListener('input', handleSearchAndFilter);
        favBtn.addEventListener('click', toggleFavorite);
        shareBtn.addEventListener('click', shareDream);

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.type;
                handleSearchAndFilter();
            });
        });

        closeBtn.addEventListener('click', closeModal);
        window.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        fetchDreams();
        fetchDreams();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDreamApp);
    } else {
        initDreamApp();
    }
})();
