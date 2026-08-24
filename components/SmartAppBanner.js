'use client';

import { useState, useEffect } from 'react';

export default function SmartAppBanner(props) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(true);
  const [appUrl, setAppUrl] = useState('');
  const [platform, setPlatform] = useState(null);
  const item = props.item;

  useEffect(() => {
    // 2. Detect Platform
    const userAgent = navigator.userAgent || navigator.vendor || (window).opera;
    
    setAppUrl(item.adr ? item.adr : '');
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window).MSStream) {
      setPlatform('ios');
      setIsVisible(process.env.NODE_ENV === 'development');
    } else if (/android/i.test(userAgent)) {
      setPlatform('android');
      if (item.adr && item.adr.trim() !== '') {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setIsClosing(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => setIsVisible(false), 200);
  };

  if (!isVisible) return null;
  // if (platform != 'android') return null;

  return (
    <div
      className={`fixed top-2 left-2 right-2 z-[9999] flex py-2 items-center rounded-2xl bg-white/50 px-3 shadow-[0_2px_5px_rgba(0,0,0,0.1)] backdrop-blur-sm transition-opacity duration-200 ease-out ${isClosing ? 'opacity-0' : 'opacity-100'}`}
    >
      <button onClick={handleClose} className="pr-2 border-none bg-transparent text-[20px] font-light">×</button>
    
      {item.adr_icon && (
        <img
          src={item.adr_icon}
          alt=""
          className="h-12 w-12 shrink-0 rounded-xl object-cover"
        />
      )}

      <div className={"min-w-0 flex-1 px-2 "}>
        <h4 className={"m-0 overflow-hidden text-ellipsis whitespace-nowrap text-[14px]"}>{item.name}</h4>
        <p className={"m-0 text-[11px] "}>{'Get it on Google Play'}</p>
      </div>
      <a
        href={appUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={"rounded-full px-[15px] py-[6px] text-[12px] font-semibold no-underline " + item.textColor + " " + item.backgroundColor}
      >
        View
      </a>
    </div>
  );
}
