// Modern JavaScript features that will trigger analysis

// Async/await - HIGH baseline (widely supported)
async function loadData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to load data:', error);
    return null;
  }
}

// Optional chaining - HIGH baseline
function processUserData(user) {
  const email = user?.profile?.email || 'No email';
  const preferences = user?.settings?.preferences ?? {};
  return { email, preferences };
}

// IntersectionObserver - HIGH baseline
function setupLazyLoading() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-src]').forEach(img => {
    observer.observe(img);
  });
}

// ResizeObserver - HIGH baseline
function setupResponsiveComponents() {
  const resizeObserver = new ResizeObserver(entries => {
    entries.forEach(entry => {
      const { width } = entry.contentRect;
      const element = entry.target;
      
      // Adjust component based on size
      if (width < 300) {
        element.classList.add('compact');
      } else {
        element.classList.remove('compact');
      }
    });
  });

  document.querySelectorAll('.responsive-component').forEach(el => {
    resizeObserver.observe(el);
  });
}

// Private class fields - MEDIUM baseline (newer feature)
class ModernComponent {
  #privateData = new Map();
  
  constructor(element) {
    this.element = element;
    this.#initialize();
  }
  
  #initialize() {
    this.#privateData.set('initialized', Date.now());
  }
  
  getInitTime() {
    return this.#privateData.get('initialized');
  }
}

// Top-level await - LIMITED baseline (newer feature)
// Note: This would be in a module context
// const initialData = await loadData();

// Nullish coalescing - HIGH baseline
function getConfig(options = {}) {
  return {
    theme: options.theme ?? 'light',
    animations: options.animations ?? true,
    timeout: options.timeout ?? 5000
  };
}

// Initialize everything
document.addEventListener('DOMContentLoaded', async () => {
  console.log('App initialized');
  
  // Basic DOM manipulation
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', handleClick);
  });
  
  setupLazyLoading();
  setupResponsiveComponents();
  
  const data = await loadData();
  if (data) {
    console.log('Data loaded successfully');
  }
});

function handleClick(event) {
  event.preventDefault();
  console.log('Button clicked');
}
