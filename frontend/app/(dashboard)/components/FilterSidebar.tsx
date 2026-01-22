'use client';

import Dropdown from '@/components/ui/Dropdown';
import RadioGroup from '@/components/ui/RadioGroup';
import Toggle from '@/components/ui/Toggle';
import { BullFilters } from '@/lib/types/bull.types';
import { useState } from 'react';
import classes from './FilterSidebar.module.css';

interface FilterSidebarProps {
  readonly filters: BullFilters;
  readonly onFilterChange: (filters: Partial<BullFilters>) => void;
}

export default function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const [isVaquillonaEnabled, setIsVaquillonaEnabled] = useState(false);

  const handleOriginChange = (value: string) => {
    onFilterChange({ origin: value as BullFilters['origin'] });
  };

  const handleVaquillonaToggle = (checked: boolean) => {
    setIsVaquillonaEnabled(checked);
    onFilterChange({ usage: checked ? 'vaquillona' : undefined });
  };

  const handleCoatColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onFilterChange({ coatColor: value === 'todos' ? undefined : value as BullFilters['coatColor'] });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ sort: e.target.value as 'asc' | 'desc' });
  };

  return (
    <aside className="w-72 bg-black min-h-screen p-6 flex flex-col">
      <div className="border-b border-gray-200 mb-8">
        {/* FILTROS ACTIVOS - Origen */}
      <div className="mb-6 border-b border-gray-200">
        <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
          Filtros Activos
        </h3>
        <div className="mb-8">
          <h4 className="text-sm font-medium text-slate-100 mb-3">Origen</h4>
          <RadioGroup
            name="origin"
            value={filters.origin || 'todos'}
            onChange={handleOriginChange}
            options={[
              { value: 'todos', label: 'Todos' },
              { value: 'propio', label: 'Toros propios' },
              { value: 'catalogo', label: 'Catálogo' },
              { value: 'favoritos', label: 'Favoritos' },
            ]}
          />
        </div>
      </div>

      {/* FILTROS PRODUCTIVOS */}
      <div className="mb-8">
        <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
          Filtros Productivos
        </h3>

        {/* Para vaquillona Toggle */}
        <div className="mb-4 bg-primary-dark rounded-lg text-white py-3 px-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-sm font-medium text-slate-100">Para vaquillona</span>
              <p className="text-xs text-slate-400">Facilidad de parto</p>
            </div>
            <Toggle
              checked={isVaquillonaEnabled}
              onChange={handleVaquillonaToggle}
            />
          </div>
        </div>

        {/* Pelaje Dropdown */}
        <div className="mb-4">
          <Dropdown
            label="Pelaje"
            value={filters.coatColor || 'todos'}
            onChange={handleCoatColorChange}
            options={[
              { value: 'todos', label: 'Todos' },
              { value: 'negro', label: 'Negro' },
              { value: 'colorado', label: 'Colorado' },
            ]}
          />
        </div>
      </div>

      {/* ORDENAMIENTO */}
      <div className="mb-8">
        <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
          Ordenamiento
        </h3>
        <Dropdown
          value={filters.sort}
          onChange={handleSortChange}
          options={[
            { value: 'desc', label: 'Score mayor a peor' },
            { value: 'asc', label: 'Score menor a mayor' },
          ]}
        />
      </div>
      </div>

      {/* OBJETIVO ACTUAL */}
      <div className="bg-primary-dark rounded-lg p-4">
        <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
          Objetivo actual
        </h3>
        <p className="text-sm text-slate-200 mb-4">
          Maximizar la ganancia de peso (destete) manteniendo facilidad de parto
        </p>
        <button className={classes.actionButton}>
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Editar criterios
        </button>
      </div>
    </aside>
  );
}
