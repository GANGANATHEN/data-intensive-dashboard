'use client';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { useDashboardData } from '../hooks/useDashboardData';

export default function Dashboard() {
  const { data, isLoading } = useDashboardData();
  const parentRef = useRef();

  const rowVirtualizer = useVirtualizer({
    count: data?.length || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 55, // Row height
  });

  if (isLoading) return <div className="p-10 text-center">Loading 10,000 records...</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Virtualized List Performance</h2>
      
      {/* List Container */}
      <div 
        ref={parentRef} 
        className="h-[500px] overflow-auto border border-slate-300 rounded-lg bg-white shadow-inner"
      >
        <div 
          className="relative w-full" 
          style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <div
              key={virtualRow.key}
              className={`absolute top-0 left-0 w-full flex items-center px-4 border-b border-slate-100 ${
                virtualRow.index % 2 === 0 ? 'bg-slate-50' : 'bg-white'
              }`}
              style={{
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <span className="text-slate-400 w-12 font-mono text-xs">#{virtualRow.index}</span>
              <span className="text-slate-800 font-medium">{data[virtualRow.index].name}</span>
              <span className={`ml-auto px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                data[virtualRow.index].status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {data[virtualRow.index].status}
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-xs text-slate-400">
        Active DOM Nodes: {rowVirtualizer.getVirtualItems().length} / 10,000
      </p>
    </div>
  );
}