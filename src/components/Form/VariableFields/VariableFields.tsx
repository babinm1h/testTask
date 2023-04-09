import React from "react";
import TextField from "../../UI/TextField/TextField";
import { IVariable } from "../../../types/Variable";

interface IProps {
  onEditVariable: (id: number, field: keyof IVariable, value: string) => void;
  onAddVariable: () => void;
  onRemoveVariable: (id: number) => void;
  id: number;
  name: string;
  value: string;
}

const VariableFields = React.memo(({ onAddVariable, onEditVariable, onRemoveVariable, id, name, value }: IProps) => {
  const handleChangeNameField = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEditVariable(id, "name", e.target.value);
  };

  const handleChangeValueField = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEditVariable(id, "value", e.target.value);
  };

  return (
    <div className="d-flex flex-column gap-2">
      <div className="d-flex flex-column gap-2 row flex-sm-row gap-sm-0">
        <TextField
          label="Variable name"
          name="var"
          placeholder="Variable name"
          className="col col-sm-5"
          value={name}
          onChange={handleChangeNameField}
        />
        <TextField
          label="Value"
          name="value"
          placeholder="Variable Value"
          className="col col-sm-7"
          value={value}
          onChange={handleChangeValueField}
        />
      </div>
      <div className="d-flex align-items-center gap-2">
        <button className="btn btn-primary btn-sm" onClick={onAddVariable} type="button">
          Добавить пару
        </button>
        <button className="btn btn-primary btn-sm" onClick={() => onRemoveVariable(id)} type="button">
          Удалить пару
        </button>
      </div>
    </div>
  );
});

export default VariableFields;
