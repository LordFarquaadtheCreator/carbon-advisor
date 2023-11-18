import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";

type FormData = {
  origin: string;
  destination: string;
  mode: string;
};

type InputFormProps = {
  onSubmit: SubmitHandler<FormData>;
};

export const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm<FormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("origin")} placeholder="Starting Location" />
      <input {...register("destination")} placeholder="Destination" />
      <select {...register("mode", { required: true })}>
        <option value="">Type of Transport</option>
        <option value="transit">Transit</option>
        <option value="driving">Car</option>
        <option value="bicycling">Bike</option>
      </select>
      <button type="submit" />
    </form>
  );
};

import axios from 'axios';

type DirectionsProps = {
  origin: string;
  destination: string;
  mode: string;
  apiKey: string;
  onDirectionsFetched: (data: any) => void;
};

export const Directions: React.FC<DirectionsProps> = ({ origin, destination, mode, apiKey, onDirectionsFetched }) => {
  useEffect(() => {
    if (origin && destination && mode) {
      getDirections();
    }
  }, [origin, destination, mode, apiKey]);

  const getDirections = async () => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json`, {
        params: {
          origin,
          destination,
          mode,
          alternatives: true,
          key: apiKey,
        }
      });

      onDirectionsFetched(response.data);
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  };
    const handleFormSubmit = (formData: FormData) => {
    // Do something with the form data
    console.log(formData);
  };

return (
  <>
    <InputForm onSubmit={handleFormSubmit} />
  </>
);
};