import React from 'react'
import Link from 'next/link'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#0f172a', color: '#f8fafc' }}>
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
          backgroundColor: '#1e293b',
          borderBottom: '1px solid #334155'
        }}>
          <div style={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#38bdf8' }}>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>BlockVibe Dev</Link>
          </div>
          <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link href="/" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: 500 }}>Home</Link>
            <Link href="/about" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: 500 }}>About</Link>
            <Link href="/services" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: 500 }}>Services</Link>
            <Link href="/contact" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: 500 }}>Contact</Link>
            <Link href="/admin" style={{
              backgroundColor: '#0284c7',
              color: '#ffffff',
              padding: '0.4rem 0.8rem',
              borderRadius: '0.375rem',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.9rem'
            }}>Admin Panel</Link>
          </nav>
        </header>
        <main style={{ minHeight: 'calc(100vh - 120px)', padding: '2rem' }}>
          {children}
        </main>
        <footer style={{
          textAlign: 'center',
          padding: '1.5rem',
          backgroundColor: '#1e293b',
          borderTop: '1px solid #334155',
          color: '#64748b',
          fontSize: '0.875rem'
        }}>
          &copy; 2026 BlockVibe payload-visual-builder Dev Harness
        </footer>
      </body>
    </html>
  )
}

