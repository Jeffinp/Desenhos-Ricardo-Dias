import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageDetail {
    src: string;
    title: string;
    description: string;
}

const GallerySection = () => {
    const images = [
        'aguiaPS.webp',
        'arara2.webp',
        'borboleta.webp',
        'dino2.webp',
        'InstagramCapture_88f4e346-2bac-4d34-8554-5073a70fce71.webp',
        '20200602_075745.webp',
        '20200602_075915.webp',
        '20200602_075959.webp',
        'IMG_20200416_160332_954.webp',
        'foto1.webp',
        'foto2.webp',
        'foto3.webp',
        'foto4.webp',
        'foto5.webp',
        'foto6.webp',
        'foto7.webp',
        'foto8.webp',
        'foto9.webp',
        'foto10.webp',
        'foto11.webp',
        'foto12.webp',
        'foto13.webp',
        'foto14.webp',
        'foto15.webp',
        'foto16.webp'
    ];

    // Adicionando títulos e descrições para cada imagem
    const imageDetails: ImageDetail[] = images.map((img, index: number) => ({
        src: img,
        title: `Arte ${index + 1}`,
        description: `Descrição da obra de arte ${index + 1}. Você pode adicionar detalhes como técnica, tamanho e inspiração.`
    }));

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalImage, setModalImage] = useState<ImageDetail | null>(null);
    const [isLoaded, setIsLoaded] = useState<boolean[]>(Array(images.length).fill(false));
    const carouselRef = useRef<HTMLDivElement>(null);
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

    // Requisito de deslize mínimo para mudar de slide (em pixels)
    const minSwipeDistance = 50;

    const updateCurrentImage = useCallback((index: number) => {
        const newIndex = (index + imageDetails.length) % imageDetails.length;
        setCurrentIndex(newIndex);
    }, [imageDetails.length]);

    const nextImage = useCallback(() => {
        updateCurrentImage(currentIndex + 1);
    }, [currentIndex, updateCurrentImage]);

    const prevImage = useCallback(() => {
        updateCurrentImage(currentIndex - 1);
    }, [currentIndex, updateCurrentImage]);

    const goToImage = useCallback((index: number) => {
        updateCurrentImage(index);
    }, [updateCurrentImage]);

    // Controle de reprodução automática
    const toggleAutoPlay = () => {
        setIsAutoPlaying(!isAutoPlaying);
    };

    // Gerenciamento da reprodução automática
    useEffect(() => {
        if (isAutoPlaying) {
            autoPlayRef.current = setInterval(nextImage, 5000);
        } else if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
        }
        return () => {
            if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        };
    }, [isAutoPlaying, nextImage]);

    // Pausa a reprodução automática quando interagirem com o carousel
    const handleInteraction = () => {
        if (isAutoPlaying && autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
            autoPlayRef.current = setInterval(nextImage, 5000);
        }
    };

    // Manipuladores de eventos de toque para deslizar
    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isSwipeLeftEnough = distance > minSwipeDistance;
        const isSwipeRightEnough = distance < -minSwipeDistance;

        if (isSwipeLeftEnough) {
            nextImage();
        } else if (isSwipeRightEnough) {
            prevImage();
        }
    };

    // Manipuladores para o modal de visualização em tela cheia
    const openModal = (image: ImageDetail) => {
        setModalImage(image);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden'; // Previne rolagem quando o modal estiver aberto
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'auto'; // Restaura rolagem
    };

    // Manipulador para teclas de seta
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                prevImage();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            } else if (e.key === 'Escape' && isModalOpen) {
                closeModal();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [prevImage, nextImage, isModalOpen]);

    // Pré-carregamento das imagens
    const handleImageLoad = (index: number) => {
        const newIsLoaded = [...isLoaded];
        newIsLoaded[index] = true;
        setIsLoaded(newIsLoaded);
    };

    // Calcular imagens visíveis para paginação
    const visibleRange = 3; // Número de indicadores visíveis de cada lado do atual
    const paginationStart = Math.max(0, currentIndex - visibleRange);
    const paginationEnd = Math.min(imageDetails.length, currentIndex + visibleRange + 1);
    const visiblePagination = imageDetails.slice(paginationStart, paginationEnd);

    return (
        <section className="py-16 bg-pattern">
            <div className="container mx-auto px-4">
                <h2 className="section-title text-center">
                    Meus Melhores Trabalhos
                </h2>
                <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
                    Explore minha galeria de artes e desenhos. Cada peça representa uma história única e uma técnica específica.
                    Clique nas imagens para ver em tamanho ampliado.
                </p>

                {/* Carousel Container */}
                <div
                    className="relative max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    ref={carouselRef}
                >
                    {/* Preloader */}
                    <div className="hidden">
                        {imageDetails.map((image, index) => (
                            <img
                                key={`preload-${index}`}
                                src={`assets/imagens/${image.src}`}
                                alt=""
                                onLoad={() => handleImageLoad(index)}
                            />
                        ))}
                    </div>

                    {/* Main Carousel */}
                    <div className="aspect-w-16 aspect-h-9 bg-gray-900 relative">
                        <AnimatePresence initial={false}>
                            <motion.img
                                key={currentIndex}
                                src={`assets/imagens/${imageDetails[currentIndex].src}`}
                                alt={imageDetails[currentIndex].title}
                                className="w-full h-full object-contain cursor-pointer"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                onClick={() => openModal(imageDetails[currentIndex])}
                                loading="eager"
                            />
                        </AnimatePresence>

                        {/* Image Overlay with Info */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                            <h3 className="text-xl font-bold mb-2">{imageDetails[currentIndex].title}</h3>
                            <p className="text-sm hidden md:block">{imageDetails[currentIndex].description}</p>
                        </div>

                        {/* Navigation Buttons */}
                        <button
                            onClick={() => { prevImage(); handleInteraction(); }}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full w-12 h-12 flex items-center justify-center backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-blue-500"
                            aria-label="Imagem anterior"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => { nextImage(); handleInteraction(); }}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full w-12 h-12 flex items-center justify-center backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-blue-500"
                            aria-label="Próxima imagem"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* AutoPlay Toggle */}
                        <button
                            onClick={toggleAutoPlay}
                            className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-2 rounded-full transition-all duration-300"
                            aria-label={isAutoPlaying ? "Pausar apresentação" : "Iniciar apresentação"}
                        >
                            {isAutoPlaying ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 h-1">
                        <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 transition-all duration-300 ease-out"
                            style={{ width: `${(currentIndex / (imageDetails.length - 1)) * 100}%` }}
                        ></div>
                    </div>

                    {/* Thumbnail Navigation */}
                    <div className="bg-gray-100 p-4 overflow-x-auto hidden md:block">
                        <div className="flex space-x-2 justify-center">
                            {visiblePagination.map((image, idx) => {
                                const actualIndex = paginationStart + idx;
                                return (
                                    <button
                                        key={`thumb-${actualIndex}`}
                                        onClick={() => { goToImage(actualIndex); handleInteraction(); }}
                                        className={`focus:outline-none transition-all duration-300 ${currentIndex === actualIndex
                                            ? 'ring-2 ring-blue-500 scale-110'
                                            : 'opacity-70 hover:opacity-100'
                                            }`}
                                        aria-label={`Ver imagem ${actualIndex + 1}`}
                                    >
                                        <img
                                            src={`assets/imagens/${image.src}`}
                                            alt={`Miniatura ${actualIndex + 1}`}
                                            className="h-16 w-24 object-cover rounded"
                                            loading="lazy"
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Mobile Dot Indicators */}
                    <div className="flex justify-center space-x-2 py-4 md:hidden">
                        {imageDetails.map((_, idx) => (
                            <button
                                key={`dot-${idx}`}
                                onClick={() => { goToImage(idx); handleInteraction(); }}
                                className={`w-3 h-3 rounded-full focus:outline-none transition-all duration-300 ${currentIndex === idx
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125'
                                    : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                aria-label={`Ver imagem ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Image Counter */}
                <div className="text-center mt-4 text-gray-600">
                    <span className="font-medium">{currentIndex + 1}</span> de <span className="font-medium">{imageDetails.length}</span> trabalhos
                </div>

                {/* Fullscreen Modal */}
                {isModalOpen && modalImage && (
                    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all duration-300"
                            aria-label="Fechar visualização ampliada"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <img
                            src={`assets/imagens/${modalImage.src}`}
                            alt={modalImage.title}
                            className="max-w-full max-h-[90vh] object-contain"
                        />

                        <div className="absolute bottom-8 left-0 right-0 text-center text-white bg-black/50 py-4 px-6 mx-auto max-w-2xl rounded-lg backdrop-blur-sm">
                            <h3 className="text-2xl font-bold mb-2">{modalImage.title}</h3>
                            <p>{modalImage.description}</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default GallerySection;