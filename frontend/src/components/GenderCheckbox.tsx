import { UseFormRegister } from "react-hook-form";
import { signupSchemaType } from "../lib/schema";

type GenderCheckboxProps = {
  register: UseFormRegister<signupSchemaType>;
};

const GenderCheckbox = ({ register }: GenderCheckboxProps) => {
  return (
    <div className="flex mt-2">
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text">Male</span>
          <input
            {...register("gender")}
            type="radio"
            name="gender"
            value="male"
            className="radio border-slate-900"
          />
        </label>
      </div>
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text">Female</span>
          <input
            {...register("gender")}
            type="radio"
            name="gender"
            value="female"
            className="radio border-slate-900"
          />
        </label>
      </div>
    </div>
  );
};
export default GenderCheckbox;
