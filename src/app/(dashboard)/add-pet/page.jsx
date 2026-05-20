'use client';
import {
  FieldError,
  Input,
  Label,
  TextField,
  Select,
  ListBox,
  TextArea,
  Button,
  RadioGroup,
  Radio,
} from '@heroui/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const AddPetPage = () => {
  const [isPending, setIsPending] = useState(false);

  const onSubmit = async e => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const petData = Object.fromEntries(formdata.entries());
    console.log(petData);

    const res = await fetch('http://localhost:5000/pets', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(petData),
    });
    const data = await res.json();
    console.log(data);
    toast.success('Successfully Done!');
  };

  const speciesOptions = [
    { id: 'dog', label: 'Dog' },
    { id: 'cat', label: 'Cat' },
    { id: 'rabbit', label: 'Rabbit' },
    { id: 'bird', label: 'Bird' },
  ];

  const healthOptions = [
    { id: 'healthy', label: 'Healthy' },
    { id: 'under-treatment', label: 'Under Treatment' },
  ];

  const vaccineOptions = [
    { id: 'vaccinated', label: 'Vaccinated' },
    { id: 'not-vaccinated', label: 'Not Vaccinated' },
  ];

  return (
    <div className="p-6 md:p-10 bg-[#f8fafc] min-h-screen">
      <h2 className="text-3xl font-extrabold text-center text-[#ff5a3d] mb-10 uppercase tracking-wider">
        Add Pet Form
      </h2>

      <form
        onSubmit={onSubmit}
        className="max-w-6xl mx-auto bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-gray-100 space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pet Name */}
          <div className="md:col-span-1">
            <TextField name="PetName" isRequired>
              <Label className="font-bold text-gray-700">Pet Name</Label>
              <Input placeholder="Enter pet name" className="rounded-2xl" />
              <FieldError />
            </TextField>
          </div>

          {/* Species - Using Mapping */}
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

          {/* Breed */}
          <TextField name="breed" isRequired>
            <Label className="font-bold text-gray-700">Breed</Label>
            <Input
              placeholder="Enter breed (e.g. Golden Retriever)"
              className="rounded-2xl"
            />
            <FieldError />
          </TextField>

          {/* Age */}
          <TextField name="age" isRequired>
            <Label className="font-bold text-gray-700">Age</Label>
            <Input
              placeholder="Enter age (e.g. 2 years)"
              className="rounded-2xl"
            />
            <FieldError />
          </TextField>

          {/* Gender */}
                    <div className="flex flex-col gap-3">
                      <Label className="font-bold text-gray-700">Gender</Label>
                      <div className="flex gap-8 items-center h-10">
                        <label className="flex items-center gap-2 cursor-pointer text-gray-700 font-medium">
                          <input
                            type="radio"
                            name="gender"
                            value="male"
                            className="w-5 h-5 accent-[#ff5a3d] cursor-pointer"
                          />
                          <span>Male</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-gray-700 font-medium">
                          <input
                            type="radio"
                            name="gender"
                            value="female"
                            className="w-5 h-5 accent-[#ff5a3d] cursor-pointer"
                          />
                          <span>Female</span>
                        </label>
                      </div>
                    </div>

          {/* Image URL */}
          <TextField name="imageUrl" isRequired>
            <Label className="font-bold text-gray-700">Image URL</Label>
            <Input
              type="url"
              placeholder="https://example.com/pet.jpg"
              className="rounded-2xl"
            />
            <FieldError />
          </TextField>

          {/* Health Status - Using Mapping */}
          <div>
            <Select
              name="healthStatus"
              isRequired
              className="w-full"
              placeholder="Select health status"
            >
              <Label className="font-bold text-gray-700">Health Status</Label>
              <Select.Trigger className="rounded-2xl h-10">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {healthOptions.map(item => (
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

          {/* Vaccination Status - Using Mapping */}
          <div>
            <Select
              name="vaccinationStatus"
              isRequired
              className="w-full"
              placeholder="Select status"
            >
              <Label className="font-bold text-gray-700">
                Vaccination Status
              </Label>
              <Select.Trigger className="rounded-2xl h-10">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {vaccineOptions.map(item => (
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

          {/* Location */}
          <TextField name="location" isRequired>
            <Label className="font-bold text-gray-700">Location</Label>
            <Input placeholder="Enter location" className="rounded-2xl" />
            <FieldError />
          </TextField>

          {/* Adoption Fee */}
          <TextField name="adoptionFee" type="number" isRequired>
            <Label className="font-bold text-gray-700">
              Adoption Fee (USD)
            </Label>
            <Input type="number" placeholder="50" className="rounded-2xl" />
            <FieldError />
          </TextField>

          {/* Owner Email (Auto-filled) */}
          <div className="md:col-span-2">
            <TextField name="ownerEmail" isReadOnly>
              <Label className="font-bold text-gray-700">
                Owner Email (auto-filled)
              </Label>
              <Input
                value="hossainmrrifad@gmail.com"
                className="rounded-2xl bg-gray-50"
              />
            </TextField>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <TextField name="description" isRequired>
              <Label className="font-bold text-gray-700">Description</Label>
              <TextArea
                placeholder="Write something about the pet's personality..."
                className="rounded-3xl min-h-[120px]"
              />
              <FieldError />
            </TextField>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          isLoading={isPending}
          className="rounded-xl w-full bg-[#ff5a3d] text-white font-bold h-14 shadow-lg hover:bg-[#e84a2d] transition-all"
        >
          {isPending ? 'Adding Pet...' : '🐾 Add Pet'}
        </Button>
      </form>
    </div>
  );
};

export default AddPetPage;
