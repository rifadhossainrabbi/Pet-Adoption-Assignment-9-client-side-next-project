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
} from '@heroui/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const UpdatePetForm = ({ singlePet }) => {
  const router = useRouter();
  const {
    PetName,
    adoptionFee,
    age,
    breed,
    description,
    gender,
    healthStatus,
    imageUrl,
    location,
    ownerEmail,
    species,
    vaccinationStatus,
    _id,
  } = singlePet;

  const [isPending, setIsPending] = useState(false);

  const onSubmit = async e => {
    e.preventDefault();
    setIsPending(true);

    const formdata = new FormData(e.currentTarget);
    const petData = Object.fromEntries(formdata.entries());

    try {
      const res = await fetch(`http://localhost:5000/pets/${_id}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(petData),
      });

      if (res.ok) {
        toast.success('Pet information updated successfully!');
        router.refresh();
      } else {
        toast.error('Failed to update pet');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong!');
    } finally {
      setIsPending(false);
    }
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
        Update Pet: {PetName}
      </h2>

      <form
        onSubmit={onSubmit}
        className="max-w-6xl mx-auto bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-gray-100 space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pet Name */}
          <TextField isRequired defaultValue={PetName}>
            <Label className="font-bold text-gray-700">Pet Name</Label>
            <Input
              name="PetName"
              defaultValue={PetName}
              placeholder="Enter pet name"
              className="rounded-2xl"
            />
            <FieldError />
          </TextField>

          {/* Species */}
          <Select
            name="species"
            defaultSelectedKey={species}
            isRequired
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
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          {/* Breed */}
          <TextField isRequired defaultValue={breed}>
            <Label className="font-bold text-gray-700">Breed</Label>
            <Input
              name="breed"
              defaultValue={breed}
              placeholder="Enter breed"
              className="rounded-2xl"
            />
            <FieldError />
          </TextField>

          {/* Age */}
          <TextField isRequired defaultValue={age}>
            <Label className="font-bold text-gray-700">Age</Label>
            <Input
              name="age"
              defaultValue={age}
              placeholder="Enter age"
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
                  defaultChecked={gender === 'male'}
                  className="w-5 h-5 accent-[#ff5a3d] cursor-pointer"
                />
                <span>Male</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-gray-700 font-medium">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  defaultChecked={gender === 'female'}
                  className="w-5 h-5 accent-[#ff5a3d] cursor-pointer"
                />
                <span>Female</span>
              </label>
            </div>
          </div>

          {/* Image URL */}
          <TextField isRequired defaultValue={imageUrl}>
            <Label className="font-bold text-gray-700">Image URL</Label>
            <Input
              name="imageUrl"
              defaultValue={imageUrl}
              placeholder="Image URL"
              className="rounded-2xl"
            />
            <FieldError />
          </TextField>

          {/* Health Status */}
          <Select
            name="healthStatus"
            defaultSelectedKey={healthStatus}
            isRequired
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
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          {/* Vaccination Status */}
          <Select
            name="vaccinationStatus"
            defaultSelectedKey={vaccinationStatus}
            isRequired
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
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          {/* Location*/}
          <TextField isRequired defaultValue={location}>
            <Label className="font-bold text-gray-700">Location</Label>
            <Input
              name="location"
              defaultValue={location}
              placeholder="Enter location"
              className="rounded-2xl"
            />
            <FieldError />
          </TextField>

          {/* Adoption Fee */}
          <TextField isRequired defaultValue={adoptionFee}>
            <Label className="font-bold text-gray-700">
              Adoption Fee (USD)
            </Label>
            <Input
              name="adoptionFee"
              type="number"
              defaultValue={adoptionFee}
              placeholder="Enter fee"
              className="rounded-2xl"
            />
            <FieldError />
          </TextField>

          {/* Owner Email - Fixed */}
          <div className="md:col-span-2">
            <TextField isReadOnly defaultValue={ownerEmail}>
              <Label className="font-bold text-gray-400">
                Owner Email (Fixed)
              </Label>
              <Input
                name="ownerEmail"
                defaultValue={ownerEmail}
                isReadOnly
                className="rounded-2xl bg-gray-50 text-gray-400"
              />
            </TextField>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <TextField isRequired defaultValue={description}>
              <Label className="font-bold text-gray-700">Description</Label>
              <TextArea
                name="description"
                defaultValue={description}
                placeholder="Write description"
                className="rounded-3xl min-h-[120px]"
              />
              <FieldError />
            </TextField>
          </div>
        </div>

        <Button
          type="submit"
          isLoading={isPending}
          className="rounded-xl w-full bg-[#ff5a3d] text-white font-bold h-14 shadow-lg hover:bg-[#e84a2d] transition-all"
        >
          {isPending ? 'Updating...' : '🐾 Update Information'}
        </Button>
      </form>
    </div>
  );
};

export default UpdatePetForm;
