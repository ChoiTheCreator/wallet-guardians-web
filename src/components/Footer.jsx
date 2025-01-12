import React from 'react';
import { FaWallet } from 'react-icons/fa'; // 지갑 아이콘 import
import '../style/Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <FaWallet className="footer-icon" /> {/* 지갑 아이콘 */}
        <p className="footer-text">
          <a
            href="https://github.com/wallet-guardians"
            target="_blank" // 새 탭에서 열기
            rel="noopener noreferrer" // 보안 강화
          >
            WalletGuardians
          </a>
        </p>
      </div>
      <p className="copyright-text">
        © 2025 WalletGuardians. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
