const FAQPage = () => {
    const faqs = [
        {
            question: 'Quem pode aprender?',
            answer: 'Crianças a partir de 5 anos, adolescentes e adultos'
        },
        {
            question: 'Qual a duração do curso?',
            answer: '4 a 6 meses com aulas semanais de 2 horas'
        },
        // Adicione outras FAQs
    ];

    return (
        <div className="pt-20 container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
                Perguntas Frequentes
            </h1>

            <div className="max-w-3xl mx-auto space-y-6">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                    >
                        <h3 className="text-xl font-semibold mb-2 text-blue-600">
                            {faq.question}
                        </h3>
                        <p className="text-gray-600">{faq.answer}</p>
                    </div>
                ))}
            </div>

            <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">
                    Não encontrou sua dúvida? Entre em contato:
                </p>
                <a
                    href="https://wa.me/5571988195115"
                    className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition"
                >
                    Falar no WhatsApp
                </a>
            </div>
        </div>
    );
};

export default FAQPage;