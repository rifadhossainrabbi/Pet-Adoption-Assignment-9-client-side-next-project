'use client';
import {
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
import { authClient } from '@/lib/auth-client';

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

    const { data: tokenData } = await authClient.token();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/pets/${_id}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(petData),
      });

      if (res.ok) {
        toast.success('Information updated successfully! 🐾');
        router.push('/my-list');
        router.refresh();
      } else {
        toast.error('Failed to update pet');
      }
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-black text-white mb-6">
        Update: <span className="text-[#C084FC]">{PetName}</span>
      </h2>

      <form
        onSubmit={onSubmit}
        className="bg-[#120D26]/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 sm:p-8 lg:p-10 space-y-6 shadow-2xl"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Pet Name  */}
          <TextField name="PetName" defaultValue={PetName}>
            <Label className="font-bold text-gray-300 text-sm mb-1 block">
              Pet Name
            </Label>
            <Input
              defaultValue={PetName}
              placeholder="Enter pet name"
              className="rounded-xl bg-white/5 border-white/10 text-white"
            />
          </TextField>

          {/* Species  */}
          <Select name="species" defaultSelectedKey={species?.toLowerCase()}>
            <Label className="font-bold text-gray-300 text-sm mb-1 block">
              Species
            </Label>
            <Select.Trigger className="rounded-xl h-10 bg-white/5 border-white/10 text-white">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox className="bg-[#1A0B40] text-white p-2">
                {speciesOptions.map(item => (
                  <ListBox.Item
                    key={item.id}
                    id={item.id}
                    textValue={item.label}
                    className="rounded-lg hover:bg-[#C084FC]"
                  >
                    {item.label}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          {/* Breed */}
          <TextField name="breed" defaultValue={breed}>
            <Label className="font-bold text-gray-300 text-sm mb-1 block">
              Breed
            </Label>
            <Input
              defaultValue={breed}
              placeholder="Enter breed"
              className="rounded-xl bg-white/5 border-white/10 text-white"
            />
          </TextField>

          {/* Age */}
          <TextField name="age" defaultValue={age}>
            <Label className="font-bold text-gray-300 text-sm mb-1 block">
              Age
            </Label>
            <Input
              defaultValue={age}
              placeholder="Enter age"
              className="rounded-xl bg-white/5 border-white/10 text-white"
            />
          </TextField>

          {/* Gender */}
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

          {/* Image URL */}
          <TextField name="imageUrl" defaultValue={imageUrl}>
            <Label className="font-bold text-gray-300 text-sm mb-1 block">
              Image URL
            </Label>
            <Input
              defaultValue={imageUrl}
              placeholder="Image URL"
              className="rounded-xl bg-white/5 border-white/10 text-white"
            />
          </TextField>

          {/* Health Status */}
          <Select
            name="healthStatus"
            defaultSelectedKey={healthStatus?.toLowerCase()}
          >
            <Label className="font-bold text-gray-300 text-sm mb-1 block">
              Health Status
            </Label>
            <Select.Trigger className="rounded-xl h-10 bg-white/5 border-white/10 text-white">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox className="bg-[#1A0B40] text-white p-2">
                {healthOptions.map(item => (
                  <ListBox.Item
                    key={item.id}
                    id={item.id}
                    textValue={item.label}
                    className="rounded-lg hover:bg-[#C084FC]"
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
            defaultSelectedKey={vaccinationStatus?.toLowerCase()}
          >
            <Label className="font-bold text-gray-300 text-sm mb-1 block">
              Vaccination Status
            </Label>
            <Select.Trigger className="rounded-xl h-10 bg-white/5 border-white/10 text-white">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox className="bg-[#1A0B40] text-white p-2">
                {vaccineOptions.map(item => (
                  <ListBox.Item
                    key={item.id}
                    id={item.id}
                    textValue={item.label}
                    className="rounded-lg hover:bg-[#C084FC]"
                  >
                    {item.label}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          {/* Location */}
          <TextField name="location" defaultValue={location}>
            <Label className="font-bold text-gray-300 text-sm mb-1 block">
              Location
            </Label>
            <Input
              defaultValue={location}
              placeholder="Enter location"
              className="rounded-xl bg-white/5 border-white/10 text-white"
            />
          </TextField>

          {/* Adoption Fee */}
          <TextField name="adoptionFee" defaultValue={adoptionFee}>
            <Label className="font-bold text-gray-300 text-sm mb-1 block">
              Adoption Fee (USD)
            </Label>
            <Input
              name="adoptionFee"
              type="number"
              defaultValue={adoptionFee}
              placeholder="Enter fee"
              className="rounded-xl bg-white/5 border-white/10 text-white"
            />
          </TextField>

          {/* Owner Email */}
          <div className="sm:col-span-2">
            <TextField isReadOnly defaultValue={ownerEmail}>
              <Label className="font-bold text-gray-500 text-sm mb-1 block">
                Owner Email (Read Only)
              </Label>
              <Input
                name="ownerEmail"
                defaultValue={ownerEmail}
                isReadOnly
                className="rounded-xl bg-white/5 border-white/10 text-gray-500 cursor-not-allowed"
              />
            </TextField>
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <TextField name="description" defaultValue={description}>
              <Label className="font-bold text-gray-300 text-sm mb-1 block">
                Description
              </Label>
              <TextArea
                name="description"
                defaultValue={description}
                placeholder="Write description"
                className="rounded-xl bg-white/5 border-white/10 text-white min-h-[120px] p-4"
              />
            </TextField>
          </div>
        </div>

        <Button
          type="submit"
          isLoading={isPending}
          className="w-full bg-gradient-to-r from-[#C084FC] to-[#E879F9] text-white font-black h-12 rounded-xl shadow-lg shadow-purple-500/20 hover:opacity-90 transition-all text-lg"
        >
          {isPending ? 'Updating...' : '🐾 Update Information'}
        </Button>
      </form>
    </div>
  );
};

export default UpdatePetForm;
