
/**
 * Utility functions for animations throughout the application
 */

export const fadeIn = (element: HTMLElement, duration = 300): Promise<void> => {
  return new Promise((resolve) => {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    setTimeout(() => {
      element.style.transition = `opacity ${duration}ms ease-in-out`;
      element.style.opacity = '1';
      
      setTimeout(() => {
        resolve();
      }, duration);
    }, 10);
  });
};

export const fadeOut = (element: HTMLElement, duration = 300): Promise<void> => {
  return new Promise((resolve) => {
    element.style.opacity = '1';
    
    element.style.transition = `opacity ${duration}ms ease-in-out`;
    element.style.opacity = '0';
    
    setTimeout(() => {
      element.style.display = 'none';
      resolve();
    }, duration);
  });
};

export const slideUp = (element: HTMLElement, duration = 300, distance = 20): Promise<void> => {
  return new Promise((resolve) => {
    element.style.opacity = '0';
    element.style.transform = `translateY(${distance}px)`;
    element.style.display = 'block';
    
    setTimeout(() => {
      element.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
      
      setTimeout(() => {
        resolve();
      }, duration);
    }, 10);
  });
};

export const slideDown = (element: HTMLElement, duration = 300, distance = 20): Promise<void> => {
  return new Promise((resolve) => {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
    
    element.style.transition = `opacity ${duration}ms ease-in, transform ${duration}ms ease-in`;
    element.style.opacity = '0';
    element.style.transform = `translateY(${distance}px)`;
    
    setTimeout(() => {
      element.style.display = 'none';
      resolve();
    }, duration);
  });
};

export const typeText = async (
  element: HTMLElement, 
  text: string, 
  speed = 30
): Promise<void> => {
  element.textContent = '';
  
  return new Promise((resolve) => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });
};

export const pulseEffect = (element: HTMLElement, duration = 1000): Promise<void> => {
  return new Promise((resolve) => {
    element.classList.add('animate-pulse');
    
    setTimeout(() => {
      element.classList.remove('animate-pulse');
      resolve();
    }, duration);
  });
};

export const rippleEffect = (
  event: React.MouseEvent<HTMLElement>, 
  color = 'rgba(255, 255, 255, 0.7)'
): void => {
  const button = event.currentTarget;
  const rect = button.getBoundingClientRect();
  
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  const ripple = document.createElement('span');
  ripple.style.position = 'absolute';
  ripple.style.top = `${y}px`;
  ripple.style.left = `${x}px`;
  ripple.style.transform = 'translate(-50%, -50%) scale(0)';
  ripple.style.width = '0px';
  ripple.style.height = '0px';
  ripple.style.borderRadius = '50%';
  ripple.style.backgroundColor = color;
  ripple.style.pointerEvents = 'none';
  ripple.style.transition = 'transform 0.6s, opacity 0.6s';
  
  button.appendChild(ripple);
  
  // Force reflow
  ripple.offsetWidth;
  
  ripple.style.transform = 'translate(-50%, -50%) scale(4)';
  ripple.style.opacity = '0';
  
  setTimeout(() => {
    if (button.contains(ripple)) {
      button.removeChild(ripple);
    }
  }, 600);
};

export const animateCounter = (
  element: HTMLElement, 
  targetValue: number, 
  duration = 1000,
  prefix = '',
  suffix = ''
): Promise<void> => {
  return new Promise((resolve) => {
    const startValue = 0;
    const startTime = performance.now();
    
    const updateCounter = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function - ease out cubic
      const easing = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = Math.floor(startValue + (targetValue - startValue) * easing);
      element.textContent = `${prefix}${currentValue}${suffix}`;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        resolve();
      }
    };
    
    requestAnimationFrame(updateCounter);
  });
};

export const generateRandomVoiceBars = (count: number, minHeight = 10, maxHeight = 30): number[] => {
  const heights: number[] = [];
  for (let i = 0; i < count; i++) {
    heights.push(Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight);
  }
  return heights;
};
