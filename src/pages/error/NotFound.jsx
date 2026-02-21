import { Link } from 'react-router-dom';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 font-sans">
            <div className="max-w-lg w-full text-center">
                <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center justify-center opacity-5">
                        <span className="text-[200px] font-black tracking-tighter">404</span>
                    </div>
                    <div className="relative flex justify-center">
                        <div className="bg-indigo-50 p-6 rounded-3xl animate-bounce">
                            <FileQuestion className="w-20 h-20 text-indigo-600" />
                        </div>
                    </div>
                </div>

                <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                    Página no encontrada
                </h1>
                <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                    Lo sentimos, la página que estás buscando no existe o ha sido movida a otra ubicación.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
                    >
                        <Home className="w-5 h-5" />
                        Ir al inicio
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-2xl font-semibold hover:bg-gray-50 transition-all active:scale-95"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Regresar
                    </button>
                </div>

                <div className="mt-16 text-gray-400 text-sm">
                    ¿Crees que esto es un error? <a href="#" className="text-indigo-500 font-medium hover:underline">Infórmanos</a>
                </div>
            </div>
        </div>
    );
}
