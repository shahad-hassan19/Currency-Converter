import { useState } from 'react';
import InputBox from './Components/InputBox';
import useCurrencyInfo from './Hooks/useCurrencyInfo';
import { HiArrowsUpDown } from "react-icons/hi2";

function App() {
    const [ amount, setAmount ] = useState(0)
    const [ from, setFrom ] = useState('usd')
    const [ to, setTo ] = useState('inr')
    const [ convertedAmount, setConvertedAmount] = useState(0)

    const fromCurrencyInfo = useCurrencyInfo(from)
    const toCurrencyInfo = useCurrencyInfo(to);

    const fromOptions = Object.keys(fromCurrencyInfo)
    const toOptions = Object.keys(toCurrencyInfo);

    const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
    }

    const convert = () => {
    setConvertedAmount(amount * fromCurrencyInfo[to])
    }

    const styles = {
        'color' : '#9FE870',
    }

    return (
        <div className="w-full min-h-full xl:h-screen p-10 flex flex-col items-center bg-lime-950 bg-opacity-90" >
            <h1 className=' text-5xl md:text-6xl text-center font-extrabold mb-10' style={styles}>Currency Converter</h1>
            <h2 className=' text-2xl md:text-3xl text-center font-extrabold mb-10' style={styles}> Convert { from.toUpperCase() } to { to.toUpperCase() } at the real exchange rate. </h2>
            <div className="w-full">
                <div className="w-3/4 mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white">
                    <form
                        onSubmit={(e) => {
                        e.preventDefault();
                        convert()
                        }}>

                        <div className='flex flex-col md:flex-row justify-center align-items-center'>
                        <div className="w-full border-2 border-black rounded-md">
                            <InputBox
                                label="Amount"
                                amount={amount}
                                currencyOptions={fromOptions}
                                onCurrencyChange={(currency) => setFrom(currency)}
                                selectCurrency={from}
                                onAmountChange={(amount) => setAmount(amount)}
                            />
                        </div>
                        <div className="relative self-center w-6 h-1">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 md:rotate-90 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap} >
                                <HiArrowsUpDown  />
                            </button>
                        </div>
                        <div className="w-full border-2 border-black rounded-md">
                            <InputBox
                                label="Converted To"
                                amount={convertedAmount}
                                currencyOptions={toOptions}
                                onCurrencyChange={(currency) => setTo(currency)}
                                selectCurrency={to}
                                amountDisable
                            />
                        </div>
                        </div>
                        <div className='mt-5 flex text-center justify-between flex-col md:flex-row'>
                            <p className='text-xl font-semibold p-3'>{amount} {from.toUpperCase()} = <span className=' text-green-700'>{convertedAmount}</span> {to.toUpperCase()}</p>
                            <button type="submit" className="w-full sm:m-5 md:m-0 sm:self-center sm:w-1/2 md:w-1/3 bg-blue-600 text-white p-3 rounded-lg">
                                Convert {from.toUpperCase()} to {to.toUpperCase()}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
