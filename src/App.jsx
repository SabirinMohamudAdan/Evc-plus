import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css';
import img from "./assets/img3.jpeg"; // Ensure this image exists

function App() {
  const [pin, setPin] = useState('');
  const [balance, setBalance] = useState(350);
  const [menu, setMenu] = useState('');
  const [step, setStep] = useState('welcome');
  const [airtimeOption, setAirtimeOption] = useState('');
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (setter) => (e) => setter(e.target.value);

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setError(value.length !== 11 ? '' : '');
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
      alert('Haragaagu kuma filna. Fadlan geli lacag ka yar am ku eeg haragaaga.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin === '7799') {
      setStep('menu');
    } else {
      alert('fadlan iska sax pinka');
    }
  };

  const handleMenuSubmit = (e) => {
    e.preventDefault();
    const actions = {
      '1': () => alert(`Haraagagu waa $${balance}`),
      '2': () => setStep('airtime'),
      '3': () => setStep('bill'),
      '4': () => setStep('transfer'),
      '5': () => setStep('mini-statement'),
      '6': () => setStep('salaam-bank'),
      '7': () => setStep('management'),
      '8': () => setStep('taaj'),
      '9': () => setStep('bill-payment'),
    };
    actions[menu] ? actions[menu]() : alert('Invalid choice. Please try again!');
  };

  const handleAirtimeSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.length !== 11) {
      setError('Phone number must be exactly 11 digits.');
      return;
    }
    if (!validateTransaction()) return;

    const message = airtimeOption === '1'
      ? `Waxaad ku shubatay $${amount} lambarkaaga. Haraagagu cusub waa $${balance - parseFloat(amount)}.`
      : `Waxaad ugu shubatay $${amount} lambarka ${phoneNumber}. Haraagagu cusub waa $${balance - parseFloat(amount)}.`;
    alert(message);
    setBalance(balance - parseFloat(amount));
    resetForm();
    setStep('menu');
  };

  const handleBillSubmit = (e) => {
    e.preventDefault();
    if (!validateTransaction()) return;
    alert(`Waxaad bixisay biil dhan $${amount}. Haraagagu cusub waa $${balance - parseFloat(amount)}.`);
    setBalance(balance - parseFloat(amount));
    resetForm();
    setStep('menu');
  };

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.length !== 9) {
      setError('Phone number must be exactly 9 digits.');
      return;
    }
    if (!validateTransaction()) return;
    alert(`Waxaad ugu wareejisay $${amount} lambarka ${phoneNumber}.
       Haraagagu  waa $${balance - parseFloat(amount)}.`);
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
      <img src={img} alt="Animated" className="animated-image mb-8 w-60 h-60" />

      {step === 'welcome' && (
        <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pin">Geli PIN</label>
            <input type="password" id="pin" value={pin} onChange={handleInputChange(setPin)} className="w-full p-2 border rounded" placeholder="Geli PIN" />
          </div>
          <button type="submit" className="w-full bg-green-700 text-white p-2 rounded hover:bg-teal-700">submit</button>
        </form>
      )}

      {step === 'menu' && (
        <form onSubmit={handleMenuSubmit} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="menu">Dooro Xulasho</label>
            <select id="menu" value={menu} onChange={handleInputChange(setMenu)} className="w-full p-2 border rounded">
              <option value="">Dooro xulasho</option>
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
          <button type="submit" className="w-full bg-green-700 ~text-white p-2 rounded hover:bg-teal-700">submit</button>
        </form>
      )}

      {step === 'airtime' && (
        <form onSubmit={handleAirtimeSubmit} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="airtime">Dooro Airtime</label>
            <select id="airtime" value={airtimeOption}
             onChange={handleInputChange(setAirtimeOption)} className="w-full p-2 border rounded">
              <option value="">Dooro xulasho</option>
              <option value="1">Ku shubo Airtime</option>
              <option value="2">Ugu shub Airtime</option>
            </select>
          </div>
          {airtimeOption === '2' && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">Geli Lambarka</label>
              <input type="text" id="phoneNumber" value={phoneNumber} onChange={handlePhoneNumberChange} className="w-full p-2 border rounded" placeholder="Geli Lambarka" />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">Geli Qadarka</label>
            <input type="number" id="amount" value={amount} onChange={handleInputChange(setAmount)} className="w-full p-2 border rounded" placeholder="Geli Qadarka" />
          </div>
          <button type="submit" className="w-full bg-teal-600 text-white p-2 rounded hover:bg-teal-700">submit</button>
        </form>
      )}
 
      {step === 'bill' && (
        <form onSubmit={handleBillSubmit} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">Geli Qadarka Biilka</label>
            <input type="number" id="amount" value={amount} onChange={handleInputChange(setAmount)} className="w-full p-2 border rounded" placeholder="Geli Qadarka" />
          </div>
          <button type="submit"
           className="w-full bg-green-700 text-white p-2 rounded
            hover:bg-teal-700">submit</button>
        </form>
      )}

      {step === 'transfer' && (
        <form onSubmit={handleTransferSubmit} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">Geli Lambarka</label>
            <input type="text" id="phoneNumber" value={phoneNumber} onChange={handlePhoneNumberChange} className="w-full p-2 border rounded" placeholder="Geli Lambarka" />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">Geli Qadarka</label>
            <input type="number" id="amount" value={amount} onChange={handleInputChange(setAmount)} className="w-full p-2 border rounded" placeholder="Geli Qadarka" />
          </div>
          <button type="submit" className="w-full bg-green-700
           text-white p-2 rounded hover:bg-teal-700">submit</button>
        </form>
      )}
    </div>
  );
}

export default App;