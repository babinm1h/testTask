import React, { useCallback, useState } from "react";
import { Packer, Document, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import { renderAsync } from "docx-preview";
import VariableFields from "./VariableFields/VariableFields";
import { useUploadFile } from "../../hooks/useUploadFile";
import { IVariable } from "../../types/Variable";
import { useModalState } from "../../hooks/useModalState";
import Modal from "../UI/Modal/Modal";
import "./Docx.overrides.scss";

const getInitialVariable = (): IVariable => {
  return { name: "", value: "", id: Date.now() };
};

const Form = () => {
  const docRef = React.useRef<HTMLDivElement>(null);
  const [variables, setVariables] = useState([getInitialVariable()]);
  const { file, handleFileChange } = useUploadFile();
  const { isOpen, onClose, onOpen } = useModalState();

  const handleAddVariable = useCallback(() => {
    setVariables((prev) => [...prev, getInitialVariable()]);
  }, []);

  const handleRemoveVariable = useCallback(
    (id: number) => {
      if (variables.length === 1) return;
      setVariables((prev) => prev.filter((v) => v.id !== id));
    },
    [variables.length],
  );

  const handleEditVariable = useCallback((id: number, field: keyof IVariable, value: string) => {
    setVariables((prev) =>
      prev.map((v) => {
        if (v.id === id) {
          return { ...v, [field]: value };
        }
        return v;
      }),
    );
  }, []);

  const generateDoc = () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: variables.map(
            (v) =>
              new Paragraph({
                children: [
                  new TextRun({ text: v.name }),
                  new TextRun({
                    text: `\t ${v.value}`,
                    bold: true,
                  }),
                ],
              }),
          ),
        },
      ],
    });

    return doc;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const doc = generateDoc();
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "new.docx");
    });
  };

  const handleOpen = () => {
    if (!file) return;
    onOpen();
    const doc = generateDoc();
    Packer.toBlob(doc).then(async (blob) => {
      if (!docRef.current) return;
      await renderAsync(blob, docRef.current);
    });
  };

  return (
    <>
      <form className="border p-3 d-grid gap-4" onSubmit={handleSubmit}>
        <label htmlFor="file">
          <input
            type="file"
            name="file"
            id="file"
            className="invisible"
            accept=".docx"
            hidden
            onChange={handleFileChange}
          />
          <div className="btn btn-primary" role="button">
            Загрузить файл
          </div>
        </label>
        {variables.map((v) => (
          <VariableFields
            onAddVariable={handleAddVariable}
            onEditVariable={handleEditVariable}
            onRemoveVariable={handleRemoveVariable}
            {...v}
            key={v.id}
          />
        ))}

        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-primary" type="button" onClick={handleOpen} disabled={!file}>
            Preview file
          </button>
          <button className="btn btn-primary" type="submit" disabled={!file}>
            Получить файл
          </button>
        </div>
      </form>

      <Modal title="Preview" onClose={onClose} isOpen={isOpen}>
        <div ref={docRef}></div>
      </Modal>
    </>
  );
};

export default Form;
