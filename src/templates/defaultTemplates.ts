export interface BlockTemplate {
  id: string
  title: string
  description: string
  category: "Hero & Banner" | "Content & Layout" | "Media & Gallery" | "Interactive & Dynamic"
  icon: string
  defaultProps: Record<string, any>
}

export const DEFAULT_BLOCK_TEMPLATES: BlockTemplate[] = [
  {
    id: "hero-impact",
    title: "High-Impact Hero Banner",
    description: "Featured title, subheading, call to action buttons, and background banner image.",
    category: "Hero & Banner",
    icon: "🎯",
    defaultProps: {
      blockType: "hero",
      title: "Welcome to Our Community",
      subtitle: "Empowering local neighborhood connection, events, and business growth.",
      primaryButtonLabel: "Get Involved",
      primaryButtonUrl: "/contact",
      secondaryButtonLabel: "Explore Directory",
      secondaryButtonUrl: "/businesses",
    },
  },
  {
    id: "cta-action",
    title: "Call To Action Banner",
    description: "High-visibility banner section driving user signups, donations, or registrations.",
    category: "Hero & Banner",
    icon: "🚀",
    defaultProps: {
      blockType: "cta",
      title: "Join the Neighborhood Association Today",
      description: "Support local events, street safety initiatives, and community grants.",
      buttonLabel: "Become a Member",
      buttonUrl: "/membership",
      theme: "brand",
    },
  },
  {
    id: "content-3col",
    title: "3-Column Feature Grid",
    description: "Multi-column content layout for showcasing initiatives, benefits, or news.",
    category: "Content & Layout",
    icon: "📝",
    defaultProps: {
      blockType: "content",
      columns: [
        {
          title: "Community Events",
          text: "Annual Block Parties, Farmers Markets, and Neighborhood Night Out gatherings.",
        },
        {
          title: "Local Businesses",
          text: "Support neighborhood shops, cafes, services, and local entrepreneurs.",
        },
        {
          title: "Safety & Grants",
          text: "Traffic calming, tree planting programs, and neighborhood improvement grants.",
        },
      ],
    },
  },
  {
    id: "business-spotlight",
    title: "Local Business Directory Spotlight",
    description: "Featured grid highlighting local businesses, hours, and contact details.",
    category: "Interactive & Dynamic",
    icon: "🏪",
    defaultProps: {
      blockType: "businessSpotlight",
      title: "Featured Local Businesses",
      limit: 3,
      showRating: true,
    },
  },
  {
    id: "contact-map",
    title: "Contact Info & Interactive Map",
    description: "Display office address, email, phone, and embedded Google Map location.",
    category: "Interactive & Dynamic",
    icon: "📞",
    defaultProps: {
      blockType: "contact",
      title: "Get in Touch",
      email: "info@blockvibe.org",
      phone: "(515) 555-0199",
      address: "Des Moines, IA 50309",
      showMap: true,
    },
  },
]
