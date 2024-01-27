import { useEffect, useMemo, useState } from "react";
import { Row } from "react-bootstrap";

export default function VehicletypeCheckbox({
  index,
  vehicleType,
  id,
  register,
  setValue,
  watch,
  errors,
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (ready) {
      if (
        watch(`runMode[${index}].${id}.RENTAL`) ||
        watch(`runMode[${index}].${id}.INDIVIDUAL`) ||
        watch(`runMode[${index}].${id}.OUTSTATION`)
      )
        setValue(`${id}`, true);
      else setValue(`${id}`, false);
    } else setReady(true);
  }, [
    watch(`runMode[${index}].${id}.RENTAL`),
    watch(`runMode[${index}].${id}.INDIVIDUAL`),
    watch(`runMode[${index}].${id}.OUTSTATION`),
    ready,
  ]);
  return (
    <Row className="mb-3">
      <div className=" col-md-3">
        <div className="text-center form-check">
          <input
            {...register(`${id}`, {
              onChange: (e) => {
                if (e.target.checked) {
                  vehicleType.runMode.includes("RENTAL") &&
                    setValue(`runMode[${index}].${id}.RENTAL`, true);
                  vehicleType.runMode.includes("INDIVIDUAL") &&
                    setValue(`runMode[${index}].${id}.INDIVIDUAL`, true);
                  vehicleType.runMode.includes("OUTSTATION") &&
                    setValue(`runMode[${index}].${id}.OUTSTATION`, true);
                } else {
                  vehicleType.runMode.includes("RENTAL") &&
                    setValue(`runMode[${index}].${id}.RENTAL`, false);
                  vehicleType.runMode.includes("INDIVIDUAL") &&
                    setValue(`runMode[${index}].${id}.INDIVIDUAL`, false);
                  vehicleType.runMode.includes("OUTSTATION") &&
                    setValue(`runMode[${index}].${id}.OUTSTATION`, false);
                }
              },
            })}
            type="checkbox"
            className="form-check-input"
          />
          <label className="form-check-label">{vehicleType.name}</label>
        </div>
      </div>
      <div className=" col-md-9">
        <div className="d-flex justify-content-center">
          {vehicleType.runMode.map((item) => (
            <div className=" form-check d-flex align-items-center me-2">
              <input
                {...register(`runMode[${index}].${id}.${item}`)}
                type="checkbox"
                className="form-check-input"
              />
              <label className="form-check-label">{item}</label>
            </div>
          ))}
        </div>
      </div>
    </Row>
  );
}
