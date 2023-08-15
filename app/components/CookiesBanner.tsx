'use client';

import { getLocalStorage, setLocalStorage } from '@/utils/handleCookies';
import React, { useEffect, useState } from 'react';

const CookieBanner = () => {
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(false);

  useEffect(() => {
    const storedCookieConsent = getLocalStorage('cookie_consent', null);
    setCookieConsent(storedCookieConsent);
  }, []);

  useEffect(() => {
    setLocalStorage('cookie_consent', cookieConsent);
  }, [cookieConsent]);

  return (
    <div
      className={`fixed w-full px-6 py-3 mb-3 items-center justify-between bottom-0 left-0 right-0 shadow banner md:w-1/2 m-auto ${
        cookieConsent !== null ? 'hidden' : 'flex'
      }`}>
      <p className="pr-2">
        This page doesn&apos;t save any personal information. Press OK to accept
      </p>
      <button className="btn-primary" onClick={() => setCookieConsent(true)}>
        Ok
      </button>
    </div>
  );
};

export default CookieBanner;
