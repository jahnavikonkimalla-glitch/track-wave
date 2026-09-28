import { useLanguage } from "./LanguageContext";

function LanguageHeaderSelector() {
  const { currentLang, setCurrentLang } = useLanguage();

  return (
    <div className="d-flex align-items-center gap-2 bg-light p-2 rounded border mb-3 shadow-sm">
      <span className="fw-bold small">🌐 Language / भाषा / భాష / மொழி / ଭାଷା:</span>
      <select
        className="form-select form-select-sm w-auto"
        value={currentLang}
        onChange={(e) => setCurrentLang(e.target.value)}
      >
        <option value="English">English</option>
        <option value="Hindi">हिन्दी (Hindi)</option>
        <option value="Telugu">తెలుగు (Telugu)</option>
        <option value="Tamil">தமிழ் (Tamil)</option>
        <option value="Odia">ଓଡ଼ିଆ (Odia)</option>
      </select>
    </div>
  );
}

export default LanguageHeaderSelector;
