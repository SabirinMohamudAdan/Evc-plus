import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css';
import img from "./assets/img3.jpeg"; // Create this file for custom styles

function App() {
  const [pin, setPin] = useState('');
  const [balance, setBalance] = useState(200);
  const [menu, setMenu] = useState('');
  const [step, setStep] = useState('welcome');
  const [airtimeOption, setAirtimeOption] = useState('');
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState(''); // State to store validation error messages

  const handlePinChange = (e) => setPin(e.target.value);
  const handleMenuChange = (e) => setMenu(e.target.value);
  const handleAirtimeOptionChange = (e) => setAirtimeOption(e.target.value);
  const handleAmountChange = (e) => setAmount(e.target.value);

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);

    // Validate phone number length (must be exactly 11 digits)
    if (value.length !== 11) {
      setError('Phone number must be exactly 11 digits.');
    } else {
      setError('');
    }
  };

  const handleConfirmationChange = (e) => setConfirmation(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin === '7799') {
      setStep('menu');
    } else {
      alert('Invalid PIN');
    }
  };

  const handleMenuSubmit = (e) => {
    e.preventDefault();
    switch (menu) {
      case '1':
        alert(`Your balance is $${balance}`);
        break;
      case '2':
        setStep('airtime');
        break;
      case '3':
        setStep('bill');
        break;
      case '4':
        setStep('transfer');
        break;
      case '5':
        setStep('mini-statement');
        break;
      case '6':
        setStep('salaam-bank');
        break;
      case '7':
        setStep('management');
        break;
      case '8':
        setStep('taaj');
        break;
      case '9':
        setStep('bill-payment');
        break;
      default:
        alert('Invalid choice. Please try again!');
    }
  };

  const validateTransaction = () => {
    if (balance <= 0) {
      alert('Ku ma filna haragaaga. Fadlan iska hubi balance-kaaga.');
      return false;
    }
    if (parseFloat(amount) <= 0) {
      alert('Fadlan geli lacag ka wayn 0.');
      return false;
    }
    if (parseFloat(amount) > balance) {
      alert('Haragaagu kuma filna. Fadlan geli lacag ka yar ama ku eeg haragaaga.');
      return false;
    }
    return true;
  };

  const handleAirtimeSubmit = (e) => {
    e.preventDefault();

    // Validate phone number length before proceeding
    if (phoneNumber.length !== 11) {
      setError('Phone number must be exactly 11 digits.');
      return;
    }

    if (!validateTransaction()) return;

    if (airtimeOption === '1') {
      alert(`You have successfully topped up $${amount} to your own number.`);
    } else if (airtimeOption === '2') {
      alert(`You have successfully sent $${amount} to ${phoneNumber}.`);
    } else {
      alert('Invalid option. Please try again.');
      return;
    }

    setBalance(balance - parseFloat(amount));
    resetForm();
    setStep('menu');
  };

  const handleBillSubmit = (e) => {
    e.preventDefault();
    if (!validateTransaction()) return;

    alert(`Bill payment of $${amount} has been processed.`);
    setBalance(balance - parseFloat(amount));
    resetForm();
    setStep('menu');
  };

  const handleTransferSubmit = (e) => {
    e.preventDefault();

    // Validate phone number length before proceeding
    if (phoneNumber.length !== 9) {
      setError('Phone number must be exactly 11 digits.');
      return;
    }

    if (!validateTransaction()) return;

    alert(`You have successfully transferred $${amount} to ${phoneNumber}.`);
    setBalance(balance - parseFloat(amount));
    resetForm();
    setStep('menu');
  };

  const handleMiniStatementSubmit = (e) => {
    e.preventDefault();
    alert('Your mini statement has been sent to your registered mobile number.');
    setStep('menu');
  };

  const handleSalaamBankSubmit = (e) => {
    e.preventDefault();
    alert('Your request has been processed. Thank you for using Salaam Bank.');
    setStep('menu');
  };

  const handleManagementSubmit = (e) => {
    e.preventDefault();
    alert('Your management request has been processed.');
    setStep('menu');
  };

  const handleTaajSubmit = (e) => {
    e.preventDefault();
    alert('Your TAAJ request has been processed.');
    setStep('menu');
  };

  const handleBillPaymentSubmit = (e) => {
    e.preventDefault();
    if (!validateTransaction()) return;

    alert(`Your bill payment of $${amount} has been processed.`);
    setBalance(balance - parseFloat(amount));
    resetForm();
    setStep('menu');
  };

  const resetForm = () => {
    setAmount('');
    setPhoneNumber('');
    setAirtimeOption('');
    setError('');
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="min-h-screen bg-purple-950 flex flex-col items-center justify-center p-4">
      <h1 className="font-bold text-3xl text-green-700 text-center mb-4">EVC Plus</h1>

      {/* Animated Image */}
      <img
        src={img}
        alt="Animated"
        className="animated-image mb-8 w-60 h-60"
      />

      {/* Slider */}
      <div className="slider-container mb-8 w-10 h-10">
        <Slider {...sliderSettings}>
          <div></div>
          <div></div>
          <div></div>
        </Slider>
      </div>

      {step === 'welcome' && (
        <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pin">
              Enter PIN
            </label>
            <input
              type="password"
              id="pin"
              value={pin}
              onChange={handlePinChange}
              className="w-full p-2 border rounded"
              placeholder="Enter PIN"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-700 text-white p-2 rounded hover:bg-teal-700"
          >
            Submit
          </button>
        </form>
      )}

      {step === 'menu' && (
        <form onSubmit={handleMenuSubmit} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="menu">
              Select Menu Option
            </label>
            <select
              id="menu"
              value={menu}
              onChange={handleMenuChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select an option</option>
              <option value="1">Itus Haraaga</option>
              <option value="2">Kaarka hadalka</option>
              <option value="3">Bixi Biil</option>
              <option value="4">U wareeji EVCPlus</option>
              <option value="5">Warbixin Kooban</option>
              <option value="6">Salaam Bank</option>
              <option value="7">Maareynta</option>
              <option value="8">TAAJ</option>
              <option value="9">Bill Payment</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white p-2 rounded hover:bg-teal-700"
          >
            Submit
          </button>
        </form>
      )}

      {step === 'airtime' && (
        <form onSubmit={handleAirtimeSubmit} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="airtime">
              Airtime Options
            </label>
            <select
              id="airtime"
              value={airtimeOption}
              onChange={handleAirtimeOptionChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select an option</option>
              <option value="1">Ku shubo Airtime</option>
              <option value="2">Ugu shub Airtime</option>
            </select>
          </div>
          {airtimeOption === '2' && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                Enter Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                className="w-full p-2 border rounded"
                placeholder="Enter Phone Number"
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
              Enter Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              className="w-full p-2 border rounded"
              placeholder="Enter Amount"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white p-2 rounded hover:bg-teal-700"
          >
            Submit
          </button>
        </form>
      )}

      {step === 'bill' && (
        <form onSubmit={handleBillSubmit} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
              Enter Bill Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              className="w-full p-2 border rounded"
              placeholder="Enter Amount"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white p-2 rounded hover:bg-teal-700"
          >
            Submit
          </button>
        </form>
      )}

      {step === 'transfer' && (
        <form onSubmit={handleTransferSubmit} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
              Enter Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              className="w-full p-2 border rounded"
              placeholder="Enter Phone Number"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
              Enter Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              className="w-full p-2 border rounded"
              placeholder="Enter Amount"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white p-2 rounded hover:bg-teal-700"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default App;