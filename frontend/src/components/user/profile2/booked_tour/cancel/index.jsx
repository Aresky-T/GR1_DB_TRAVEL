import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { PiSealWarningFill } from "react-icons/pi";
import "./style.scss";

const CancelBookedTourRequest = ({ isShow, bookedTour, hiddenModal }) => {
  const [reason, setReason] = useState("");

  const handleChange = (event) => {
    setReason(event.target.value);
  };

  const handleHiddenModal = () => {
    setReason("");
    hiddenModal();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className={`cancel-booked-tour-request${isShow ? " active" : ""}`}>
      <div className="cancel-booked-tour-request-modal">
        <div className="cancel-booked-tour-request-modal-close">
          <button onClick={handleHiddenModal}>
            <IoCloseOutline />
          </button>
        </div>
        <div className="cancel-booked-tour-request-modal-content">
          <header className="cancel-booked-tour-request-modal__header">
            <strong>
              <span className="icon">
                <PiSealWarningFill />
              </span>
              Yêu cầu hủy tour
            </strong>
          </header>
          <div className="cancel-booked-tour-request-modal__body">
            <h2 className="cancel-booked-tour-request-modal__body-title">
              <span>#</span> Tour:{" "}
              <u style={{ color: "#000" }}>
                <i>{bookedTour?.tourTitle ?? "Không xác định"}</i>
              </u>
            </h2>
            <h2 className="cancel-booked-tour-request-modal__body-title">
              <span>#</span> Hãy cho chúng tôi biết lý do tại sao bạn muốn hủy
              tour này?
            </h2>
            <div className="cancel-booked-tour-request-modal__body-main">
              <form onSubmit={handleSubmit}>
                <div>
                  <textarea
                    name="reason"
                    rows="10"
                    spellCheck={false}
                    value={reason}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div>
                  <button type="button" className="profile-form__btn cancel" onClick={handleHiddenModal}>
                    Hủy
                  </button>
                  <button type="submit" className="profile-form__btn submit">
                    Gửi
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelBookedTourRequest;
