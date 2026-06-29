import { useState, useEffect } from "react";
import { BrainCircuit, Database, Network, Search, Zap, Loader2, CheckCircle2, ArrowRight } from "lucide-react";

export default function Memory() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncComplete, setSyncComplete] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setSyncComplete(false);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncComplete(true);
      setTimeout(() => setSyncComplete(false), 3000);
    }, 2000);
  };

  useEffect(() => {
    if (searchQuery.length > 1) {
      setIsSearching(true);
      const timer = setTimeout(() => setIsSearching(false), 800);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  return (
    <div className="space-y-6 animate-fade-in p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center border-b border-border/50 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Enterprise Reasoning Memory</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Real-time graph of historical decisions, outcomes, and business context.
          </p>
        </div>
        <button 
          onClick={handleSync}
          disabled={isSyncing}
          className={`px-5 py-2.5 rounded-md text-sm font-bold flex items-center transition-all shadow-sm ${
            syncComplete ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 
            isSyncing ? 'bg-indigo-400 text-white cursor-not-allowed' : 
            'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {syncComplete ? (
            <><CheckCircle2 className="w-4 h-4 mr-2" /> Synced Successfully</>
          ) : isSyncing ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Syncing Nodes...</>
          ) : (
            <><Database className="w-4 h-4 mr-2" /> Sync Enterprise Data</>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel p-6 rounded-xl border-t-4 border-indigo-500 flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer">
          <div>
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Total Nodes</span>
            <div className="text-4xl font-black mt-2 text-indigo-950">24,931</div>
          </div>
          <Network className="w-8 h-8 text-indigo-200 mt-4 self-end" />
        </div>
        <div className="glass-panel p-6 rounded-xl border-t-4 border-emerald-500 flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer">
          <div>
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Successful Outcomes</span>
            <div className="text-4xl font-black mt-2 text-emerald-950">94.2%</div>
          </div>
          <Zap className="w-8 h-8 text-emerald-200 mt-4 self-end" />
        </div>
        <div className="glass-panel p-6 rounded-xl border-t-4 border-purple-500 flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer">
          <div>
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Active Embeddings</span>
            <div className="text-4xl font-black mt-2 text-purple-950">3.2M</div>
          </div>
          <BrainCircuit className="w-8 h-8 text-purple-200 mt-4 self-end" />
        </div>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden border border-border/50 relative">
        <div className="p-4 bg-white border-b border-border/50 flex items-center relative z-20 shadow-sm">
          <Search className={`w-5 h-5 mr-3 ${searchQuery ? 'text-indigo-600' : 'text-muted-foreground'}`} />
          <input 
            type="text" 
            placeholder="Search memory graph (e.g., 'Pricing objections in Q3')" 
            className="bg-transparent border-none text-[15px] font-medium w-full outline-none placeholder:text-slate-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {isSearching && <Loader2 className="w-4 h-4 text-indigo-500 animate-spin absolute right-4" />}
        </div>
        
        {/* Mock Search Results Overlay */}
        {searchQuery.length > 1 && !isSearching && (
          <div className="absolute top-16 left-4 right-4 bg-white rounded-lg shadow-xl border border-slate-200 z-30 max-h-64 overflow-y-auto animate-fade-in">
            <div className="p-2 text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50 border-b border-slate-100">Top Matches</div>
            <div className="p-4 hover:bg-slate-50 cursor-pointer border-b border-slate-50 transition-colors">
              <div className="flex items-center text-sm font-bold text-indigo-900 mb-1"><BrainCircuit className="w-4 h-4 mr-2 text-indigo-500"/> Found 14 historical cases matching "{searchQuery}"</div>
              <p className="text-xs text-slate-500 pl-6">Similar enterprise patterns show a 92% success rate when deploying an Executive Action Plan focusing on commercial renewal discounts.</p>
            </div>
            <div className="p-4 hover:bg-slate-50 cursor-pointer transition-colors">
              <div className="flex items-center text-sm font-bold text-emerald-900 mb-1"><Database className="w-4 h-4 mr-2 text-emerald-500"/> Context Cluster Identified</div>
              <p className="text-xs text-slate-500 pl-6">Related nodes: "Budget constraints", "Q3 timelines", "Competitor pricing pressure".</p>
            </div>
          </div>
        )}

        {/* Graph Visualization */}
        <div className="relative h-[450px] w-full overflow-hidden bg-slate-900/5 flex items-center justify-center">
           {/* SVG Lines */}
           <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
             <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4" className="animate-pulse" />
             <line x1="80%" y1="20%" x2="50%" y2="50%" stroke="#cbd5e1" strokeWidth="2" />
             <line x1="50%" y1="50%" x2="70%" y2="80%" stroke="#818cf8" strokeWidth="3" className="animate-pulse" />
             <line x1="50%" y1="50%" x2="30%" y2="70%" stroke="#cbd5e1" strokeWidth="2" />
             <line x1="20%" y1="30%" x2="30%" y2="70%" stroke="#cbd5e1" strokeWidth="1" />
           </svg>
           
           {/* Nodes */}
           <div className="absolute top-[30%] left-[20%] transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white border-4 border-indigo-200 rounded-full shadow-lg flex items-center justify-center z-10 hover:scale-110 transition-transform cursor-pointer">
             <Database className="w-6 h-6 text-indigo-500" />
           </div>
           
           <div className="absolute top-[20%] left-[80%] transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white border-4 border-emerald-200 rounded-full shadow-lg flex items-center justify-center z-10 hover:scale-110 transition-transform cursor-pointer">
             <BrainCircuit className="w-7 h-7 text-emerald-500" />
           </div>

           {/* Center Node */}
           <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-indigo-600 border-[6px] border-indigo-200 rounded-full shadow-xl shadow-indigo-200/50 flex flex-col items-center justify-center z-10 hover:scale-105 transition-transform cursor-pointer group">
             <Network className="w-10 h-10 text-white group-hover:animate-pulse" />
           </div>

           <div className="absolute top-[80%] left-[70%] transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white border-4 border-purple-200 rounded-full shadow-lg flex items-center justify-center z-10 hover:scale-110 transition-transform cursor-pointer">
             <Search className="w-8 h-8 text-purple-500" />
           </div>

           <div className="absolute top-[70%] left-[30%] transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white border-4 border-slate-200 rounded-full shadow-lg flex items-center justify-center z-10 hover:scale-110 transition-transform cursor-pointer">
             <Zap className="w-5 h-5 text-slate-500" />
           </div>
           
           {/* Floating tags */}
           <div className="absolute top-[26%] left-[22%] bg-white/90 backdrop-blur text-[10px] font-bold text-indigo-800 px-2 py-1 rounded shadow-sm border border-indigo-100">CRM History</div>
           <div className="absolute top-[16%] left-[82%] bg-emerald-50 text-[10px] font-bold text-emerald-800 px-2 py-1 rounded shadow-sm border border-emerald-100">Risk Patterns</div>
           <div className="absolute top-[55%] left-[53%] bg-indigo-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg">Synthesis Hub</div>
           <div className="absolute top-[85%] left-[73%] bg-purple-50 text-[10px] font-bold text-purple-800 px-2 py-1 rounded shadow-sm border border-purple-100">Vector Embeddings</div>
        </div>
      </div>
    </div>
  );
}
