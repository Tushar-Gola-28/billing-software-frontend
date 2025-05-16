'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Typography } from '@mui/material';

const Breadcrumbs = () => {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);

    const formatSegment = (segment) => {
        return decodeURIComponent(segment)
            .replace(/[-_]/g, ' ')         // replace - and _ with space
            .replace(/\b\w/g, c => c.toUpperCase()); // capitalize words
    };

    return (
        <nav style={{ display: "flex" }} aria-label="breadcrumb">
            <Typography variant="body1" sx={{fontStyle:"italic"}}>
                <Link href="/" className="text-blue-600 hover:underline">Home</Link>
            </Typography>
            {segments.map((segment, index) => {
                const href = '/' + segments.slice(0, index + 1).join('/');
                const label = formatSegment(segment);
                const isLast = index === segments.length - 1;
                return (
                    <Typography variant="caption" key={href}
                        sx={{ display: 'inline', ml: 0.5, color: isLast ? "primary.main" : "inherit",fontStyle:"italic" }}
                    >
                        {' / '}
                        <Link href={href} className="text-blue-600 hover:underline">
                            {label}
                        </Link>
                    </Typography>
                );
            })}
        </nav>
    );
};

export default Breadcrumbs;
