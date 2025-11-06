import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-stone-500">
        <div className="border-t border-stone-200 pt-8">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} ImagineMyPet. All Rights Reserved.
          </p>

          <div className="mt-4 space-x-6">
            <a
              href="https://imaginemypet.com/policies/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-teal-600 transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-gray-300">|</span>
            <a
              href="https://imaginemypet.com/policies/terms-of-service"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-teal-600 transition-colors"
            >
              Terms of Service
            </a>
            <span className="text-gray-300">|</span>
            <a
              href="https://imaginemypet.com/pages/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-teal-600 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
