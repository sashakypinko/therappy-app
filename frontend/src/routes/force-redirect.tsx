import { useEffect } from 'react';

interface Props {
  to: string;
}

const ForceRedirect = ({ to }: Props): null => {
  useEffect(() => {
    window.location.href = to;
  }, []);

  return null;
};

export default ForceRedirect;
