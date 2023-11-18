import { useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios';
import { DirectionsFormData } from '@/services/directions';

type DirectionsInputFormProps = {
  onSubmit: SubmitHandler<DirectionsFormData>;
};

export const DirectionsInputForm: React.FC<DirectionsInputFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm<DirectionsFormData>();

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
      <button type="submit">Submit</button>
    </form>
  );
};


// type DirectionsProps = {
//   origin: string;
//   destination: string;
//   mode: string;
//   apiKey: string;
//   onDirectionsFetched: (data: any) => void;
// };

// export const Directions: React.FC<DirectionsProps> = ({ origin, destination, mode, apiKey, onDirectionsFetched }) => {
//   useEffect(() => {
//     if (origin && destination && mode) {
//       getDirections();
//     }
//   }, [origin, destination, mode, apiKey]);

//   const getDirections = async () => {
//     try {
//       const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json`, {
//         params: {
//           origin,
//           destination,
//           mode,
//           alternatives: true,
//           key: apiKey,
//         }
//       });

//       onDirectionsFetched(response.data);
//     } catch (error) {
//       console.error("Error fetching directions:", error);
//     }
//   };
//     const handleFormSubmit = (formData: DirectionsFormData) => {
//     // Do something with the form data
//     console.log(formData);
//   };

// return (
//   <>
//     <DirectionsInputForm onSubmit={handleFormSubmit} />
//   </>
// );
// };