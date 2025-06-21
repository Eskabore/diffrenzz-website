import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const useRestartOnLang = () => {
  const { i18n } = useTranslation();
  const [key, setKey] = useState(0);
  useEffect(() => setKey((k) => k + 1), [i18n.language]);
  return key;
};
