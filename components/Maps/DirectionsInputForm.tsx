import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios';
import { DirectionsFormData } from '@/services/directions';
import dynamic from 'next/dynamic';

type DirectionsInputFormProps = {
  onSubmit: (data: DirectionsFormData) => void;
};

export const DirectionsInputForm: React.FC<DirectionsInputFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm<DirectionsFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ marginBottom: '10px' }}>
        <input {...register("origin")} placeholder="Starting Location" style={{ width: '100%', display: 'block', backgroundColor: 'transparent' }} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input {...register("destination")} placeholder="Destination" style={{ width: '100%', display: 'block', backgroundColor: 'transparent' }} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <select {...register("mode", { required: true })} style={{ width: '100%', display: 'block', backgroundColor: 'transparent' }}>
          <option value="">Type of Transport</option>
          <option value="transit">Transit</option>
          <option value="driving">Car</option>
          <option value="bicycling">Bike</option>
          <option value="walking">Walk</option>
        </select>
      </div>
      <button type="submit" style={{ width: '100%', display: 'block'}}><b><u>Submit</u></b></button>
    </form>
  );
};
