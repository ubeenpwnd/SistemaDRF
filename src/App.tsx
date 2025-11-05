import { useEffect, useState } from 'react';
import { Reception } from './components/Reception';
import { Scanner } from './components/Scanner';
import { Admin } from './components/Admin';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [code, setCode] = useState('');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    const path = window.location.pathname;
    setCurrentPath(path);

    if (path.startsWith('/scan/')) {
      const scanCode = path.split('/scan/')[1];
      setCode(scanCode || '');
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');

      if (link && link.href.startsWith(window.location.origin)) {
        e.preventDefault();
        const newPath = new URL(link.href).pathname;
        window.history.pushState({}, '', newPath);
        setCurrentPath(newPath);

        if (newPath.startsWith('/scan/')) {
          const scanCode = newPath.split('/scan/')[1];
          setCode(scanCode || '');
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  if (currentPath === '/admin') {
    return <Admin />;
  }

  if (currentPath.startsWith('/scan/')) {
    return <Scanner code={code} />;
  }

  return <Reception />;
}

export default App;
