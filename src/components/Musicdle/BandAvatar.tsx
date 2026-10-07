import React, { useState } from "react";
import { Music } from "lucide-react";

interface BandAvatarProps {
  src?: string;
  name: string;
  className?: string;
  iconSize?: number;
}

export const BandAvatar: React.FC<BandAvatarProps> = ({
  src,
  name,
  className = "w-10 h-10 rounded-full",
  iconSize = 18,
}) => {
  const [hasError, setHasError] = useState(false);

  
  if (!src || hasError) {
    const initial = name?.trim()?.charAt(0)?.toUpperCase() || "?";
    return (
      <div
        className={`${className} flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold select-none shrink-0 shadow-sm`}
        title={name}
      >
        {initial ? (
          <span className="text-xs sm:text-sm font-black">{initial}</span>
        ) : (
          <Music size={iconSize} className="opacity-80" />
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`${className} object-cover shrink-0`}
    />
  );
};

export default BandAvatar;
