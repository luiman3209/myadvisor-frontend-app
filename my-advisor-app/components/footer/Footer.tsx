// components/Footer.tsx
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {[
          { title: 'Company', links: ['About Us', 'Careers', 'Press', 'Blog'] },
          { title: 'Support', links: ['Contact Us', 'Help Center', 'Privacy Policy', 'Terms of Service'] },
          { title: 'Community', links: ['Forums', 'Events', 'Partners', 'Affiliates'] },
          { title: 'More', links: ['Investors', 'Sitemap', 'Newsletter', 'FAQs'] },
        ].map((section) => (
          <div key={section.title} className={styles.footerSection}>
            <h3>{section.title}</h3>
            <ul className={styles.footerLinks}>
              {section.links.map((link) => (
                <li key={link}>
                  <Link href={`/${link.toLowerCase().replace(/ /g, '-')}`}>
                    <span className={styles.footerLink}>{link}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <hr className={styles.footerDivider} />
      <div className={styles.footerBottom}>
        www.myadvisor.com © 2024
      </div>
    </footer>
  );
};

export default Footer;
