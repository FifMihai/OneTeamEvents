// components/EventCard.jsx
export default function EventCard({ event }: { event: any }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
      {/* Dacă avem imagine, o afișăm */}
      {event.image_url && (
        <img 
          src={event.image_url} 
          alt={event.title} 
          style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }} 
        />
      )}
      
      <h3 style={{ color: 'black' }}>{event.title}</h3>
      <p style={{ color: 'black' }}>📍 {event.location} | 📅 {new Date(event.date).toLocaleDateString()}</p>
      <p style={{ color: 'red' }}>{event.description}</p>
      
      <button style={{ background: '#0070f3', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
        Detalii
      </button>
    </div>
  );
}