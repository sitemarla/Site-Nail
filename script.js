/**
 * MARLA SAKAMOTO — NAIL DESIGN & EDUCATION
 * Script Minimalista de Alta Performance & Conversão
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Menu Mobile Drawer
    const mobileBurger = document.getElementById('mobileBurger');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileDrawerClose = document.getElementById('mobileDrawerClose');
    const mobileDrawerBackdrop = document.getElementById('mobileDrawerBackdrop');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    function closeMobileMenu() {
        if (mobileBurger) {
            mobileBurger.classList.remove('active');
            mobileBurger.setAttribute('aria-expanded', 'false');
        }
        if (mobileDrawer) {
            mobileDrawer.classList.remove('open');
            mobileDrawer.setAttribute('aria-hidden', 'true');
        }
        document.body.style.overflow = '';
    }

    function openMobileMenu() {
        if (mobileBurger) {
            mobileBurger.classList.add('active');
            mobileBurger.setAttribute('aria-expanded', 'true');
        }
        if (mobileDrawer) {
            mobileDrawer.classList.add('open');
            mobileDrawer.setAttribute('aria-hidden', 'false');
        }
        document.body.style.overflow = 'hidden';
    }

    if (mobileBurger && mobileDrawer) {
        mobileBurger.addEventListener('click', () => {
            const isOpen = mobileDrawer.classList.contains('open');
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        if (mobileDrawerClose) {
            mobileDrawerClose.addEventListener('click', closeMobileMenu);
        }

        if (mobileDrawerBackdrop) {
            mobileDrawerBackdrop.addEventListener('click', closeMobileMenu);
        }

        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Fechar com ESC para acessibilidade
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
                closeMobileMenu();
            }
        });
    }

    // 2. Seletor de Contato WhatsApp ("VAMOS CONVERSAR?")
    const phone = "5519984198840";
    const messages = {
        'agendamento': {
            text: "Olá, Marla! Gostaria de consultar horários disponíveis para atendimento de Nail Design.",
            cta: "AGENDAR MEU HORÁRIO"
        },
        'curso-iniciante': {
            text: "Olá, Marla! Tenho interesse no Curso Iniciante: Do Zero ao Primeiro Alongamento. Gostaria de informações sobre datas e conteúdo.",
            cta: "QUERO APRENDER COM A MARLA"
        },
        'aperfeicoamento': {
            text: "Olá, Marla! Gostaria de informações sobre o Curso Avançado de Formatos & Reversas.",
            cta: "CONSULTAR VAGAS"
        },
        'mentoria-vip': {
            text: "Olá, Marla! Gostaria de detalhes sobre a Mentoria VIP Individual presencial.",
            cta: "SOLICITAR MENTORIA VIP"
        },
        'duvidas': {
            text: "Olá, Marla! Vim pelo site da sua marca e gostaria de tirar uma dúvida.",
            cta: "INICIAR CONVERSA"
        }
    };

    const pillButtons = document.querySelectorAll('.pill-btn');
    const whatsappMessage = document.getElementById('whatsappMessage');
    const whatsappActionLink = document.getElementById('whatsappActionLink');

    if (pillButtons.length && whatsappMessage && whatsappActionLink) {
        pillButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                pillButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const topic = btn.getAttribute('data-topic');
                const config = messages[topic] || messages['agendamento'];

                // Transição suave do texto
                whatsappMessage.style.opacity = '0';
                setTimeout(() => {
                    whatsappMessage.textContent = config.text;
                    whatsappActionLink.textContent = config.cta;
                    whatsappMessage.style.opacity = '1';
                }, 140);

                const encoded = encodeURIComponent(config.text);
                whatsappActionLink.href = `https://wa.me/${phone}?text=${encoded}`;
            });
        });
    }

    // 3. Rolagem Suave com URL Limpa (remove #hero, #cursos, #contato da barra de endereço)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#' || targetId === '#conteudo-principal') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Mantém a barra de endereço 100% limpa (https://www.marlasakamoto.art.br/)
                if (window.history && window.history.replaceState) {
                    window.history.replaceState(null, '', window.location.pathname);
                }
            }
        });
    });

    // Se a página for aberta direto com hashtag, limpa imediatamente
    if (window.location.hash && window.history && window.history.replaceState) {
        window.history.replaceState(null, '', window.location.pathname);
    }

    // 4. Integração Dinâmica com a API Oficial do Instagram
    const instaGrid = document.getElementById('instaVisualGrid');
    if (instaGrid) {
        fetch('/api/instagram')
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error ${res.status}`);
                return res.json();
            })
            .then(payload => {
                if (payload && Array.isArray(payload.data) && payload.data.length > 0) {
                    const posts = payload.data.slice(0, 6);
                    const html = posts.map(post => {
                        const safeCaption = (post.caption || 'Trabalho de Nail Design por Marla Sakamoto')
                            .replace(/"/g, '&quot;')
                            .replace(/</g, '&lt;')
                            .replace(/>/g, '&gt;');
                        const badgeText = post.media_type === 'VIDEO' ? 'Reels &bull; Técnica' : 'Instagram';
                        const ctaText = post.media_type === 'VIDEO' ? 'Assistir no Instagram &rarr;' : 'Ver no Instagram &rarr;';
                        
                        return `
                        <a href="${post.permalink}" target="_blank" rel="noopener noreferrer" class="insta-grid-item" title="${safeCaption.slice(0, 70)}" aria-label="Ver post no Instagram">
                            <div class="insta-thumb-box">
                                <img src="${post.media_url}" alt="${safeCaption.slice(0, 80)}" class="insta-thumb-img" width="300" height="300" loading="lazy" decoding="async">
                                <div class="insta-hover-overlay">
                                    <span class="insta-post-badge">${badgeText}</span>
                                    <span class="insta-hover-cta">${ctaText}</span>
                                </div>
                            </div>
                        </a>`;
                    }).join('');
                    
                    instaGrid.innerHTML = html;
                }
            })
            .catch(() => {
                // Silencioso: mantém o fallback instantâneo dos 6 posts pré-renderizados
            });
    }

    // 5. Header Sólido no Topo e Translucidez Leve apenas no Scroll (Aesop / Rhode Style)
    const mainHeader = document.getElementById('mainHeader');
    if (mainHeader) {
        const handleHeaderScroll = () => {
            if (window.scrollY > 20) {
                mainHeader.classList.add('scrolled');
            } else {
                mainHeader.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleHeaderScroll, { passive: true });
        handleHeaderScroll();
    }

    // 6. Modal Interativo de Depoimentos & Envio via WhatsApp (Warm Luxury)
    const testimonialModal = document.getElementById('testimonialModal');
    const openModalBtn = document.getElementById('openTestimonialModalBtn');
    const closeModalBtn = document.getElementById('closeTestimonialModalBtn');
    const testimonialForm = document.getElementById('testimonialForm');
    const starBtns = document.querySelectorAll('.star-btn');
    const ratingLabel = document.getElementById('ratingLabel');
    const feedbackToast = document.getElementById('formFeedbackToast');

    let currentRating = 5;
    const ratingTexts = {
        1: "1 de 5 estrelas",
        2: "2 de 5 estrelas",
        3: "3 de 5 estrelas",
        4: "4 de 5 estrelas (Muito bom)",
        5: "5 de 5 estrelas (Excelente)"
    };

    function openTestimonialModal() {
        if (!testimonialModal) return;
        testimonialModal.classList.add('open');
        testimonialModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        const firstInput = document.getElementById('reviewAuthorName');
        if (firstInput) setTimeout(() => firstInput.focus(), 150);
    }

    function closeTestimonialModal() {
        if (!testimonialModal) return;
        testimonialModal.classList.remove('open');
        testimonialModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (feedbackToast) feedbackToast.style.display = 'none';
    }

    if (openModalBtn) {
        openModalBtn.addEventListener('click', openTestimonialModal);
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeTestimonialModal);
    }

    if (testimonialModal) {
        testimonialModal.addEventListener('click', (e) => {
            if (e.target === testimonialModal) {
                closeTestimonialModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && testimonialModal.classList.contains('open')) {
                closeTestimonialModal();
            }
        });
    }

    // Classificação por Estrelas
    function setRating(rating) {
        currentRating = rating;
        starBtns.forEach(btn => {
            const btnVal = parseInt(btn.getAttribute('data-rating'), 10);
            if (btnVal <= rating) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        if (ratingLabel) {
            ratingLabel.textContent = ratingTexts[rating] || `${rating} de 5 estrelas`;
        }
    }

    starBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const rating = parseInt(btn.getAttribute('data-rating'), 10) || 5;
            setRating(rating);
        });

        // Efeito de hover suave
        btn.addEventListener('mouseenter', () => {
            const hoverVal = parseInt(btn.getAttribute('data-rating'), 10) || 5;
            starBtns.forEach(b => {
                const val = parseInt(b.getAttribute('data-rating'), 10);
                if (val <= hoverVal) {
                    b.style.color = '#D4AF37';
                } else {
                    b.style.color = '#DACEC5';
                }
            });
        });

        btn.addEventListener('mouseleave', () => {
            starBtns.forEach(b => {
                b.style.color = '';
            });
        });
    });

    // Submissão e Formatação para WhatsApp
    if (testimonialForm) {
        testimonialForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('reviewAuthorName');
            const serviceInput = document.getElementById('reviewServiceType');
            const reviewInput = document.getElementById('reviewText');

            const name = nameInput ? nameInput.value.trim() : '';
            const service = serviceInput ? serviceInput.value.trim() : '';
            const review = reviewInput ? reviewInput.value.trim() : '';

            if (!name || !service || !review) {
                if (feedbackToast) {
                    feedbackToast.className = 'form-feedback-toast error';
                    feedbackToast.textContent = 'Por favor, preencha todos os campos antes de prosseguir.';
                    feedbackToast.style.display = 'block';
                }
                return;
            }

            // Gera estrelas em texto (ex: ★★★★★)
            const starString = '★'.repeat(currentRating) + '☆'.repeat(5 - currentRating);

            const whatsappReviewMessage = 
`✦ *NOVO DEPOIMENTO PARA O SITE — MARLA SAKAMOTO* ✦

*Nome:* ${name}
*Experiência:* ${service}
*Classificação:* ${starString} (${currentRating}/5)

*Depoimento:*
"${review}"

_Enviado através do site oficial Marla Sakamoto._`;

            const encoded = encodeURIComponent(whatsappReviewMessage);
            const waUrl = `https://wa.me/5519984198840?text=${encoded}`;

            if (feedbackToast) {
                feedbackToast.className = 'form-feedback-toast success';
                feedbackToast.textContent = '✓ Depoimento gerado com sucesso! Abrindo o WhatsApp da Marla para confirmação...';
                feedbackToast.style.display = 'block';
            }

            // Abre o WhatsApp para envio imediato e direto
            setTimeout(() => {
                window.open(waUrl, '_blank', 'noopener,noreferrer');
            }, 600);

            // Reseta e fecha modal suavemente após 2.4 segundos
            setTimeout(() => {
                testimonialForm.reset();
                setRating(5);
                closeTestimonialModal();
            }, 2400);
        });
    }

    // 7. Carrossel Interativo de Procedimentos Autorais Selecionados
    const worksTrack = document.getElementById('worksCarouselTrack');
    const worksPrevBtn = document.getElementById('carouselPrevBtn');
    const worksNextBtn = document.getElementById('carouselNextBtn');
    const worksDots = document.querySelectorAll('#carouselDots .carousel-dot');

    if (worksTrack && worksPrevBtn && worksNextBtn) {
        const getCardStep = () => {
            const firstCard = worksTrack.querySelector('.works-carousel-card');
            return firstCard ? firstCard.offsetWidth + 24 : 340;
        };

        worksPrevBtn.addEventListener('click', () => {
            worksTrack.scrollBy({ left: -getCardStep(), behavior: 'smooth' });
        });

        worksNextBtn.addEventListener('click', () => {
            worksTrack.scrollBy({ left: getCardStep(), behavior: 'smooth' });
        });

        // Sincroniza as bolinhas indicadoras no scroll
        worksTrack.addEventListener('scroll', () => {
            const step = getCardStep();
            const activeIndex = Math.min(
                worksDots.length - 1,
                Math.max(0, Math.round(worksTrack.scrollLeft / step))
            );
            worksDots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === activeIndex);
            });
        }, { passive: true });

        // Clique nas bolinhas para navegar diretamente
        worksDots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                worksTrack.scrollTo({
                    left: idx * getCardStep(),
                    behavior: 'smooth'
                });
            });
        });
    }

    // =========================================================================
    // 8. Sistema Inteligente de Depoimentos (Truncamento, Modal de Leitura & Slider Mobile)
    // =========================================================================
    const TESTIMONIAL_LIMIT = 300;     // Depoimentos com mais de 300 caracteres ganham prévia
    const PREVIEW_TARGET = 235;        // Tamanho de referência para busca de fim de palavra

    const readModal = document.getElementById('testimonialReadModal');
    const closeReadModalBtn = document.getElementById('closeReadModalBtn');
    const closeReadModalFooterBtn = document.getElementById('closeReadModalFooterBtn');
    const readModalAuthorName = document.getElementById('readModalAuthorName');
    const readModalAuthorRole = document.getElementById('readModalAuthorRole');
    const readModalFullText = document.getElementById('readModalFullText');

    let previousActiveElement = null;

    function openReadModal(authorName, authorRole, fullText) {
        if (!readModal) return;
        previousActiveElement = document.activeElement;

        // Pausa autoplay enquanto lê
        stopSliderAutoplay();

        if (readModalAuthorName) readModalAuthorName.textContent = authorName;
        if (readModalAuthorRole) readModalAuthorRole.textContent = authorRole;
        if (readModalFullText) readModalFullText.textContent = fullText;

        readModal.classList.add('open');
        readModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        if (closeReadModalBtn) {
            setTimeout(() => closeReadModalBtn.focus(), 120);
        }
    }

    function closeReadModal() {
        if (!readModal || !readModal.classList.contains('open')) return;
        readModal.classList.remove('open');
        readModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';

        // Retoma autoplay no mobile
        startSliderAutoplay();

        if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
            previousActiveElement.focus();
        }
    }

    if (closeReadModalBtn) closeReadModalBtn.addEventListener('click', closeReadModal);
    if (closeReadModalFooterBtn) closeReadModalFooterBtn.addEventListener('click', closeReadModal);

    if (readModal) {
        readModal.addEventListener('click', (e) => {
            if (e.target === readModal) {
                closeReadModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && readModal.classList.contains('open')) {
                closeReadModal();
            }
        });
    }

    // Função de corte inteligente em fronteira de palavra
    function computeWordBoundaryPreview(fullText, limit = TESTIMONIAL_LIMIT, target = PREVIEW_TARGET) {
        const trimmed = fullText.trim();
        if (trimmed.length <= limit) {
            return { isTruncated: false, preview: trimmed };
        }

        let slice = trimmed.slice(0, target);
        const lastSpace = slice.lastIndexOf(' ');
        if (lastSpace > 150) {
            slice = slice.slice(0, lastSpace);
        }
        slice = slice.replace(/[,.;:!\s]+$/, '');
        return { isTruncated: true, preview: slice + '...' };
    }

    // Inicialização dos cards de depoimento
    const testimonialsGrid = document.getElementById('testimonialsGrid');
    const testimonialCards = document.querySelectorAll('#testimonialsGrid .testimonial-luxury-card');

    testimonialCards.forEach(card => {
        const quoteEl = card.querySelector('.card-quote-text');
        const authorNameEl = card.querySelector('.card-author-name');
        const authorRoleEl = card.querySelector('.card-author-role');

        if (!quoteEl) return;

        // Preserva o texto original integral 100% fiel
        const originalFullText = quoteEl.textContent.trim();
        card.dataset.fullText = originalFullText;

        const authorName = authorNameEl ? authorNameEl.textContent.trim() : 'Cliente';
        const authorRole = authorRoleEl ? authorRoleEl.textContent.trim() : 'Cliente Ateliê';

        const { isTruncated, preview } = computeWordBoundaryPreview(originalFullText);

        if (isTruncated) {
            quoteEl.textContent = preview;

            const readMoreBtn = document.createElement('button');
            readMoreBtn.type = 'button';
            readMoreBtn.className = 'btn-read-more';
            readMoreBtn.setAttribute('aria-label', `Ler depoimento completo de ${authorName}`);
            readMoreBtn.innerHTML = '<span>Ler depoimento completo &rarr;</span>';

            readMoreBtn.addEventListener('click', (e) => {
                e.preventDefault();
                openReadModal(authorName, authorRole, originalFullText);
            });

            quoteEl.insertAdjacentElement('afterend', readMoreBtn);
        }
    });

    // =========================================================================
    // SLIDER / CARROSSEL MOBILE COM AUTOPLAY E TOUCH SWIPE
    // =========================================================================
    const sliderDotsContainer = document.getElementById('sliderDots');
    const sliderPrevBtn = document.getElementById('sliderPrevBtn');
    const sliderNextBtn = document.getElementById('sliderNextBtn');

    let currentSliderIndex = 0;
    let sliderAutoplayInterval = null;
    let sliderResumeTimeout = null;

    const totalCards = testimonialCards.length;

    // Criação dos pontos indicadores (dots)
    if (sliderDotsContainer && totalCards > 0) {
        sliderDotsContainer.innerHTML = '';
        testimonialCards.forEach((card, index) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = index === 0 ? 'slider-dot active' : 'slider-dot';
            dot.setAttribute('aria-label', `Ir para depoimento ${index + 1} de ${totalCards}`);
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
            
            dot.addEventListener('click', () => {
                scrollToTestimonialIndex(index);
                pauseSliderTemporarily(7000);
            });

            sliderDotsContainer.appendChild(dot);
        });
    }

    function updateActiveDot(index) {
        if (!sliderDotsContainer) return;
        const dots = sliderDotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, idx) => {
            if (idx === index) {
                dot.classList.add('active');
                dot.setAttribute('aria-selected', 'true');
            } else {
                dot.classList.remove('active');
                dot.setAttribute('aria-selected', 'false');
            }
        });
    }

    function scrollToTestimonialIndex(index, smooth = true) {
        if (!testimonialsGrid || totalCards === 0) return;
        
        // Garante índice circular
        currentSliderIndex = (index + totalCards) % totalCards;
        const targetCard = testimonialCards[currentSliderIndex];
        
        if (targetCard) {
            const scrollLeft = targetCard.offsetLeft - testimonialsGrid.offsetLeft;
            testimonialsGrid.scrollTo({
                left: scrollLeft,
                behavior: smooth ? 'smooth' : 'auto'
            });
            updateActiveDot(currentSliderIndex);
        }
    }

    // Detecta scroll manual pelo usuário no mobile e sincroniza o dot
    if (testimonialsGrid) {
        let isScrollingTimeout;
        testimonialsGrid.addEventListener('scroll', () => {
            clearTimeout(isScrollingTimeout);
            isScrollingTimeout = setTimeout(() => {
                if (window.innerWidth <= 768 && testimonialsGrid.offsetWidth > 0) {
                    const scrollLeft = testimonialsGrid.scrollLeft;
                    const cardWidth = testimonialsGrid.offsetWidth;
                    const calculatedIndex = Math.round(scrollLeft / cardWidth);
                    if (calculatedIndex >= 0 && calculatedIndex < totalCards && calculatedIndex !== currentSliderIndex) {
                        currentSliderIndex = calculatedIndex;
                        updateActiveDot(currentSliderIndex);
                    }
                }
            }, 60);
        }, { passive: true });

        // Pausa autoplay quando o usuário toca/arrasta no slider
        testimonialsGrid.addEventListener('touchstart', () => pauseSliderTemporarily(8000), { passive: true });
        testimonialsGrid.addEventListener('pointerdown', () => pauseSliderTemporarily(8000), { passive: true });
    }

    // Botões Anterior / Próximo
    if (sliderPrevBtn) {
        sliderPrevBtn.addEventListener('click', () => {
            scrollToTestimonialIndex(currentSliderIndex - 1);
            pauseSliderTemporarily(7000);
        });
    }

    if (sliderNextBtn) {
        sliderNextBtn.addEventListener('click', () => {
            scrollToTestimonialIndex(currentSliderIndex + 1);
            pauseSliderTemporarily(7000);
        });
    }

    // Funções de controle do Autoplay
    function startSliderAutoplay() {
        stopSliderAutoplay();
        // Ativa autoplay apenas no mobile e quando modais não estão abertos
        if (window.innerWidth > 768) return;
        if (readModal && readModal.classList.contains('open')) return;

        sliderAutoplayInterval = setInterval(() => {
            if (window.innerWidth <= 768 && (!readModal || !readModal.classList.contains('open'))) {
                scrollToTestimonialIndex(currentSliderIndex + 1);
            }
        }, 4500); // 4.5 segundos por depoimento
    }

    function stopSliderAutoplay() {
        if (sliderAutoplayInterval) {
            clearInterval(sliderAutoplayInterval);
            sliderAutoplayInterval = null;
        }
    }

    function pauseSliderTemporarily(ms = 7000) {
        stopSliderAutoplay();
        clearTimeout(sliderResumeTimeout);
        sliderResumeTimeout = setTimeout(() => {
            startSliderAutoplay();
        }, ms);
    }

    // Inicia autoplay se for dispositivo mobile
    if (window.innerWidth <= 768) {
        startSliderAutoplay();
    }

    // =========================================================================
    // Paginação no Desktop / "Ver mais depoimentos"
    // =========================================================================
    const toggleMoreBtn = document.getElementById('toggleMoreTestimonialsBtn');
    const toggleMoreBtnText = document.getElementById('toggleMoreBtnText');
    const moreCountBadge = document.getElementById('moreCountBadge');
    const moreWrap = document.getElementById('testimonialsMoreWrap');

    if (testimonialCards.length > 0 && toggleMoreBtn && moreWrap) {
        const getInitialLimit = () => 6;
        let initialLimit = getInitialLimit();
        let isExpanded = false;

        const applyPagination = () => {
            const isMobile = window.innerWidth <= 768;

            if (isMobile) {
                // No mobile, todos os cards ficam visíveis no slider
                testimonialCards.forEach(card => {
                    card.classList.remove('card-hidden');
                });
                moreWrap.style.display = 'none';
                startSliderAutoplay();
                return;
            }

            // No desktop
            stopSliderAutoplay();

            if (isExpanded) {
                testimonialCards.forEach(card => {
                    card.classList.remove('card-hidden');
                    card.classList.add('card-revealed');
                });
                if (toggleMoreBtnText) toggleMoreBtnText.textContent = 'Ver menos depoimentos ↑';
                if (moreCountBadge) moreCountBadge.style.display = 'none';
                toggleMoreBtn.setAttribute('aria-expanded', 'true');
            } else {
                initialLimit = getInitialLimit();
                let hiddenCount = 0;

                testimonialCards.forEach((card, idx) => {
                    if (idx < initialLimit) {
                        card.classList.remove('card-hidden');
                    } else {
                        card.classList.add('card-hidden');
                        card.classList.remove('card-revealed');
                        hiddenCount++;
                    }
                });

                if (hiddenCount > 0) {
                    moreWrap.style.display = 'block';
                    if (toggleMoreBtnText) toggleMoreBtnText.textContent = 'Ver mais depoimentos';
                    if (moreCountBadge) {
                        moreCountBadge.textContent = `+${hiddenCount}`;
                        moreCountBadge.style.display = 'inline-block';
                    }
                    toggleMoreBtn.setAttribute('aria-expanded', 'false');
                } else {
                    moreWrap.style.display = 'none';
                }
            }
        };

        applyPagination();

        toggleMoreBtn.addEventListener('click', () => {
            isExpanded = !isExpanded;
            applyPagination();

            if (!isExpanded) {
                const depSection = document.getElementById('depoimentos');
                if (depSection) {
                    depSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                applyPagination();
                if (window.innerWidth <= 768) {
                    startSliderAutoplay();
                } else {
                    stopSliderAutoplay();
                }
            }, 150);
        });
    }
});