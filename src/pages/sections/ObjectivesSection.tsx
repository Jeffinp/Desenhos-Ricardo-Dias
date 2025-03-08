const ObjectivesSection = () => {
    const objectives = [
        {
            title: 'Experiências Práticas',
            description: 'Descubra novas ferramentas e desenvolva suas habilidades!',
            bgClass: 'bg-blue-100'
        },
        {
            title: 'Técnicas Profissionais',
            description: 'Aprenda técnicas avançadas de desenho',
            bgClass: 'bg-green-100'
        },
        {
            title: 'Criatividade',
            description: 'Libere todo seu potencial criativo',
            bgClass: 'bg-purple-100'
        }
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    Objetivos do Curso
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {objectives.map((obj, index) => (
                        <div
                            key={index}
                            className={`p-6 rounded-xl ${obj.bgClass} hover:transform hover:scale-105 transition-all`}
                        >
                            <h3 className="text-xl font-semibold mb-3">{obj.title}</h3>
                            <p className="text-gray-600">{obj.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ObjectivesSection;