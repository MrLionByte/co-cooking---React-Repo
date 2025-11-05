import React from "react";
import Select from "react-select";
import ISO6391 from "iso-639-1";

const languageOptions = ISO6391.getAllCodes().map(code => ({
  value: code,
  label: ISO6391.getName(code),
}));

interface LanguageSelectorProps {
  value: string;
  onChange: (lang: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ value, onChange }) => (
  <Select
    options={languageOptions}
    value={languageOptions.find(opt => opt.value === value)}
    onChange={(option) => onChange(option?.value || "")}
    placeholder="Select Language..."
    className="text-black rounded-md"
    styles={{
      control: (base) => ({ ...base, backgroundColor: "#1f2b2b", color: "white" }),
      singleValue: (base) => ({ ...base, color: "white" }),
      menu: (base) => ({ ...base, backgroundColor: "#233232" }),
      option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused ? "#3c4a4a" : "transparent",
        color: "white",
      }),
    }}
  />
);
export default LanguageSelector;
