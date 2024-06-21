// components/Footer.tsx

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between">
        {[
          { title: 'Services', links: ['Privacy policy', 'Terms of Service'] },
          { title: 'For investors', links: ['Advisors', 'Financial advisory firms', 'Offices'] },
          { title: 'For advisors', links: ['Prices', 'Help Center', 'Free resources'] },

        ].map((section) => (
          <div key={section.title} className="mb-8 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
            <ul>
              {section.links.map((link) => (
                <li key={link} className="mb-2">
                  <div className="text-gray-400 hover:text-white">
                    {link}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <hr className="border-gray-700 my-8" />
      <div className="text-center">
        www.myadvisor.com © 2024
      </div>
    </footer>
  );
};

export default Footer;
