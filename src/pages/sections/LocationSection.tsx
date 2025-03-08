const LocationSection = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    Onde Estamos
                </h2>
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                    <iframe
                        title="Localização"
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1944.7532706496327!2d-38.306076618385305!3d-12.87511678886111!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7163e1aac9d7cb1%3A0xcd4233191d71b28a!2sEst%20do%20C%C3%B4co%2C%206216%20-%20Belo%20Horizonte%2C%20Lauro%20de%20Freitas%20-%20BA%2C%2042700-000!5e0!3m2!1spt-BR!2sbr!4v1720078674801!5m2!1spt-BR!2sbr"
                        className="w-full h-96 border-0"
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default LocationSection;