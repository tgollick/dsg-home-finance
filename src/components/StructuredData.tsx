export function MortgageBrokerSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MortgageBroker",
    "@id": "https://www.dsgmortgages.com/#business",
    name: "DSG Home Finance",
    image: "https://www.dsgmortgages.com/og-home.jpg",
    url: "https://www.dsgmortgages.com",
    telephone: "+44-1843-292935",    
    priceRange: "££",
    address: {
      "@type": "PostalAddress",
      streetAddress: "139 Westbrook Avenue",
      addressLocality: "Margate",
      addressRegion: "Kent",
      postalCode: "CT9 5HH",
      addressCountry: "GB",
    },
    geo: { "@type": "GeoCoordinates", latitude: 51.38287039214657, longitude: 1.3526967270847061,  },
    areaServed: [
      { "@type": "City", name: "Margate" },
      { "@type": "City", name: "Broadstairs" },
      { "@type": "City", name: "Ramsgate" },
      { "@type": "City", name: "Cliftonville" },
      { "@type": "City", name: "Birchington" },
      { "@type": "Place", name: "Thanet" },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "106",           
    },
    sameAs: [      
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}