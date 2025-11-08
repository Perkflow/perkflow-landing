import React from "react";

export default function TitleTag({ title }: { title: string }) {
  return (
    <span className="text-primary inline-block rounded-full border-2 border-white bg-[#F0FCFF] px-5 py-2 text-xs font-semibold tracking-wider uppercase">
      • {title}
    </span>
  );
}
