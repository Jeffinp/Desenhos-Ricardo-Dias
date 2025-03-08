import React from 'react';
import { motion } from 'framer-motion';
import GallerySection from './sections/GallerySection';
import ObjectivesSection from './sections/ObjectivesSection';
import TestimonialsSection from './sections/TestimonialsSection';
import LocationSection from './sections/LocationSection';

const HomePage = () => {
    return (
        <div className="pt-20">
            {/* Banner Section */}
            <section className="bg-gradient-to-r from-blue-500 to-purple-600 py-20 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -right-20 -top-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Aulas de Desenho Profissional em Lauro de Freitas
                        </h1>
                        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                            Desenvolva suas habilidades artísticas com metodologia exclusiva e acompanhamento personalizado
                        </p>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <a
                                href="#inscricao"
                                className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-white/90 shadow-lg transition duration-300 inline-block"
                            >
                                Comece Agora
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Banner Feature Cards */}
                    <div className="grid md:grid-cols-3 gap-6 mt-16">
                        {bannerFeatures.map((feature, index) => (
                            <motion.div
                                key={`feature-${index}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white border border-white/20 shadow-xl hover:bg-white/20 transition duration-300"
                            >
                                <div className="text-white/90 mb-4 bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-white/80">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="py-16 bg-pattern">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                            <img
                                src="/assets/imagens/studio-photo.webp"
                                alt="Estúdio de Arte"
                                className="rounded-xl shadow-2xl w-full"
                            />
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="section-title mb-6">
                                Bem-vindo ao Estúdio de Arte
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Com mais de 10 anos de experiência, nosso estúdio oferece aulas para todos os níveis, desde iniciantes até artistas avançados. Utilizamos métodos inovadores que combinam técnicas clássicas com abordagens contemporâneas.
                            </p>
                            <p className="text-gray-600 mb-8">
                                Nosso ambiente acolhedor e equipado com todos os materiais necessários proporciona a atmosfera perfeita para desenvolver sua criatividade e habilidades artísticas.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a href="#metodologia" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition duration-300 inline-flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Conheça Nossa Metodologia
                                </a>
                                <a href="#contato" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition duration-300 inline-flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    Fale Conosco
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div key={`stat-${index}`} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Import other sections */}
            <GallerySection />
            <ObjectivesSection />
            <TestimonialsSection />
            <LocationSection />

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white" id="inscricao">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Pronto para começar sua jornada artística?
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                        Inscreva-se agora e ganhe sua primeira aula experimental gratuita
                    </p>
                    <a
                        href="#contato"
                        className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-white/90 shadow-lg transition duration-300 inline-block"
                    >
                        Inscreva-se Hoje
                    </a>
                </div>
            </section>
        </div>
    );
};

// Banner features data
const bannerFeatures = [
    {
        title: "Metodologia Exclusiva",
        description: "Abordagem passo a passo que garante resultados rápidos e eficientes",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        )
    },
    {
        title: "Turmas Reduzidas",
        description: "Atendimento personalizado com foco no desenvolvimento individual",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        )
    },
    {
        title: "Flexibilidade de Horários",
        description: "Opções de aulas durante a semana e aos sábados para sua conveniência",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    }
];

// Stats data
const stats = [
    { value: "10+", label: "Anos de Experiência" },
    { value: "500+", label: "Alunos Formados" },
    { value: "30+", label: "Técnicas Ensinadas" },
    { value: "98%", label: "Taxa de Satisfação" }
];

export default HomePage;