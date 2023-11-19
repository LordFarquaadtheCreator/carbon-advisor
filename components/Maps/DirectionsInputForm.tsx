import { useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios';
import { DirectionsFormData } from '@/services/directions';
// import dynamic from 'next/dynamic';
// import { useEffect, useRef, useState } from 'react';
// import { useForm } from "react-hook-form";
import dynamic from 'next/dynamic';

// Uncomment and adjust the path if needed
// const DirectionsInputFormWithNoSSR = dynamic(
//   () => import('@/components/DirectionsInputForm'),
//   { ssr: false }
// );

type DirectionsFormData = {
  // Define your form data structure here
};

type DirectionsInputFormProps = {
  onSubmit: (data: DirectionsFormData) => void;
};

const DirectionsInputForm: React.FC<DirectionsInputFormProps> = ({ onSubmit }) => {
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
  const { register, handleSubmit } = useForm<DirectionsFormData>();
  const originRef = useRef(null);
  const destinationRef = useRef(null);

  useEffect(() => {
    if (window.google && window.google.maps) {
      setIsGoogleMapsLoaded(true);
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsGoogleMapsLoaded(true);
      script.onerror = () => console.error('Google Maps API failed to load');
      document.body.appendChild(script);
    }

    if (isGoogleMapsLoaded) {
      const options = { /* your options here */ };
      const originAutocomplete = new google.maps.places.Autocomplete(originRef.current, options);
      const destinationAutocomplete = new google.maps.places.Autocomplete(destinationRef.current, options);

      originAutocomplete.addListener("place_changed", () => {
        const place = originAutocomplete.getPlace();
        // Handle place change
      });

      destinationAutocomplete.addListener("place_changed", () => {
        const place = destinationAutocomplete.getPlace();
        // Handle place change
      });
    }
  }, [isGoogleMapsLoaded]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ marginBottom: '10px' }}>
        <input {...register("origin")} ref={originRef} placeholder="Starting Location" style={{ width: '100%', display: 'block', backgroundColor: 'transparent' }} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input {...register("destination")} ref={destinationRef} placeholder="Destination" style={{ width: '100%', display: 'block', backgroundColor: 'transparent' }} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <select {...register("mode", { required: true })} style={{ width: '100%', display: 'block', backgroundColor: 'transparent' }}>
          <option value="">Type of Transport</option>
          <option value="transit">Transit</option>
          <option value="driving">Car</option>
          <option value="bicycling">Bike</option>
        </select>
      </div>
      <button type="submit" style={{ width: '100%', display: 'block'}}><b><u>Submit</u></b></button>
    </form>
  );
};