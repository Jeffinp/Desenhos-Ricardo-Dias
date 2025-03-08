const TestimonialsSection = () => {
    const testimonials = [
        {
            text: "Minha filha evoluiu muito com o curso. Metodologia excelente!",
            author: "Maribel"
        },
        {
            text: "O professor é muito atencioso e a evolução é visível!",
            author: "Glorimar"
        },
        {
            text: "Meu filho desenvolveu técnicas incríveis. Recomendo!",
            author: "Cláudia"
        }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    Depoimentos
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                            <p className="font-semibold text-blue-600">- {testimonial.author}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;