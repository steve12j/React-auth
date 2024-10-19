import React from 'react'

const Content = ({ title, description, buttonText, handleButton }) => {
    return (
        <section>
            <h1>{title}</h1>
            <p>{description}</p>
            {buttonText && <button className='alignSelf' onClick={handleButton}>{buttonText}</button>}
        </section>
    )
}

export default Content