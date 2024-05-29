// components/Footer.tsx

import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer style={{ backgroundColor: '#f5f5f5', padding: '20px 0' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', padding: '20px', backgroundColor: 'white' }}>
        {[
          { title: 'Company', links: ['About Us', 'Careers', 'Press', 'Blog'] },
          { title: 'Support', links: ['Contact Us', 'Help Center', 'Privacy Policy', 'Terms of Service'] },
          { title: 'Community', links: ['Forums', 'Events', 'Partners', 'Affiliates'] },
          { title: 'More', links: ['Investors', 'Sitemap', 'Newsletter', 'FAQs'] },
        ].map((section) => (
          <div key={section.title} style={{ flex: '1', minWidth: '200px', margin: '10px' }}>
            <h3>{section.title}</h3>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
              {section.links.map((link) => (
                <li key={link}>
                  <Link href={`/${link.toLowerCase().replace(/ /g, '-')}`} style={{ textDecoration: 'none', color: '#333' }}>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '20px 0' }} />
      <div style={{ textAlign: 'center', padding: '10px', backgroundColor: 'white' }}>
        www.myadvisor.com © 2024
      </div>
    </footer>
  );
};

export default Footer;
