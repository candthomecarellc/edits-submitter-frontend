// startNavGuardFeature
const SavePromptModal = ({ isOpen, onSave, onDiscard, onCancel }) => {
    return (
      <div className={`modal ${isOpen ? 'block' : 'hidden'}`}>
        <div className="modal-content">
          <h3>Unsaved Changes</h3>
          <p>You have unsaved changes. Would you like to save before continuing?</p>
          <div className="modal-actions">
            <button onClick={onSave}>Save & Continue</button>
            <button onClick={onDiscard}>Discard Changes</button>
            <button onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
};
// endNavGuardFeature