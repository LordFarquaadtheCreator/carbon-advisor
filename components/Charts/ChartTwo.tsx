import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
// import Header from "./Header";

// Defining the type for form inputs
type FormData = {
  firstName: string;
  category: string;
  aboutYou: string;
};

const options: ApexOptions = {
  // ... your options here
};

interface ChartTwoState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const InputForm: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [data, setData] = useState<string>("");

  const onSubmit: SubmitHandler<FormData> = data => setData(JSON.stringify(data));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <Header /> */}
      <input {...register("origin")} placeholder="Starting Location" />
      <input {...register("destination")} placeholder="Destination" />
      <select {...register("mode", { required: true })}>
        <option value="">Type of Transport</option>
        <option value="transit">Transit</option>
        <option value="car">Car</option>
        <option value="bike">Bike</option>
        <option value="plane">Plane</option>
      </select>
      <p>{data}</p>
      <input type="submit" />
    </form>
  );
};

const ChartTwo: React.FC = () => {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <InputForm></InputForm>
    </div>
  );
};

export default ChartTwo;
