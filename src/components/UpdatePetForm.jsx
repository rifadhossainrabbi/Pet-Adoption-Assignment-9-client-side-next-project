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
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(petData),
      });
      if (res.ok) {
        toast.success('Pet updated successfully!');
        router.refresh();
      } else {
        toast.error('Failed to update pet');
      }
    } catch {
      toast.error('Something went wrong!');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl sm:text-3xl font-black text-white mb-6">
        Update: {PetName}
      </h2>

      <form
        onSubmit={onSubmit}
        className="max-w-4xl bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <TextField isRequired defaultValue={PetName}>
            <Label className="font-bold text-gray-300 text-sm mb-1 block">
              Pet Name
            </Label>
            <Input
              name="PetName"
              defaultValue={PetName}
              placeholder="Enter pet name"
              className="rounded-xl bg-white/5 border-white/10 text-white placeholder:text-gray-600"
            />
            <FieldError className="text-rose-400 text-xs mt-1" />
          </TextField>

          <Select name="species" defaultSelectedKey={species} isRequired>
            <Label className="font-bold text-gray-300 text-sm mb-1 block">
              Species
            </Label>
            <Select.Trigger className="rounded-xl h-10 bg-white/5 border-white/10 text-white">
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

          <TextField isRequired defaultValue={breed}>
            <Label className="font-bold text-gray-300 text-sm mb-1 block">
              Breed
            </Label>
            <Input
              name="breed"
              defaultValue={breed}
              placeholder="Enter breed"
              className="rounded-xl bg-white/5 border-white/10 text-white placeholder:text-gray-600"
            />
            <FieldError className="text-rose-400 text-xs mt-1" />
          </TextField>

          <TextField isRequired defaultValue={age}>
            <Label className="font-bold text-gray-300 text-sm mb-1 block">
              Age
            </Label>
            <Input
              name="age"
              defaultValue={age}
              placeholder="Enter age"
              className="rounded-xl bg-white/5 border-white/10 text-white placeholder:text-gray-600"
            />
            <FieldError className="text-rose-400 text-xs mt-1" />
          </TextField>

          <div className="flex flex-col gap-2">
            <Label className="font-bold text-gray-300 text-sm">Gender</Label>
            <div className="flex gap-6 items-center h-10">
              <label className="flex items-center gap-2 cursor-pointer text-gray-300 font-medium">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  defaultChecked={gender === 'male'}
                  className="w-4 h-4 accent-[#C084FC]"
                />
                <span>Male</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-gray-300 font-medium">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  defaultChecked={gender === 'female'}
                  className="w-4 h-4 accent-[#C084FC]"
                />
                <span>Female</span>
              </label>
            </div>
          </div>

          <TextField isRequired defaultValue={imageUrl}>
            <Label className="font-bold text-gray-300 text-sm mb-1 block">
              Image URL
            </Label>
            <Input
              name="imageUrl"
              defaultValue={imageUrl}
              placeholder="Image URL"
              className="rounded-xl bg-white/5 border-white/10 text-white placeholder:text-gray-600"
            />
            <FieldError className="text-rose-400 text-xs mt-1" />
          </TextField>

          <Select
            name="healthStatus"
            defaultSelectedKey={healthStatus}
            isRequired
          >
            <Label className="font-bold text-gray-300 text-sm mb-1 block">
              Health Status
            </Label>
            <Select.Trigger className="rounded-xl h-10 bg-white/5 border-white/10 text-white">
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

          <Select
            name="vaccinationStatus"
            defaultSelectedKey={vaccinationStatus}
            isRequired
          >
            <Label className="font-bold text-gray-300 text-sm mb-1 block">
              Vaccination Status
            </Label>
            <Select.Trigger className="rounded-xl h-10 bg-white/5 border-white/10 text-white">
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

          <TextField isRequired defaultValue={location}>
            <Label className="font-bold text-gray-300 text-sm mb-1 block">
              Location
            </Label>
            <Input
              name="location"
              defaultValue={location}
              placeholder="Enter location"
              className="rounded-xl bg-white/5 border-white/10 text-white placeholder:text-gray-600"
            />
            <FieldError className="text-rose-400 text-xs mt-1" />
          </TextField>

          <TextField isRequired defaultValue={adoptionFee}>
            <Label className="font-bold text-gray-300 text-sm mb-1 block">
              Adoption Fee (USD)
            </Label>
            <Input
              name="adoptionFee"
              type="number"
              defaultValue={adoptionFee}
              placeholder="Enter fee"
              className="rounded-xl bg-white/5 border-white/10 text-white placeholder:text-gray-600"
            />
            <FieldError className="text-rose-400 text-xs mt-1" />
          </TextField>

          <div className="sm:col-span-2">
            <TextField isReadOnly defaultValue={ownerEmail}>
              <Label className="font-bold text-gray-500 text-sm mb-1 block">
                Owner Email (Fixed)
              </Label>
              <Input
                name="ownerEmail"
                defaultValue={ownerEmail}
                isReadOnly
                className="rounded-xl bg-white/5 border-white/10 text-gray-500"
              />
            </TextField>
          </div>

          <div className="sm:col-span-2">
            <TextField isRequired defaultValue={description}>
              <Label className="font-bold text-gray-300 text-sm mb-1 block">
                Description
              </Label>
              <TextArea
                name="description"
                defaultValue={description}
                placeholder="Write description"
                className="rounded-xl bg-white/5 border-white/10 text-white placeholder:text-gray-600 min-h-[120px]"
              />
              <FieldError className="text-rose-400 text-xs mt-1" />
            </TextField>
          </div>
        </div>

        <Button
          type="submit"
          isLoading={isPending}
          className="w-full bg-gradient-to-r from-[#C084FC] to-[#E879F9] text-white font-black h-12 rounded-xl shadow-lg shadow-purple-500/20 hover:opacity-90 transition-opacity"
        >
          {isPending ? 'Updating...' : '🐾 Update Information'}
        </Button>
      </form>
    </div>
  );
};

export default UpdatePetForm;
