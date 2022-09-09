import { useRouter } from "next/router";
import { useRef, useEffect } from "react";

const usePreviousRoute = () => {
  const { asPath } = useRouter();

  const ref = useRef<string | null>(null);

  useEffect(() => {
    ref.current = asPath;
  }, [asPath]);

  return ref.current;
};

export default usePreviousRoute;
