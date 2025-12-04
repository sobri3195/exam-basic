import { Link } from 'react-router-dom';

export const Nav = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
          Exam Basic
        </Link>
      </div>
    </nav>
  );
};
