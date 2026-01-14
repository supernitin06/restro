import { useState } from "react";
import Button from "../../components/ui/Button";
import emailIcon from "../../assets/email.png";
import smsIcon from "../../assets/sms.png";
import whatsappIcon from "../../assets/whatsapp.png";
import "./notification.css";

const Notifications = () => {
  const [selectedMethods, setSelectedMethods] = useState(["Email"]);

  const toggleMethod = (method) => {
    if (selectedMethods.includes(method)) {
      setSelectedMethods(selectedMethods.filter((m) => m !== method));
    } else {
      setSelectedMethods([...selectedMethods, method]);
    }
  };

  const notificationMethods = [
    {
      name: "Email",
      label: "Email Notifications",
      icon: emailIcon,
      description: "Receive notifications via email.",
    },
    {
      name: "SMS",
      label: "SMS Notifications",
      icon: smsIcon,
      description: "Receive notifications via SMS messages.",
    },
    {
      name: "WhatsApp",
      label: "WhatsApp Notifications",
      icon: whatsappIcon,
      description: "Receive notifications on WhatsApp.",
    },
  ];

  return (
    <div className="card space-y-6 py-6 px-2">
      <h2 className="highlight text-3xl font-bold">Notifications</h2>

      <div className="notification-grid">
        {notificationMethods.map((method) => (
          <div
            key={method.name}
            className={`notification-card ${selectedMethods.includes(method.name) ? "active" : ""
              }`}
            onClick={() => toggleMethod(method.name)}
          >
            <img src={method.icon} alt={method.name} className="notification-icon" />
            <div className="notification-text">
              <h3 className="font-semibold">{method.label}</h3>
              <p className="text-sm text-gray-500">{method.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button variant="primary" onClick={() => console.log(selectedMethods)}>
          Save Notification Settings
        </Button>
      </div>
    </div>
  );
};

export default Notifications;
