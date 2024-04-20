import React from "react";

type ContentBlockProps = {
  children: React.ReactNode;
};

export default function ContentBlock({ children }: ContentBlockProps) {
  return <div className="bg-[#F7F8FA] shadow-sm rounded-md overflow-hidden h-full w-full" >{children}</div>;
}
