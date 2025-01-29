import { useEffect } from 'react';

const ScrolltoTop = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
};

export default ScrolltoTop;
