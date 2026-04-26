/**
 * 瑞士國際抗衰老集團 - 主要 JavaScript 文件
 * 處理導航、表單、載入動畫等互動功能
 */

// ========================================
// 載入完成後初始化
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  // 隱藏載入動畫
  hideLoadingScreen();
  
  // 初始化導航
  initNavigation();
  
  // 初始化表單處理
  initForms();
  
  // 初始化滾動效果
  initScrollEffects();
});

// ========================================
// 載入畫面處理
// ========================================
function hideLoadingScreen() {
  const loading = document.getElementById('loading');
  if (loading) {
    setTimeout(() => {
      loading.classList.add('hide');
      setTimeout(() => {
        loading.style.display = 'none';
      }, 500);
    }, 300);
  }
}

// ========================================
// 導航功能
// ========================================
function initNavigation() {
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  
  // 滾動時改變導航樣式
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // 手機選單切換
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
    
    // 點擊選單項目後關閉選單
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          navMenu.classList.remove('active');
          menuToggle.classList.remove('active');
        }
      });
    });
    
    // 點擊選單外部關閉選單
    document.addEventListener('click', function(event) {
      if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    });
  }
}

// ========================================
// 表單處理
// ========================================
function initForms() {
  // 商業合作表單
  const partnershipForm = document.getElementById('partnershipForm');
  if (partnershipForm) {
    partnershipForm.addEventListener('submit', handlePartnershipSubmit);
  }
  
  // 聯絡表單
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }
}

// 處理商業合作表單提交
function handlePartnershipSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const formMessage = document.getElementById('formMessage');
  const submitButton = form.querySelector('button[type="submit"]');
  
  // 獲取表單數據
  const formData = {
    name: form.name.value,
    company: form.company.value,
    email: form.email.value,
    phone: form.phone.value,
    region: form.region.value,
    partnershipType: form.partnershipType.value,
    message: form.message.value
  };
  
  // 禁用提交按鈕
  submitButton.disabled = true;
  submitButton.textContent = '提交中...';
  
  // 模擬提交（實際應用中應連接到後端 API）
  setTimeout(() => {
    // 顯示成功訊息
    formMessage.className = 'form-message success';
    formMessage.textContent = '✓ 感謝您的洽談申請！我們的專業團隊將在 24 小時內與您聯繫。';
    
    // 重置表單
    form.reset();
    
    // 恢復提交按鈕
    submitButton.disabled = false;
    submitButton.textContent = '提交洽談申請';
    
    // 滾動到訊息位置
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // 3秒後隱藏訊息
    setTimeout(() => {
      formMessage.className = 'form-message';
    }, 5000);
    
    // 在實際應用中，這裡應該發送數據到服務器
    console.log('Partnership Form Data:', formData);
  }, 1500);
}

// 處理聯絡表單提交
function handleContactSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const formMessage = document.getElementById('contactFormMessage');
  const submitButton = form.querySelector('button[type="submit"]');
  
  // 獲取表單數據
  const formData = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email.value,
    subject: form.subject.value,
    message: form.message.value
  };
  
  // 禁用提交按鈕
  submitButton.disabled = true;
  submitButton.textContent = '送出中...';
  
  // 模擬提交（實際應用中應連接到後端 API）
  setTimeout(() => {
    // 顯示成功訊息
    formMessage.className = 'form-message success';
    formMessage.textContent = '✓ 訊息已成功送出！我們會盡快回覆您。';
    
    // 重置表單
    form.reset();
    
    // 恢復提交按鈕
    submitButton.disabled = false;
    submitButton.textContent = '送出訊息';
    
    // 滾動到訊息位置
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // 3秒後隱藏訊息
    setTimeout(() => {
      formMessage.className = 'form-message';
    }, 5000);
    
    // 在實際應用中，這裡應該發送數據到服務器
    console.log('Contact Form Data:', formData);
  }, 1500);
}

// ========================================
// 滾動效果
// ========================================
function initScrollEffects() {
  // 平滑滾動到錨點
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerHeight = document.getElementById('header').offsetHeight;
          const targetPosition = target.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // 滾動時淡入元素
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // 觀察所有卡片元素
  document.querySelectorAll('.card, .product-card, .advantage-card, .mode-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

// ========================================
// 工具函數
// ========================================

// 驗證電子郵件
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// 驗證電話號碼（香港格式）
function validatePhone(phone) {
  const re = /^[0-9\s\-\+\(\)]{8,}$/;
  return re.test(phone);
}

// 顯示錯誤訊息
function showError(element, message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  element.parentNode.appendChild(errorDiv);
  
  setTimeout(() => {
    errorDiv.remove();
  }, 3000);
}

// ========================================
// 頁面載入時的動畫效果
// ========================================
window.addEventListener('load', function() {
  // 為 hero 區塊添加動畫
  const heroText = document.querySelector('.hero-text');
  if (heroText) {
    heroText.style.opacity = '0';
    heroText.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      heroText.style.transition = 'opacity 1s ease, transform 1s ease';
      heroText.style.opacity = '1';
      heroText.style.transform = 'translateY(0)';
    }, 200);
  }
});

// ========================================
// 控制台輸出品牌信息
// ========================================
console.log('%c瑞士國際抗衰老集團', 'font-size: 24px; font-weight: bold; color: #C9A96E;');
console.log('%cSwiss International Anti-Aging Group', 'font-size: 14px; color: #666;');
console.log('%c20年專業經驗 | Cell Control™ 雙核專利技術', 'font-size: 12px; color: #999;');
console.log('%cwww.swissint.com.hk', 'font-size: 12px; color: #C9A96E;');
