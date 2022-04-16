import './_die.css'

export default function Die(props) {
    return (
        <div className={`die ${props.isHeld && "is-held"}`} onClick={props.holdDie}>
            { props.value === 1 && 
                <div className='die-dot middle center'></div>
            }
            { props.value === 2 && 
                <>
                <div className='die-dot top left'></div>
                <div className='die-dot bottom right'></div>
                </>
            }
            { props.value === 3 && 
                <>
                <div className='die-dot top left'></div>
                <div className='die-dot middle center'></div>
                <div className='die-dot bottom right'></div>
                </>
            }
            { props.value === 4 && 
                <>
                <div className='die-dot top left'></div>
                <div className='die-dot top right'></div>
                <div className='die-dot bottom left'></div>
                <div className='die-dot bottom right'></div>
                </>
            }
            { props.value === 5 && 
                <>
                <div className='die-dot top left'></div>
                <div className='die-dot top right'></div>
                <div className='die-dot bottom left'></div>
                <div className='die-dot bottom right'></div>
                <div className='die-dot middle center'></div>
                </>
            }
            { props.value === 6 && 
                <>
                <div className='die-dot top left'></div>
                <div className='die-dot top right'></div>
                <div className='die-dot middle left'></div>
                <div className='die-dot middle right'></div>
                <div className='die-dot bottom left'></div>
                <div className='die-dot bottom right'></div>
                </>
            }
        </div>
    )
}