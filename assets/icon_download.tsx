import React from "react";

interface Props {
  className?: string;
}

const Icon_download = (props: Props) => {
  return (
    <svg
      height="25"
      width="24"
      fill="none"
      viewBox="0 0 24 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect height="2" width="16" fill="#212B36" rx="1" x="4" y="18.5" />
      <rect
        height="2"
        width="4"
        fill="#212B36"
        rx="1"
        transform="rotate(-90 4 20.5)"
        x="4"
        y="20.5"
      />
      <rect
        height="2"
        width="4"
        fill="#212B36"
        rx="1"
        transform="rotate(-90 18 20.5)"
        x="18"
        y="20.5"
      />
      <path
        d="M12 15.5C11.7927 15.5016 11.59 15.4387 11.42 15.32L7.42003 12.5C6.97121 12.1816 6.86396 11.5604 7.18003 11.11C7.3331 10.8916 7.56711 10.7433 7.83001 10.6982C8.09292 10.6532 8.36294 10.715 8.58003 10.87L12 13.26L15.4 10.7C15.8419 10.3686 16.4687 10.4582 16.8 10.9C17.1314 11.3418 17.0419 11.9686 16.6 12.3L12.6 15.3C12.4269 15.4298 12.2164 15.5 12 15.5Z"
        fill="#212B36"
      />
      <path
        d="M12 13.5C11.4477 13.5 11 13.0523 11 12.5V4.5C11 3.94772 11.4477 3.5 12 3.5C12.5523 3.5 13 3.94772 13 4.5V12.5C13 13.0523 12.5523 13.5 12 13.5Z"
        fill="#212B36"
      />
    </svg>
  );
};

export default Icon_download;
