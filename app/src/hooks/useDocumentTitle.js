import { useEffect } from "react";

const useDocumentTitle = (title, defaultTitle = "Practitioner Management") => {
  useEffect(() => {
    window.document.title = `${title} | Practitioner Management`;

    return () => {
      window.document.title = defaultTitle;
    };
  }, [title, defaultTitle]);
};

export default useDocumentTitle;
