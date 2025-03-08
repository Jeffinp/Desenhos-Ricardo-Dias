import { Link } from 'react-router-dom';

const CoursesPage = () => {
    const courses = [
        {
            title: 'Desenho Fundamental',
            icon: '🌳',
            items: [
                'Explore linhas e efeitos para criar texturas únicas',
                'Aprenda formas geométricas e perspectiva'
            ]
        },
        {
            title: 'Animais e Mitologia',
            icon: '🐾',
            items: [
                'Estudo detalhado de animais marinhos e selvagens',
                'Exploração de criaturas mitológicas'
            ]
        },
        // Adicione outros cursos conforme necessário
    ];

    return (
        <div className="pt-20 container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
                Nossos Cursos de Desenho
            </h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                    >
                        <div className="text-4xl mb-4">{course.icon}</div>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                            {course.title}
                        </h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600">
                            {course.items.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="mt-12 text-center">
                <Link
                    to="/inscricao"
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                    Quero Me Inscrever
                </Link>
            </div>
        </div>
    );
};

export default CoursesPage;