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
});