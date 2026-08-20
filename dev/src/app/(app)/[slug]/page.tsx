import React from 'react'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import configPromise from '../../../payload.config'

function PageBlocks({ layout }: { layout: any[] }) {
  if (!layout || layout.length === 0) {
    return <p style={{ color: '#94a3b8' }}>No layout blocks configured for this page.</p>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      {layout.map((block: any, idx: number) => {
        switch (block.blockType) {
          case 'hero':
            return (
              <section key={idx} style={{
                padding: '3rem 2rem',
                backgroundColor: '#1e293b',
                borderRadius: '0.75rem',
                border: '1px solid #334155',
                textAlign: 'center'
              }}>
                <h1 style={{ fontSize: '2.5rem', marginTop: 0, color: '#f8fafc' }}>{block.title}</h1>
                {block.subtitle && <p style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: '700px', margin: '1rem auto' }}>{block.subtitle}</p>}
                {block.ctaText && block.ctaUrl && (
                  <a href={block.ctaUrl} style={{
                    display: 'inline-block',
                    marginTop: '1.5rem',
                    backgroundColor: '#0284c7',
                    color: '#ffffff',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    fontWeight: 600
                  }}>
                    {block.ctaText}
                  </a>
                )}
              </section>
            )
          case 'features':
            return (
              <section key={idx} style={{ padding: '1rem 0' }}>
                {block.title && <h2 style={{ fontSize: '1.875rem', marginBottom: '1.5rem', color: '#38bdf8' }}>{block.title}</h2>}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  {block.items?.map((item: any, i: number) => (
                    <div key={i} style={{
                      padding: '1.5rem',
                      backgroundColor: '#1e293b',
                      borderRadius: '0.5rem',
                      border: '1px solid #334155'
                    }}>
                      <h3 style={{ marginTop: 0, color: '#f1f5f9' }}>{item.title}</h3>
                      <p style={{ color: '#94a3b8', marginBottom: 0 }}>{item.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )
          case 'content':
            return (
              <section key={idx} style={{
                padding: '2rem',
                backgroundColor: '#1e293b',
                borderRadius: '0.5rem',
                border: '1px solid #334155'
              }}>
                {block.heading && <h2 style={{ marginTop: 0, color: '#38bdf8' }}>{block.heading}</h2>}
                {block.body && <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>{block.body}</p>}
              </section>
            )
          default:
            return (
              <div key={idx} style={{ padding: '1rem', backgroundColor: '#1e293b', borderRadius: '0.5rem' }}>
                <pre style={{ margin: 0, color: '#94a3b8' }}>{JSON.stringify(block, null, 2)}</pre>
              </div>
            )
        }
      })}
    </div>
  )
}

export default async function DynamicSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let pageDoc: any = null

  try {
    const payload = await getPayload({ config: configPromise })
    const pages = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      overrideAccess: true,
    })
    pageDoc = pages.docs[0]
  } catch (err) {
    console.error(`Error fetching page doc for slug "${slug}":`, err)
  }

  if (!pageDoc) {
    notFound()
  }

  return (
    <div>
      <PageBlocks layout={pageDoc.layout} />
    </div>
  )
}
