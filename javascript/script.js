// ===================================
        // SELEÇÃO DE VALOR DE DOAÇÃO
        // ===================================
        function selectDonation(element, value) {
            // Remove active de todos
            document.querySelectorAll('.donation-option').forEach(opt => {
                opt.classList.remove('active');
            });
            // Adiciona active ao clicado
            element.classList.add('active');
            // Atualiza valor no modal
            const amountInput = document.getElementById('donationAmount');
            if (amountInput) {
                amountInput.value = value;
            }
        }
        
        // ===================================
        // TOAST NOTIFICATIONS
        // ===================================
        function showToast(message, type = 'success') {
            const toastContainer = document.getElementById('toastContainer');
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            
            const icon = type === 'success' ? '✓' : '✕';
            toast.innerHTML = `
                <span class="toast-icon">${icon}</span>
                <span class="toast-message">${message}</span>
            `;
            
            toastContainer.appendChild(toast);
            
            // Remove após 4 segundos
            setTimeout(() => {
                toast.style.animation = 'toastSlideIn 0.3s ease reverse';
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, 4000);
        }
        
        // ===================================
        // VALIDAÇÃO DE FORMULÁRIOS
        // ===================================
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        
        function validateField(field) {
            const value = field.value.trim();
            let isValid = true;
            
            if (field.hasAttribute('required') && value === '') {
                isValid = false;
            }
            
            if (field.type === 'email' && value !== '' && !validateEmail(value)) {
                isValid = false;
            }
            
            if (field.type === 'number') {
                const min = field.getAttribute('min');
                if (min && parseFloat(value) < parseFloat(min)) {
                    isValid = false;
                }
            }
            
            if (isValid) {
                field.classList.remove('error');
            } else {
                field.classList.add('error');
            }
            
            return isValid;
        }
        
        // ===================================
        // FORM: CONTATO
        // ===================================
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const name = document.getElementById('name');
                const email = document.getElementById('email');
                const subject = document.getElementById('subject');
                const message = document.getElementById('message');
                
                const fields = [name, email, subject, message];
                let isValid = true;
                
                fields.forEach(field => {
                    if (!validateField(field)) {
                        isValid = false;
                    }
                });
                
                if (isValid) {
                    showToast('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                    contactForm.reset();
                    fields.forEach(field => field.classList.remove('error'));
                } else {
                    showToast('Por favor, preencha todos os campos corretamente.', 'error');
                }
            });
            
            // Validação em tempo real
            contactForm.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(field => {
                field.addEventListener('blur', () => {
                    validateField(field);
                });
            });
        }
        
        // ===================================
        // FORM: DOAÇÃO
        // ===================================
        const donationForm = document.getElementById('donationForm');
        if (donationForm) {
            donationForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const donorName = document.getElementById('donorName');
                const donorEmail = document.getElementById('donorEmail');
                const donationAmount = document.getElementById('donationAmount');
                const donationType = document.getElementById('donationType');
                
                const fields = [donorName, donorEmail, donationAmount, donationType];
                let isValid = true;
                
                fields.forEach(field => {
                    if (!validateField(field)) {
                        isValid = false;
                    }
                });
                
                if (isValid) {
                    const amount = donationAmount.value;
                    const type = donationType.options[donationType.selectedIndex].text;
                    showToast(`Obrigado! Processando doação de R$ ${amount} (${type})...`, 'success');
                    closeModal('donationModal');
                    donationForm.reset();
                    fields.forEach(field => field.classList.remove('error'));
                } else {
                    showToast('Por favor, preencha todos os campos corretamente.', 'error');
                }
            });
            
            // Validação em tempo real
            donationForm.querySelectorAll('.form-input, .form-select').forEach(field => {
                field.addEventListener('blur', () => {
                    validateField(field);
                });
            });
        }
        
        // ===================================
        // FORM: VOLUNTÁRIO
        // ===================================
        const volunteerForm = document.getElementById('volunteerForm');
        if (volunteerForm) {
            volunteerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const volName = document.getElementById('volName');
                const volEmail = document.getElementById('volEmail');
                const volPhone = document.getElementById('volPhone');
                const volArea = document.getElementById('volArea');
                const volMessage = document.getElementById('volMessage');
                
                const fields = [volName, volEmail, volPhone, volArea, volMessage];
                let isValid = true;
                
                fields.forEach(field => {
                    if (!validateField(field)) {
                        isValid = false;
                    }
                });
                
                if (isValid) {
                    showToast('Cadastro enviado com sucesso! Em breve entraremos em contato.', 'success');
                    closeModal('volunteerModal');
                    volunteerForm.reset();
                    fields.forEach(field => field.classList.remove('error'));
                } else {
                    showToast('Por favor, preencha todos os campos corretamente.', 'error');
                }
            });
            
            // Validação em tempo real
            volunteerForm.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(field => {
                field.addEventListener('blur', () => {
                    validateField(field);
                });
            });
        }
        
        // ===================================
        // ANIMAÇÃO DE PROGRESSO
        // ===================================
        function animateProgress() {
            const progressBars = document.querySelectorAll('.progress-fill');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const bar = entry.target;
                        const width = bar.style.width;
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 100);
                        observer.unobserve(bar);
                    }
                });
            }, { threshold: 0.5 });
            
            progressBars.forEach(bar => observer.observe(bar));
        }
        
        // Iniciar animações quando a página carregar
        window.addEventListener('load', () => {
            animateProgress();
        });
        
        // ===================================
        // LAZY LOADING DE IMAGENS
        // ===================================
        if ('loading' in HTMLImageElement.prototype) {
            // Navegador suporta lazy loading nativo
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
                img.src = img.src;
            });
        } else {
            // Fallback para navegadores antigos
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
            document.body.appendChild(script);
        }
        
        // ===================================
        // CONTADOR DE ESTATÍSTICAS (ANIMAÇÃO)
        // ===================================
        function animateCounter(element, target) {
            let current = 0;
            const increment = target / 100;
            const duration = 2000;
            const stepTime = duration / 100;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target.toLocaleString('pt-BR');
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current).toLocaleString('pt-BR');
                }
            }, stepTime);
        }
        
        function initCounters() {
            const statNumbers = document.querySelectorAll('.stat-number');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        const target = parseInt(element.textContent.replace(/\D/g, ''));
                        animateCounter(element, target);
                        observer.unobserve(element);
                    }
                });
            }, { threshold: 0.5 });
            
            statNumbers.forEach(stat => observer.observe(stat));
        }
        
        // Iniciar contadores quando a página carregar
        window.addEventListener('load', () => {
            initCounters();
        });
        
        // ===================================
        // ACESSIBILIDADE: TRAP DE FOCO EM MODAIS
        // ===================================
        function trapFocus(element) {
            const focusableElements = element.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstElement) {
                            lastElement.focus();
                            e.preventDefault();
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            firstElement.focus();
                            e.preventDefault();
                        }
                    }
                }
                
                if (e.key === 'Escape') {
                    const modalId = element.querySelector('.modal-content').closest('.modal').id;
                    closeModal(modalId);
                }
            });
        }
        
        // Aplicar trap de foco aos modais
        document.querySelectorAll('.modal').forEach(modal => {
            const modalContent = modal.querySelector('.modal-content');
            modal.addEventListener('transitionend', () => {
                if (modal.classList.contains('active')) {
                    trapFocus(modalContent);
                    // Focar no primeiro elemento
                    const firstInput = modalContent.querySelector('input, select, textarea');
                    if (firstInput) firstInput.focus();
                }
            });
        });
        
        // ===================================
        // DETECÇÃO DE SCROLL (HEADER SHADOW)
        // ===================================
        let lastScroll = 0;
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            } else {
                header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            }
            
            lastScroll = currentScroll;
        });
        
        // ===================================
        // NEWSLETTER FORM (FOOTER)
        // ===================================
        const newsletterForm = document.querySelector('.footer-section form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const emailInput = newsletterForm.querySelector('input[type="email"]');
                
                if (validateEmail(emailInput.value)) {
                    showToast('Inscrição realizada com sucesso!', 'success');
                    newsletterForm.reset();
                } else {
                    showToast('Por favor, informe um e-mail válido.', 'error');
                }
            });
        }
        
        // ===================================
        // PERFORMANCE: DEBOUNCE
        // ===================================
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
        
        // ===================================
        // INICIALIZAÇÃO
        // ===================================
        document.addEventListener('DOMContentLoaded', () => {
            // Log de inicialização (remover em produção)
            console.log('🐾 Site Patas Solidárias carregado com sucesso!');
            
            // Prevenir comportamento padrão de links vazios
            document.querySelectorAll('a[href="#"]').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                });
            });
            
            // Adicionar classe aos elementos visíveis
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const fadeObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);
            
            // Aplicar fade-in aos cards
            document.querySelectorAll('.project-card, .volunteer-card, .news-card').forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                fadeObserver.observe(card);
            });
        });
        
        // ===================================
        // TRATAMENTO DE ERROS GLOBAL
        // ===================================
        window.addEventListener('error', (e) => {
            console.error('Erro capturado:', e.error);
            // Em produção, enviar para sistema de monitoramento
        });
        
        // ===================================
        // SEO: Atualizar título dinamicamente
        // ===================================
        const sections = document.querySelectorAll('section[id]');
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    // Atualizar links ativos
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { threshold: 0.5 });
        
        sections.forEach(section => navObserver.observe(section));
  
        // MENU MOBILE
        // ===================================
        const menuToggle = document.getElementById('menuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em link
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
        
        // ===================================
        // SMOOTH SCROLL
        // ===================================
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href.length > 1) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
        
        // ===================================
        // MODAIS
        // ===================================
        function openDonationModal() {
            document.getElementById('donationModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function openVolunteerModal() {
            document.getElementById('volunteerModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeModal(modalId) {
            document.getElementById(modalId).classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        // Fechar modal ao clicar fora
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal(modal.id);
                }
            });
        });
        
        // ===================================