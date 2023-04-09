import { useCallback, useState } from "react";

export const useUploadFile = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  }, []);

  const resetFiles = useCallback(() => {
    setFile(null);
  }, []);

  return { resetFiles, handleFileChange, file };
};
