'use client';
import React from 'react';
import { Label, ListBox, SearchField, Select } from '@heroui/react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const SearchFilterSort = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilter = (name, value) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== 'all') {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const speciesOptions = [
    { id: 'all', label: 'All Species' },
    { id: 'Dog', label: 'Dog' },
    { id: 'Cat', label: 'Cat' },
    { id: 'Rabbit', label: 'Rabbit' },
    { id: 'Bird', label: 'Bird' },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-3xl justify-center">
      {/* Search Input */}
      <SearchField
        name="search"
        defaultValue={searchParams.get('search') || ''}
        onChange={val => handleFilter('search', val)}
        className="w-full sm:w-auto"
      >
        <Label className="font-bold text-gray-300 text-sm mb-1 ml-1 block">
          Search
        </Label>
        <SearchField.Group className="bg-white/5 border-white/10 rounded-2xl h-11">
          <SearchField.SearchIcon className="ml-3 text-purple-400" />
          <SearchField.Input
            className="w-full sm:w-[250px] text-white text-sm"
            placeholder="Search pets..."
          />
          <SearchField.ClearButton className="mr-2" />
        </SearchField.Group>
      </SearchField>

      {/* Species Select */}
      <div className="w-full sm:w-[180px]">
        <Label className="font-bold text-gray-300 text-sm mb-1 ml-1 block">
          Species
        </Label>
        <Select
          name="species"
          placeholder="All Species"
          selectedKey={searchParams.get('species') || 'all'}
          onSelectionChange={key => handleFilter('species', key)}
          className="w-full"
        >
          <Select.Trigger className="rounded-2xl h-11 bg-white/5 border-white/10 text-white text-sm">
            <Select.Value />
            <Select.Indicator className="mr-2" />
          </Select.Trigger>
          <Select.Popover>
            <ListBox className="bg-[#1A0B40] text-gray-200 border border-white/10 rounded-xl p-1">
              {speciesOptions.map(item => (
                <ListBox.Item
                  key={item.id}
                  id={item.id}
                  textValue={item.label}
                  className="rounded-lg hover:bg-purple-600 hover:text-white transition-colors p-2 text-sm"
                >
                  {item.label}
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>
    </div>
  );
};

export default SearchFilterSort;
