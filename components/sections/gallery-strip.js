import Image from 'next/image';

export function GalleryStrip({ vehicle }) {
  return (
    <section className="container-shell py-20">
      <div className="mb-8">
        <p className="section-kicker">Gallery</p>
        <h2 className="section-title">Cinematic visuals, ready for official asset replacement.</h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="relative min-h-[460px] overflow-hidden rounded-[2rem]">
          <Image src={vehicle.gallery[0]} alt={vehicle.name} fill className="object-cover" />
        </div>
        <div className="grid gap-6">
          {vehicle.gallery.slice(1).map((image) => (
            <div key={image} className="relative min-h-[217px] overflow-hidden rounded-[2rem]">
              <Image src={image} alt={vehicle.name} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
