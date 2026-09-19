import './Testimonials.css';

const PLACEHOLDER_TESTIMONIALS = [
  {
    id: 'sample-1',
    quote:
      'This is a sample testimonial. Real testimonials from trek participants will replace this placeholder.',
    name: 'Trekker Name',
    detail: 'Previous trek batch',
  },
  {
    id: 'sample-2',
    quote:
      'This is a sample testimonial. Real testimonials from trek participants will replace this placeholder.',
    name: 'Trekker Name',
    detail: 'Previous trek batch',
  },
  {
    id: 'sample-3',
    quote:
      'This is a sample testimonial. Real testimonials from trek participants will replace this placeholder.',
    name: 'Trekker Name',
    detail: 'Previous trek batch',
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials section" aria-labelledby="testimonials-heading">
      <div className="container">
        <p className="section-label">From the Trail</p>
        <h2 id="testimonials-heading" className="section-heading">
          What Trekkers Say
        </h2>

        <p className="testimonials__placeholder-note" role="status">
          ⚠ These are <strong>sample / placeholder</strong> testimonials. Real testimonials will be added from verified trek participants.
        </p>

        <div className="testimonials__grid">
          {PLACEHOLDER_TESTIMONIALS.map((t) => (
            <blockquote className="testimonial" key={t.id}>
              <p className="testimonial__quote">"{t.quote}"</p>
              <footer className="testimonial__footer">
                <cite className="testimonial__name">{t.name}</cite>
                <span className="testimonial__detail">{t.detail}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
