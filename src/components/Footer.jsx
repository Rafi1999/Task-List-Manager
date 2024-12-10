import React from "react";

export default function Footer() {
  return (
    <footer className=" bg-gray-100 dark:bg-gray-800 dark:text-gray-400 text-center">
      © 2024{" "}
      <a
        href="https://alrafi99.netlify.app/"
        className="hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Al Rafi™
      </a>
      . All Rights Reserved.
    </footer>
  );
}
