import PetCard from '@/components/PetCard';
import { Label, ListBox, SearchField, Select } from '@heroui/react';
import React from 'react';

const AllPetsPage = async () => {
  const res = await fetch('http://localhost:5000/pets', { cache: 'no-store' });
  const allPets = await res.json();

  const speciesOptions = [
    { id: 'dog', label: 'Dog' },
    { id: 'cat', label: 'Cat' },
    { id: 'rabbit', label: 'Rabbit' },
    { id: 'bird', label: 'Bird' },
  ];

  return (
    <div className="container mx-auto">
      <div className="py-4 flex justify-start gap-6">
        <SearchField name="search">
          <Label>Search</Label>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input className="w-[280px]" placeholder="Search..." />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
        <div>
          <Select
            name="species"
            isRequired
            className="w-full"
            placeholder="Select species"
          >
            <Label className="font-bold text-gray-700">Species</Label>
            <Select.Trigger className="rounded-2xl h-10">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {speciesOptions.map(item => (
                  <ListBox.Item
                    key={item.id}
                    id={item.id}
                    textValue={item.label}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allPets.map(pet => (
          <PetCard key={pet._id} pet={pet} />
        ))}
      </div>
    </div>
  );
};

export default AllPetsPage;
