import { useEffect, useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

/**
 * Props:
 *   words – array of { id: 'smart'|'salesforce'|'solutions', label: string }
 *   highlight – id currently highlighted (sets gold text)
 */
export const TypewriterText = ({
  words,
  highlight,
  className = "",
}: {
  words: { id: string; label: string }[];
  highlight: string;
  className?: string;
}) => {
  const { i18n } = useTranslation();
  const [key, setKey] = useState(0);

  // restart when language changes
  useEffect(() => setKey((k) => k + 1), [i18n.language]);

  return (
    <span key={key} className={clsx("typewriter block", className)}>
      {words.map((w, i) => (
        <span
          key={w.id}
          className={clsx(
            "inline-block relative",
            highlight === w.id && "text-yellow-300"
          )}
        >
          {w.label}
          {i < words.length - 1 && " "}
        </span>
      ))}
    </span>
  );
};

/* ---------------------------------------------------------------------------
                          required global CSS
   ---------------------------------------------------------------------------
@keyframes typing { from { width: 0 } to { width: 100% } }
@keyframes blink  { 50% { border-color: transparent } }

.typewriter {
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid currentColor;
  animation: typing 3.2s steps(34,end), blink .75s step-end infinite;
}
---------------------------------------------------------------------------- */