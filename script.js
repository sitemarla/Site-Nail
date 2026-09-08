/**
 * MARLA SAKAMOTO — NAIL DESIGN & EDUCATION
 * Script Minimalista de Alta Performance & Conversão
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Menu Mobile Drawer
    const mobileBurger = document.getElementById('mobileBurger');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileBurger && mobileDrawer) {
        mobileBurger.addEventListener('click', () => {
            mobileBurger.classList.toggle('active');
            mobileDrawer.classList.toggle('open');
            document.body.style.overflow = mobileDrawer.classList.contains('open') ? 'hidden' : '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileBurger.classList.remove('active');
                mobileDrawer.classList.remove('open');
                document.body.style.overflow = '';
            });
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
});