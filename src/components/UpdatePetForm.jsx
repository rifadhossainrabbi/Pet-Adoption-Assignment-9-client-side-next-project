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
  console.log(singlePet);

  const [isPending, setIsPending] = useState(false);

  const onSubmit = async e => {
    e.preventDefault();
    setIsPending(true);

    const formdata = new FormData(e.currentTarget);
    const petData = Object.fromEntries(formdata.entries());
    console.log(petData);

    // Better-Auth Token
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
        toast.success('Updated successfully! 🐾');
        router.push('/my-list');
        router.refresh();
      } else {
        toast.error('Failed to update');
      }
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto min-h-screen">
      <header className="mb-8 text-center lg:text-left">
        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
          Update <span className="text-[#C084FC]">{PetName}</span>
        </h2>
        <p className="text-gray-500 mt-2">Change any field or keep as it is.</p>
      </header>

      <form
        onSubmit={onSubmit}
        className="bg-[#120D26]/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 sm:p-10 lg:p-12 space-y-8 shadow-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pet Name */}
          <TextField defaultValue={PetName}>
            <Label className="font-bold text-gray-300 text-sm mb-2 block">
              Pet Name
            </Label>
            <Input
              name="PetName" 
              defaultValue={PetName}
              placeholder="Enter pet name"
              className="rounded-xl h-12 bg-white/5 border-white/10 text-white"
            />
          </TextField>

          {/* Species */}
          <Select
            name="species" 
            defaultSelectedKey={species?.toLowerCase()}
            placeholder="Select species"
          >
            <Label className="font-bold text-gray-300 text-sm mb-2 block">
              Species
            </Label>
            <Select.Trigger className="rounded-xl h-12 bg-white/5 border-white/10 text-white">
              <Select.Value />
              <Select.Indicator className="mr-2" />
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
          <TextField defaultValue={breed}>
            <Label className="font-bold text-gray-300 text-sm mb-2 block">
              Breed
            </Label>
            <Input
              name="breed" 
              defaultValue={breed}
              className="rounded-xl h-12 bg-white/5 border-white/10 text-white"
            />
          </TextField>

          {/* Age */}
          <TextField defaultValue={age}>
            <Label className="font-bold text-gray-300 text-sm mb-2 block">
              Age
            </Label>
            <Input
              name="age"
              defaultValue={age}
              className="rounded-xl h-12 bg-white/5 border-white/10 text-white"
            />
          </TextField>

          {/* Gender */}
          <div className="flex flex-col gap-2">
            <Label className="font-bold text-gray-300 text-sm mb-2">
              Gender
            </Label>
            <div className="flex gap-8 items-center h-12">
              <label className="flex items-center gap-2 cursor-pointer text-gray-300">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  defaultChecked={gender === 'male'}
                  className="w-5 h-5 accent-[#C084FC]"
                />
                <span>Male</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-gray-300">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  defaultChecked={gender === 'female'}
                  className="w-5 h-5 accent-[#C084FC]"
                />
                <span>Female</span>
              </label>
            </div>
          </div>

          {/* Image URL */}
          <TextField defaultValue={imageUrl}>
            <Label className="font-bold text-gray-300 text-sm mb-2 block">
              Image URL
            </Label>
            <Input
              name="imageUrl" 
              defaultValue={imageUrl}
              className="rounded-xl h-12 bg-white/5 border-white/10 text-white"
            />
          </TextField>

          {/* Health Status */}
          <Select
            name="healthStatus"
            defaultSelectedKey={healthStatus?.toLowerCase()}
          >
            <Label className="font-bold text-gray-300 text-sm mb-2 block">
              Health Status
            </Label>
            <Select.Trigger className="rounded-xl h-12 bg-white/5 border-white/10 text-white">
              <Select.Value />
              <Select.Indicator className="mr-2" />
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
            <Label className="font-bold text-gray-300 text-sm mb-2 block">
              Vaccination Status
            </Label>
            <Select.Trigger className="rounded-xl h-12 bg-white/5 border-white/10 text-white">
              <Select.Value />
              <Select.Indicator className="mr-2" />
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
          <TextField defaultValue={location}>
            <Label className="font-bold text-gray-300 text-sm mb-2 block">
              Location
            </Label>
            <Input
              name="location" 
              defaultValue={location}
              className="rounded-xl h-12 bg-white/5 border-white/10 text-white"
            />
          </TextField>

          {/* Adoption Fee */}
          <TextField defaultValue={adoptionFee}>
            <Label className="font-bold text-gray-300 text-sm mb-2 block">
              Adoption Fee ($)
            </Label>
            <Input
              name="adoptionFee" 
              type="number"
              defaultValue={adoptionFee}
              className="rounded-xl h-12 bg-white/5 border-white/10 text-white"
            />
          </TextField>

          {/* Owner Email - ReadOnly */}
          <div className="md:col-span-2">
            <TextField isReadOnly defaultValue={ownerEmail}>
              <Label className="font-bold text-gray-500 text-sm mb-2 block">
                Email (Read Only)
              </Label>
              <Input
                name="ownerEmail" 
                defaultValue={ownerEmail}
                isReadOnly
                className="rounded-xl h-12 bg-white/5 border-white/10 text-gray-500 cursor-not-allowed"
              />
            </TextField>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <TextField defaultValue={description}>
              <Label className="font-bold text-gray-300 text-sm mb-2 block">
                Description
              </Label>
              <TextArea
                name="description"
                defaultValue={description}
                className="rounded-xl bg-white/5 border-white/10 text-white min-h-[120px] p-4"
              />
            </TextField>
          </div>
        </div>

        <Button
          type="submit"
          isLoading={isPending}
          className="w-full bg-gradient-to-r from-[#C084FC] to-[#E879F9] text-white font-black h-14 rounded-2xl shadow-lg transition-all text-lg"
        >
          {isPending ? 'Updating...' : '🐾 Save Changes'}
        </Button>
      </form>
    </div>
  );
};

export default UpdatePetForm;
