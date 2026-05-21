'use client';
import React from 'react';
import { Label, ListBox, SearchField, Select } from '@heroui/react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const SearchFilterSort = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // /all-pets?species=bird&search=Sunny ei akare data route hobe r AllPetsPage sei route theke searchParmas nibe niya server a request korbe server abar mongodb te request korbe tokhon mongodb $regex and $in er maddhome query kore data server k return dibe r oi data amar fetch kore ui te dekhabo

  // onChange={val => handleFilter('search', val)}
  // onSelectionChange={key => handleFilter('species', key)}
  const handleFilter = (name, value) => {
    // ager searchParmas thakle ta params a set hobe
    const params = new URLSearchParams(searchParams);
    // value jodi thake r seita jodi all na hoy tobe params set hobe na hole params delete hobe .tar por sei notun route a bortoman pathname r set kora params hobe 
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
    <div className="flex gap-4 items-end">
      <SearchField
        name="search"
        defaultValue={searchParams.get('search') || ''}
        onChange={val => handleFilter('search', val)}
      >
        <Label className="font-bold text-gray-300">Search</Label>
        <SearchField.Group className="bg-white/5 border-white/10 rounded-2xl h-10 mt-1">
          <SearchField.SearchIcon className="ml-2 text-purple-400" />
          <SearchField.Input
            className="w-[280px] text-white"
            placeholder="Search..."
          />
          <SearchField.ClearButton className="mr-2" />
        </SearchField.Group>
      </SearchField>

      <div className="w-[200px]">
        <Select
          name="species"
          placeholder="Select species"
          selectedKey={searchParams.get('species') || 'all'}
          onSelectionChange={key => handleFilter('species', key)}
          className="w-full"
        >
          <Label className="font-bold text-gray-300">Species</Label>
          <Select.Trigger className="rounded-2xl h-10 bg-white/5 border-white/10 text-white mt-1">
            <Select.Value />
            <Select.Indicator className="mr-2" />
          </Select.Trigger>
          <Select.Popover>
            <ListBox className="bg-[#1A0B40] text-gray-200 border border-white/10 rounded-xl p-1 shadow-2xl">
              {speciesOptions.map(item => (
                <ListBox.Item
                  key={item.id}
                  id={item.id}
                  textValue={item.label}
                  className="rounded-lg hover:bg-purple-600 hover:text-white transition-colors cursor-pointer"
                >
                  {item.label}
                  <ListBox.ItemIndicator />
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
