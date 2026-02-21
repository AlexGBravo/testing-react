import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServerError() {
    const handleReload = () => {
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 font-sans">
            <div className="max-w-lg w-full bg-white p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/50 text-center border border-slate-100">
                <div className="mb-8 flex justify-center">
                    <div className="bg-rose-50 p-5 rounded-2xl">
                        <AlertTriangle className="w-16 h-16 text-rose-500" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
                    Algo no salió bien
                </h1>
                <p className="text-slate-500 mb-10 text-lg leading-relaxed">
                    Estamos experimentando problemas técnicos en este momento. Por favor, intenta recargar la página o vuelve más tarde.
                </p>

                <div className="grid grid-cols-1 gap-3">
                    <button
                        onClick={handleReload}
                        className="flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 text-white rounded-2xl font-semibold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
                    >
                        <RefreshCcw className="w-5 h-5" />
                        Recargar página
                    </button>
                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 px-6 py-4 bg-white text-slate-600 border border-slate-200 rounded-2xl font-semibold hover:bg-slate-50 transition-all active:scale-95"
                    >
                        <Home className="w-5 h-5" />
                        Volver al inicio
                    </Link>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-100">
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">
                        Código de error: 500 INTERNAL_SERVER_ERROR
                    </p>
                </div>
            </div>
        </div>
    );
}
