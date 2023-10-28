import React, { useState } from 'react';

const MyComponent = () => {
    const [firstSelection, setFirstSelection] = useState('');
    const [secondSelection, setSecondSelection] = useState('');

    const handleFirstSelectionChange = (event) => {
        setFirstSelection(event.target.value);
        setSecondSelection('');
    };

    const handleSecondSelectionChange = (event) => {
        setSecondSelection(event.target.value);
    };

    const renderSecondSelectionOptions = () => {
        if (firstSelection === '') {
            return null;
        }

        const secondOptions = [];
        for (let i = 1; i <= 5; i++) {
            secondOptions.push(
                <option key={i} value={`${firstSelection}/${i}`}>
                    {`${firstSelection}/${i}`}
                </option>
            );
        }

        return (
            <select value={secondSelection} onChange={handleSecondSelectionChange}>
                <option value="">Select an option</option>
                {secondOptions}
            </select>
        );
    };


    function renderThirdInput() {
        if (secondSelection === '') {
            return null;
        }

        const types = ['text', 'date', 'file', 'range', 'number']

        if (secondSelection.startsWith('1')) {
            return <input type={types[0]} name={`${types[0]}`} />
        } else if (secondSelection.startsWith('2')) {
            return <input type={types[1]} name={`${types[1]}`} />
        } else if (secondSelection.startsWith('3')) {
            return <input type={types[2]} name={`${types[2]}`} />
        } else if (secondSelection.startsWith('4')) {
            return <input type={types[3]} name={`${types[3]}`} />
        } else if (secondSelection.startsWith('5')) {
            return <input type={types[4]} name={`${types[4]}`} />
        }
    }


    return (
        <div>
            <select style={{ margin: '20px' }} value={firstSelection} onChange={handleFirstSelectionChange}>
                <option value="">Select an option</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>

            {renderSecondSelectionOptions()}
            <br />
            {renderThirdInput()}

        </div>
    );
};

export default MyComponent;