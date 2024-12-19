"use client";

import Link from 'next/link';


function MyLink({ children, href }: {
  children: string;
  href: string;
}) {
  if (href === '') href = '/';
  return href.startsWith('/') || href.startsWith('#') ? (
    <Link href={href} className='toc-link'>
      {children}
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

export default MyLink;