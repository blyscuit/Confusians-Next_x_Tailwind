'use client';

import { useState, useEffect } from 'react';

export default function SmartAppBanner(props) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [appUrl, setAppUrl] = useState('');
  const [platform, setPlatform] = useState(null);
  const item = props.item;

  useEffect(() => {
    // 2. Detect Platform
    const userAgent = navigator.userAgent || navigator.vendor || (window).opera;
    
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window).MSStream) {
      setPlatform('ios');
      setAppUrl(item.adr ? item.adr : '');
      setIsVisible(false);
    } else if (/android/i.test(userAgent)) {
      setPlatform('android');
      setAppUrl(item.adr ? item.adr : '');
      if (item.adr && item.adr.trim() !== '') {
        setIsClosing(false);
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('smart-banner-dismissed', 'true');
    setIsClosing(true);
    setTimeout(() => setIsVisible(false), 200);
  };

  if (!isVisible) return null;
  // if (platform != 'android') return null;

  return (
    <div
      className={`fixed top-2 left-2 right-2 z-[9999] flex h-[65px] items-center rounded-2xl bg-[var(--android-surface)] px-3 shadow-[0_2px_5px_rgba(0,0,0,0.1)] transition-opacity duration-200 ease-out ${isClosing ? 'opacity-0' : 'opacity-100'}`}
      style={{ '--android-surface': 'light-dark(#FEF7FF, #141218)', '--android-on-surface': 'light-dark(#1D1B20, #E6E1E5)', '--android-primary': 'light-dark(#6750A4, #D0BCFF)', '--android-on-primary': 'light-dark(#FFFFFF, #381E72)' }}
    >
      <button onClick={handleClose} className="mr-[10px] border-none bg-transparent text-[20px]">×</button>
      <div className="min-w-0 flex-1 px-2">
        <h4 className="m-0 overflow-hidden text-ellipsis whitespace-nowrap text-[14px] text-[var(--android-on-surface)]">{item.name}</h4>
        <p className="m-0 text-[11px] text-[var(--android-on-surface)]">{'Get it on Google Play'}</p>
      </div>
      <a
        href={appUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-[var(--android-primary)] px-[15px] py-[6px] text-[12px] font-bold text-[var(--android-on-primary)] no-underline"
      >
        VIEW
      </a>
    </div>
  );
}
