import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Plus, Trash2, CheckCircle, Circle, Clock, Bell, ListTodo } from 'lucide-react';
import { format, isToday, isTomorrow, isPast, parseISO } from 'date-fns';
import NotFound from './pages/error/NotFound';
import ServerError from './pages/error/ServerError';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newTask = {
      id: crypto.randomUUID(),
      text: input,
      completed: false,
      createdAt: new Date().toISOString(),
      reminder: reminderDate || null,
    };

    setTasks([newTask, ...tasks]);
    setInput('');
    setReminderDate('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const getReminderStatus = (date) => {
    if (!date) return null;
    const d = parseISO(date);
    if (isPast(d) && !isToday(d)) return 'vencido';
    if (isToday(d)) return 'hoy';
    if (isTomorrow(d)) return 'mañana';
    return format(d, 'MMM d');
  };

  const Dashboard = () => (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <div className="max-w-2xl mx-auto py-12 px-4">
        <header className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <ListTodo className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl font-extrabold tracking-tight">Mis Tareas</h1>
          </div>
          <p className="text-gray-500">Organiza tu día de forma sencilla</p>
        </header>

        {/* Input Area */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 hover:shadow-md transition-shadow">
          <form onSubmit={addTask} className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="¿Qué necesitas hacer hoy?"
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2 font-medium"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Añadir</span>
              </button>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                <Bell className="w-4 h-4 text-indigo-500" />
                <input
                  type="datetime-local"
                  value={reminderDate}
                  onChange={(e) => setReminderDate(e.target.value)}
                  className="bg-transparent focus:outline-none"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === f
                ? 'bg-indigo-100 text-indigo-700 shadow-sm'
                : 'text-gray-500 hover:bg-gray-100'
                }`}
            >
              {f === 'all' ? 'Todas' : f === 'active' ? 'Pendientes' : 'Completadas'}
            </button>
          ))}
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-100">
              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-400 font-medium">No hay tareas pendientes</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`group flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-indigo-200 transition-all ${task.completed ? 'opacity-75' : ''
                  }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="flex-shrink-0 transition-transform active:scale-90"
                  >
                    {task.completed ? (
                      <CheckCircle className="w-6 h-6 text-emerald-500 fill-emerald-50" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-300 hover:text-indigo-400" />
                    )}
                  </button>
                  <div className="flex flex-col">
                    <span className={`text-lg font-medium transition-all ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'
                      }`}>
                      {task.text}
                    </span>
                    {task.reminder && (
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Clock className={`w-3.5 h-3.5 ${getReminderStatus(task.reminder) === 'vencido' ? 'text-rose-500' : 'text-indigo-400'
                          }`} />
                        <span className={`text-xs font-semibold uppercase tracking-wider ${getReminderStatus(task.reminder) === 'vencido'
                          ? 'text-rose-500'
                          : 'text-indigo-500'
                          }`}>
                          {getReminderStatus(task.reminder)}
                        </span>
                        <span className="text-xs text-gray-400">
                          {format(parseISO(task.reminder), 'HH:mm')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Stats */}
        <footer className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
          <div>
            {tasks.filter(t => !t.completed).length} tareas pendientes
          </div>
          <div className="flex items-center gap-1">
            Hecho con <span className="text-rose-400">❤</span> para organizarte
          </div>
        </footer>
      </div>
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/500" element={<ServerError />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
