"use client";

import { cn } from '@/libs/cn';
import Link from 'next/link';


function MyLink({ className, children, href }: {
  children: string;
  href: string;
  className: string;
}) {
  if (href === '') href = '/';
  return href.startsWith('/') || href.startsWith('#') ? (
    <Link href={href} className={cn("toc-link", className)}>
      {children}
    </Link>
  ) : (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

export default MyLink;