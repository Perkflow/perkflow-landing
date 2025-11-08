"use client";

import { Link as LinkIcon, Mail } from "lucide-react";
import { FaXTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import Link from "next/link";
import { toast } from "sonner";

export function SocialShareButtons({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    mail: `mailto:?subject=${title}&body=${url}`,
  };

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied !");
  };
  return (
    <div className="flex gap-2">
      <Link href={shareLinks.linkedin} target="_blank">
        <FaLinkedinIn className="h-4 w-4" />
      </Link>
      <Link href={shareLinks.twitter} target="_blank">
        <FaXTwitter className="h-4 w-4" />
      </Link>
      <Link href={shareLinks.facebook} target="_blank">
        <FaFacebookF className="h-4 w-4" />
      </Link>
      <Link href={shareLinks.mail} target="_blank">
        <Mail className="h-4 w-4" />
      </Link>
      <LinkIcon onClick={copyLink} className="h-4 w-4 cursor-pointer" />
    </div>
  );
}
