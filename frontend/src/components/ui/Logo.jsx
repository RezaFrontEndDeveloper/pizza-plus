import { Link } from 'react-router-dom';
import Logo1 from '../../assets/logo.png';

export default function Logo() {
  return (
    <Link to="/">
      <img src={Logo1} alt="website Logo" className="w-40 cursot-pointer" />
    </Link>
  );
}
