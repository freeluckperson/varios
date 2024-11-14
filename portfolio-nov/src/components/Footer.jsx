const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6 text-center">
        <p>
          &copy; {new Date().getFullYear()} Erick Segura. All rights reserved.
        </p>
        <p className="mt-2 text-gray-400">
          Designed and built with ❤️ using React and Tailwind CSS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
